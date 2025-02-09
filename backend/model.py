import os
import tensorflow as tf
from tensorflow.keras import layers, models, regularizers
from tensorflow.keras.preprocessing.image import ImageDataGenerator
os.environ["KMP_DUPLICATE_LIB_OK"] = "TRUE"


# function that creates data generators for training and testing
def create_data_generators(train_dir, test_dir, image_height, image_width):

    # image augmentation for the training set
    train_datagen = ImageDataGenerator(
        rescale=1./255,
        width_shift_range=0.4,
        height_shift_range=0.4,
        shear_range=0.4,
        zoom_range=0.4,
        horizontal_flip=True,
        fill_mode='nearest',
        brightness_range=[0.5, 1.5]
    )

    # image rescaling for the test set
    test_datagen = ImageDataGenerator(rescale=1./255)

    # generating batches of data from the training directory
    train_generator = train_datagen.flow_from_directory(
        train_dir,
        target_size=(image_height, image_width),
        batch_size=32,
        class_mode='sparse'
    )

    # generating batches of data from the testing directory
    test_generator = test_datagen.flow_from_directory(
        test_dir,
        target_size=(image_height, image_width),
        batch_size=32,
        class_mode='sparse'
    )

    return train_generator, test_generator


# function that creates the model using VGG16 as its base
def create_model(image_height, image_width):
    base_model = tf.keras.applications.VGG16(
        weights='imagenet',
        include_top=False,
        input_tensor=layers.Input(shape=(image_height, image_width, 3))
    )

    # freezing all layers except the last 4
    for layer in base_model.layers[:-4]:
        layer.trainable = False

    # adding custom layers on top of VGG16
    x = base_model.output
    x = layers.GlobalAveragePooling2D()(x)
    x = layers.Dense(256, activation='relu', kernel_regularizer=regularizers.l2(0.01))(x)
    x = layers.Dropout(0.5)(x)
    predictions = layers.Dense(4, activation='softmax')(x)

    # creating the final model using the base model and custom layers
    model = models.Model(inputs=base_model.input, outputs=predictions)

    # compiling the model
    model.compile(
        optimizer=tf.keras.optimizers.Adam(learning_rate=0.0001),
        loss='sparse_categorical_crossentropy',
        metrics=['accuracy']
    )

    return model, base_model


# function that creates a feature model for heatmap generation
def create_feature_model(model):
    conv_layer = model.get_layer('block5_conv3')
    return models.Model(
        inputs=model.input,
        outputs=[conv_layer.output, model.output]
    )


# function that creates and trains the model
def create_and_train_model():
    image_height = 200
    image_width = 200
    base_dir = os.path.abspath(os.path.dirname(__file__))
    train_dir = os.path.join(base_dir, "dataset/train")
    test_dir = os.path.join(base_dir, "dataset/test")

    # creating data generators
    train_generator, test_generator = create_data_generators(
        train_dir,
        test_dir,
        image_height,
        image_width
    )

    # creating and compiling the model
    model, _ = create_model(image_height, image_width)

    # training the model using the training and testing data generators
    model.fit(
        train_generator,
        epochs=10,
        validation_data=test_generator
    )

    return model