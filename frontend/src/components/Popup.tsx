import React from 'react';
import { PopupOverlay, PopupContainer, CloseButton, PopupImage, PopupDetails } from '../styles/StyledComponents';
import { DatabaseResult } from '../types';


interface PopupProperties {
  result: DatabaseResult;
  confidence: number | null;
  onClose: () => void;
}

const Popup: React.FC<PopupProperties> = ({ result, confidence, onClose }) => {
  return (
    <PopupOverlay>
      <PopupContainer>
        <CloseButton onClick={onClose}>✖</CloseButton>
        <PopupImage src={`data:image/png;base64,${result.heatmap_image}`} alt="Heatmap" />
        <PopupDetails>
          <h1>{`Scan #${result.id}`}</h1>
          <p>{result.prediction}</p>
          <p>{`(with ${confidence !== null ? (confidence * 100).toFixed(2) : 0}% confidence)`}</p>
        </PopupDetails>
      </PopupContainer>
    </PopupOverlay>
  );
};

export default Popup;
