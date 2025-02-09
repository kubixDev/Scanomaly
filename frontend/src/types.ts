export interface NotificationProps {
  message: string;
  type: 'success' | 'error';
}

export interface DatabaseResult {
  id: number;
  timestamp: string;
  heatmap_image: string;
  prediction: string;
}