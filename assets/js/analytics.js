document.addEventListener('DOMContentLoaded', function() {
            // Inicializar gráficos
            initCharts();
            
            // Inicializar mini gráficos de tendencia
            initMiniCharts();
            
            // Inicializar eventos
            initEvents();
        });
        
        function initEvents() {
            // Eventos para cambio de período en gráficos
            const periodSelectors = document.querySelectorAll('.select-period, .select-view');
            periodSelectors.forEach(selector => {
                selector.addEventListener('change', function() {
                    // En una implementación real, aquí se actualizarían los datos de los gráficos
                    // Para esta demo, simplemente mostramos una notificación
                    alert('En un entorno real, aquí se actualizarían los datos para el período: ' + this.value);
                });
            });
            
            // Evento para el botón de exportar datos
            const exportBtn = document.querySelector('.btn-text');
            if (exportBtn) {
                exportBtn.addEventListener('click', function() {
                    alert('En un entorno real, aquí se exportarían los datos a Excel/CSV');
                });
            }
        }
        
        function initCharts() {
            // Gráfico de Rendimiento Mensual
            const performanceCtx = document.getElementById('performanceChart').getContext('2d');
            const performanceChart = new Chart(performanceCtx, {
                type: 'line',
                data: {
                    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                    datasets: [{
                        label: 'ROI %',
                        data: [5.2, 6.1, 7.5, 8.2, 7.9, 9.3, 10.1, 11.2, 12.5, 13.8, 14.2, 15.8],
                        backgroundColor: 'rgba(107, 51, 197, 0.2)',
                        borderColor: '#6b33c5',
                        borderWidth: 2,
                        tension: 0.4,
                        pointBackgroundColor: '#6b33c5',
                        pointBorderColor: '#fff',
                        pointRadius: 4,
                        pointHoverRadius: 6,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            mode: 'index',
                            intersect: false,
                            backgroundColor: 'rgba(40, 16, 77, 0.9)',
                            titleColor: '#fff',
                            bodyColor: '#fff',
                            borderColor: 'rgba(255, 255, 255, 0.1)',
                            borderWidth: 1,
                            padding: 12,
                            displayColors: false,
                            callbacks: {
                                label: function(context) {
                                    return `ROI: ${context.parsed.y}%`;
                                }
                            }
                        }
                    },
                    scales: {
                        x: {
                            grid: {
                                display: false,
                                color: 'rgba(255, 255, 255, 0.1)'
                            },
                            ticks: {
                                color: 'rgba(255, 255, 255, 0.7)'
                            }
                        },
                        y: {
                            grid: {
                                color: 'rgba(255, 255, 255, 0.1)'
                            },
                            ticks: {
                                color: 'rgba(255, 255, 255, 0.7)',
                                callback: function(value) {
                                    return value + '%';
                                }
                            }
                        }
                    }
                }
            });
            
            // Gráfico de Distribución
            const distributionCtx = document.getElementById('distributionChart').getContext('2d');
            const distributionChart = new Chart(distributionCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Tecnología', 'Finanzas', 'Salud', 'Energía', 'Consumo', 'Otros'],
                    datasets: [{
                        data: [35, 20, 15, 12, 10, 8],
                        backgroundColor: [
                            '#6b33c5',
                            '#3b82f6',
                            '#4CAF50',
                            '#FFC107',
                            '#F44336',
                            '#9C27B0'
                        ],
                        borderColor: 'rgba(51, 21, 107, 0.8)',
                        borderWidth: 2,
                        hoverOffset: 15
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: '70%',
                    plugins: {
                        legend: {
                            position: 'right',
                            labels: {
                                color: 'rgba(255, 255, 255, 0.7)',
                                padding: 15,
                                font: {
                                    size: 12
                                },
                                generateLabels: function(chart) {
                                    const data = chart.data;
                                    if (data.labels.length && data.datasets.length) {
                                        return data.labels.map(function(label, i) {
                                            const dataset = data.datasets[0];
                                            const value = dataset.data[i];
                                            return {
                                                text: `${label}: ${value}%`,
                                                fillStyle: dataset.backgroundColor[i],
                                                strokeStyle: dataset.borderColor,
                                                lineWidth: dataset.borderWidth,
                                                hidden: false,
                                                index: i
                                            };
                                        });
                                    }
                                    return [];
                                }
                            }
                        },
                        tooltip: {
                            backgroundColor: 'rgba(40, 16, 77, 0.9)',
                            titleColor: '#fff',
                            bodyColor: '#fff',
                            callbacks: {
                                label: function(context) {
                                    const label = context.label || '';
                                    const value = context.parsed || 0;
                                    return `${label}: ${value}%`;
                                }
                            }
                        }
                    }
                }
            });
            
            // Gráfico de Riesgo vs Rendimiento
            const scatterCtx = document.getElementById('scatterChart').getContext('2d');
            const scatterChart = new Chart(scatterCtx, {
                type: 'scatter',
                data: {
                    datasets: [
                        {
                            label: 'Bajo Riesgo',
                            data: [
                                { x: 2.1, y: 4.2 },
                                { x: 2.5, y: 5.1 },
                                { x: 1.8, y: 3.9 },
                                { x: 2.3, y: 4.8 },
                                { x: 1.5, y: 3.5 }
                            ],
                            backgroundColor: 'rgba(76, 175, 80, 0.7)',
                            borderColor: '#4CAF50',
                            pointRadius: 8,
                            pointHoverRadius: 10
                        },
                        {
                            label: 'Riesgo Moderado',
                            data: [
                                { x: 5.1, y: 8.2 },
                                { x: 4.8, y: 7.9 },
                                { x: 5.5, y: 9.1 },
                                { x: 4.2, y: 7.2 },
                                { x: 5.3, y: 8.7 }
                            ],
                            backgroundColor: 'rgba(255, 193, 7, 0.7)',
                            borderColor: '#FFC107',
                            pointRadius: 8,
                            pointHoverRadius: 10
                        },
                        {
                            label: 'Alto Riesgo',
                            data: [
                                { x: 8.2, y: 12.5 },
                                { x: 7.9, y: 11.8 },
                                { x: 8.7, y: 13.2 },
                                { x: 7.5, y: 10.9 },
                                { x: 9.1, y: 14.5 }
                            ],
                            backgroundColor: 'rgba(244, 67, 54, 0.7)',
                            borderColor: '#F44336',
                            pointRadius: 8,
                            pointHoverRadius: 10
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            backgroundColor: 'rgba(40, 16, 77, 0.9)',
                            titleColor: '#fff',
                            bodyColor: '#fff',
                            callbacks: {
                                label: function(context) {
                                    return `Riesgo: ${context.parsed.x.toFixed(1)}, ROI: ${context.parsed.y.toFixed(1)}%`;
                                }
                            }
                        }
                    },
                    scales: {
                        x: {
                            grid: {
                                color: 'rgba(255, 255, 255, 0.1)'
                            },
                            ticks: {
                                color: 'rgba(255, 255, 255, 0.7)'
                            },
                            title: {
                                display: true,
                                text: 'Nivel de Riesgo',
                                color: 'rgba(255, 255, 255, 0.9)',
                                font: {
                                    size: 14,
                                    weight: 'bold'
                                }
                            }
                        },
                        y: {
                            grid: {
                                color: 'rgba(255, 255, 255, 0.1)'
                            },
                            ticks: {
                                color: 'rgba(255, 255, 255, 0.7)',
                                callback: function(value) {
                                    return value + '%';
                                }
                            },
                            title: {
                                display: true,
                                text: 'Rendimiento (%)',
                                color: 'rgba(255, 255, 255, 0.9)',
                                font: {
                                    size: 14,
                                    weight: 'bold'
                                }
                            }
                        }
                    }
                }
            });
        }
        
        function initMiniCharts() {
            const miniCharts = document.querySelectorAll('.mini-chart');
            
            miniCharts.forEach(canvas => {
                const ctx = canvas.getContext('2d');
                const values = JSON.parse(canvas.getAttribute('data-values'));
                
                // Determinar el color basado en la tendencia (último valor vs primer valor)
                const firstValue = values[0];
                const lastValue = values[values.length - 1];
                const isPositive = lastValue >= firstValue;
                
                const borderColor = isPositive ? '#4CAF50' : '#F44336';
                const backgroundColor = isPositive ? 'rgba(76, 175, 80, 0.2)' : 'rgba(244, 67, 54, 0.2)';
                
                new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: Array(values.length).fill(''),
                        datasets: [{
                            data: values,
                            borderColor: borderColor,
                            backgroundColor: backgroundColor,
                            borderWidth: 2,
                            tension: 0.4,
                            pointRadius: 0,
                            fill: true
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                display: false
                            },
                            tooltip: {
                                enabled: false
                            }
                        },
                        scales: {
                            x: {
                                display: false
                            },
                            y: {
                                display: false
                            }
                        },
                        elements: {
                            line: {
                                tension: 0.4
                            }
                        }
                    }
                });
            });
        }
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
// Abrir el sidebar
function openSidebar() {
    console.log('Abriendo sidebar');
    
    const sidebar = document.querySelector('.sidebar');
    
    if (!sidebar) return;
    
    // 1. Aplicar estilos directamente para mayor compatibilidad
    sidebar.style.left = '0';
    
    // 2. Añadir clases para mantener compatibilidad con el resto del código
    document.body.classList.add('sidebar-open');
    
    // 3. Cambiar icono del botón (opcional)
    const menuBtn = document.getElementById('mobile-menu-button');
    if (menuBtn) {
        menuBtn.innerHTML = '<i class="fas fa-times"></i>';
    }
}

function fixSidebarToggle() {
  // Obtener referencias a todos los elementos relevantes
  const sidebar = document.querySelector('.sidebar');
  const sidebarToggle = document.querySelector('.sidebar-toggle');
  const mobileMenuBtn = document.getElementById('mobile-menu-button');
  
  // Función única para alternar el estado del sidebar
  function toggleSidebar() {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
      // En móvil, añadir/quitar la clase sidebar-open
      const isOpen = document.body.classList.toggle('sidebar-open');
      
      // Ajustar el scroll del cuerpo
      document.body.style.overflow = isOpen ? 'hidden' : '';
    } else {
      // En desktop, solo alternar la clase collapsed
      document.body.classList.toggle('sidebar-collapsed');
    }
  }
  
  // Agregar eventos a todos los botones relevantes
  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', toggleSidebar);
  }
  
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', toggleSidebar);
  }
}

// Llamar a la función cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', fixSidebarToggle);

// Comprobar tamaño de pantalla y ajustar elementos
function checkScreenSize() {
    const isMobile = window.innerWidth <= 768;
    const mobileBtn = document.getElementById('mobile-menu-button');
    
    if (!mobileBtn) return;
    
    // Mostrar/ocultar botón según el tamaño de pantalla
    mobileBtn.style.display = isMobile ? 'flex' : 'none';
    
    // Si acabamos de cambiar a desktop, cerrar el sidebar móvil
    if (!isMobile) {
        const sidebar = document.querySelector('.sidebar');
        
        if (sidebar) sidebar.style.left = '';
        
        document.body.classList.remove('sidebar-open');
    }
}

// Función para usar externamente
function openSidebarManually() {
    openSidebar();
}

// Función para usar externamente
function closeSidebarManually() {
    closeSidebar();
}
// Añade esta función al archivo referrals.js

// Cerrar el sidebar
function closeSidebar() {
    console.log('Cerrando sidebar');
    
    const sidebar = document.querySelector('.sidebar');
    
    if (!sidebar) return;
    
    // 1. Aplicar estilos directamente
    sidebar.style.left = '-250px'; // Asegúrate que este valor coincida con el ancho de tu sidebar
    
    // 2. Remover clases
    document.body.classList.remove('sidebar-open');
    
    // 3. Restaurar icono del botón
    const menuBtn = document.getElementById('mobile-menu-button');
    if (menuBtn) {
        menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    }
}

// Alternativa: reemplazar la función toggleSidebar existente con esta versión mejorada
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    
    if (!sidebar) {
        console.error('No se encontró sidebar');
        return;
    }
    
    // Verificar si el sidebar está abierto (múltiples formas de verificar)
    const isOpen = sidebar.style.left === '0px' || 
                  getComputedStyle(sidebar).left === '0px' ||
                  document.body.classList.contains('sidebar-open');
    
    if (isOpen) {
        // Cerrar sidebar
        sidebar.style.left = '-250px'; // Asegúrate que este valor coincida con el ancho de tu sidebar
        document.body.classList.remove('sidebar-open');
        
        // Cambiar icono a barras
        const menuBtn = document.getElementById('mobile-menu-button');
        if (menuBtn) {
            menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    } else {
        // Abrir sidebar
        sidebar.style.left = '0';
        document.body.classList.add('sidebar-open');
        
        // Cambiar icono a X
        const menuBtn = document.getElementById('mobile-menu-button');
        if (menuBtn) {
            menuBtn.innerHTML = '<i class="fas fa-times"></i>';
        }
    }
}