import io
import os
import base64
import datetime
import numpy as np
import tensorflow as tf
from PIL import Image
from flask import Flask, request, jsonify
from flask_cors import CORS
from model import create_and_train_model, create_feature_model
from utils import process_image, generate_and_apply_heatmap
from db import get_db_connection


app = Flask(__name__)

# setting up CORS for frontend
CORS(app, resources={
    r"/predict": {"origins": "http://localhost:5173"},
    r"/save": {"origins": "http://localhost:5173"},
    r"/getall": {"origins": "http://localhost:5173"},
    r"/delete": {"origins": "http://localhost:5173"}
})

# variable to store the model path
MODEL_PATH = 'model.h5'

# loads a pre-trained model or trains a new one
if os.path.exists(MODEL_PATH):
    model = tf.keras.models.load_model(MODEL_PATH)
    print("Model loaded successfully")
else:
    print("Model not found, training a new one")
    model = create_and_train_model()
    model.save(MODEL_PATH)
    print("New model trained and loaded successfully")

# feature model for generating heatmaps during prediction
feature_model = create_feature_model(model)


# route for predicting tumor type from an image
@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'}), 400

    try:
        # processes the uploaded image
        image_file = request.files['image']
        image = Image.open(image_file.stream)
        processed_image = process_image(image, 200, 200)

        # predicts the tumor
        prediction = model.predict(np.expand_dims(processed_image, axis=0))
        predicted_class = np.argmax(prediction)

        # generates a heatmap
        heatmap_overlay = generate_and_apply_heatmap(
            processed_image,
            predicted_class,
            feature_model,
            model
        )

        # converts heatmap to Base64 (for sending as JSON)
        heatmap_image = Image.fromarray(heatmap_overlay)
        buffered = io.BytesIO()
        heatmap_image.save(buffered, format="PNG")
        heatmap_base64 = base64.b64encode(buffered.getvalue()).decode("utf-8")

        # returns full prediction result
        result = ['Glioma Tumor', 'Meningioma Tumor', 'No Tumor', 'Pituitary Tumor'][predicted_class]
        confidence = float(prediction[0][predicted_class])
        return jsonify({
            'prediction': result,
            'confidence': confidence,
            'heatmap': heatmap_base64
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500


# route for saving prediction results to postgres database
@app.route('/save', methods=['POST'])
def save_result():
    data = request.json
    if not all(key in data for key in ('prediction', 'confidence', 'heatmap')):
        return jsonify({'error': 'Missing data fields'}), 400

    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        # converts base64 image back to binary
        heatmap_binary = base64.b64decode(data['heatmap'].split(',')[1])

        # inserts result into the database
        cursor.execute("""
            INSERT INTO results (timestamp, heatmap_image, prediction, confidence)
            VALUES (%s, %s, %s, %s)
        """, (datetime.datetime.now(), heatmap_binary, data['prediction'], data['confidence']))

        conn.commit()
        conn.close()
        return jsonify({'message': 'Result saved successfully'})

    except Exception as e:
        return jsonify({'error': str(e)}), 500


# route for retrieving all saved results
@app.route('/getall', methods=['GET'])
def get_results():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        # queries the database for results
        cursor.execute("SELECT id, timestamp, heatmap_image, prediction FROM results ORDER BY timestamp DESC")
        rows = cursor.fetchall()

        # formats results
        results = [
            {
                'id': row[0],
                'timestamp': row[1].isoformat(),
                'heatmap_image': base64.b64encode(row[2]).decode('utf-8'),
                'prediction': row[3]
            }
            for row in rows
        ]

        conn.close()
        return jsonify(results)

    except Exception as e:
        return jsonify({'error': str(e)}), 500


# route for deleting results from the database
@app.route('/delete', methods=['POST'])
def delete_results():
    data = request.json

    if not data or 'ids' not in data:
        return jsonify({'error': 'Missing ids'}), 400

    ids = data['ids']

    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        # deletes results with specified ids
        query = "DELETE FROM results WHERE id IN %s"
        cursor.execute(query, (tuple(ids),))

        conn.commit()
        conn.close()
        return jsonify({'message': 'Results deleted successfully'})

    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)