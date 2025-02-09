import cv2
import numpy as np


# function that prepares the image for prediction
def process_image(image, width, height):
    image_resized = image.resize((width, height))
    image_array = np.array(image_resized)

    # image properties for debugging
    print(f"Original image dtype: {image_array.dtype}, shape: {image_array.shape}")

    # if the image is grayscale, convert it to RGB
    if len(image_array.shape) == 2:
        image_array = cv2.cvtColor(image_array, cv2.COLOR_GRAY2RGB)

    # ensures that the image is in the correct depth (uint8) format
    if image_array.dtype != np.uint8:
        print("Converting image to uint8")
        image_array = np.uint8(image_array * 255)

    # updated image properties for debugging
    print(f"Converted image dtype: {image_array.dtype}, shape: {image_array.shape}")

    return image_array / 255.0


# function that generates a heatmap
def generate_heatmap(image_array, pred_class, feature_model, model):
    features, predictions = feature_model.predict(np.expand_dims(image_array, axis=0))

    class_weights = model.layers[-1].get_weights()[0]
    class_weights_pred = class_weights[:, pred_class]

    # initializes the class activation map with 0
    cam = np.zeros(features[0].shape[:2], dtype=np.float32)

    # gets a weighted sum of the feature maps for the predicted class
    for i, weight in enumerate(class_weights_pred):
        cam += weight * features[0, :, :, i]

    # applies ReLU to keep only the positive values
    cam = np.maximum(cam, 0)

    # normalizes CAM to range [0, 1]
    cam = (cam - cam.min()) / (cam.max() - cam.min() + 1e-7)

    # resizes CAM to match the original image size
    return cv2.resize(cam, (image_array.shape[1], image_array.shape[0]))


# function that applies heatmap to the image
def apply_heatmap(image, heatmap):

    # converts the heatmap to an 8-bit format
    heatmap_colored = cv2.applyColorMap(np.uint8(255 * heatmap), cv2.COLORMAP_JET)

    # ensures that the image is in uint8
    if image.dtype != np.uint8:
        image = np.uint8(image * 255)

    # converts the image to BGR format (as OpenCV expects BGR images)
    if len(image.shape) == 2:
        image = cv2.cvtColor(image, cv2.COLOR_GRAY2BGR)
    elif image.shape[2] == 4:
        image = cv2.cvtColor(image, cv2.COLOR_RGBA2BGR)
    elif image.shape[2] == 3:
        image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

    # overlays the heatmap onto the image
    overlay = cv2.addWeighted(image, 0.7, heatmap_colored, 0.3, 0)

    # converts it back to RGB
    return cv2.cvtColor(overlay, cv2.COLOR_BGR2RGB)


# main function that generates and applies the heatmap
def generate_and_apply_heatmap(image_array, pred_class, feature_model, model):
    heatmap = generate_heatmap(image_array, pred_class, feature_model, model)
    return apply_heatmap(image_array, heatmap)