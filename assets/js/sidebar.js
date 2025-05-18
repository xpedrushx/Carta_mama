// Genera dinámicamente la barra lateral
function generateSidebar() {
    const sidebarHTML = `
        <aside class="sidebar">
            <div class="sidebar-header">
                <div class="logo">
                    <div class="logo-icon">
                        <div class="planet"></div>
                        <div class="satellite"></div>
                        <div class="panel-left"></div>
                        <div class="panel-right"></div>
                        <div class="star"></div>
                    </div>
                    <div class="logo-text">STELLAR AI</div>
                </div>
                <button class="sidebar-toggle">
                    <i class="fas fa-bars"></i>
                </button>
            </div>
            <div class="user-profile">
                <div class="user-avatar">
                    <img src="https://via.placeholder.com/80" alt="User Avatar">
                    <div class="user-status online"></div>
                </div>
                <div class="user-info">
                    <h3>Usuario Demo</h3>
                    <p>Plan Growth</p>
                </div>
            </div>
            <nav class="sidebar-menu">
                <ul>
                    <li class="active">
                        <a href="dashboard.html">
                            <i class="fas fa-th-large"></i>
                            <span>Panel Principal</span>
                        </a>
                    </li>
                    <li>
                        <a href="investments.html">
                            <i class="fas fa-chart-line"></i>
                            <span>Inversiones</span>
                        </a>
                    </li>
                    <li>
                        <a href="referrals.html">
                            <i class="fas fa-users"></i>
                            <span>Referidos</span>
                        </a>
                    </li>
                    <li>
                        <a href="withdrawals.html">
                            <i class="fas fa-money-bill-wave"></i>
                            <span>Retiros</span>
                        </a>
                    </li>
                    <li>
                        <a href="analytics.html">
                            <i class="fas fa-chart-pie"></i>
                            <span>Análisis</span>
                        </a>
                    </li>
                    <li>
                        <a href="notifications.html">
                            <i class="fas fa-bell"></i>
                            <span>Notificaciones</span>
                            <span class="notification-badge">3</span>
                        </a>
                    </li>
                    <li>
                        <a href="settings.html">
                            <i class="fas fa-cog"></i>
                            <span>Configuración</span>
                        </a>
                    </li>
                </ul>
            </nav>
            <div class="sidebar-footer">
                <button class="theme-toggle">
                    <i class="fas fa-moon"></i>
                </button>
                <a href="support.html" class="support-link">
                    <i class="fas fa-question-circle"></i>
                </a>
                <a href="logout.html" class="logout-link">
                    <i class="fas fa-sign-out-alt"></i>
                </a>
            </div>
        </aside>
    `;

    const container = document.querySelector('.dashboard-container');
    if (container) {
        container.insertAdjacentHTML('afterbegin', sidebarHTML);
        
        // Inicializar la funcionalidad del sidebar inmediatamente después de generarlo
        initSidebar();
    } else {
        console.warn('Contenedor .dashboard-container no encontrado');
    }
}

// Función para inicializar la funcionalidad del sidebar
function initSidebar() {
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    if (!sidebarToggle) {
        console.warn('Botón .sidebar-toggle no encontrado después de generar el sidebar');
        return;
    }

    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) {
        console.warn('Sidebar no encontrado después de generarlo');
        return;
    }

    sidebarToggle.addEventListener('click', function() {
        document.body.classList.toggle('sidebar-collapsed');

        if (window.innerWidth <= 768) {
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

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && document.body.classList.contains('sidebar-collapsed') && window.innerWidth <= 768) {
            document.body.classList.remove('sidebar-collapsed');
            const overlay = document.querySelector('.dark-overlay');
            if (overlay) overlay.classList.remove('active');
        }
    });

    const savedSidebarState = localStorage.getItem('sidebarState');
    if (savedSidebarState === 'collapsed') {
        document.body.classList.add('sidebar-collapsed');
    }
}

// Llama a la función para generar la barra lateral
document.addEventListener('DOMContentLoaded', generateSidebar);