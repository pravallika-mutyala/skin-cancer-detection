// // DOM Elements
// const uploadArea = document.getElementById('uploadArea');
// const fileInput = document.getElementById('fileInput');
// const previewSection = document.getElementById('previewSection');
// const imagePreview = document.getElementById('imagePreview');
// const removeButton = document.getElementById('removeButton');
// const analyzeButton = document.getElementById('analyzeButton');
// const resultsSection = document.getElementById('resultsSection');
// const loadingSection = document.getElementById('loadingSection');
// const newAnalysisButton = document.getElementById('newAnalysisButton');
// const webcamButton = document.getElementById('webcamButton');

// // Results Elements
// const resultBadge = document.getElementById('resultBadge');
// const classification = document.getElementById('classification');
// const confidence = document.getElementById('confidence');
// const confidenceFill = document.getElementById('confidenceFill');

// let selectedFile = null;

// // File Input Change
// fileInput.addEventListener('change', handleFileSelect);

// // Drag and Drop Events
// uploadArea.addEventListener('dragover', (e) => {
//     e.preventDefault();
//     uploadArea.style.borderColor = 'var(--primary-color)';
//     uploadArea.style.backgroundColor = 'rgba(37, 99, 235, 0.05)';
// });

// uploadArea.addEventListener('dragleave', () => {
//     uploadArea.style.borderColor = 'var(--border-color)';
//     uploadArea.style.backgroundColor = '';
// });

// uploadArea.addEventListener('drop', (e) => {
//     e.preventDefault();
//     uploadArea.style.borderColor = 'var(--border-color)';
//     uploadArea.style.backgroundColor = '';
    
//     const files = e.dataTransfer.files;
//     if (files.length > 0) {
//         handleFile(files[0]);
//     }
// });

// uploadArea.addEventListener('click', () => {
//     fileInput.click();
// });

// // Handle File Selection
// function handleFileSelect(e) {
//     const file = e.target.files[0];
//     if (file) {
//         handleFile(file);
//     }
// }

// // Handle File
// function handleFile(file) {
//     // Validate file type
//     if (!file.type.startsWith('image/')) {
//         alert('Please upload an image file (JPG, PNG, JPEG)');
//         return;
//     }
    
//     // Validate file size (10MB max)
//     if (file.size > 10 * 1024 * 1024) {
//         alert('File size must be less than 10MB');
//         return;
//     }
    
//     selectedFile = file;
    
//     // Show preview
//     const reader = new FileReader();
//     reader.onload = (e) => {
//         imagePreview.src = e.target.result;
//         uploadArea.style.display = 'none';
//         previewSection.style.display = 'block';
//         analyzeButton.disabled = false;
//     };
//     reader.readAsDataURL(file);
// }

// // Remove Image
// removeButton.addEventListener('click', () => {
//     selectedFile = null;
//     fileInput.value = '';
//     imagePreview.src = '';
//     previewSection.style.display = 'none';
//     uploadArea.style.display = 'block';
//     analyzeButton.disabled = true;
//     resultsSection.style.display = 'none';
// });

// // Analyze Button Click
// analyzeButton.addEventListener('click', async () => {
//     if (!selectedFile) return;
    
//     // Hide upload section and show loading
//     document.querySelector('.upload-section').style.display = 'none';
//     loadingSection.style.display = 'block';
//     resultsSection.style.display = 'none';
    
//     // Simulate API call (Replace this with your actual Python backend API call)
//     await analyzeImage(selectedFile);
// });

// // Analyze Image Function (Replace with actual backend API call)
// async function analyzeImage(file) {
//     // Create FormData for API call
//     const formData = new FormData();
//     formData.append('image', file);
    
//     try {
//         // TODO: Replace this URL with your actual Python backend endpoint
//         // const response = await fetch('http://localhost:5000/api/predict', {
//         //     method: 'POST',
//         //     body: formData
//         // });
//         // const data = await response.json();
        
//         // SIMULATED RESPONSE (Remove this and uncomment above when integrating backend)
//         await new Promise(resolve => setTimeout(resolve, 3000)); // Simulate processing time
        
//         const mockResults = [
//             { class: 'Benign Keratosis', confidence: 87.5, type: 'benign' },
//             { class: 'Melanoma', confidence: 78.3, type: 'malignant' },
//             { class: 'Nevus (Mole)', confidence: 92.1, type: 'benign' },
//             { class: 'Basal Cell Carcinoma', confidence: 84.7, type: 'malignant' },
//             { class: 'Actinic Keratosis', confidence: 76.9, type: 'precancerous' }
//         ];
        
//         const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)];
//         displayResults(randomResult);
        
//     } catch (error) {
//         console.error('Error analyzing image:', error);
//         alert('Error analyzing image. Please try again or check your backend connection.');
//         resetToUpload();
//     }
// }

// // Display Results
// function displayResults(result) {
//     loadingSection.style.display = 'none';
//     resultsSection.style.display = 'block';
    
//     // Set classification
//     classification.textContent = result.class;
//     confidence.textContent = `${result.confidence.toFixed(1)}%`;
    
//     // Set confidence bar
//     confidenceFill.style.width = `${result.confidence}%`;
    
//     // Set badge color based on type
//     if (result.type === 'malignant' || result.type === 'precancerous') {
//         resultBadge.style.backgroundColor = 'var(--danger-color)';
//         resultBadge.textContent = result.type === 'malignant' ? 'MALIGNANT' : 'PRECANCEROUS';
//     } else {
//         resultBadge.style.backgroundColor = 'var(--success-color)';
//         resultBadge.textContent = 'BENIGN';
//     }
// }

// // New Analysis Button
// newAnalysisButton.addEventListener('click', () => {
//     resetToUpload();
// });

// // Reset to Upload State
// function resetToUpload() {
//     selectedFile = null;
//     fileInput.value = '';
//     imagePreview.src = '';
//     previewSection.style.display = 'none';
//     uploadArea.style.display = 'block';
//     analyzeButton.disabled = true;
//     resultsSection.style.display = 'none';
//     loadingSection.style.display = 'none';
//     document.querySelector('.upload-section').style.display = 'block';
// }

// // Webcam Capture (Optional - Basic Implementation)
// webcamButton.addEventListener('click', async () => {
//     try {
//         const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        
//         // Create video element
//         const video = document.createElement('video');
//         video.srcObject = stream;
//         video.play();
        
//         // Create canvas for capture
//         const canvas = document.createElement('canvas');
//         const context = canvas.getContext('2d');
        
//         // Create modal for webcam
//         const modal = document.createElement('div');
//         modal.style.cssText = `
//             position: fixed;
//             top: 0;
//             left: 0;
//             width: 100%;
//             height: 100%;
//             background: rgba(0,0,0,0.8);
//             display: flex;
//             flex-direction: column;
//             justify-content: center;
//             align-items: center;
//             z-index: 2000;
//         `;
        
//         video.style.cssText = `
//             max-width: 90%;
//             max-height: 70vh;
//             border-radius: 8px;
//         `;
        
//         const captureBtn = document.createElement('button');
//         captureBtn.textContent = 'Capture Photo';
//         captureBtn.className = 'cta-button';
//         captureBtn.style.marginTop = '20px';
        
//         const closeBtn = document.createElement('button');
//         closeBtn.textContent = 'Close';
//         closeBtn.className = 'secondary-button';
//         closeBtn.style.marginTop = '10px';
        
//         modal.appendChild(video);
//         modal.appendChild(captureBtn);
//         modal.appendChild(closeBtn);
//         document.body.appendChild(modal);
        
//         captureBtn.addEventListener('click', () => {
//             canvas.width = video.videoWidth;
//             canvas.height = video.videoHeight;
//             context.drawImage(video, 0, 0);
            
//             canvas.toBlob((blob) => {
//                 const file = new File([blob], 'webcam-capture.jpg', { type: 'image/jpeg' });
//                 handleFile(file);
//                 stream.getTracks().forEach(track => track.stop());
//                 document.body.removeChild(modal);
//             }, 'image/jpeg');
//         });
        
//         closeBtn.addEventListener('click', () => {
//             stream.getTracks().forEach(track => track.stop());
//             document.body.removeChild(modal);
//         });
        
//     } catch (error) {
//         console.error('Error accessing webcam:', error);
//         alert('Unable to access webcam. Please check permissions or use file upload instead.');
//     }
// });

// // Backend Integration Guide (Comments for you)
// /*
// BACKEND INTEGRATION INSTRUCTIONS:

// 1. Replace the analyzeImage function's fetch URL with your Python backend endpoint
// 2. Your Flask/FastAPI backend should have an endpoint like:
   
//    Flask Example:
//    @app.route('/api/predict', methods=['POST'])
//    def predict():
//        file = request.files['image']
//        # Process image with your model
//        result = your_model.predict(file)
//        return jsonify({
//            'class': result.class_name,
//            'confidence': result.confidence,
//            'type': result.type  # 'benign', 'malignant', or 'precancerous'
//        })

// 3. Make sure to handle CORS if frontend and backend are on different ports:
//    - For Flask: use flask-cors
//    - For FastAPI: use CORSMiddleware

// 4. Expected response format from backend:
//    {
//        "class": "Melanoma",
//        "confidence": 87.5,
//        "type": "malignant"
//    }

// 5. Remove the mock simulation code (lines with setTimeout and mockResults)
// */





// ----------------------------------------------------------------






// ===================== DOM ELEMENTS =====================
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const previewSection = document.getElementById('previewSection');
const imagePreview = document.getElementById('imagePreview');
const removeButton = document.getElementById('removeButton');
const analyzeButton = document.getElementById('analyzeButton');
const resultsSection = document.getElementById('resultsSection');
const loadingSection = document.getElementById('loadingSection');
const newAnalysisButton = document.getElementById('newAnalysisButton');
const webcamButton = document.getElementById('webcamButton');

// Results Elements
const resultBadge = document.getElementById('resultBadge');
const classification = document.getElementById('classification');
const confidence = document.getElementById('confidence');
const confidenceFill = document.getElementById('confidenceFill');

let selectedFile = null;

// ===================== FILE INPUT =====================
fileInput.addEventListener('change', handleFileSelect);

uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = 'var(--primary-color)';
    uploadArea.style.backgroundColor = 'rgba(37, 99, 235, 0.05)';
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.style.borderColor = 'var(--border-color)';
    uploadArea.style.backgroundColor = '';
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = 'var(--border-color)';
    uploadArea.style.backgroundColor = '';
    if (e.dataTransfer.files.length > 0) {
        handleFile(e.dataTransfer.files[0]);
    }
});

uploadArea.addEventListener('click', () => fileInput.click());

function handleFileSelect(e) {
    if (e.target.files[0]) handleFile(e.target.files[0]);
}

function handleFile(file) {
    if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
    }

    if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB');
        return;
    }

    selectedFile = file;

    const reader = new FileReader();
    reader.onload = (e) => {
        imagePreview.src = e.target.result;
        uploadArea.style.display = 'none';
        previewSection.style.display = 'block';
        analyzeButton.disabled = false;
    };
    reader.readAsDataURL(file);
}

// ===================== REMOVE IMAGE =====================
removeButton.addEventListener('click', resetToUpload);

// ===================== ANALYZE BUTTON =====================
analyzeButton.addEventListener('click', async () => {
    if (!selectedFile) return;

    document.querySelector('.upload-section').style.display = 'none';
    loadingSection.style.display = 'block';
    resultsSection.style.display = 'none';

    await analyzeImage(selectedFile);
});

// ===================== 🔥 REAL BACKEND INTEGRATION 🔥 =====================
async function analyzeImage(file) {
    const formData = new FormData();
    formData.append('image', file);

    try {
        const response = await fetch('http://localhost:5000/api/predict', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.error || 'Prediction failed');
        }

        // Convert backend response to UI-compatible format
        const result = {
            class: data.prediction,
            confidence: data.confidence,
            type: data.prediction === "Cancer" ? "malignant" : "benign"
        };

        displayResults(result);

    } catch (error) {
        console.error('Error:', error);
        alert('Error analyzing image. Please check backend connection.');
        resetToUpload();
    }
}

// ===================== DISPLAY RESULTS =====================
function displayResults(result) {
    loadingSection.style.display = 'none';
    resultsSection.style.display = 'block';

    classification.textContent = result.class;
    confidence.textContent = `${result.confidence.toFixed(1)}%`;
    confidenceFill.style.width = `${result.confidence}%`;

    if (result.type === 'malignant') {
        resultBadge.style.backgroundColor = 'var(--danger-color)';
        resultBadge.textContent = 'MALIGNANT';
    } else {
        resultBadge.style.backgroundColor = 'var(--success-color)';
        resultBadge.textContent = 'BENIGN';
    }
}

// ===================== NEW ANALYSIS =====================
newAnalysisButton.addEventListener('click', resetToUpload);

function resetToUpload() {
    selectedFile = null;
    fileInput.value = '';
    imagePreview.src = '';
    previewSection.style.display = 'none';
    uploadArea.style.display = 'block';
    analyzeButton.disabled = true;
    resultsSection.style.display = 'none';
    loadingSection.style.display = 'none';
    document.querySelector('.upload-section').style.display = 'block';
}

// ===================== WEBCAM (UNCHANGED) =====================
webcamButton.addEventListener('click', async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        const video = document.createElement('video');
        video.srcObject = stream;
        video.play();

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.8);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 2000;
        `;

        const captureBtn = document.createElement('button');
        captureBtn.textContent = 'Capture Photo';
        captureBtn.className = 'cta-button';

        const closeBtn = document.createElement('button');
        closeBtn.textContent = 'Close';
        closeBtn.className = 'secondary-button';

        modal.append(video, captureBtn, closeBtn);
        document.body.appendChild(modal);

        captureBtn.onclick = () => {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.drawImage(video, 0, 0);
            canvas.toBlob(blob => {
                handleFile(new File([blob], 'webcam.jpg', { type: 'image/jpeg' }));
                stream.getTracks().forEach(t => t.stop());
                modal.remove();
            });
        };

        closeBtn.onclick = () => {
            stream.getTracks().forEach(t => t.stop());
            modal.remove();
        };

    } catch {
        alert('Webcam access denied');
    }
});
