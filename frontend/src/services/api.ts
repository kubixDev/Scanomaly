import { DatabaseResult } from '../types';


// base URL for the backend API
const BASE_URL = 'http://127.0.0.1:5000';


// sends an image file to the backend for prediction
export const predictImage = async (selectedFile: File) => {
  const formData = new FormData();
  formData.append('image', selectedFile);

  const response = await fetch(`${BASE_URL}/predict`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Prediction error');
  }

  return await response.json();
};


// saves the prediction result with the heatmap to postgres database
export const saveResult = async (heatmap: string, prediction: string, confidence: number) => {
  const response = await fetch(`${BASE_URL}/save`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ heatmap, prediction, confidence }),
  });

  if (!response.ok) {
    throw new Error('Saving error');
  }

  return await response.json();
};


// fetches all saved prediction results from the database
export const getResults = async (): Promise<DatabaseResult[]> => {
  const response = await fetch(`${BASE_URL}/getall`);

  if (!response.ok) {
    throw new Error('Error fetching results');
  }

  return await response.json();
};


// deletes specific prediction results from the database
export const deleteResults = async (ids: number[]) => {
  const response = await fetch(`${BASE_URL}/delete`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ids }),
  });

  if (!response.ok) {
    throw new Error('Error deleting items');
  }

  return await response.json();
};