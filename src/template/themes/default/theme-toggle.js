// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
        body.classList.add('dark-theme');
        updateToggleButton(true);
    }

    // Theme toggle event listener
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const isDark = body.classList.toggle('dark-theme');
            updateToggleButton(isDark);

            // Save theme preference
            localStorage.setItem('theme', isDark ? 'dark' : 'light');

            // Dispatch custom event for other scripts to listen to
            window.dispatchEvent(new CustomEvent('themeChanged', {
                detail: { theme: isDark ? 'dark' : 'light' }
            }));
        });
    }

    function updateToggleButton(isDark) {
        if (isDark) {
            themeToggle.innerHTML = '☀️ Light Mode';
        } else {
            themeToggle.innerHTML = '🌙 Dark Mode';
        }
    }
});
