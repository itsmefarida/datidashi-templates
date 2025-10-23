// Dashboard page specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Refresh button functionality
    const refreshBtn = document.getElementById('refreshBtn');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', function() {
            this.innerHTML = '<span class="loading">Refreshing...</span>';
            this.disabled = true;

            // Simulate refresh
            setTimeout(() => {
                this.innerHTML = 'Refresh Data';
                this.disabled = false;
                showNotification('Data refreshed successfully!', 'success');
            }, 2000);
        });
    }

    // Settings button
    const settingsBtn = document.getElementById('settingsBtn');
    if (settingsBtn) {
        settingsBtn.addEventListener('click', function() {
            showNotification('Settings panel would open here', 'info');
        });
    }

    // Action buttons
    const actionBtns = document.querySelectorAll('.action-btn');
    actionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.querySelector('span:last-child').textContent;
            showNotification(`${action} action triggered`, 'info');
        });
    });

    // Time selector
    const timeSelector = document.querySelector('.time-selector');
    if (timeSelector) {
        timeSelector.addEventListener('change', function() {
            showNotification(`Switched to ${this.value}`, 'info');
        });
    }

    // Animate stat cards
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        }, index * 100);
    });

    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification-toast ${type}`;
        notification.innerHTML = `
            <span class="toast-icon">${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span>
            <span class="toast-message">${message}</span>
        `;

        // Add to page
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
            notification.style.opacity = '1';
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            notification.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Add notification toast styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .notification-toast {
            position: fixed;
            top: 20px;
            right: -300px;
            background: white;
            border-radius: 8px;
            padding: 1rem;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            display: flex;
            align-items: center;
            gap: 0.5rem;
            z-index: 1000;
            opacity: 0;
            transform: translateX(20px);
            transition: all 0.3s ease;
            border-left: 4px solid #667eea;
        }

        .notification-toast.success {
            border-left-color: #28a745;
        }

        .notification-toast.error {
            border-left-color: #dc3545;
        }

        .toast-icon {
            font-size: 1.2rem;
        }

        .toast-message {
            font-weight: 500;
            color: #333;
        }
    `;
    document.head.appendChild(style);

    // Mark notifications as read
    const markAllReadBtn = document.querySelector('.card-header .btn-link');
    if (markAllReadBtn) {
        markAllReadBtn.addEventListener('click', function() {
            const unreadNotifications = document.querySelectorAll('.notification-item.unread');
            unreadNotifications.forEach(item => {
                item.classList.remove('unread');
            });
            showNotification('All notifications marked as read', 'success');
        });
    }
});
