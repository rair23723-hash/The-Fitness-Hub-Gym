// Authentication Middleware
const IS_LOGIN_PAGE = window.location.pathname.includes('login.html');
const IS_LOGGED_IN = sessionStorage.getItem('admin_auth') === 'true';

// Protect Routes
if (!IS_LOGGED_IN && !IS_LOGIN_PAGE) {
    window.location.href = 'login.html';
} else if (IS_LOGGED_IN && IS_LOGIN_PAGE) {
    window.location.href = 'dashboard.html';
}

function logout() {
    sessionStorage.removeItem('admin_auth');
    window.location.href = 'login.html';
}
