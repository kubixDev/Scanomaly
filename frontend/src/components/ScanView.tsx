import React from 'react';
import {PredictionBox, HeatmapContainer, PredictionInfo, TextWithPlaceholder, RectanglePlaceholder, ButtonContainer, Button} from '../styles/StyledComponents';


interface ScanViewProperties {
  prediction: string;
  confidence: number | null;
  heatmap: string | null;
  loading: boolean;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSaveResult: () => void;
}

const ScanView: React.FC<ScanViewProperties> = ({
  prediction,
  confidence,
  heatmap,
  loading,
  onFileChange,
  onSaveResult,
}) => {
  return (
    <>
      <PredictionBox>
        <HeatmapContainer>
          {heatmap ? <img src={heatmap} alt="Heatmap" /> : null}
        </HeatmapContainer>
        <PredictionInfo>
          <TextWithPlaceholder>
            {prediction || <RectanglePlaceholder />}
          </TextWithPlaceholder>
          {confidence !== null ? `Confidence: ${(confidence * 100).toFixed(2)}%` : ""}
        </PredictionInfo>
      </PredictionBox>
      <ButtonContainer>
        <Button>
          {loading ? "Processing..." : "Select an image"}
          <input type="file" accept="image/*" onChange={onFileChange} disabled={loading} />
        </Button>
        <Button onClick={onSaveResult}>
          Save result
        </Button>
      </ButtonContainer>
    </>
  );
};

export default ScanView;