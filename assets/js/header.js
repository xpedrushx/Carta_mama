document.addEventListener("DOMContentLoaded", function () {
    const headerHTML = `
        <header class="content-header">
            <div class="header-left">
                <h1>Panel Principal</h1>
                <p>Bienvenido, <span class="highlight">Usuario Demo</span></p>
            </div>
            <div class="header-right">
                <div class="date-time">
                    <i class="fas fa-calendar-alt"></i>
                    <span>11 Mayo, 2025</span>
                </div>
                <div class="search-bar">
                    <input type="text" placeholder="Buscar...">
                    <button><i class="fas fa-search"></i></button>
                </div>
                <div class="user-menu">
                    <button class="notification-btn">
                        <i class="fas fa-bell"></i>
                        <span class="notification-badge">3</span>
                    </button>
                    <div class="avatar-dropdown">
                        <img src="/assets/images/user-avatar-40.png" alt="User Avatar">
                        <i class="fas fa-chevron-down"></i>
                        <div class="dropdown-menu">
                            <a href="profile.html"><i class="fas fa-user"></i> Mi Perfil</a>
                            <a href="settings.html"><i class="fas fa-cog"></i> Configuración</a>
                            <a href="logout.html"><i class="fas fa-sign-out-alt"></i> Cerrar Sesión</a>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    `;

    const mainContent = document.querySelector(".main-content");
    if (mainContent) {
        mainContent.insertAdjacentHTML("afterbegin", headerHTML);
    }
});

// Código relacionado con el header
// Mover la inicialización del botón de tema a después de que el sidebar se haya generado
// El tema se maneja ahora aquí en lugar de en un DOMContentLoaded separado
// que competiría con el otro DOMContentLoaded del sidebar
window.addEventListener('load', function() {
    // Esperar a que todo esté cargado, incluyendo el sidebar
    setTimeout(function() {
        const themeToggle = document.querySelector('.theme-toggle');
        if (!themeToggle) {
            console.warn('Botón de tema no encontrado. Asegúrate de que el HTML incluye este elemento.');
            return;
        }

        // Función para manejar el cambio de tema claro/oscuro
        function updateThemeIcon(isLightTheme) {
            if (isLightTheme) {
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
                themeToggle.setAttribute('title', 'Cambiar a modo oscuro');
            } else {
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
                themeToggle.setAttribute('title', 'Cambiar a modo claro');
            }
        }

        const isCurrentlyLight = document.body.classList.contains('light-theme');
        updateThemeIcon(isCurrentlyLight);

        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('light-theme');
            const isNowLight = document.body.classList.contains('light-theme');
            localStorage.setItem('theme', isNowLight ? 'light' : 'dark');
            updateThemeIcon(isNowLight);
        });
    }, 100); // Pequeño retraso para asegurar que el sidebar esté completamente cargado
});