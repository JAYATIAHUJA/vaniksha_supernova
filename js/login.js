document.addEventListener('DOMContentLoaded', () => {
    // Role Selection
    const roleSelect = document.getElementById('role');
    const loginForm = document.getElementById('loginForm');

    // Update form based on selected role
    roleSelect.addEventListener('change', () => {
        const selectedRole = roleSelect.value;
        // You can add role-specific form fields here if needed
    });

    // Form Submission
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const selectedRole = roleSelect.value;
        const username = document.getElementById('username').value;
        
        // Save role and username to localStorage
        localStorage.setItem('userType', selectedRole);
        localStorage.setItem('userName', username);
        
        // Redirect based on role
        switch(selectedRole) {
            case 'individual':
                window.location.href = 'individual-dashboard.html';
                break;
            case 'community-member':
                window.location.href = 'community-member-dashboard.html';
                break;
            case 'community-admin':
                window.location.href = 'community-admin-dashboard.html';
                break;
            case 'platform-admin':
                window.location.href = 'platform-admin-dashboard.html';
                break;
        }
    });

    // Password Toggle
    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.getElementById('password');

    togglePassword.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        togglePassword.textContent = type === 'password' ? '👁️' : '👁️‍🗨️';
    });

    // OTP Handling
    const sendOTPButton = document.querySelector('.send-otp');
    const otpInput = document.getElementById('otp');

    // Voice Login
    const voiceLoginToggle = document.getElementById('voiceLogin');
    let recognition;

    if ('webkitSpeechRecognition' in window) {
        recognition = new webkitSpeechRecognition();
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
    }

    voiceLoginToggle.addEventListener('change', () => {
        if (voiceLoginToggle.checked) {
            if (recognition) {
                recognition.start();
            } else {
                alert('Voice recognition is not supported in your browser.');
                voiceLoginToggle.checked = false;
            }
        } else {
            if (recognition) {
                recognition.stop();
            }
        }
    });
}); 