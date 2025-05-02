// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', () => {
    // Try to find theme toggle by ID first, then by class
    const themeToggle = document.getElementById('themeToggle') || document.querySelector('.theme-toggle');
    if (!themeToggle) return; // Exit if no theme toggle found
    
    const body = document.body;
    const sunIcon = themeToggle.querySelector('.sun-icon');
    const moonIcon = themeToggle.querySelector('.moon-icon');

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        if (sunIcon) sunIcon.style.display = 'none';
        if (moonIcon) moonIcon.style.display = 'inline';
    } else {
        body.classList.add('light-mode');
        if (sunIcon) sunIcon.style.display = 'inline';
        if (moonIcon) moonIcon.style.display = 'none';
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        body.classList.toggle('dark-mode');
        
        // Update icon visibility
        if (body.classList.contains('dark-mode')) {
            if (sunIcon) sunIcon.style.display = 'none';
            if (moonIcon) moonIcon.style.display = 'inline';
            localStorage.setItem('theme', 'dark');
        } else {
            if (sunIcon) sunIcon.style.display = 'inline';
            if (moonIcon) moonIcon.style.display = 'none';
            localStorage.setItem('theme', 'light');
        }
    });
}); 