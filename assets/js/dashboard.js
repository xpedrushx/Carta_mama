// Manejador de las notificaciones
document.addEventListener('DOMContentLoaded', function() {
    const notificationBtn = document.querySelector('.notification-btn');
    const notificationPanel = document.querySelector('.notification-panel');
    const darkOverlay = document.querySelector('.dark-overlay');
    const closePanel = document.querySelector('.close-panel');
    const markReadBtns = document.querySelectorAll('.mark-read');
    const markAllReadBtn = document.querySelector('.mark-all-read');
    
    // Abrir panel de notificaciones
    notificationBtn.addEventListener('click', function() {
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
    markReadBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const notificationItem = this.closest('.notification-item');
            notificationItem.classList.remove('unread');
            
            // Actualizar contador de notificaciones
            updateNotificationCount();
        });
    });
    
    // Marcar todas como leídas
    markAllReadBtn.addEventListener('click', function() {
        const unreadItems = document.querySelectorAll('.notification-item.unread');
        unreadItems.forEach(item => {
            item.classList.remove('unread');
        });
        
        // Actualizar contador de notificaciones
        updateNotificationCount();
    });
    
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
});
// Funcionalidad para cambio de tema claro/oscuro
// Código simplificado para el cambio de tema claro/oscuro
document.addEventListener('DOMContentLoaded', function() {
    // Obtener el botón de cambio de tema
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (!themeToggle) {
        console.error('Botón de tema no encontrado');
        return;
    }
    
    // Función para actualizar el icono del botón
    function updateThemeIcon(isLightTheme) {
        if (isLightTheme) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            themeToggle.setAttribute('title', 'Cambiar a modo oscuro');
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            themeToggle.setAttribute('title', 'Cambiar a modo claro');
        }
    }
    
    // Verificar el tema actual al cargar la página
    const isCurrentlyLight = document.body.classList.contains('light-theme');
    updateThemeIcon(isCurrentlyLight);
    
    // Agregar el evento click para cambiar el tema
    themeToggle.addEventListener('click', function() {
        // Cambiar la clase del body
        document.body.classList.toggle('light-theme');
        
        // Determinar si ahora está en modo claro
        const isNowLight = document.body.classList.contains('light-theme');
        
        // Actualizar el localStorage
        localStorage.setItem('theme', isNowLight ? 'light' : 'dark');
        
        // Actualizar el icono
        updateThemeIcon(isNowLight);
        
        console.log('Tema cambiado:', isNowLight ? 'claro' : 'oscuro');
    });
    
    // Función para actualizar los temas de los gráficos (si existen)
    function updateChartThemes() {
        // Verificar si Chart.js está disponible
        if (typeof Chart !== 'undefined') {
            // Actualizar los gráficos existentes
            Chart.instances.forEach(chart => {
                // Actualizar colores de las etiquetas
                if (chart.options.plugins && chart.options.plugins.legend) {
                    chart.options.plugins.legend.labels.color = document.body.classList.contains('light-theme') ? '#333' : '#fff';
                }
                
                // Actualizar colores de las escalas (ejes)
                if (chart.options.scales) {
                    if (chart.options.scales.x) {
                        chart.options.scales.x.ticks.color = document.body.classList.contains('light-theme') ? '#333' : '#fff';
                        chart.options.scales.x.grid.color = document.body.classList.contains('light-theme') ? 
                            'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)';
                    }
                    
                    if (chart.options.scales.y) {
                        chart.options.scales.y.ticks.color = document.body.classList.contains('light-theme') ? '#333' : '#fff';
                        chart.options.scales.y.grid.color = document.body.classList.contains('light-theme') ? 
                            'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)';
                    }
                }
                
                // Actualizar el gráfico
                chart.update();
            });
        }
    }
});
// Código específico para el botón de sidebar con la clase "sidebar-toggle"
// Eliminé las funciones relacionadas con la barra lateral y el header, ya que ahora están en `sidebar.js` y `header.js`.
// Función para manejar la actualización de badges de notificación
function updateNotificationBadges() {
    // Obtener el número de notificaciones no leídas (puedes reemplazar esto con tu lógica real)
    const unreadCount = 3; // En este caso, mostrará siempre "3" como en tu imagen
    
    // Obtener todos los badges
    const badges = document.querySelectorAll('.notification-badge');
    
    badges.forEach(badge => {
        // Actualizar el número
        badge.textContent = unreadCount;
        
        // Mostrar/ocultar según si hay notificaciones
        if (unreadCount > 0) {
            badge.style.display = 'flex';
        } else {
            badge.style.display = 'none';
        }
    });
}

// Ejecutar al cargar la página
document.addEventListener('DOMContentLoaded', updateNotificationBadges);

// También puedes llamar a esta función cada vez que cambien las notificaciones
// Por ejemplo, después de marcar como leída o recibir una nueva

document.addEventListener('DOMContentLoaded', function() {
    // Verificar si estamos en móvil
    let isMobile = window.innerWidth <= 768;

    // Seleccionar el botón existente
    const existingButton = document.querySelector('#mobile-menu-button');

    if (isMobile) {
        if (existingButton) {
            // Asegurarse de que el botón sea visible y funcional
            existingButton.style.display = 'flex';
            existingButton.style.position = 'absolute';
            existingButton.style.top = '15px';
            existingButton.style.right = '15px';
            existingButton.style.zIndex = '2000';
            existingButton.style.background = 'rgba(107, 51, 197, 0.9)';
            existingButton.style.width = '45px';
            existingButton.style.height = '45px';
            existingButton.style.borderRadius = '8px';
            existingButton.style.fontSize = '22px';
            existingButton.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';

            existingButton.addEventListener('click', function() {
                const sidebar = document.querySelector('.sidebar');
                if (sidebar) {
                    document.body.classList.toggle('sidebar-collapsed');

                    // Manejar el overlay
                    let overlay = document.querySelector('.dark-overlay');
                    if (!overlay) {
                        overlay = document.createElement('div');
                        overlay.className = 'dark-overlay';
                        document.body.appendChild(overlay);

                        overlay.addEventListener('click', function() {
                            document.body.classList.remove('sidebar-collapsed');
                            this.classList.remove('active');
                        });
                    }

                    if (document.body.classList.contains('sidebar-collapsed')) {
                        overlay.classList.add('active');
                    } else {
                        overlay.classList.remove('active');
                    }
                }
            });
        } else {
            console.error('El botón #mobile-menu-button no existe en el DOM.');
        }
    }

    // Manejar cambios de tamaño de ventana
    window.addEventListener('resize', function() {
        const isMobileNow = window.innerWidth <= 768;

        if (isMobileNow !== isMobile) {
            isMobile = isMobileNow;

            // Actualizar visibilidad del botón
            if (isMobile && existingButton) {
                existingButton.style.display = 'flex';
            } else if (!isMobile && existingButton) {
                existingButton.style.display = 'none';
            }

            // Asegurarse de que el overlay esté desactivado
            const overlay = document.querySelector('.dark-overlay');
            if (overlay) {
                overlay.classList.remove('active');
            }
        }
    });
});
// Función para abrir el sidebar
function openSidebar() {
    console.log('Abriendo sidebar');
    
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.dark-overlay');
    
    if (!sidebar || !overlay) return;
    
    // 1. Aplicar estilos directamente para garantizar que funcione
    sidebar.style.transform = 'translateX(0)';
    sidebar.style.left = '0';
    
    // 2. También añadir clases para mantener compatibilidad
    document.body.classList.add('sidebar-open');
    
    
    // 4. Prevenir scroll del body
    document.body.style.overflow = 'hidden';
}

// Función para cerrar el sidebar
function closeSidebar() {
    console.log('Cerrando sidebar');
    
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.dark-overlay');
    
    if (!sidebar || !overlay) return;
    
    // 1. Aplicar estilos directamente
    sidebar.style.transform = 'translateX(-100%)';
    sidebar.style.left = '';
    
    // 2. Quitar clases
    document.body.classList.remove('sidebar-open');
    
    // 3. Ocultar overlay
    overlay.style.opacity = '0';
    overlay.style.visibility = 'hidden';
    
    // 4. Restaurar scroll
    document.body.style.overflow = '';
}

// Ajustar la interfaz según si estamos en móvil o no
function adjustForMobileView() {
    const isMobile = window.innerWidth <= 768;
    const menuBtn = document.getElementById('mobile-menu-button');
    
    if (!menuBtn) return;
    
    // Mostrar/ocultar botón según el tamaño de pantalla
    if (isMobile) {
        menuBtn.style.display = 'flex';
        
        // En móvil, asegurarse de que el sidebar esté cerrado inicialmente
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
            sidebar.style.transform = 'translateX(-100%)';
        }
        
        // Asegurarse de que el contenido principal no tenga margen
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.style.marginLeft = '0';
        }
    } else {
        menuBtn.style.display = 'none';
        
        // En desktop, restablecer el estado normal
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
            sidebar.style.transform = '';
            sidebar.style.left = '';
        }
        
        // Restaurar margen del contenido principal según el estado del sidebar
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.style.marginLeft = document.body.classList.contains('sidebar-collapsed') ? 
                'var(--sidebar-collapsed-width, 80px)' : 
                'var(--sidebar-width, 260px)';
        }
    }
}
