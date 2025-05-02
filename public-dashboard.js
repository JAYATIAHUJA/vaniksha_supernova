document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        body.classList.toggle('dark-mode');
    });

    // Impact Map
    const impactMap = document.getElementById('impactMap');
    if (impactMap) {
        const map = L.map('impactMap').setView([20.5937, 78.9629], 5); // Center on India

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        // Sample data for restored and erosion-prone areas
        const restoredAreas = [
            { lat: 20.5937, lng: 78.9629, size: 5000 },
            { lat: 19.0760, lng: 72.8777, size: 3000 },
            { lat: 28.7041, lng: 77.1025, size: 4000 }
        ];

        const erosionAreas = [
            { lat: 22.5726, lng: 88.3639, size: 2000 },
            { lat: 12.9716, lng: 77.5946, size: 1500 }
        ];

        // Add restored areas
        restoredAreas.forEach(area => {
            L.circle([area.lat, area.lng], {
                color: '#4CAF50',
                fillColor: '#4CAF50',
                fillOpacity: 0.3,
                radius: area.size
            }).addTo(map)
            .bindPopup(`
                <h4>Restored Area</h4>
                <p>Size: ${area.size/1000} km²</p>
                <p>Status: Fully Restored</p>
            `);
        });

        // Add erosion-prone areas
        erosionAreas.forEach(area => {
            L.circle([area.lat, area.lng], {
                color: '#FF4444',
                fillColor: '#FF4444',
                fillOpacity: 0.3,
                radius: area.size
            }).addTo(map)
            .bindPopup(`
                <h4>Erosion Prone Area</h4>
                <p>Size: ${area.size/1000} km²</p>
                <p>Status: High Risk</p>
            `);
        });
    }

    // NDVI Progress Chart
    const ndviChart = document.getElementById('ndviChart');
    if (ndviChart) {
        new Chart(ndviChart, {
            type: 'line',
            data: {
                labels: ['Jan 2023', 'Apr 2023', 'Jul 2023', 'Oct 2023', 'Jan 2024'],
                datasets: [{
                    label: 'Average NDVI Score',
                    data: [0.3, 0.35, 0.4, 0.45, 0.5],
                    borderColor: '#4CAF50',
                    tension: 0.4,
                    fill: true,
                    backgroundColor: 'rgba(76, 175, 80, 0.1)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `NDVI: ${context.parsed.y.toFixed(2)}`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'NDVI Score'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Time Period'
                        }
                    }
                }
            }
        });
    }

    // Time Range Filter
    const timeRange = document.querySelector('.time-range');
    if (timeRange) {
        timeRange.addEventListener('change', () => {
            // Simulate data update based on time range
            const selectedRange = timeRange.value;
            // In a real application, this would fetch new data from the server
            console.log(`Time range changed to: ${selectedRange}`);
        });
    }

    // Certificate Generation
    const generateCertificate = document.querySelector('.generate-certificate');
    if (generateCertificate) {
        generateCertificate.addEventListener('click', () => {
            generateCertificate.textContent = 'Generating...';
            generateCertificate.disabled = true;

            // Simulate certificate generation
            setTimeout(() => {
                alert('Impact Certificate generated successfully!');
                generateCertificate.textContent = 'Generate Impact Certificate';
                generateCertificate.disabled = false;
            }, 2000);
        });
    }

    // Audit Log Download
    const downloadAudit = document.querySelector('.download-audit');
    if (downloadAudit) {
        downloadAudit.addEventListener('click', () => {
            downloadAudit.textContent = 'Preparing...';
            downloadAudit.disabled = true;

            // Simulate audit log preparation
            setTimeout(() => {
                alert('Audit log downloaded successfully!');
                downloadAudit.textContent = 'Download Audit Log';
                downloadAudit.disabled = false;
            }, 2000);
        });
    }

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

    // Sample Communities Data
    const communities = [
        {
            name: 'Green Warriors',
            rank: 1,
            trees: 250000,
            success: 95,
            co2: 500,
            location: 'Maharashtra, India'
        },
        {
            name: 'Eco Guardians',
            rank: 2,
            trees: 200000,
            success: 92,
            co2: 400,
            location: 'Karnataka, India'
        },
        {
            name: 'Nature Protectors',
            rank: 3,
            trees: 180000,
            success: 90,
            co2: 360,
            location: 'Tamil Nadu, India'
        }
    ];

    // Populate Communities Grid
    const communitiesGrid = document.querySelector('.communities-grid');
    if (communitiesGrid) {
        communities.forEach(community => {
            const card = document.createElement('div');
            card.className = 'community-card';
            card.innerHTML = `
                <div class="community-header">
                    <h3>${community.name}</h3>
                    <span class="rank">#${community.rank}</span>
                </div>
                <div class="community-stats">
                    <p>Trees Planted: ${community.trees.toLocaleString()}</p>
                    <p>Success Rate: ${community.success}%</p>
                    <p>CO₂ Offset: ${community.co2}T</p>
                </div>
                <div class="community-location">
                    <span class="icon">📍</span>
                    <span>${community.location}</span>
                </div>
            `;
            communitiesGrid.appendChild(card);
        });
    }
}); 