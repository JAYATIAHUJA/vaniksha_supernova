// Function to handle logout
function logout() {
    // Clear user data from localStorage
    localStorage.removeItem('userType');
    localStorage.removeItem('userName');
    
    // Redirect to index page
    window.location.href = 'index.html';
}

// Function to check if user is logged in
function checkAuth() {
    const userType = localStorage.getItem('userType');
    const userName = localStorage.getItem('userName');
    
    if (!userType || !userName) {
        window.location.href = 'login.html';
        return false;
    }
    
    return true;
}

// Function to get current user info
function getCurrentUser() {
    return {
        type: localStorage.getItem('userType'),
        name: localStorage.getItem('userName')
    };
} 