document.addEventListener('DOMContentLoaded', () => {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get('type');

    // Show appropriate form based on type
    if (type === 'individual') {
        document.querySelector('[data-tab="individual"]').click();
    } else if (type === 'community') {
        document.querySelector('[data-tab="community"]').click();
    }

    // Tab Switching
    const tabButtons = document.querySelectorAll('.tab-button');
    const forms = document.querySelectorAll('.registration-form');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tab = button.getAttribute('data-tab');
            
            // Update active tab
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Show corresponding form
            forms.forEach(form => {
                if (form.id === `${tab}-form`) {
                    form.classList.add('active');
                } else {
                    form.classList.remove('active');
                }
            });
        });
    });

    // Password Toggle
    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.getElementById('password');

    togglePassword.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        togglePassword.textContent = type === 'password' ? '👁️' : '👁️‍🗨️';
    });

    // Member Input Management
    const addMemberButton = document.querySelector('.add-member');
    const memberInputs = document.querySelector('.member-inputs');

    addMemberButton.addEventListener('click', () => {
        const memberInput = document.createElement('div');
        memberInput.className = 'member-input';
        memberInput.innerHTML = `
            <input type="text" placeholder="Member Name">
            <input type="email" placeholder="Member Email">
            <button type="button" class="remove-member">Remove</button>
        `;
        memberInputs.appendChild(memberInput);
    });

    // Remove Member
    memberInputs.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-member')) {
            e.target.parentElement.remove();
        }
    });

    // Form Submission
    const registrationForms = document.querySelectorAll('form');
    registrationForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const userData = Object.fromEntries(formData.entries());
            
            // Determine user type and redirect
            if (form.id === 'individual-form') {
                localStorage.setItem('userType', 'individual');
                localStorage.setItem('userName', userData.fullName);
                window.location.href = 'individual-dashboard.html';
            } else if (form.id === 'community-form') {
                localStorage.setItem('userType', 'community-admin');
                localStorage.setItem('userName', userData.orgName);
                window.location.href = 'community-admin-dashboard.html';
            }
        });
    });

    // Tooltip Initialization
    const tooltips = document.querySelectorAll('.tooltip');
    
    tooltips.forEach(tooltip => {
        tooltip.addEventListener('mouseenter', () => {
            const tooltipText = tooltip.getAttribute('data-tooltip');
            const tooltipElement = document.createElement('div');
            tooltipElement.className = 'tooltip-text';
            tooltipElement.textContent = tooltipText;
            tooltip.appendChild(tooltipElement);
        });

        tooltip.addEventListener('mouseleave', () => {
            const tooltipElement = tooltip.querySelector('.tooltip-text');
            if (tooltipElement) {
                tooltipElement.remove();
            }
        });
    });

    // Voice UI Toggle
    const voiceUI = document.getElementById('voiceUI');
    
    voiceUI.addEventListener('change', () => {
        if (voiceUI.checked) {
            // Initialize voice recognition
            if ('webkitSpeechRecognition' in window) {
                const recognition = new webkitSpeechRecognition();
                recognition.continuous = true;
                recognition.interimResults = true;

                recognition.onresult = (event) => {
                    const transcript = Array.from(event.results)
                        .map(result => result[0].transcript)
                        .join('');

                    // Find focused input and update its value
                    const activeElement = document.activeElement;
                    if (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA') {
                        activeElement.value = transcript;
                    }
                };

                recognition.start();
            } else {
                alert('Voice recognition is not supported in your browser.');
                voiceUI.checked = false;
            }
        }
    });
}); 