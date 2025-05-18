
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
document.addEventListener('DOMContentLoaded', function() {
            // Inicializar modales
            initModals();
            
            // Inicializar formulario de retiro
            initWithdrawalForm();
            
            // Inicializar tabs del modal de métodos de pago
            initPaymentMethodTabs();
            
            // Inicializar acordeón FAQ
            initFaqAccordion();
        });
        
        // Inicializar modales
        function initModals() {
            const modalOverlay = document.querySelector('.modal-overlay');
            const modals = document.querySelectorAll('.modal');
            const closeButtons = document.querySelectorAll('.modal-close, .btn-cancel');
            
            // Botón de retiro para abrir el modal
            const withdrawBtn = document.getElementById('withdraw-btn');
            const withdrawModal = document.getElementById('withdraw-modal');
            
            if (withdrawBtn && withdrawModal) {
                withdrawBtn.addEventListener('click', function() {
                    openModal(withdrawModal);
                });
            }
            
            // Botón para añadir método de pago
            const addPaymentBtn = document.getElementById('add-payment-method');
            const paymentMethodModal = document.getElementById('payment-method-modal');
            
            if (addPaymentBtn && paymentMethodModal) {
                addPaymentBtn.addEventListener('click', function() {
                    openModal(paymentMethodModal);
                });
            }
            
            // Botones para cerrar modales
            closeButtons.forEach(button => {
                button.addEventListener('click', function() {
                    closeAllModals();
                });
            });
            
            // Cerrar al hacer clic fuera del modal
            if (modalOverlay) {
                modalOverlay.addEventListener('click', function() {
                    closeAllModals();
                });
            }
            
            // Cerrar con la tecla Escape
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    closeAllModals();
                }
            });
            
            // Función para abrir un modal
            function openModal(modal) {
                if (modalOverlay) modalOverlay.style.display = 'block';
                if (modal) modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
            
            // Función para cerrar todos los modales
            function closeAllModals() {
                if (modalOverlay) modalOverlay.style.display = 'none';
                modals.forEach(modal => {
                    modal.style.display = 'none';
                });
                document.body.style.overflow = '';
            }
        }
        
        // Inicializar formulario de retiro
        function initWithdrawalForm() {
            const amountInput = document.getElementById('withdrawal-amount');
            const summaryAmount = document.getElementById('summary-amount');
            const summaryFee = document.getElementById('summary-fee');
            const summaryTotal = document.getElementById('summary-total');
            const paymentOptions = document.querySelectorAll('.payment-option');
            
            // Actualizar resumen al cambiar el monto
            if (amountInput) {
                amountInput.addEventListener('input', updateSummary);
                // Establecer valor inicial
                amountInput.value = '100.00';
                updateSummary();
            }
            
            // Seleccionar método de pago
            paymentOptions.forEach(option => {
                option.addEventListener('click', function() {
                    paymentOptions.forEach(opt => opt.classList.remove('active'));
                    this.classList.add('active');
                    updateSummary();
                });
            });
            
            // Función para actualizar el resumen
            function updateSummary() {
                const amount = parseFloat(amountInput.value) || 0;
                
                // Calcular comisión según el método de pago seleccionado
                let feePercentage = 0;
                const activeMethod = document.querySelector('.payment-option.active');
                
                if (activeMethod) {
                    const method = activeMethod.getAttribute('data-method');
                    if (method === 'crypto') {
                        feePercentage = 0.01; // 1% para cripto
                    } else if (method === 'bank') {
                        feePercentage = 0.005; // 0.5% para banco
                    }
                    // Tarjeta sin comisión (0%)
                }
                
                const fee = amount * feePercentage;
                const total = amount - fee;
                
                // Actualizar valores en el resumen
if (summaryAmount) summaryAmount.textContent = amount.toFixed(2);
if (summaryFee) summaryFee.textContent = fee.toFixed(2);
if (summaryTotal) summaryTotal.textContent = total.toFixed(2);
            }
        }
        
        // Inicializar pestañas del modal de métodos de pago
        function initPaymentMethodTabs() {
            const tabBtns = document.querySelectorAll('.tab-btn');
            
            tabBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    const tabId = this.getAttribute('data-tab');
                    
                    // Desactivar todas las pestañas
                    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                    document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
                    
                    // Activar la pestaña seleccionada
                    this.classList.add('active');
                    const tabContent = document.getElementById(tabId);
                    if (tabContent) tabContent.classList.add('active');
                });
            });
        }
        
        // Inicializar acordeón de preguntas frecuentes
        function initFaqAccordion() {
            const faqItems = document.querySelectorAll('.faq-item');
            
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question');
                
                question.addEventListener('click', function() {
                    // Si el item ya está activo, cerrarlo
                    if (item.classList.contains('active')) {
                        item.classList.remove('active');
                        return;
                    }
                    
                    // Cerrar todos los items abiertos
                    faqItems.forEach(otherItem => {
                        otherItem.classList.remove('active');
                    });
                    
                    // Abrir el item actual
                    item.classList.add('active');
                });
            });
            
            // Abrir el primer item por defecto
            if (faqItems.length > 0) {
                faqItems[0].classList.add('active');
            }
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