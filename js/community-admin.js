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

    // Initialize Monitoring Map
    const monitoringMap = document.getElementById('monitoring-map');
    if (monitoringMap) {
        const map = L.map('monitoring-map').setView([20.5937, 78.9629], 5); // Center on India

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        // Add NDVI layer
        const ndviLayer = L.layerGroup();
        // Simulated NDVI data
        const ndviData = [
            { lat: 20.5937, lng: 78.9629, score: 0.8 },
            { lat: 19.0760, lng: 72.8777, score: 0.6 },
            { lat: 28.7041, lng: 77.1025, score: 0.4 }
        ];

        ndviData.forEach(point => {
            const color = point.score > 0.7 ? '#4CAF50' : point.score > 0.5 ? '#FFA500' : '#FF4444';
            L.circle([point.lat, point.lng], {
                color: color,
                fillColor: color,
                fillOpacity: 0.3,
                radius: 5000
            }).addTo(ndviLayer);
        });

        // Add alerts layer
        const alertsLayer = L.layerGroup();
        // Simulated alert data
        const alertData = [
            { lat: 20.5937, lng: 78.9629, type: 'weak' },
            { lat: 19.0760, lng: 72.8777, type: 'medium' }
        ];

        alertData.forEach(point => {
            const color = point.type === 'weak' ? '#FF4444' : '#FFA500';
            L.circle([point.lat, point.lng], {
                color: color,
                fillColor: color,
                fillOpacity: 0.3,
                radius: 3000
            }).addTo(alertsLayer);
        });

        // Map Controls
        const monitoringControls = document.querySelectorAll('.monitoring-control');
        monitoringControls.forEach(control => {
            control.addEventListener('click', () => {
                const layer = control.dataset.layer;
                monitoringControls.forEach(c => c.classList.remove('active'));
                control.classList.add('active');

                if (layer === 'ndvi') {
                    alertsLayer.removeFrom(map);
                    ndviLayer.addTo(map);
                } else if (layer === 'alerts') {
                    ndviLayer.removeFrom(map);
                    alertsLayer.addTo(map);
                }
            });
        });
    }

    // Bulk Upload Form
    const bulkUploadForm = document.getElementById('bulkUploadForm');
    if (bulkUploadForm) {
        bulkUploadForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(bulkUploadForm);
            const submitButton = bulkUploadForm.querySelector('.submit-button');
            const originalText = submitButton.textContent;

            // Show loading state
            submitButton.textContent = 'Uploading...';
            submitButton.disabled = true;

            // Simulate form submission
            setTimeout(() => {
                alert('Plantation data uploaded successfully!');
                bulkUploadForm.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }

    // Proposal Form
    const proposalForm = document.getElementById('proposalForm');
    if (proposalForm) {
        proposalForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(proposalForm);
            const submitButton = proposalForm.querySelector('.submit-button');
            const originalText = submitButton.textContent;

            // Show loading state
            submitButton.textContent = 'Submitting...';
            submitButton.disabled = true;

            // Simulate form submission
            setTimeout(() => {
                alert('Proposal submitted successfully!');
                proposalForm.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }

    // Member Management
    const addMemberButton = document.querySelector('.add-member-button');
    const membersTable = document.querySelector('.members-table tbody');

    if (addMemberButton && membersTable) {
        addMemberButton.addEventListener('click', () => {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td><input type="text" placeholder="Name"></td>
                <td><select><option>Contributor</option><option>Admin</option></select></td>
                <td><input type="text" placeholder="Parcels"></td>
                <td>0</td>
                <td>
                    <button class="save-button">Save</button>
                    <button class="cancel-button">Cancel</button>
                </td>
            `;
            membersTable.appendChild(newRow);
        });

        // Handle member actions
        membersTable.addEventListener('click', (e) => {
            if (e.target.classList.contains('edit-button')) {
                const row = e.target.closest('tr');
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
                const cells = row.querySelectorAll('td:not(:last-child)');
                cells.forEach(cell => {
                    const value = cell.querySelector('input').value;
                    cell.textContent = value;
                });
                e.target.textContent = 'Edit';
                e.target.classList.remove('save-button');
                e.target.classList.add('edit-button');
            } else if (e.target.classList.contains('remove-button')) {
                if (confirm('Are you sure you want to remove this member?')) {
                    e.target.closest('tr').remove();
                }
            } else if (e.target.classList.contains('cancel-button')) {
                e.target.closest('tr').remove();
            }
        });
    }

    // Blockchain Export
    const exportButton = document.querySelector('.export-button');
    if (exportButton) {
        exportButton.addEventListener('click', () => {
            exportButton.textContent = 'Exporting...';
            setTimeout(() => {
                alert('Blockchain records exported successfully!');
                exportButton.textContent = 'Export Verified Logs';
            }, 1500);
        });
    }

    // Public Proof Download
    const proofButtons = document.querySelectorAll('.proof-button');
    proofButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.textContent = 'Downloading...';
            setTimeout(() => {
                alert('Public proof downloaded!');
                button.textContent = 'Download Public Proof';
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