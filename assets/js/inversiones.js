// === INVERSIONES PAGE JAVASCRIPT ===

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar el gráfico de rendimiento
    initPerformanceChart();
    
    // Eventos para los botones de inversión
    setupInvestmentButtons();
    
    // Configurar interacciones de tarjetas de inversión
    setupInvestmentCards();
    
    // Manejar cambios en el selector de período
    setupPeriodSelector();
});

// Función para inicializar el gráfico de rendimiento
function initPerformanceChart() {
    const ctx = document.getElementById('performanceChart').getContext('2d');
    
    // Configuración de la gradiente
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, 'rgba(108, 93, 211, 0.4)');
    gradient.addColorStop(1, 'rgba(108, 93, 211, 0.0)');
    
    // Datos y opciones para cada plan
    const data = {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        datasets: [
            {
                label: 'Premium AI',
                data: [0, 2.1, 3.8, 6.2, 8.5, 10.1, 11.9, 13.2, 14.5, 15.8, 16.7, 17.9],
                borderColor: '#ffc107',
                borderWidth: 3,
                pointBackgroundColor: '#ffc107',
                pointBorderColor: '#15112b',
                pointRadius: 4,
                tension: 0.4,
                fill: false
            },
            {
                label: 'Growth Tech',
                data: [0, 1.3, 2.4, 4.2, 5.7, 7.3, 8.5, 9.8, 10.9, 11.7, 12.3, 13.1],
                borderColor: '#06d6a0',
                borderWidth: 3,
                pointBackgroundColor: '#06d6a0',
                pointBorderColor: '#15112b',
                pointRadius: 4,
                tension: 0.4,
                fill: false
            },
            {
                label: 'Standard Global',
                data: [0, 0.8, 1.5, 2.2, 3.1, 3.9, 4.8, 5.7, 6.4, 7.1, 7.8, 8.5],
                borderColor: '#3a86ff',
                borderWidth: 3,
                pointBackgroundColor: '#3a86ff',
                pointBorderColor: '#15112b',
                pointRadius: 4,
                tension: 0.4,
                fill: false
            }
        ]
    };
    
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                align: 'end',
                labels: {
                    color: '#b7b3cc',
                    boxWidth: 12,
                    usePointStyle: true,
                    pointStyle: 'circle',
                    padding: 20,
                    font: {
                        size: 12
                    }
                }
            },
            tooltip: {
                mode: 'index',
                intersect: false,
                backgroundColor: 'rgba(30, 25, 64, 0.9)',
                titleColor: '#ffffff',
                bodyColor: '#b7b3cc',
                titleFont: {
                    size: 14,
                    weight: 'bold'
                },
                bodyFont: {
                    size: 13
                },
                padding: 15,
                borderColor: 'rgba(255, 255, 255, 0.1)',
                borderWidth: 1,
                displayColors: true,
                callbacks: {
                    label: function(context) {
                        return context.dataset.label + ': ' + context.parsed.y + '%';
                    }
                }
            }
        },
        scales: {
            x: {
                grid: {
                    display: false,
                    drawBorder: false
                },
                ticks: {
                    color: '#817e97',
                    font: {
                        size: 12
                    },
                    padding: 10
                }
            },
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(255, 255, 255, 0.05)',
                    drawBorder: false
                },
                ticks: {
                    color: '#817e97',
                    font: {
                        size: 12
                    },
                    padding: 10,
                    callback: function(value) {
                        return value + '%';
                    }
                }
            }
        },
        elements: {
            line: {
                tension: 0.4
            }
        },
        interaction: {
            mode: 'index',
            intersect: false
        }
    };
    
    // Crear el gráfico
    const performanceChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
    });
    
    // Guardar referencia al gráfico para actualizaciones futuras
    window.performanceChart = performanceChart;
}

// Configurar eventos para los botones de inversión
function setupInvestmentButtons() {
    // Botones de "Invertir Ahora"
    const investButtons = document.querySelectorAll('.plan-footer .btn-primary');
    
    investButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Obtener el nombre del plan del elemento padre
            const planCard = this.closest('.plan-card');
            const planName = planCard.querySelector('.plan-title h3').textContent;
            
            // Aquí podrías mostrar un modal para confirmar la inversión
            // Por simplicidad, mostramos una alerta
            alert(`Iniciar proceso de inversión en plan: ${planName}`);
            
            // En una implementación real, aquí harías una redirección
            // window.location.href = `nueva-inversion.html?plan=${encodeURIComponent(planName)}`;
        });
    });
    
    // Botón de "Nueva Inversión"
    const newInvestmentBtn = document.querySelector('.card-actions .btn-primary');
    if (newInvestmentBtn) {
        newInvestmentBtn.addEventListener('click', function() {
            // Mostrar un mensaje o redirigir a la página de nueva inversión
            alert('Iniciar proceso de nueva inversión');
            // window.location.href = 'nueva-inversion.html';
        });
    }
    
    // Botón de "Ver todos" los planes
    const viewAllPlansBtn = document.querySelector('.card-header .btn-text');
    if (viewAllPlansBtn) {
        viewAllPlansBtn.addEventListener('click', function() {
            alert('Ver catálogo completo de planes de inversión');
            // window.location.href = 'planes-inversion.html';
        });
    }
}

// Configurar interacciones con las tarjetas de inversión
function setupInvestmentCards() {
    // Botones de acción en las tarjetas de inversión
    const actionButtons = document.querySelectorAll('.investment-actions .btn-icon');
    
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.querySelector('i').className;
            const investmentItem = this.closest('.investment-item');
            const planName = investmentItem.querySelector('.investment-details h3').textContent;
            
            if (action.includes('fa-eye')) {
                // Ver detalles de la inversión
                alert(`Ver detalles de la inversión: ${planName}`);
                // window.location.href = `detalle-inversion.html?plan=${encodeURIComponent(planName)}`;
            } else if (action.includes('fa-sync-alt')) {
                // Renovar inversión
                alert(`Renovar inversión: ${planName}`);
            } else if (action.includes('fa-ellipsis-v')) {
                // Mostrar menú contextual (podría ser un dropdown)
                alert(`Opciones adicionales para: ${planName}`);
            }
        });
    });
    
    // Hacer que toda la tarjeta sea clickeable para ver detalles
    const investmentItems = document.querySelectorAll('.investment-item');
    
    investmentItems.forEach(item => {
        // Añadir cursor pointer
        item.style.cursor = 'pointer';
        
        // Añadir evento click a toda la tarjeta excepto a los botones
        item.addEventListener('click', function(e) {
            // No ejecutar si se hace clic en un botón
            if (e.target.closest('.investment-actions')) {
                return;
            }
            
            const planName = this.querySelector('.investment-details h3').textContent;
            alert(`Ver detalles de la inversión: ${planName}`);
            // window.location.href = `detalle-inversion.html?plan=${encodeURIComponent(planName)}`;
        });
    });
    
    // Botones de paginación
    const paginationButtons = document.querySelectorAll('.pagination .btn-page, .pagination .btn-icon');
    
    paginationButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.disabled) return;
            
            // Eliminar la clase active de todos los botones de página
            document.querySelectorAll('.pagination .btn-page').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Si es un botón de página, añadir la clase active
            if (this.classList.contains('btn-page')) {
                this.classList.add('active');
            }
            
            // Aquí se cargarían los datos de la página seleccionada
            // Por simplicidad, solo mostramos un mensaje
            const page = this.textContent || (this.querySelector('i').className.includes('right') ? 'siguiente' : 'anterior');
            console.log(`Cargar página: ${page}`);
        });
    });
}

// Configurar el selector de período para el gráfico
function setupPeriodSelector() {
    const periodSelector = document.querySelector('.select-period');
    
    if (periodSelector) {
        periodSelector.addEventListener('change', function() {
            const days = parseInt(this.value);
            
            // En una implementación real, aquí se cargarían datos para el nuevo período
            // Por simplicidad, solo ajustamos los datos actuales
            
            // Ajustar datos según el período seleccionado
            const labels = window.performanceChart.data.labels;
            
            if (days === 30) {
                // Mostrar solo los últimos 3 meses
                window.performanceChart.data.labels = labels.slice(-3);
                
                window.performanceChart.data.datasets.forEach(dataset => {
                    dataset.data = dataset.data.slice(-3);
                });
            } else if (days === 60) {
                // Mostrar solo los últimos 6 meses
                window.performanceChart.data.labels = labels.slice(-6);
                
                window.performanceChart.data.datasets.forEach(dataset => {
                    dataset.data = dataset.data.slice(-6);
                });
            } else {
                // Mostrar todo el año
                window.performanceChart.data.labels = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
                
                window.performanceChart.data.datasets[0].data = [0, 2.1, 3.8, 6.2, 8.5, 10.1, 11.9, 13.2, 14.5, 15.8, 16.7, 17.9];
                window.performanceChart.data.datasets[1].data = [0, 1.3, 2.4, 4.2, 5.7, 7.3, 8.5, 9.8, 10.9, 11.7, 12.3, 13.1];
                window.performanceChart.data.datasets[2].data = [0, 0.8, 1.5, 2.2, 3.1, 3.9, 4.8, 5.7, 6.4, 7.1, 7.8, 8.5];
            }
            
            // Actualizar el gráfico
            window.performanceChart.update();
            
            console.log(`Período cambiado a: ${days} días`);
        });
    }
}

// Código relacionado con las notificaciones
// Manejador de las notificaciones
document.addEventListener('DOMContentLoaded', function() {
    const notificationBtn = document.querySelector('.notification-btn');
    const notificationPanel = document.querySelector('.notification-panel');
    const darkOverlay = document.querySelector('.dark-overlay');
    const closePanel = document.querySelector('.close-panel');
    const markReadBtns = document.querySelectorAll('.mark-read');
    const markAllReadBtn = document.querySelector('.mark-all-read');

    if (notificationBtn && notificationPanel && darkOverlay) {
        notificationBtn.addEventListener('click', function() {
            notificationPanel.classList.add('active');
            darkOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        function closeNotificationPanel() {
            notificationPanel.classList.remove('active');
            darkOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }

        if (closePanel) {
            closePanel.addEventListener('click', closeNotificationPanel);
        }

        darkOverlay.addEventListener('click', closeNotificationPanel);
    }

    if (markReadBtns.length > 0) {
        markReadBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const notificationItem = this.closest('.notification-item');
                if (notificationItem) {
                    notificationItem.classList.remove('unread');
                    updateNotificationCount();
                }
            });
        });
    }

    if (markAllReadBtn) {
        markAllReadBtn.addEventListener('click', function() {
            const unreadItems = document.querySelectorAll('.notification-item.unread');
            unreadItems.forEach(item => {
                item.classList.remove('unread');
            });
            updateNotificationCount();
        });
    }

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

    updateNotificationCount();
});

// Modal para ver detalles de inversión
document.addEventListener('DOMContentLoaded', function() {
    // Crear el componente modal
    const modalElement = document.createElement('div');
    modalElement.className = 'investment-modal';
    modalElement.innerHTML = `
        <div class="modal-backdrop"></div>
        <div class="modal-container">
            <div class="modal-header">
                <h2>Detalle de Inversión</h2>
                <button class="modal-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-content">
                <!-- El contenido se cargará dinámicamente -->
            </div>
            <div class="modal-footer">
                <button class="btn-primary">
                    <i class="fas fa-chart-line"></i>
                    <span>Ver Análisis</span>
                </button>
                <button class="btn-outline">
                    <i class="fas fa-times"></i>
                    <span>Cerrar</span>
                </button>
            </div>
        </div>
    `;
    
    // Añadir el modal al body
    document.body.appendChild(modalElement);
    
    // Ocultar el modal por defecto
    modalElement.style.display = 'none';
    
    // Obtener referencias a los elementos del modal
    const modalBackdrop = modalElement.querySelector('.modal-backdrop');
    const modalClose = modalElement.querySelector('.modal-close');
    const closeButton = modalElement.querySelector('.modal-footer .btn-outline');
    const modalContent = modalElement.querySelector('.modal-content');
    
    // Función para abrir el modal con datos específicos
    function openInvestmentModal(investmentData) {
        // Llenar el contenido del modal con la información de la inversión
        modalContent.innerHTML = `
            <div class="investment-detail-modal">
                <div class="investment-plan-header">
                    <div class="plan-icon ${investmentData.type.toLowerCase()}-icon">
                        <i class="${investmentData.icon}"></i>
                    </div>
                    <div class="plan-title">${investmentData.title}</div>
                </div>
                
                <div class="plan-dates">
                    <div class="plan-date">
                        <i class="far fa-calendar-alt"></i>
                        Iniciado: ${investmentData.startDate}
                    </div>
                    <div class="plan-date">
                        <i class="fas fa-calendar-check"></i>
                        Vence: ${investmentData.endDate}
                    </div>
                </div>
                
                <div class="investment-chart">
                    <canvas id="investmentDetailChart"></canvas>
                </div>
                
                <div class="investment-stats-grid">
                    <div class="stat-box">
                        <div class="stat-label">Capital Invertido</div>
                        <div class="stat-value">${investmentData.capital}</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-label">Rendimiento</div>
                        <div class="stat-value">${investmentData.yield}</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-label">Ganancia Actual</div>
                        <div class="stat-value">${investmentData.profit}</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-label">Ganancia Proyectada</div>
                        <div class="stat-value">${investmentData.projectedProfit}</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-label">Duración</div>
                        <div class="stat-value">${investmentData.duration}</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-label">Estado</div>
                        <div class="plan-status ${investmentData.statusClass}">${investmentData.status}</div>
                    </div>
                </div>
                
                <div class="investment-info-section">
                    <h3>Detalles del Plan</h3>
                    <p>${investmentData.description}</p>
                </div>
                
                <div class="investment-transactions">
                    <h3>Últimas Transacciones</h3>
                    <div class="transaction-list">
                        ${investmentData.transactions.map(transaction => `
                            <div class="transaction-item">
                                <div class="transaction-date">${transaction.date}</div>
                                <div class="transaction-type">${transaction.type}</div>
                                <div class="transaction-amount">${transaction.amount}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
        
        // Mostrar el modal
        modalElement.style.display = 'flex';
        
        // Inicializar el gráfico
        if (window.Chart) {
            initInvestmentDetailChart(investmentData);
        }
    }
    
    // Función para inicializar el gráfico
    function initInvestmentDetailChart(investmentData) {
        const ctx = document.getElementById('investmentDetailChart').getContext('2d');
        
        // Datos del gráfico
        const chartData = {
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
            datasets: [
                {
                    label: 'Rendimiento Real',
                    data: investmentData.performanceData,
                    borderColor: investmentData.type === 'Premium' ? '#ffc107' : 
                                investmentData.type === 'Growth' ? '#06d6a0' : '#3a86ff',
                    backgroundColor: 'rgba(0, 0, 0, 0)', // Transparente
                    borderWidth: 3,
                    pointBackgroundColor: investmentData.type === 'Premium' ? '#ffc107' : 
                                        investmentData.type === 'Growth' ? '#06d6a0' : '#3a86ff',
                    pointRadius: 4,
                    tension: 0.4
                },
                {
                    label: 'Rendimiento Proyectado',
                    data: investmentData.projectedData,
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                    backgroundColor: 'rgba(0, 0, 0, 0)', // Transparente
                    borderWidth: 2,
                    borderDash: [5, 5],
                    pointBackgroundColor: 'rgba(255, 255, 255, 0.5)',
                    pointRadius: 3,
                    tension: 0.4
                }
            ]
        };
        
        // Opciones del gráfico
        const chartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: 'rgba(255, 255, 255, 0.7)',
                        boxWidth: 12,
                        padding: 20,
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(30, 25, 64, 0.9)',
                    titleColor: '#ffffff',
                    bodyColor: 'rgba(255, 255, 255, 0.7)',
                    titleFont: {
                        size: 14,
                        weight: 'bold'
                    },
                    bodyFont: {
                        size: 13
                    },
                    padding: 15,
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: 1,
                    displayColors: true,
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.y + '%';
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)',
                        drawBorder: false
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.7)',
                        font: {
                            size: 12
                        },
                        padding: 10
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)',
                        drawBorder: false
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.7)',
                        font: {
                            size: 12
                        },
                        padding: 10,
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                },
            }
        };
        
        // Crear el gráfico
        new Chart(ctx, {
            type: 'line',
            data: chartData,
            options: chartOptions
        });
    }
    
    // Función para cerrar el modal
    function closeModal() {
        modalElement.style.display = 'none';
    }
    
    // Eventos para cerrar el modal
    modalBackdrop.addEventListener('click', closeModal);
    modalClose.addEventListener('click', closeModal);
    closeButton.addEventListener('click', closeModal);
    
    // Datos de ejemplo para las inversiones
    const investmentDataSamples = {
        premium: {
            type: 'Premium',
            icon: 'fas fa-gem',
            title: 'Plan Premium AI',
            startDate: '05 Enero, 2025',
            endDate: '05 Julio, 2025',
            capital: '$3,000.00',
            yield: '15.8%',
            profit: '$1,422.00',
            projectedProfit: '$2,370.00',
            duration: '6 meses',
            status: 'Activo',
            statusClass: 'status-active',
            description: 'Plan de inversión Premium AI enfocado en tecnologías de Inteligencia Artificial de última generación. Incluye rebalanceo automático y protección contra volatilidad.',
            performanceData: [0, 2.1, 3.8, 6.2, 8.5, 10.1, 11.9, 13.2, 14.5, 15.8, null, null],
            projectedData: [0, 2.1, 3.8, 6.2, 8.5, 10.1, 11.9, 13.7, 15.4, 17.1, 18.8, 20.5],
            transactions: [
                { date: '10 Mayo, 2025', type: 'Rendimiento', amount: '$42.50' },
                { date: '09 Mayo, 2025', type: 'Rendimiento', amount: '$41.75' },
                { date: '08 Mayo, 2025', type: 'Rendimiento', amount: '$43.20' },
                { date: '07 Mayo, 2025', type: 'Rendimiento', amount: '$40.90' }
            ]
        },
        growth: {
            type: 'Growth',
            icon: 'fas fa-rocket',
            title: 'Plan Growth Tech',
            startDate: '15 Febrero, 2025',
            endDate: '15 Mayo, 2025',
            capital: '$1,500.00',
            yield: '12.3%',
            profit: '$553.50',
            projectedProfit: '$750.00',
            duration: '3 meses',
            status: 'Próximo vencimiento',
            statusClass: 'status-upcoming',
            description: 'Plan de inversión Growth Tech especializado en empresas tecnológicas emergentes con alto potencial de crecimiento. Ofrece exposición a startups seleccionadas.',
            performanceData: [0, 2.9, 5.7, 8.4, 11.2, 12.3, null, null, null, null, null, null],
            projectedData: [0, 2.9, 5.7, 8.4, 11.2, 14.0, null, null, null, null, null, null],
            transactions: [
                { date: '10 Mayo, 2025', type: 'Rendimiento', amount: '$20.25' },
                { date: '09 Mayo, 2025', type: 'Rendimiento', amount: '$19.50' },
                { date: '08 Mayo, 2025', type: 'Rendimiento', amount: '$21.30' },
                { date: '07 Mayo, 2025', type: 'Rendimiento', amount: '$20.80' }
            ]
        },
        standard: {
            type: 'Standard',
            icon: 'fas fa-chart-bar',
            title: 'Plan Standard Global',
            startDate: '10 Marzo, 2025',
            endDate: '10 Junio, 2025',
            capital: '$750.00',
            yield: '8.5%',
            profit: '$168.75',
            projectedProfit: '$225.00',
            duration: '3 meses',
            status: 'Activo',
            statusClass: 'status-active',
            description: 'Plan de inversión Standard Global con diversificación en mercados internacionales. Ideal para inversores con perfil conservador que buscan estabilidad.',
            performanceData: [0, 1.8, 3.5, 5.1, 6.8, 8.5, null, null, null, null, null, null],
            projectedData: [0, 1.8, 3.5, 5.1, 6.8, 8.5, 10.2, null, null, null, null, null],
            transactions: [
                { date: '10 Mayo, 2025', type: 'Rendimiento', amount: '$7.90' },
                { date: '09 Mayo, 2025', type: 'Rendimiento', amount: '$8.10' },
                { date: '08 Mayo, 2025', type: 'Rendimiento', amount: '$7.85' },
                { date: '07 Mayo, 2025', type: 'Rendimiento', amount: '$7.95' }
            ]
        }
    };
    
    // Exportar funciones y datos para uso global
    window.investmentModal = {
        open: openInvestmentModal,
        close: closeModal,
        sampleData: investmentDataSamples
    };
    
    // Configurar eventos de los botones de inversión
    setupInvestmentDetailLinks();
});

// Función para configurar los enlaces a detalles de inversión
function setupInvestmentDetailLinks() {
    // Obtener todos los botones de "Ver" inversión
    const viewButtons = document.querySelectorAll('.investment-actions .btn-icon .fa-eye');
    
    viewButtons.forEach(button => {
        const buttonEl = button.parentElement;
        buttonEl.addEventListener('click', function(e) {
            e.stopPropagation(); // Evitar que se propague al contenedor padre
            
            // Obtener el elemento de inversión padre
            const investmentItem = this.closest('.investment-item');
            
            // Obtener el título de la inversión
            const investmentTitle = investmentItem.querySelector('.investment-details h3').textContent;
            
            // Determinar qué datos de ejemplo usar según el título
            let sampleData;
            if (investmentTitle.includes('Premium')) {
                sampleData = window.investmentModal.sampleData.premium;
            } else if (investmentTitle.includes('Growth')) {
                sampleData = window.investmentModal.sampleData.growth;
            } else if (investmentTitle.includes('Standard')) {
                sampleData = window.investmentModal.sampleData.standard;
            }
            
            // Abrir el modal con los datos correspondientes
            if (sampleData) {
                window.investmentModal.open(sampleData);
            }
        });
    });
    
    // También hacer que los elementos de inversión sean clickeables
    const investmentItems = document.querySelectorAll('.investment-item');
    
    investmentItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // No ejecutar si se hizo clic en un botón de acción
            if (e.target.closest('.investment-actions')) {
                return;
            }
            
            // Obtener el título de la inversión
            const investmentTitle = this.querySelector('.investment-details h3').textContent;
            
            // Determinar qué datos de ejemplo usar según el título
            let sampleData;
            if (investmentTitle.includes('Premium')) {
                sampleData = window.investmentModal.sampleData.premium;
            } else if (investmentTitle.includes('Growth')) {
                sampleData = window.investmentModal.sampleData.growth;
            } else if (investmentTitle.includes('Standard')) {
                sampleData = window.investmentModal.sampleData.standard;
            }
            
            // Abrir el modal con los datos correspondientes
            if (sampleData) {
                window.investmentModal.open(sampleData);
            }
        });
    });
}

// Código específico para el botón de sidebar con la clase "sidebar-toggle"
document.addEventListener('DOMContentLoaded', function() {
    // Obtener el botón de toggle del sidebar
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    
    if (!sidebarToggle) {
        console.error('Botón .sidebar-toggle no encontrado');
        return;
    }
    
    // Obtener el sidebar
    const sidebar = document.querySelector('.sidebar');
    
    if (!sidebar) {
        console.error('Sidebar no encontrado');
        return;
    }
    
    // Agregar evento click al botón
    sidebarToggle.addEventListener('click', function() {
        console.log('Botón sidebar-toggle clickeado');
        
        // Toggle de clase para el body que controla el estado del sidebar
        document.body.classList.toggle('sidebar-collapsed');
        
        // Si necesitamos un overlay en móviles
        if (window.innerWidth <= 768) {
            // Ver si ya existe un overlay
            let overlay = document.querySelector('.dark-overlay');
            
            if (!overlay) {
                // Crear overlay si no existe
                overlay = document.createElement('div');
                overlay.className = 'dark-overlay';
                document.body.appendChild(overlay);
                
                // Añadir evento para cerrar sidebar al hacer clic en overlay
                overlay.addEventListener('click', function() {
                    document.body.classList.remove('sidebar-collapsed');
                    this.classList.remove('active');
                });
            }
            
            // Activar/desactivar overlay
            if (document.body.classList.contains('sidebar-collapsed')) {
                overlay.classList.add('active');
            } else {
                overlay.classList.remove('active');
            }
        }
    });
    
    // Opcional: Agregar atajos de teclado
    document.addEventListener('keydown', function(e) {
        // Si se presiona Escape y el sidebar está abierto en móvil
        if (e.key === 'Escape' && document.body.classList.contains('sidebar-collapsed') && window.innerWidth <= 768) {
            document.body.classList.remove('sidebar-collapsed');
            const overlay = document.querySelector('.dark-overlay');
            if (overlay) overlay.classList.remove('active');
        }
    });
    
    // Opcional: Guardar la preferencia del usuario
    if (document.body.classList.contains('sidebar-collapsed')) {
        localStorage.setItem('sidebarState', 'collapsed');
    }
    
    // Comprobar si hay una preferencia guardada
    const savedSidebarState = localStorage.getItem('sidebarState');
    if (savedSidebarState === 'collapsed') {
        document.body.classList.add('sidebar-collapsed');
    }
});

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
// Inicializar funcionalidades para los planes de inversión
document.addEventListener('DOMContentLoaded', function() {
    // Añadir efectos y animaciones a las tarjetas de planes
    const investmentPlans = document.querySelectorAll('.investment-plan');
    
    // Función para añadir efecto de hover y animaciones a las tarjetas
    function setupPlanCards() {
        investmentPlans.forEach(plan => {
            // Identificar el tipo de plan para añadir la clase correspondiente
            const planTitle = plan.querySelector('.plan-title').textContent.toLowerCase();
            
            if (planTitle.includes('premium')) {
                plan.classList.add('premium');
            } else if (planTitle.includes('growth')) {
                plan.classList.add('growth');
            } else if (planTitle.includes('standard')) {
                plan.classList.add('standard');
            }
            
            // Añadir animación de entrada con un ligero retraso entre tarjetas
            const index = Array.from(investmentPlans).indexOf(plan);
            plan.style.opacity = '0';
            plan.style.transform = 'translateY(20px)';
            plan.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            setTimeout(() => {
                plan.style.opacity = '1';
                plan.style.transform = 'translateY(0)';
            }, 100 * index);
        });
    }
    
    // Configurar eventos para los botones de acción
    function setupActionButtons() {
        const actionButtons = document.querySelectorAll('.action-icon');
        
        actionButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.stopPropagation(); // Evitar que el clic se propague al contenedor
                
                const icon = this.querySelector('i');
                const plan = this.closest('.investment-plan');
                const planTitle = plan.querySelector('.plan-title').textContent;
                
                // Añadir un efecto de clic
                this.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
                
                // Ejecutar la acción correspondiente según el icono
                if (icon.classList.contains('fa-eye')) {
                    console.log(`Ver detalles del plan: ${planTitle}`);
                    showPlanDetails(plan);
                } else if (icon.classList.contains('fa-sync-alt')) {
                    console.log(`Reinvertir en el plan: ${planTitle}`);
                    showReinvestOptions(plan);
                } else if (icon.classList.contains('fa-ellipsis-v')) {
                    console.log(`Mostrar opciones para el plan: ${planTitle}`);
                    showMoreOptions(plan, this);
                }
            });
        });
    }
    
    // Función para mostrar detalles del plan (simulación)
    function showPlanDetails(plan) {
        // Aquí podrías abrir un modal o redirigir a una página de detalles
        const planTitle = plan.querySelector('.plan-title').textContent;
        const capital = plan.querySelector('.plan-info-item:nth-child(1) .plan-info-item-value').textContent;
        const rendimiento = plan.querySelector('.plan-info-item:nth-child(2) .plan-info-item-value').textContent;
        
        // Ejemplo: mostrar un mensaje (en producción sería un modal)
        alert(`Detalles del plan: ${planTitle}\nCapital: ${capital}\nRendimiento: ${rendimiento}`);
    }
    
    // Función para mostrar opciones de reinversión (simulación)
    function showReinvestOptions(plan) {
        // Aquí podrías abrir un modal con opciones de reinversión
        const planTitle = plan.querySelector('.plan-title').textContent;
        
        // Ejemplo: mostrar un mensaje (en producción sería un modal)
        alert(`Opciones de reinversión para: ${planTitle}\n- Reinvertir capital\n- Reinvertir ganancias\n- Reinvertir todo`);
    }
    
    // Función para mostrar más opciones (simulación de menú contextual)
    function showMoreOptions(plan, button) {
        // Aquí podrías mostrar un menú contextual
        const planTitle = plan.querySelector('.plan-title').textContent;
        
        // Verificar si ya existe un menú y eliminarlo
        const existingMenu = document.querySelector('.context-menu');
        if (existingMenu) {
            existingMenu.remove();
        }
        
        // Crear menú contextual
        const contextMenu = document.createElement('div');
        contextMenu.className = 'context-menu';
        contextMenu.innerHTML = `
            <ul>
                <li data-action="details">Ver detalles completos</li>
                <li data-action="statement">Descargar estado de cuenta</li>
                <li data-action="share">Compartir información</li>
                <li data-action="contact">Contactar asesor</li>
            </ul>
        `;
        
        // Posicionar menú
        const buttonRect = button.getBoundingClientRect();
        contextMenu.style.position = 'absolute';
        contextMenu.style.top = `${buttonRect.bottom + window.scrollY + 5}px`;
        contextMenu.style.right = `${window.innerWidth - buttonRect.right - window.scrollX}px`;
        contextMenu.style.zIndex = 1000;
        contextMenu.style.background = 'rgba(40, 16, 77, 0.95)';
        contextMenu.style.borderRadius = '8px';
        contextMenu.style.padding = '8px 0';
        contextMenu.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
        contextMenu.style.minWidth = '200px';
        
        // Estilos para los elementos del menú
        const style = document.createElement('style');
        style.textContent = `
            .context-menu ul {
                list-style: none;
                padding: 0;
                margin: 0;
            }
            .context-menu li {
                padding: 10px 15px;
                cursor: pointer;
                transition: all 0.2s ease;
                color: rgba(255, 255, 255, 0.8);
                font-size: 14px;
            }
            .context-menu li:hover {
                background: rgba(255, 255, 255, 0.1);
                color: white;
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(contextMenu);
        
        // Manejar clics en las opciones
        contextMenu.querySelectorAll('li').forEach(item => {
            item.addEventListener('click', function() {
                const action = this.getAttribute('data-action');
                
                // Acciones para cada opción
                switch (action) {
                    case 'details':
                        alert(`Mostrando detalles completos de: ${planTitle}`);
                        break;
                    case 'statement':
                        alert(`Descargando estado de cuenta de: ${planTitle}`);
                        break;
                    case 'share':
                        alert(`Compartiendo información de: ${planTitle}`);
                        break;
                    case 'contact':
                        alert(`Contactando asesor para: ${planTitle}`);
                        break;
                }
                
                // Cerrar menú
                contextMenu.remove();
            });
        });
        
        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', function closeMenu(e) {
            if (!contextMenu.contains(e.target) && e.target !== button) {
                contextMenu.remove();
                document.removeEventListener('click', closeMenu);
            }
        });
    }
    
    // Iniciar configuración
    setupPlanCards();
    setupActionButtons();
    
    // Animación suave para los valores numéricos
    function animateNumbers() {
        const numberElements = document.querySelectorAll('.plan-info-item-value');
        
        numberElements.forEach(element => {
            // Solo animar elementos que contienen valores numéricos
            if (element.textContent.includes('$') || element.textContent.includes('%')) {
                const finalValue = element.textContent;
                let isPercentage = finalValue.includes('%');
                let isCurrency = finalValue.includes('$');
                
                // Extraer valor numérico
                let numValue = parseFloat(finalValue.replace(/[^0-9.-]/g, ''));
                let startValue = 0;
                let duration = 1500; // Duración de la animación en ms
                let startTime = null;
                
                // Función para la animación
                function animateValue(timestamp) {
                    if (!startTime) startTime = timestamp;
                    let progress = (timestamp - startTime) / duration;
                    
                    if (progress < 1) {
                        let currentValue = startValue + progress * (numValue - startValue);
                        
                        if (isCurrency) {
                            element.textContent = '$' + currentValue.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                        } else if (isPercentage) {
                            element.textContent = currentValue.toFixed(1) + '%';
                        } else {
                            element.textContent = currentValue.toFixed(0);
                        }
                        
                        requestAnimationFrame(animateValue);
                    } else {
                        element.textContent = finalValue; // Asegurar valor final exacto
                    }
                }
                
                // Iniciar animación
                requestAnimationFrame(animateValue);
            }
        });
    }
    
    // Iniciar animación de números después de un breve retraso
    setTimeout(animateNumbers, 500);
});
// Solución para que la sidebar funcione correctamente en móviles
document.addEventListener('DOMContentLoaded', function() {
    // 1. Crear el botón de menú móvil si no existe
    const mobileMenuBtn = document.querySelector('#mobile-menu-button') || createMobileMenuButton();
    
    // 2. Asegurarse de que el overlay existe
    const darkOverlay = document.querySelector('.dark-overlay') || createDarkOverlay();
    
    // 3. Configurar los event listeners correctos
    setupSidebarToggle(mobileMenuBtn, darkOverlay);
    
    // 4. Detectar si estamos en modo móvil
    adjustForMobileView();
    
    // 5. Manejar cambios de tamaño de ventana
    window.addEventListener('resize', adjustForMobileView);
});

// Crear el botón de menú móvil
function createMobileMenuButton() {
    console.log('Creando botón de menú móvil');
    const btn = document.createElement('button');
    btn.id = 'mobile-menu-button';
    btn.innerHTML = '<i class="fas fa-bars"></i>';
    btn.setAttribute('aria-label', 'Abrir menú');
    
    // Estilos para el botón
    btn.style.position = 'fixed';
    btn.style.top = '15px';
    btn.style.right = '15px';
    btn.style.zIndex = '9999';
    btn.style.width = '45px';
    btn.style.height = '45px';
    btn.style.borderRadius = '50%';
    btn.style.background = 'var(--light-purple, #6b33c5)';
    btn.style.color = 'white';
    btn.style.border = 'none';
    btn.style.display = 'none'; // Oculto por defecto, se mostrará en móvil
    btn.style.alignItems = 'center';
    btn.style.justifyContent = 'center';
    btn.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.3)';
    btn.style.cursor = 'pointer';
    
    document.body.appendChild(btn);
    return btn;
}

// Crear el overlay oscuro para cuando el menú está abierto
function createDarkOverlay() {
    console.log('Creando overlay para el menú');
    const overlay = document.createElement('div');
    overlay.className = 'dark-overlay';
    
    // Estilos para el overlay
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.right = '0';
    overlay.style.bottom = '0';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    overlay.style.zIndex = '1500';
    overlay.style.opacity = '0';
    overlay.style.visibility = 'hidden';
    overlay.style.transition = 'opacity 0.3s ease, visibility 0.3s ease';
    
    document.body.appendChild(overlay);
    return overlay;
}

// Configurar los event listeners para el sidebar
function setupSidebarToggle(menuBtn, overlay) {
    console.log('Configurando eventos para el sidebar');
    
    // 1. Botón de menú móvil
    menuBtn.addEventListener('click', function() {
        console.log('Botón de menú móvil clickeado');
        toggleSidebar();
    });
    
    // 2. Botón de toggle en el sidebar (si existe)
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            console.log('Botón sidebar-toggle clickeado');
            toggleSidebar();
        });
    }
    
    // 3. Click en el overlay para cerrar
    overlay.addEventListener('click', function() {
        console.log('Overlay clickeado');
        closeSidebar();
    });
    
    // 4. Atajos de teclado (Escape para cerrar)
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeSidebar();
        }
    });
}

// Función para alternar el estado del sidebar
function toggleSidebar() {
    console.log('Alternando estado del sidebar');
    
    const isMobile = window.innerWidth <= 768;
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.dark-overlay');
    
    if (!sidebar || !overlay) {
        console.error('No se encontró el sidebar o el overlay');
        return;
    }
    
    // En móvil, usamos clases diferentes
    if (isMobile) {
        if (sidebar.style.left === '0px' || document.body.classList.contains('sidebar-open')) {
            closeSidebar();
        } else {
            openSidebar();
        }
    } else {
        // En desktop, solo alternamos la clase collapsed
        document.body.classList.toggle('sidebar-collapsed');
    }
}

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