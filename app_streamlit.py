import streamlit as st
import tensorflow as tf
import numpy as np
from PIL import Image
import os
# ---------------- CONFIG ----------------
# MODEL_PATH = "models/skin_cancer_gnn_gru.keras"
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "models", "skin_cancer_cnn_gru.keras")


IMG_SIZE = (224, 224)
THRESHOLD = 0.5

st.set_page_config(page_title="Skin Cancer Detection", layout="centered")

# ---------------- LOAD MODEL ----------------
@st.cache_resource
def load_model():
    return tf.keras.models.load_model(MODEL_PATH)

st.title("🩺 Skin Cancer Detection (AI)")
st.write("Upload a skin lesion image for AI-based analysis")

try:
    model = load_model()
    st.success("✅ Model loaded successfully")
except Exception as e:
    st.error(f"❌ Model loading failed: {e}")
    st.stop()

# ---------------- IMAGE PREPROCESS ----------------
def preprocess_image(image):
    image = image.convert("RGB")
    image = image.resize(IMG_SIZE)
    img = np.array(image, dtype=np.float32) / 255.0
    img = np.expand_dims(img, axis=0)
    return img

# ---------------- UI ----------------
uploaded_file = st.file_uploader(
    "Upload Image (JPG / PNG / JPEG)",
    type=["jpg", "jpeg", "png"]
)

if uploaded_file:
    image = Image.open(uploaded_file)
    st.image(image, caption="Uploaded Image", use_column_width=True)

    if st.button("🔍 Analyze Image"):
        with st.spinner("Analyzing image..."):
            img = preprocess_image(image)
            prediction = model.predict(img)

        # ---- UNIVERSAL OUTPUT HANDLING ----
        if prediction.shape[-1] == 1:
            prob = float(prediction[0][0])
            if prob >= THRESHOLD:
                result = "Cancer"
                confidence = prob * 100
            else:
                result = "Non-Cancer"
                confidence = (1 - prob) * 100
        else:
            idx = int(np.argmax(prediction[0]))
            prob = float(prediction[0][idx])
            result = "Cancer" if idx == 1 else "Non-Cancer"
            confidence = prob * 100

        # ---- DISPLAY RESULT ----
        st.subheader("🧪 Result")
        if result == "Cancer":
            st.error(f"⚠️ **{result} Detected**")
        else:
            st.success(f"✅ **{result} Detected**")

        st.write(f"**Confidence:** {confidence:.2f}%")

        st.info(
            "⚠️ This is an AI-assisted result. "
            "Please consult a dermatologist for medical advice."
        )
