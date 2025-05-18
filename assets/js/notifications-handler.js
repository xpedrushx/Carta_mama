// Manejador de las notificaciones
document.addEventListener('DOMContentLoaded', function() {
    const notificationBtn = document.querySelector('.notification-btn');
    const notificationPanel = document.querySelector('.notification-panel');
    const darkOverlay = document.querySelector('.dark-overlay');
    const closePanel = document.querySelector('.close-panel');
    const markReadBtns = document.querySelectorAll('.mark-read');
    const markAllReadBtn = document.querySelector('.mark-all-read');
    
    // Verificar que los elementos existan
    if (!notificationBtn) {
        console.warn('Elemento .notification-btn no encontrado');
        return;
    }
    
    if (!notificationPanel) {
        console.warn('Elemento .notification-panel no encontrado');
        return;
    }
    
    if (!darkOverlay) {
        console.warn('Elemento .dark-overlay no encontrado');
        return;
    }
    
    if (!closePanel) {
        console.warn('Elemento .close-panel no encontrado');
        return;
    }
    
    // Abrir panel de notificaciones
    notificationBtn.addEventListener('click', function() {
        console.log('Notificación botón clickeado');
        notificationPanel.classList.add('active');
        darkOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    // Cerrar panel de notificaciones
    function closeNotificationPanel() {
        notificationPanel.classList.remove('active');
        darkOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    closePanel.addEventListener('click', closeNotificationPanel);
    darkOverlay.addEventListener('click', closeNotificationPanel);
    
    // Marcar notificación como leída
    if (markReadBtns && markReadBtns.length > 0) {
        markReadBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const notificationItem = this.closest('.notification-item');
                if (notificationItem) {
                    notificationItem.classList.remove('unread');
                    
                    // Actualizar contador de notificaciones
                    updateNotificationCount();
                }
            });
        });
    }
    
    // Marcar todas como leídas
    if (markAllReadBtn) {
        markAllReadBtn.addEventListener('click', function() {
            const unreadItems = document.querySelectorAll('.notification-item.unread');
            unreadItems.forEach(item => {
                item.classList.remove('unread');
            });
            
            // Actualizar contador de notificaciones
            updateNotificationCount();
        });
    }
    
    // Actualizar contador de notificaciones
    function updateNotificationCount() {
        const unreadCount = document.querySelectorAll('.notification-item.unread').length;
        const notificationBadges = document.querySelectorAll('.notification-badge');
        
        notificationBadges.forEach(badge => {
            if (unreadCount === 0) {
                badge.style.display = 'none';
            } else {
                badge.style.display = 'flex';
                badge.textContent = unreadCount;
            }
        });
    }
    
    // Inicializar contador
    updateNotificationCount();
    
    // Cerrar con la tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && notificationPanel.classList.contains('active')) {
            closeNotificationPanel();
        }
    });
    
    // Exportar funciones para uso global
    window.notificationsHandler = {
        close: closeNotificationPanel,
        updateCount: updateNotificationCount
    };
});