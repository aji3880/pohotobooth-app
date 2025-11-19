const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const captureBtn = document.getElementById('captureBtn');
const resetBtn = document.getElementById('resetBtn');
const photoGallery = document.getElementById('photoGallery');
const ctx = canvas.getContext('2d');

// Akses kamera
navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        video.srcObject = stream;
    })
    .catch(err => {
        console.error('Error accessing camera:', err);
        alert('Camera access denied or not available.');
    });

// Ambil foto
captureBtn.addEventListener('click', () => {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);
    const imgData = canvas.toDataURL('image/png');
    
    // Tambahkan ke galeri
    const img = document.createElement('img');
    img.src = imgData;
    photoGallery.appendChild(img);
});

// Reset galeri
resetBtn.addEventListener('click', () => {
    photoGallery.innerHTML = '';
});