import React from 'react';
import {PredictionBox, DatabasePlaceholder, DatabaseList, ResultItem, ResultImage, ResultInfo, ResultPrediction, ResultTimestamp, DeleteButton} from '../styles/StyledComponents';
import Checkbox from './Checkbox';
import { DatabaseResult } from '../types';


interface DatabaseViewProperties {
  results: DatabaseResult[];
  selectedResults: number[];
  onToggleSelection: (id: number) => void;
  onOpenPopup: (result: DatabaseResult) => void;
  onDelete: () => void;
}

const DatabaseView: React.FC<DatabaseViewProperties> = ({
  results,
  selectedResults,
  onToggleSelection,
  onOpenPopup,
  onDelete,
}) => {
  return (
    <>
      <PredictionBox>
        {results.length === 0 ? (<DatabasePlaceholder>No results found</DatabasePlaceholder>
        ) : (
          <DatabaseList>
            {results.map(result => (
              <ResultItem key={result.id} onClick={() => onOpenPopup(result)}>
                <Checkbox
                  checked={selectedResults.includes(result.id)}
                  onChange={() => onToggleSelection(result.id)}/>
                <ResultImage
                  src={`data:image/png;base64,${result.heatmap_image}`}
                  alt="Heatmap"/>
                <ResultInfo>
                  <ResultPrediction>{`Scan #${result.id}`}</ResultPrediction>
                  <ResultTimestamp>
                    {new Date(result.timestamp).toLocaleString()}
                  </ResultTimestamp>
                </ResultInfo>
              </ResultItem>
            ))}
          </DatabaseList>
        )}
      </PredictionBox>
      {selectedResults.length > 0 && (
        <DeleteButton onClick={onDelete}>Delete selected</DeleteButton>
      )}
    </>
  );
};

export default DatabaseView;