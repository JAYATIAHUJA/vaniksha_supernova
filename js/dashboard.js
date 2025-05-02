document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        body.classList.toggle('dark-mode');
    });

    // Sidebar Toggle
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');

    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
        mainContent.classList.toggle('sidebar-active');
    });

    // Initialize Map
    const mapContainer = document.getElementById('map-container');
    if (mapContainer) {
        const map = L.map('map-container').setView([20.5937, 78.9629], 5); // Center on India

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        // Add NDVI-based erosion risk layer
        const erosionLayer = L.layerGroup();
        // Simulated erosion risk data
        const erosionData = [
            { lat: 20.5937, lng: 78.9629, risk: 'high' },
            { lat: 19.0760, lng: 72.8777, risk: 'medium' },
            { lat: 28.7041, lng: 77.1025, risk: 'low' }
        ];

        erosionData.forEach(point => {
            const color = point.risk === 'high' ? '#FF4444' : point.risk === 'medium' ? '#FFA500' : '#4CAF50';
            L.circle([point.lat, point.lng], {
                color: color,
                fillColor: color,
                fillOpacity: 0.3,
                radius: 5000
            }).addTo(erosionLayer);
        });

        // Add plantation zones layer
        const plantationLayer = L.layerGroup();
        // Simulated plantation zone data
        const plantationData = [
            { lat: 20.5937, lng: 78.9629, type: 'active' },
            { lat: 19.0760, lng: 72.8777, type: 'planned' },
            { lat: 28.7041, lng: 77.1025, type: 'active' }
        ];

        plantationData.forEach(point => {
            const color = point.type === 'active' ? '#4CAF50' : '#FFA500';
            L.circle([point.lat, point.lng], {
                color: color,
                fillColor: color,
                fillOpacity: 0.3,
                radius: 3000
            }).addTo(plantationLayer);
        });

        // Map Controls
        const mapControls = document.querySelectorAll('.map-control');
        mapControls.forEach(control => {
            control.addEventListener('click', () => {
                const layer = control.dataset.layer;
                mapControls.forEach(c => c.classList.remove('active'));
                control.classList.add('active');

                if (layer === 'erosion') {
                    plantationLayer.removeFrom(map);
                    erosionLayer.addTo(map);
                } else if (layer === 'plantations') {
                    erosionLayer.removeFrom(map);
                    plantationLayer.addTo(map);
                }
            });
        });
    }

    // Media Upload Preview
    const mediaInput = document.getElementById('media');
    const uploadPreview = document.querySelector('.upload-preview');

    mediaInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            uploadPreview.style.display = 'block';
            if (file.type.startsWith('image/')) {
                const img = document.createElement('img');
                img.src = URL.createObjectURL(file);
                uploadPreview.innerHTML = '';
                uploadPreview.appendChild(img);
            } else if (file.type.startsWith('video/')) {
                const video = document.createElement('video');
                video.src = URL.createObjectURL(file);
                video.controls = true;
                uploadPreview.innerHTML = '';
                uploadPreview.appendChild(video);
            }
        }
    });

    // Plantation Form Submission
    const plantationForm = document.getElementById('plantationForm');
    if (plantationForm) {
        plantationForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(plantationForm);
            const submitButton = plantationForm.querySelector('.submit-button');
            const originalText = submitButton.textContent;

            // Show loading state
            submitButton.textContent = 'Submitting...';
            submitButton.disabled = true;

            // Simulate form submission
            setTimeout(() => {
                alert('Plantation submitted successfully!');
                plantationForm.reset();
                uploadPreview.style.display = 'none';
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }

    // Reward Claim
    const claimButtons = document.querySelectorAll('.claim-button');
    claimButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.textContent = 'Claiming...';
            button.disabled = true;

            setTimeout(() => {
                alert('Rewards claimed successfully!');
                button.textContent = 'Claimed';
            }, 1500);
        });
    });

    // Certificate Actions
    const downloadButtons = document.querySelectorAll('.download-button');
    const shareButtons = document.querySelectorAll('.share-button');

    downloadButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.textContent = 'Downloading...';
            setTimeout(() => {
                alert('Certificate downloaded!');
                button.textContent = 'Download';
            }, 1500);
        });
    });

    shareButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.textContent = 'Sharing...';
            setTimeout(() => {
                alert('Certificate shared!');
                button.textContent = 'Share';
            }, 1500);
        });
    });

    // Course Start
    const startCourseButtons = document.querySelectorAll('.start-course');
    startCourseButtons.forEach(button => {
        button.addEventListener('click', () => {
            const courseTitle = button.closest('.course-card').querySelector('h4').textContent;
            button.textContent = 'Starting...';
            setTimeout(() => {
                alert(`Starting course: ${courseTitle}`);
                button.textContent = 'Continue';
            }, 1500);
        });
    });

    // Notification Badge
    const notificationButton = document.querySelector('.notification-button');
    const badge = notificationButton.querySelector('.badge');

    notificationButton.addEventListener('click', () => {
        badge.textContent = '0';
        badge.style.display = 'none';
    });

    // Smooth Scrolling for Navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}); 