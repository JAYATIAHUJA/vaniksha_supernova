document.addEventListener('DOMContentLoaded', () => {
        // Theme Toggle
        const themeToggle = document.getElementById('themeToggle');
        const body = document.body;
        const sunIcon = themeToggle.querySelector('.sun-icon');
        const moonIcon = themeToggle.querySelector('.moon-icon');
    
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            body.classList.add('dark-mode');
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'inline';
        } else {
            body.classList.add('light-mode');
            sunIcon.style.display = 'inline';
            moonIcon.style.display = 'none';
        }
    
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('light-mode');
            body.classList.toggle('dark-mode');
            
            // Update icon visibility
            if (body.classList.contains('dark-mode')) {
                sunIcon.style.display = 'none';
                moonIcon.style.display = 'inline';
                localStorage.setItem('theme', 'dark');
            } else {
                sunIcon.style.display = 'inline';
                moonIcon.style.display = 'none';
                localStorage.setItem('theme', 'light');
            }
        });

    // Sidebar Toggle
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');

    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
        mainContent.classList.toggle('sidebar-active');
    });

    // User Management
    const userFilter = document.querySelector('.filter-select');
    const usersTable = document.querySelector('.users-table tbody');

    if (userFilter && usersTable) {
        userFilter.addEventListener('change', () => {
            // Simulate filtering users
            const selectedRole = userFilter.value;
            // In a real application, this would fetch filtered data from the server
            if (selectedRole === 'all') {
                // Show all users
            } else {
                // Show filtered users
            }
        });

        // Handle user actions
        usersTable.addEventListener('click', (e) => {
            if (e.target.classList.contains('edit-button')) {
                const row = e.target.closest('tr');
                // Enable editing of user details
                const cells = row.querySelectorAll('td:not(:last-child)');
                cells.forEach(cell => {
                    const value = cell.textContent;
                    cell.innerHTML = `<input type="text" value="${value}">`;
                });
                e.target.textContent = 'Save';
                e.target.classList.remove('edit-button');
                e.target.classList.add('save-button');
            } else if (e.target.classList.contains('save-button')) {
                const row = e.target.closest('tr');
                // Save user details
                const cells = row.querySelectorAll('td:not(:last-child)');
                cells.forEach(cell => {
                    const value = cell.querySelector('input').value;
                    cell.textContent = value;
                });
                e.target.textContent = 'Edit';
                e.target.classList.remove('save-button');
                e.target.classList.add('edit-button');
            } else if (e.target.classList.contains('delete-button')) {
                if (confirm('Are you sure you want to delete this user?')) {
                    e.target.closest('tr').remove();
                }
            }
        });
    }

    // AI Oversight Maps
    const erosionMap = document.getElementById('erosion-map');
    if (erosionMap) {
        const map = L.map('erosion-map').setView([20.5937, 78.9629], 5); // Center on India

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        // Sample erosion data
        const erosionData = [
            { lat: 20.5937, lng: 78.9629, risk: 'high', ndvi: -0.25 },
            { lat: 19.0760, lng: 72.8777, risk: 'medium', ndvi: -0.15 }
        ];

        // Add erosion markers
        erosionData.forEach(point => {
            const color = point.risk === 'high' ? '#FF4444' : '#FFA500';
            L.circle([point.lat, point.lng], {
                color: color,
                fillColor: color,
                fillOpacity: 0.3,
                radius: 5000
            }).addTo(map)
            .bindPopup(`
                <h4>Erosion Risk: ${point.risk}</h4>
                <p>NDVI Change: ${point.ndvi}</p>
            `);
        });
    }

    // Content Management
    const uploadButton = document.querySelector('.upload-content-button');
    if (uploadButton) {
        uploadButton.addEventListener('click', () => {
            // Simulate file upload dialog
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.pdf,.doc,.docx,.mp4';
            input.click();

            input.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    // Simulate upload process
                    uploadButton.textContent = 'Uploading...';
                    uploadButton.disabled = true;

                    setTimeout(() => {
                        alert('Content uploaded successfully!');
                        uploadButton.textContent = 'Upload Content';
                        uploadButton.disabled = false;
                    }, 2000);
                }
            });
        });
    }

    // Blockchain Controls
    const approveButtons = document.querySelectorAll('.approve-button');
    const rejectButtons = document.querySelectorAll('.reject-button');

    approveButtons.forEach(button => {
        button.addEventListener('click', () => {
            const card = button.closest('.reward-card');
            button.textContent = 'Processing...';
            button.disabled = true;

            // Simulate blockchain transaction
            setTimeout(() => {
                alert('Reward approved and minted on blockchain!');
                card.remove();
            }, 2000);
        });
    });

    rejectButtons.forEach(button => {
        button.addEventListener('click', () => {
            const card = button.closest('.reward-card');
            if (confirm('Are you sure you want to reject this reward?')) {
                card.remove();
            }
        });
    });

    // System Analytics
    const ndviChart = document.getElementById('ndviChart');
    if (ndviChart) {
        new Chart(ndviChart, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Global NDVI Score',
                    data: [0.3, 0.32, 0.35, 0.4, 0.42, 0.45],
                    borderColor: '#4CAF50',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // Carbon Offset Map
    const carbonMap = document.getElementById('carbonMap');
    if (carbonMap) {
        const map = L.map('carbonMap').setView([20.5937, 78.9629], 5);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        // Sample carbon offset data
        const offsetData = [
            { lat: 20.5937, lng: 78.9629, offset: 50 },
            { lat: 19.0760, lng: 72.8777, offset: 30 },
            { lat: 28.7041, lng: 77.1025, offset: 40 }
        ];

        // Add carbon offset markers
        offsetData.forEach(point => {
            const radius = point.offset * 100; // Scale the radius based on offset
            L.circle([point.lat, point.lng], {
                color: '#4CAF50',
                fillColor: '#4CAF50',
                fillOpacity: 0.3,
                radius: radius
            }).addTo(map)
            .bindPopup(`
                <h4>Carbon Offset</h4>
                <p>${point.offset}T CO₂</p>
            `);
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

    // Export Data
    const exportButton = document.querySelector('.export-button');
    if (exportButton) {
        exportButton.addEventListener('click', () => {
            const timeRange = document.querySelector('.time-range').value;
            exportButton.textContent = 'Exporting...';
            exportButton.disabled = true;

            // Simulate export process
            setTimeout(() => {
                alert(`Analytics data for ${timeRange} exported successfully!`);
                exportButton.textContent = 'Export Data';
                exportButton.disabled = false;
            }, 2000);
        });
    }
}); 