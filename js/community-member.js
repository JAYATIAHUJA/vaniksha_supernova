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

    // Initialize Plots Map
    const plotsMap = document.getElementById('plots-map');
    if (plotsMap) {
        const map = L.map('plots-map').setView([20.5937, 78.9629], 5); // Center on India

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        // Sample plot data
        const plotsData = [
            {
                id: 'a-12',
                name: 'Plot A-12',
                lat: 20.5937,
                lng: 78.9629,
                status: 'active'
            },
            {
                id: 'b-7',
                name: 'Plot B-7',
                lat: 19.0760,
                lng: 72.8777,
                status: 'pending'
            }
        ];

        // Add plot markers to map
        plotsData.forEach(plot => {
            const marker = L.marker([plot.lat, plot.lng])
                .addTo(map)
                .bindPopup(`
                    <h3>${plot.name}</h3>
                    <p>Status: ${plot.status}</p>
                    <button onclick="viewPlotDetails('${plot.id}')">View Details</button>
                `);
        });
    }

    // Media Upload Preview
    const mediaUpload = document.getElementById('mediaUpload');
    const uploadPreview = document.querySelector('.upload-preview');

    if (mediaUpload && uploadPreview) {
        mediaUpload.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;

            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    uploadPreview.innerHTML = `
                        <img src="${e.target.result}" alt="Upload preview" style="max-width: 100%; height: auto;">
                    `;
                };
                reader.readAsDataURL(file);
            } else if (file.type.startsWith('video/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    uploadPreview.innerHTML = `
                        <video controls style="max-width: 100%; height: auto;">
                            <source src="${e.target.result}" type="${file.type}">
                            Your browser does not support the video tag.
                        </video>
                    `;
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Proof Form Submission
    const proofForm = document.getElementById('proofForm');
    if (proofForm) {
        proofForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(proofForm);
            const submitButton = proofForm.querySelector('.submit-button');
            const originalText = submitButton.textContent;

            // Show loading state
            submitButton.textContent = 'Uploading...';
            submitButton.disabled = true;

            // Simulate form submission
            setTimeout(() => {
                alert('Proof uploaded successfully! Waiting for verification.');
                proofForm.reset();
                uploadPreview.innerHTML = '';
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }

    // Reward Claims
    const claimButtons = document.querySelectorAll('.claim-button');
    claimButtons.forEach(button => {
        button.addEventListener('click', () => {
            const originalText = button.textContent;
            button.textContent = 'Claiming...';
            button.disabled = true;

            // Simulate claim process
            setTimeout(() => {
                alert('Tokens claimed successfully!');
                button.textContent = originalText;
                button.disabled = false;
            }, 1500);
        });
    });

    // Certificate Actions
    const downloadButton = document.querySelector('.download-button');
    const shareButton = document.querySelector('.share-button');

    if (downloadButton) {
        downloadButton.addEventListener('click', () => {
            const originalText = downloadButton.textContent;
            downloadButton.textContent = 'Downloading...';
            downloadButton.disabled = true;

            // Simulate download
            setTimeout(() => {
                alert('Certificate downloaded successfully!');
                downloadButton.textContent = originalText;
                downloadButton.disabled = false;
            }, 1500);
        });
    }

    if (shareButton) {
        shareButton.addEventListener('click', async () => {
            const originalText = shareButton.textContent;
            shareButton.textContent = 'Sharing...';
            shareButton.disabled = true;

            // Simulate share functionality
            if (navigator.share) {
                try {
                    await navigator.share({
                        title: 'My Vaniksha Certificate',
                        text: 'Check out my contribution to environmental conservation!',
                        url: window.location.href
                    });
                } catch (err) {
                    console.error('Share failed:', err);
                }
            } else {
                alert('Share feature not supported by your browser');
            }

            shareButton.textContent = originalText;
            shareButton.disabled = false;
        });
    }

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

    // Plot Details View
    window.viewPlotDetails = (plotId) => {
        const plot = plotsData.find(p => p.id === plotId);
        if (plot) {
            const plotCard = document.createElement('div');
            plotCard.className = 'plot-card';
            plotCard.innerHTML = `
                <h3>${plot.name}</h3>
                <div class="plot-details">
                    <p>Location: ${plot.lat}°N, ${plot.lng}°E</p>
                    <p>Status: ${plot.status}</p>
                </div>
                <div class="plot-actions">
                    <button class="upload-button" onclick="location.href='#upload-proof'">Upload Progress</button>
                </div>
            `;

            const plotsList = document.querySelector('.plots-list');
            plotsList.innerHTML = '';
            plotsList.appendChild(plotCard);
        }
    };
}); 