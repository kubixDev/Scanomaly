import React, { useState, useEffect, ChangeEvent } from 'react';
import GlobalStyle from './styles/GlobalStyle';
import {AppContainer, TitleBar, InfoBox, InfoIcon, Footer, ModeSwitcher, ModeButton, NotificationContainer} from './styles/StyledComponents';
import ScanView from './components/ScanView';
import DatabaseView from './components/DatabaseView';
import Popup from './components/Popup';
import { NotificationProps, DatabaseResult } from './types';


// importing API service functions
import { predictImage, saveResult, getResults, deleteResults } from './services/api';

const App: React.FC = () => {
  const [prediction, setPrediction] = useState<string>('');
  const [confidence, setConfidence] = useState<number | null>(null);
  const [heatmap, setHeatmap] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [notification, setNotification] = useState<NotificationProps | null>(null);
  const [mode, setMode] = useState<'scan' | 'database'>('scan');
  const [results, setResults] = useState<DatabaseResult[]>([]);
  const [selectedResults, setSelectedResults] = useState<number[]>([]);
  const [selectedResult, setSelectedResult] = useState<DatabaseResult | null>(null);


  // popup functionality with details about a chosen result
  const openPopup = (result: DatabaseResult) => {
    setSelectedResult(result);
  };

  const closePopup = () => {
    setSelectedResult(null);
  };


  // fetches results from the database when in database mode
  const fetchResults = async () => {
    try {
      const data = await getResults();
      setResults(data);
    }
    catch (error) {
      console.error('Error fetching results:', error);
      showNotification('Error fetching results', 'error');
    }
  };


  // useEffect hook to fetch results and reset selected results
  useEffect(() => {
    if (mode === 'database') {
      fetchResults();
    }
    setSelectedResults([]);
  }, [mode]);


  // function for showing custom notifications
  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };


  // handles user file select
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      await uploadAndPredict(selectedFile);
    }
  };


  // function that uploads the image and gets a prediction from API
  const uploadAndPredict = async (selectedFile: File) => {
    setLoading(true);
    setPrediction('');
    setConfidence(null);
    setHeatmap(null);

    try {
      const data = await predictImage(selectedFile);
      setPrediction(data.prediction);
      setConfidence(data.confidence);
      setHeatmap("data:image/png;base64," + data.heatmap);
    }
    catch (error) {
      console.error("Error during fetch: ", error);
      showNotification('Prediction error', 'error');
    }

    setLoading(false);
  };


  // function that saves the current result
  const handleSaveResult = async () => {
    if (!prediction || confidence === null || !heatmap) {
      showNotification('No prediction to save', 'error');
      return;
    }

    try {
      await saveResult(heatmap, prediction, confidence);
      showNotification('Result saved successfully', 'success');
    }
    catch (error) {
      console.error("Error:", error);
      showNotification('Saving error', 'error');
    }
  };


  // function for result item selection
  const toggleSelection = (id: number) => {
    setSelectedResults(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };


  // function that deletes selected results
  const handleDelete = async () => {
    if (selectedResults.length === 0) return;

    try {
      await deleteResults(selectedResults);
      showNotification('Deleted successfully', 'success');
      setResults(prev => prev.filter(item => !selectedResults.includes(item.id)));
      setSelectedResults([]);
    }
    catch (error) {
      console.error(error);
      showNotification('Delete error', 'error');
    }
  };


  return (
    <>
      <GlobalStyle/>
      <AppContainer>
        <TitleBar>Scanomaly</TitleBar>

        <InfoBox>
          <InfoIcon>⚡️</InfoIcon>
          <p> This app uses a deep learning model to analyze MRI scans and predict potential brain tumor types </p>
        </InfoBox>

        <ModeSwitcher>
          <ModeButton selected={mode === 'scan'} onClick={() => setMode('scan')}> Analyze </ModeButton>
          <ModeButton selected={mode === 'database'} onClick={() => setMode('database')}> Database </ModeButton>
        </ModeSwitcher>

        {mode === 'scan' ? (
          <ScanView
            prediction={prediction}
            confidence={confidence}
            heatmap={heatmap}
            loading={loading}
            onFileChange={handleFileChange}
            onSaveResult={handleSaveResult}/>
        ) : (
          <DatabaseView
            results={results}
            selectedResults={selectedResults}
            onToggleSelection={toggleSelection}
            onOpenPopup={openPopup}
            onDelete={handleDelete}/>
        )}

        <Footer>
          <a href="https://github.com/kubixdev" target="_blank" rel="noopener noreferrer">
            made with ❤️ by kubixDev
          </a>
        </Footer>

        {notification && (
          <NotificationContainer type={notification.type}>
            {notification.message}
          </NotificationContainer>
        )}

        {selectedResult && (
          <Popup result={selectedResult} confidence={confidence} onClose={closePopup} />
        )}
      </AppContainer>
    </>
  );
};

export default App;