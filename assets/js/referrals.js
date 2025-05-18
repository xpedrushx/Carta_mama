// ===== REFERRALS JAVASCRIPT =====
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todos los componentes de la página
    initReferralLinkCopy();
    initSharingButtons();
    initFaqAccordion();
    initLevelProgress();
    initCurrentDate();
    initFilterReferrals();
});

// Función para inicializar la copia del enlace de referido
function initReferralLinkCopy() {
    const copyBtn = document.getElementById('copy-btn');
    const referralLink = document.getElementById('referral-link');
    const copyMessage = document.getElementById('copy-message');
    
    if (!copyBtn || !referralLink || !copyMessage) {
        console.error('Elementos de copia de enlace no encontrados');
        return;
    }
    
    copyBtn.addEventListener('click', async function() {
        try {
            // Usar la API de portapapeles
            await navigator.clipboard.writeText(referralLink.value);
            
            // Mostrar mensaje de éxito
            copyBtn.classList.add('copied');
            copyMessage.classList.add('show');
            
            // Ocultar mensaje después de 2 segundos
            setTimeout(function() {
                copyBtn.classList.remove('copied');
                copyMessage.classList.remove('show');
            }, 2000);
            
            console.log('Enlace copiado correctamente');
        } catch (err) {
            // Método alternativo de copia en caso de error
            referralLink.select();
            document.execCommand('copy');
            
            copyBtn.classList.add('copied');
            copyMessage.classList.add('show');
            
            setTimeout(function() {
                copyBtn.classList.remove('copied');
                copyMessage.classList.remove('show');
            }, 2000);
            
            console.log('Enlace copiado con método alternativo');
        }
    });
}

// Función para inicializar los botones de compartir
function initSharingButtons() {
    const shareButtons = document.querySelectorAll('.share-btn');
    const referralLink = document.getElementById('referral-link');
    
    if (!shareButtons.length || !referralLink) {
        console.error('Elementos de compartir no encontrados');
        return;
    }
    
    const link = encodeURIComponent(referralLink.value);
    const title = encodeURIComponent('¡Únete a STELLAR AI y obtén $50 de bonificación!');
    const message = encodeURIComponent('Te invito a STELLAR AI, la plataforma de inversión inteligente. Únete con mi enlace y obtén $50 de bonificación en tu primera inversión.');
    
    shareButtons.forEach(button => {
        button.addEventListener('click', function() {
            let shareUrl = '';
            
            // Determinar la plataforma según la clase del botón
            if (button.classList.contains('whatsapp')) {
                shareUrl = `https://wa.me/?text=${message}%20${link}`;
            } else if (button.classList.contains('telegram')) {
                shareUrl = `https://t.me/share/url?url=${link}&text=${message}`;
            } else if (button.classList.contains('facebook')) {
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${link}`;
            } else if (button.classList.contains('twitter')) {
                shareUrl = `https://twitter.com/intent/tweet?text=${message}&url=${link}`;
            } else if (button.classList.contains('email')) {
                shareUrl = `mailto:?subject=${title}&body=${message}%20${link}`;
            }
            
            // Abrir ventana de compartir
            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=600');
            }
        });
    });
}

// Función para inicializar el acordeón de preguntas frecuentes
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (!faqItems.length) {
        console.error('Elementos FAQ no encontrados');
        return;
    }
    
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

// Función para inicializar la animación de la barra de progreso
function initLevelProgress() {
    const progressFill = document.querySelector('.progress-fill');
    
    if (!progressFill) {
        console.error('Elemento de progreso no encontrado');
        return;
    }
    
    // Animar la barra de progreso después de un corto retraso
    setTimeout(function() {
        const currentWidth = progressFill.style.width;
        progressFill.style.width = '0';
        
        setTimeout(function() {
            progressFill.style.width = currentWidth;
        }, 100);
    }, 500);
}

// Función para mostrar la fecha actual
function initCurrentDate() {
    const dateElement = document.getElementById('current-date');
    
    if (!dateElement) {
        console.error('Elemento de fecha no encontrado');
        return;
    }
    
    const now = new Date();
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = now.toLocaleDateString('es-ES', options);
    
    dateElement.textContent = formattedDate;
}

// Función para filtrar la tabla de referidos
function initFilterReferrals() {
    const filterSelect = document.querySelector('.select-period');
    const tableRows = document.querySelectorAll('.referral-table tbody tr');
    
    if (!filterSelect || !tableRows.length) {
        console.error('Elementos de filtro no encontrados');
        return;
    }
    
    filterSelect.addEventListener('change', function() {
        const filterValue = this.value;
        const today = new Date();
        
        tableRows.forEach(row => {
            // Obtener la fecha del referido (segunda columna)
            const dateText = row.querySelector('td:nth-child(2)').textContent;
            const dateParts = dateText.split(',')[0].split(' ');
            
            // Convertir texto de fecha a objeto Date
            const months = {
                'Enero': 0, 'Febrero': 1, 'Marzo': 2, 'Abril': 3, 'Mayo': 4, 'Junio': 5,
                'Julio': 6, 'Agosto': 7, 'Septiembre': 8, 'Octubre': 9, 'Noviembre': 10, 'Diciembre': 11
            };
            
            const day = parseInt(dateParts[0]);
            const month = months[dateParts[1]];
            const year = parseInt(dateText.split(',')[1].trim());
            
            const date = new Date(year, month, day);
            const diffTime = today - date;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            // Filtrar según la selección
            if (filterValue === 'all') {
                row.style.display = '';
            } else if (filterValue === 'month' && diffDays <= 30) {
                row.style.display = '';
            } else if (filterValue === 'quarter' && diffDays <= 90) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });
}

// Función para mostrar gráfico de progreso (opcional, descomentar si se quiere implementar)

function initReferralChart() {
    // Verificar si Chart.js está disponible
    if (typeof Chart === 'undefined') {
        console.error('Chart.js no está disponible');
        return;
    }
    
    const ctx = document.getElementById('referral-chart');
    
    if (!ctx) {
        console.error('Elemento de gráfico no encontrado');
        return;
    }
    
    // Datos de ejemplo para el gráfico
    const data = {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
        datasets: [{
            label: 'Referidos',
            data: [1, 3, 2, 4, 2, 3],
            backgroundColor: 'rgba(107, 51, 197, 0.2)',
            borderColor: 'rgba(107, 51, 197, 1)',
            borderWidth: 2,
            tension: 0.4,
            pointBackgroundColor: 'rgba(107, 51, 197, 1)',
            pointRadius: 4
        }]
    };
    
    // Opciones del gráfico
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                backgroundColor: 'rgba(30, 25, 64, 0.9)',
                titleColor: '#ffffff',
                bodyColor: '#b7b3cc',
                padding: 15,
                displayColors: false
            }
        },
        scales: {
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    color: document.body.classList.contains('light-theme') ? '#333' : '#fff'
                }
            },
            y: {
                beginAtZero: true,
                grid: {
                    color: document.body.classList.contains('light-theme') ? 
                        'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)'
                },
                ticks: {
                    precision: 0,
                    color: document.body.classList.contains('light-theme') ? '#333' : '#fff'
                }
            }
        }
    };
    
    // Crear el gráfico
    new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
    });
}
// Script específico para abrir y cerrar la sidebar en móviles (sin overlay)
document.addEventListener('DOMContentLoaded', function() {
    // 1. Crear el botón de menú móvil si no existe
    const mobileMenuBtn = document.getElementById('mobile-menu-button') || createMobileMenuBtn();
    
    // 2. Configurar eventos para el botón
    setupSidebarEvents(mobileMenuBtn);
    
    // 3. Verificar el tamaño de pantalla inicial
    checkScreenSize();
    
    // 4. Escuchar cambios de tamaño de pantalla
    window.addEventListener('resize', checkScreenSize);
});

// Crear el botón de menú móvil si no existe
function createMobileMenuBtn() {
    console.log('Creando botón de menú móvil');
    
    const btn = document.createElement('button');
    btn.id = 'mobile-menu-button';
    btn.innerHTML = '<i class="fas fa-bars"></i>';
    btn.setAttribute('aria-label', 'Abrir menú');
    
    // Estilos para el botón
    btn.style.position = 'fixed';
    btn.style.top = '15px';
    btn.style.right = '15px';
    btn.style.width = '45px';
    btn.style.height = '45px';
    btn.style.borderRadius = '50%';
    btn.style.backgroundColor = '#6b33c5'; // Color principal
    btn.style.color = 'white';
    btn.style.border = 'none';
    btn.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3)';
    btn.style.display = 'flex';
    btn.style.alignItems = 'center';
    btn.style.justifyContent = 'center';
    btn.style.zIndex = '9999';
    btn.style.cursor = 'pointer';
    
    document.body.appendChild(btn);
    return btn;
}

// Configurar eventos para el sidebar
function setupSidebarEvents(mobileBtn) {
    // Obtener la sidebar
    const sidebar = document.querySelector('.sidebar');
    
    if (!sidebar) {
        console.error('No se encontró el sidebar');
        return;
    }
    
    // Evento para el botón móvil
    mobileBtn.addEventListener('click', function() {
        console.log('Botón menú clickeado');
        toggleSidebar();
    });
    
    // Evento para la tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeSidebar();
        }
    });
    
    // Eventos para cerrar al hacer clic en los enlaces del sidebar (en móvil)
    const sidebarLinks = document.querySelectorAll('.sidebar-menu a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                closeSidebar();
            }
        });
    });
    
    // Evento para cerrar al hacer clic fuera del sidebar (sin overlay)
    document.addEventListener('click', function(e) {
        // Solo en modo móvil
        if (window.innerWidth <= 768) {
            // Si el sidebar está abierto
            if (document.body.classList.contains('sidebar-open')) {
                // Si el clic no fue en el sidebar ni en el botón de menú
                if (!sidebar.contains(e.target) && !mobileBtn.contains(e.target)) {
                    closeSidebar();
                }
            }
        }
    });
}

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