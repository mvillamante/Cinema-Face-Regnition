const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const captureButton = document.getElementById('capture');
const uploadButton = document.getElementById('upload');
const modal = document.getElementById('modalBox');
const openModalButton = document.getElementById('openModal');
const closeButton = document.querySelector('.close');
var currentUser = localStorage.getItem('currentUser');

async function initCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
    } catch (error) {
        console.error("Error accessing the webcam: ", error);
    }
}

// Open modal and initialize camera when button is clicked
openModalButton.addEventListener('click', () => {
    modal.style.display = 'flex';
    initCamera();
});

// Close modal
closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Close modal when clicking outside of it
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Capture photo from video
captureButton.addEventListener('click', () => {
    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.style.display = 'flex';
});

// Upload captured image to the server
uploadButton.addEventListener('click', async () => {
    canvas.toBlob(async (blob) => {
        const formData = new FormData();
        formData.append("username", `${currentUser}-image.jpg`);
        formData.append("image", blob, `${currentUser}-image`);
        

        try {
            const response = await fetch("http://localhost:3000/api/uploadImage", {
                method: "POST",
                body: formData
            });

            if (response.ok) {
                alert("Image uploaded successfully!");
            } else {
                const errorText = await response.text();
                alert(`Upload failed: ${errorText}`);
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            alert("An error occurred during the upload.");
        }
    }, "image/jpeg");
});


