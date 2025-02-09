import styled, { keyframes } from 'styled-components';


export const slideUp = keyframes`
  from {
    transform: translateY(100%) translateX(-50%);
    opacity: 0;
  }
  to {
    transform: translateY(0) translateX(-50%);
    opacity: 1;
  }
`;

export const NotificationContainer = styled.div<{ type: 'success' | 'error' }>`
  position: fixed;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  padding: 15px 25px;
  border-radius: 10px;
  background: ${props => props.type === 'success' ? '#52b788' : '#ff4d6d'};
  color: #f5f5f5;
  font-weight: 500;
  backdrop-filter: blur(10px);
  animation: ${slideUp} 0.3s ease-out;
  z-index: 1000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 200px;
  max-width: 90%;
  text-align: center;
`;

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-image: url('/background.png');
  background-size: cover;
  background-position: center;
`;

export const TitleBar = styled.div`
  color: #f5f5f5;
  font-size: 2.5rem;
  text-align: center;
  padding: 50px 50px;
  font-weight: 600;
`;

export const InfoBox = styled.div`
  background: rgba(255, 255, 255, 0.10);
  backdrop-filter: blur(20px);
  padding: 25px 25px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 20px;
  color: #f5f5f5;
  font-weight: 200;
  width: 90%;
  max-width: 500px;
  margin-bottom: 20px;
`;

export const InfoIcon = styled.div`
  font-size: 1.5rem;
`;

export const PredictionBox = styled.div`
  background: rgba(11, 19, 43, 0.50);
  backdrop-filter: blur(20px);
  padding: 35px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  max-width: 500px;
  height: 460px;
  justify-content: space-between;
`;

export const HeatmapContainer = styled.div`
  width: 300px;
  height: 300px;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin-bottom: 15px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 20px;
  }
`;

export const PredictionInfo = styled.div`
  color: #f5f5f5;
  text-align: center;
`;

export const TextWithPlaceholder = styled.div`
  font-size: 1.5rem;
  color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const RectanglePlaceholder = styled.div`
  width: 200px;
  height: 50px;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.05);
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  max-width: 500px;
  margin-top: 25px;
`;

export const Button = styled.label`
  padding: 20px 15px;
  background-color: rgba(11, 19, 43, 0.50);
  color: #f5f5f5;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 400;
  font-size: 1.3rem;
  transition: background 0.2s;
  text-align: center;
  width: 48%;

  &:hover {
    background-color: #2b57e4;
  }

  input[type="file"] {
    display: none;
  }
`;

export const Footer = styled.footer`
  position: absolute;
  bottom: 25px;
  text-align: center;
  width: 100%;

  a {
    color: rgba(255, 255, 255, 0.40);
    font-weight: 200;
    font-size: 1rem;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const ModeSwitcher = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

export const ModeButton = styled.button<{ selected: boolean }>`
  padding: 5px 20px;
  background-color: ${props => props.selected ? '#2b57e4' : 'rgba(255, 255, 255, 0.10)'};
  color: #f5f5f5;
  border-radius: 20px;
  cursor: pointer;
  border: none;
  font-size: 1.2rem;
  transition: background 0.2s;

  &:hover {
    background-color: #5276e9;
  }
`;

export const DatabasePlaceholder = styled.div`
  color: #f5f5f5;
  font-size: 1.5rem;
  text-align: center;
`;

export const DatabaseList = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 15px;
  
  margin-right: -5px;
  padding-right: 15px;
    
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.4);
  }
`;

export const ResultItem = styled.div`
  display: flex;
  align-items: center;
  height: 90px;
  background: rgba(255, 255, 255, 0.05);
  padding: 15px;
  border-radius: 20px;
`;

export const ResultImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 10px;
  object-fit: cover;
  margin-right: 15px;
`;

export const ResultInfo = styled.div`
  color: #f5f5f5;
  flex: 1;
  overflow: hidden;
`;

export const ResultPrediction = styled.div`
  font-weight: 400;
  font-size: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ResultTimestamp = styled.div`
  font-size: 13px;
  opacity: 0.7;
`;

export const DeleteButton = styled.button`
  padding: 20px 35px;
  background-color: rgba(11, 19, 43, 0.50);
  color: #f5f5f5;
  border-radius: 20px;
  font-weight: 400;
  cursor: pointer;
  font-size: 1.3rem;
  margin-top: 25px;
  border: none;
  text-align: center;
  transition: background 0.2s;

  &:hover {
    background-color: #ff4d6d;
  }
`;

export const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  backdrop-filter: blur(30px);
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const PopupContainer = styled.div`
  background: rgba(11, 19, 43, 1);
  border-radius: 20px;
  padding: 50px;
  position: relative;
  max-width: 450px;
  border: 3px solid rgba(255, 255, 255, 0.4);
  width: 90%;
  text-align: center;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 30px;
  right: 30px;
  background: transparent;
  color: #f5f5f5;
  font-size: 1.5rem;
  border: none;
  cursor: pointer;

  &:hover {
    color: rgba(255, 255, 255, 0.7);
  }
`;

export const PopupImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 20px;
  margin-top: 25px;
  margin-bottom: 20px;
`;

export const PopupDetails = styled.div`
  color: #f5f5f5;
  p {
    margin: 7px;
    font-size: 18px;
    font-weight: 200;
  }
`;