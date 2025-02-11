<img src="https://raw.githubusercontent.com/kubixDev/Scanomaly/master/readmeImages/scanomalyLogo.png" width="370"/>

[![forthebadge](https://raw.githubusercontent.com/kubixDev/Scanomaly/master/readmeImages/madeWithPythonBadge.svg)](https://forthebadge.com)  [![forthebadge](https://raw.githubusercontent.com/kubixDev/Scanomaly/master/readmeImages/madeWithReactBadge.svg)](https://forthebadge.com)  [![forthebadge](https://raw.githubusercontent.com/kubixDev/Scanomaly/master/readmeImages/builtWithLoveBadge.svg)](https://forthebadge.com)

---

## About

**Scanomaly** is a web application aimed at automating the detection of brain tumor types from MRI images. It uses a convolutional neural network based on the VGG16 architecture, utilizing transfer learning to improve model accuracy. The system can identify three distinct types of brain tumors, or its absence. Furthermore, it generates heatmaps which highlight areas potentially affected by the tumor. The project consists of a Flask backend with a PostgreSQL database and a React + Vite frontend for a smooth user experience.

<br>

## Features

Some of the main Scanomaly features
* accurate classification system that predicts tumor types (glioma, meningioma, pituitary, or none)
* heatmap generation feature that highlights areas of interest
* ability to upload and scan own MRI images (in JPG format)
* history tracking that stores saved results in a database
* automatic training process if no existing trained model is found
* modern and responsive web interface

<br>

## Technologies

The project uses
* Python
* TypeScript
* Flask
* TensorFlow
* OpenCV
* PostgreSQL
* React + Vite (with styled-components)

<br>

## Dataset

The dataset can be obtained from [Kaggle](https://www.kaggle.com/datasets/sartajbhuvaji/brain-tumor-classification-mri/data) and should be placed in the backend folder, following the file structure below:

```
backend/
└── dataset/
    ├── test/
    │   ├── glioma_tumor/
    │   ├── meningioma_tumor/
    │   ├── no_tumor/
    │   └── pituitary_tumor/
    └── train/
        ├── glioma_tumor/
        ├── meningioma_tumor/
        ├── no_tumor/
        └── pituitary_tumor/
```

<br>

## Launch

* to ensure full compatibility use **Python 3.10**, **Node.js 22+**, **PostgreSQL 17** and a preferred virtual environment tool (Conda or venv)
* you need to initialize the dataset and create the `scanomaly_db` database manually
* ensure that your database connection settings in `config.py` match your configuration
* to run the backend use `python app.py`, the API endpoints will be available at `127.0.0.1:5000`
* if the trained model is missing, it will automatically start training
* the app automatically checks and creates the necessary tables if they do not exist
* after a successful initialization, run the Scanomaly frontend using `npm run dev` and access it at `localhost:5173`

<br>

## Preview

<p float="left">
  <kbd> <img src="https://raw.githubusercontent.com/kubixDev/Scanomaly/master/readmeImages/preview1.png" width="500"/> </kbd>
</p>

<p float="left">
  <kbd> <img src="https://raw.githubusercontent.com/kubixDev/Scanomaly/master/readmeImages/preview2.png" width="500"/> </kbd>
</p>

<p float="left">
  <kbd> <img src="https://raw.githubusercontent.com/kubixDev/Scanomaly/master/readmeImages/preview3.png" width="500"/> </kbd>
</p>

<br>

## Notice

All rights reserved. The Scanomaly app, including but not limited to code, documentation, and original assets (excluding third-party components), is protected by copyright law. You are permitted to use this app as-is for personal, non-commercial purposes. Distribution or creation of derivative works is prohibited without prior written consent from the copyright holder. 
