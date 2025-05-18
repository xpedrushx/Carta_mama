// === GENERAL JAVASCRIPT FOR ALL PAGES ===

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar funcionalidad de la barra lateral
    initSidebar();
    
    // Inicializar menú de usuario
    initUserMenu();
    
    // Actualizar fecha actual
    updateCurrentDate();
    
    // Inicializar funcionalidad de búsqueda
    initSearch();
    
    // Inicializar notificaciones
    initNotifications();
    
    // Modo oscuro/claro (aunque por defecto es oscuro)
    initThemeToggle();
});

// Inicializar la barra lateral y su estado (expandida/colapsada)
function initSidebar() {
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    // Comprobar si hay un estado guardado en localStorage
    const isSidebarOpen = localStorage.getItem('sidebarOpen') !== 'false';
    
    if (!isSidebarOpen && window.innerWidth > 768) {
        document.body.classList.add('sidebar-collapsed');
    }
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                // En móvil, abrir/cerrar sidebar completo
                sidebar.classList.toggle('open');
            } else {
                // En escritorio, colapsar/expandir
                document.body.classList.toggle('sidebar-collapsed');
                localStorage.setItem('sidebarOpen', !document.body.classList.contains('sidebar-collapsed'));
            }
        });
    }
    
    // Cerrar sidebar en móvil al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 && 
            sidebar.classList.contains('open') && 
            !sidebar.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            sidebar.classList.remove('open');
        }
    });
    
    // Ajustar sidebar en cambio de tamaño de ventana
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            sidebar.classList.remove('open');
        }
    });
}

// Inicializar menú de usuario en el header
function initUserMenu() {
    const userMenu = document.querySelector('.user-menu');
    
    if (userMenu) {
        // Crear el dropdown del menú de usuario
        const dropdown = document.createElement('div');
        dropdown.className = 'user-dropdown';
        dropdown.innerHTML = `
            <ul>
                <li><a href="perfil.html"><i class="fas fa-user"></i> Mi Perfil</a></li>
                <li><a href="configuracion.html"><i class="fas fa-cog"></i> Configuración</a></li>
                <li><a href="soporte.html"><i class="fas fa-question-circle"></i> Soporte</a></li>
                <li class="divider"></li>
                <li><a href="logout.html" class="text-danger"><i class="fas fa-sign-out-alt"></i> Cerrar Sesión</a></li>
            </ul>
        `;
        
        document.body.appendChild(dropdown);
        
        // Mostrar/ocultar al hacer clic en el menú de usuario
        userMenu.addEventListener('click', function() {
            dropdown.classList.toggle('visible');
        });
    }
}

// Actualizar fecha actual
function updateCurrentDate() {
    const dateElement = document.querySelector('.date-time span');
    if (dateElement) {
        const currentDate = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        dateElement.textContent = currentDate.toLocaleDateString('es-ES', options);
    }
}

// Inicializar funcionalidad de búsqueda
function initSearch() {
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button');

    if (searchInput && searchButton) {
        searchButton.addEventListener('click', function() {
            const query = searchInput.value.trim();
            if (query) {
                alert(`Buscando: ${query}`);
                // Aquí podrías redirigir a una página de resultados de búsqueda
                // window.location.href = `/search.html?q=${encodeURIComponent(query)}`;
            }
        });
    }
}

// Inicializar notificaciones
function initNotifications() {
    const notificationButton = document.querySelector('.notification-btn');
    const notificationPanel = document.querySelector('.notification-panel');
    const closePanelButton = document.querySelector('.close-panel');

    if (notificationButton && notificationPanel) {
        notificationButton.addEventListener('click', function() {
            notificationPanel.classList.toggle('visible');
        });
    }

    if (closePanelButton) {
        closePanelButton.addEventListener('click', function() {
            notificationPanel.classList.remove('visible');
        });
    }
}

// Inicializar el toggle de tema oscuro/claro
function initThemeToggle() {
    const themeToggleButton = document.querySelector('.theme-toggle');
    const body = document.body;

    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', function() {
            body.classList.toggle('light-theme');
            const isLightTheme = body.classList.contains('light-theme');
            localStorage.setItem('theme', isLightTheme ? 'light' : 'dark');
        });

        // Aplicar el tema guardado en localStorage
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            body.classList.add('light-theme');
        }
    }
}