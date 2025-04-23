// Add your photo filenames and captions here
const photos = [
    { filename: 'IMG_6430.jpg', caption: 'Our secret meeting' },
    { filename: 'IMG_6431.jpg', caption: 'Our first date.' },
    { filename: 'IMG_6434.jpg', caption: 'its mine bday memory.' },
    { filename: 'IMG_6435.jpg', caption: 'Unforgettable moments.' },
    { filename: 'IMG_6436.jpg', caption: 'Laughter and joy.' },
    { filename: 'IMG_6437.jpg', caption: 'Ur bday memories.' },
    { filename: 'IMG_6439.jpg', caption: 'Adventures awaited!' },
    { filename: 'IMG_6440.jpg', caption: 'Happy memories forever.' }
];

// Add photos to gallery
const photoGallery = document.getElementById('photoGallery');
photos.forEach(photo => {
    const photoItem = document.createElement('div');
    photoItem.className = 'photo-item';
    
    const img = document.createElement('img');
    img.src = 'images/' + photo.filename;
    img.alt = 'Memory with Rhythm';
    img.loading = 'lazy'; // Add lazy loading for better performance
    
    // Add error handling for images that fail to load
    img.onerror = function() {
        console.error('Failed to load image:', photo.filename);
        this.style.display = 'none';
        photoItem.style.display = 'none';
    };
    
    // Caption
    const caption = document.createElement('div');
    caption.className = 'photo-caption';
    caption.style.background = 'linear-gradient(90deg, #ff99cc, #ff66b3)';
    caption.innerText = photo.caption;
    
    photoItem.appendChild(img);
    photoItem.appendChild(caption);
    photoGallery.appendChild(photoItem);
});

// --- Romantic floating hearts effect during photo transitions ---
function spawnRomanticHearts(target) {
    for (let i = 0; i < 6; i++) {
        const heart = document.createElement('div');
        heart.className = 'romantic-heart';
        heart.innerHTML = '💖';
        heart.style.left = (50 + Math.random() * 40 - 20) + '%';
        heart.style.bottom = (10 + Math.random() * 8) + '%';
        heart.style.fontSize = (1.8 + Math.random() * 0.7) + 'rem';
        heart.style.opacity = 0.82 + Math.random() * 0.18;
        (target || document.body).appendChild(heart);
        setTimeout(() => heart.remove(), 2600);
    }
}

// --- Carousel Logic to Show/Hide Photos and Captions with FULL SUSPENSE & romance ---
let currentPhotoIndex = 0;
const photoItems = document.querySelectorAll('.photo-item');

function showPhoto(index, suspense = false) {
    photoItems.forEach((item, i) => {
        if (i === index) {
            if (suspense) {
                spawnRomanticHearts(item);
                item.style.opacity = '0';
                item.style.filter = 'blur(18px) grayscale(1) brightness(0.5)';
                item.classList.add('visible');
                setTimeout(() => {
                    item.style.transition = 'opacity 0.65s, filter 1.2s cubic-bezier(.68,-0.55,.27,1.55)';
                    item.style.opacity = '1';
                    item.style.filter = 'blur(0) grayscale(0) brightness(1)';
                }, 80);
                setTimeout(() => {
                    item.style.transition = '';
                }, 1400);
            } else {
                item.classList.add('visible');
                item.style.opacity = '';
                item.style.filter = '';
            }
        } else {
            item.classList.remove('visible');
            item.style.opacity = '';
            item.style.filter = '';
        }
    });
}

function nextPhoto() {
    currentPhotoIndex = (currentPhotoIndex + 1) % photoItems.length;
    showPhoto(currentPhotoIndex, true);
}

function prevPhoto() {
    currentPhotoIndex = (currentPhotoIndex - 1 + photoItems.length) % photoItems.length;
    showPhoto(currentPhotoIndex, true);
}

// Show the first photo on load (no suspense)
showPhoto(currentPhotoIndex, false);
