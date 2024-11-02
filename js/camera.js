const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const captureButton = document.getElementById('capture');
const modal = document.getElementById('modalBox');
const openModalButton = document.getElementById('openModal');
const closeButton = document.querySelector('.close');

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
    // // Get the username from localStorage for filename
    // const username = localStorage.getItem('currentUser');
    // const filename = username ? `${username}-image.png` : '-image.png';

    // // Capture the image as a data URL
    // const picture = canvas.toDataURL('image/png');

    // // Create a link element to download the image
    // const downloadLink = document.createElement('a');
    // downloadLink.href = picture;
    // downloadLink.download = filename; // Set the filename
    // document.body.appendChild(downloadLink);
    // downloadLink.click(); // Programmatically click the link to trigger the download
    // document.body.removeChild(downloadLink); // Remove the link after downloading


    // const pictureData = canvas.toDataURL('image/png');
    // localStorage.setItem('capturedImage', pictureData);
});


