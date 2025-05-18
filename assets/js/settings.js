document.addEventListener('DOMContentLoaded', function() {
    // Obtener elementos necesarios
    const sidebar = document.querySelector('.settings-sidebar');
    const toggleBtn = document.getElementById('toggleSidebarBtn');
    const overlay = document.querySelector('.sidebar-overlay');
    const navItems = document.querySelectorAll('.settings-nav-item');
    
    // Obtener todas las secciones de contenido
    const contentSections = document.querySelectorAll('.settings-content-section');
    
    // Funciones para mostrar/ocultar el sidebar
    function showSidebar() {
        sidebar.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Evitar scroll del body
        toggleBtn.style.display = 'none'; // Ocultar el botón cuando el sidebar está abierto
    }
    
    function hideSidebar() {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = ''; // Restaurar scroll del body
        
        // Solo mostrar el botón nuevamente si estamos en móvil
        if (window.innerWidth <= 768) {
            toggleBtn.style.display = 'flex';
        }
    }
    
    // Función para mostrar una sección específica y ocultar las demás
    function showSection(sectionId) {
        // Ocultar TODAS las secciones primero
        contentSections.forEach(section => {
            section.style.display = 'none';
        });
        
        // Mostrar solo la sección solicitada
        const sectionToShow = document.getElementById(sectionId);
        if (sectionToShow) {
            sectionToShow.style.display = 'block';
            
            // Opcionalmente, hacer scroll al inicio de la sección
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            console.error('Sección no encontrada:', sectionId);
        }
    }
    
    // Asignar eventos
    toggleBtn.addEventListener('click', showSidebar);
    overlay.addEventListener('click', hideSidebar);
    
    // También cerrar al hacer clic en cualquier lugar fuera del sidebar
    document.addEventListener('click', function(event) {
        // Verificar si el clic fue fuera del sidebar y no en el botón toggle
        if (!sidebar.contains(event.target) && 
            event.target !== toggleBtn && 
            !toggleBtn.contains(event.target) &&
            sidebar.classList.contains('active')) {
            hideSidebar();
        }
    });
    
    // Cambiar entre elementos del menú y mostrar la sección correspondiente
    navItems.forEach(item => {
        item.addEventListener('click', function(event) {
            // Evitar que el clic se propague al document
            event.stopPropagation();
            
            // Quitar la clase active de todos los elementos del menú
            navItems.forEach(navItem => navItem.classList.remove('active'));
            
            // Añadir la clase active al elemento clicado
            this.classList.add('active');
            
            // Obtener el ID de la sección a mostrar
            const targetSection = this.getAttribute('data-section');
            
            // Mostrar solo la sección correspondiente
            showSection(targetSection);
            
            // En móviles, cerrar el sidebar después de seleccionar
            if (window.innerWidth <= 768) {
                hideSidebar();
            }
        });
    });
    
    // Añadir listener al sidebar para prevenir que los clics dentro de él cierren el sidebar
    sidebar.addEventListener('click', function(event) {
        event.stopPropagation();
    });
    
    // Ajustar visualización del sidebar según tamaño de pantalla
    function adjustSidebar() {
        if (window.innerWidth <= 768) {
            // En móvil, ocultar el sidebar por defecto
            sidebar.classList.remove('active');
            toggleBtn.style.display = 'flex';
        } else {
            // En desktop, mostrar siempre el sidebar
            sidebar.classList.add('active');
            toggleBtn.style.display = 'none';
        }
    }
    
    // Ejecutar al cargar la página y cuando cambie el tamaño de la ventana
    adjustSidebar();
    window.addEventListener('resize', adjustSidebar);
    
    // Inicializar mostrando la sección activa
    const activeItem = document.querySelector('.settings-nav-item.active');
    if (activeItem) {
        const initialSection = activeItem.getAttribute('data-section');
        showSection(initialSection);
    } else if (contentSections.length > 0) {
        // Si no hay elemento activo, mostrar la primera sección
        contentSections[0].style.display = 'block';
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