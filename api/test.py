import tensorflow as tf

model1 = tf.keras.models.load_model("models/1.h5")
model2 = tf.keras.models.load_model("models/2.h5")
model3= tf.keras.models.load_model("models/3.h5")

# Export to TensorFlow Serving format
tf.saved_model.save(model1, "models/1/")
tf.saved_model.save(model2, "models/2/")
tf.saved_model.save(model3, "models/3/")