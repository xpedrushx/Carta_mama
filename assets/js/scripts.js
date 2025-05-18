document.addEventListener('DOMContentLoaded', function() {
    // Tema claro/oscuro
    const themeToggle = document.getElementById('theme-toggle');
    
    themeToggle.addEventListener('change', function() {
        document.body.classList.toggle('light-theme');
        
        // Guardar preferencia en localStorage
        if(document.body.classList.contains('light-theme')) {
            localStorage.setItem('theme', 'light');
        } else {
            localStorage.setItem('theme', 'dark');
        }
    });
    
    // Comprobar si hay una preferencia de tema guardada
    const savedTheme = localStorage.getItem('theme');
    if(savedTheme === 'light') {
        document.body.classList.add('light-theme');
        themeToggle.checked = true;
    }
    
    // Generar estrellas para el fondo
    generateStars();
    
    // Animación de scroll suave al hacer clic en enlaces del menú
    smoothScrolling();
    
    // Inicializar contadores
    initCounters();
    
    // Inicializar tabs del dashboard
    initTabs();
    
    // Inicializar FAQ acordeón
    initFAQ();
    
    // Inicializar slider de testimonios
    initTestimonialSlider();
    
    // Inicializar calculadora de rendimiento
    initCalculator();
    
    // Inicializar gráficos del dashboard
    initDashboardCharts();
});

// Función para generar estrellas en el fondo
function generateStars() {
    const starsContainer = document.getElementById('stars-container');
    const starsCount = 100;
    
    for(let i = 0; i < starsCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star-bg');
        
        // Posición aleatoria
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        // Tamaño aleatorio
        const size = Math.random() * 3;
        
        // Animación de parpadeo aleatoria
        const animationDuration = 2 + Math.random() * 3;
        
        star.style.left = `${posX}%`;
        star.style.top = `${posY}%`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.animation = `pulse ${animationDuration}s infinite`;
        
        starsContainer.appendChild(star);
    }
}

// Función para scroll suave
function smoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Scroll down button
    const scrollDownBtn = document.querySelector('.scroll-down');
    if(scrollDownBtn) {
        scrollDownBtn.addEventListener('click', function() {
            const servicesSection = document.querySelector('#servicios');
            if(servicesSection) {
                window.scrollTo({
                    top: servicesSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    }
}

// Función para inicializar contadores
function initCounters() {
    const counters = document.querySelectorAll('.counter-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000; // ms
                const step = Math.ceil(target / (duration / 20)); // Actualizar cada 20ms
                
                let current = 0;
                const timer = setInterval(() => {
                    current += step;
                    if(current >= target) {
                        counter.textContent = target;
                        clearInterval(timer);
                    } else {
                        counter.textContent = current;
                    }
                }, 20);
                
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Función para inicializar tabs del dashboard
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Desactivar todos los tabs y contenidos
            document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            
            // Activar el tab y contenido seleccionado
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Función para inicializar FAQ acordeón
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Cerrar todos los items
            document.querySelectorAll('.faq-item').forEach(faq => faq.classList.remove('active'));
            
            // Si no estaba activo, abrirlo
            if(!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// Función para inicializar slider de testimonios
function initTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial-item');
    const indicators = document.querySelectorAll('.indicator');
    let currentIndex = 0;
    
    // Función para mostrar un testimonio específico
    function showTestimonial(index) {
        testimonials.forEach(item => item.classList.remove('active'));
        indicators.forEach(dot => dot.classList.remove('active'));
        
        testimonials[index].classList.add('active');
        indicators[index].classList.add('active');
        currentIndex = index;
    }
    
    // Event listeners para los indicadores
    indicators.forEach((dot, index) => {
        dot.addEventListener('click', () => showTestimonial(index));
    });
    
    // Autoplay
    setInterval(() => {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
    }, 5000);
}

// Función para inicializar la calculadora de rendimiento
function initCalculator() {
    const investmentAmount = document.getElementById('investment-amount');
    const investmentValue = document.getElementById('investment-value');
    const investmentPlan = document.getElementById('investment-plan');
    const investmentTime = document.getElementById('investment-time');
    const timeValue = document.getElementById('time-value');
    const compoundToggle = document.getElementById('compound-toggle');
    const compoundStatus = document.getElementById('compound-status');
    const referralNumber = document.getElementById('referral-number');
    const referralValue = document.getElementById('referral-value');
    
    // Elementos de resultados
    const summaryInvestment = document.getElementById('summary-investment');
    const monthlyReturn = document.getElementById('monthly-return');
    const totalReturn = document.getElementById('total-return');
    const netProfit = document.getElementById('net-profit');
    const roi = document.getElementById('roi');
    const referralIncome = document.getElementById('referral-income');
    
    // Tasas de retorno diario según el plan
    const dailyRates = {
        starter: 0.008, // 0.8%
        growth: 0.012,  // 1.2%
        enterprise: 0.018 // 1.8%
    };
    
    // Comisiones por referido según el plan
    const referralRates = {
        starter: 0.10, // 10%
        growth: 0.15,  // 15%
        enterprise: 0.20 // 20%
    };
    
    // Función para actualizar la calculadora
    function updateCalculator() {
        // Obtener valores
        const amount = parseInt(investmentAmount.value);
        const plan = investmentPlan.value;
        const months = parseInt(investmentTime.value);
        const isCompound = compoundToggle.checked;
        const referrals = parseInt(referralNumber.value);
        
        // Actualizar etiquetas de valores
        investmentValue.textContent = `${amount.toLocaleString()}`;
        timeValue.textContent = `${months} mes${months !== 1 ? 'es' : ''}`;
        referralValue.textContent = `${referrals} referido${referrals !== 1 ? 's' : ''}`;
        compoundStatus.textContent = isCompound ? 'Activado' : 'Desactivado';
        
        // Calcular rendimientos
        const dailyRate = dailyRates[plan];
        let totalAmount = amount;
        
        if (isCompound) {
            // Cálculo con interés compuesto
            for (let day = 0; day < months * 30; day++) {
                totalAmount += totalAmount * dailyRate;
            }
        } else {
            // Cálculo sin interés compuesto
            const dailyProfit = amount * dailyRate;
            totalAmount = amount + (dailyProfit * months * 30);
        }
        
        // Calcular ingresos por referidos
        const avgReferralInvestment = 500; // Inversión promedio por referido
        const referralRate = referralRates[plan];
        const totalReferralIncome = referrals * avgReferralInvestment * referralRate;
        
        // Actualizar resultados
        const totalProfit = totalAmount - amount;
        const monthlyProfit = totalProfit / months;
        
        summaryInvestment.textContent = `${amount.toLocaleString()}`;
        monthlyReturn.textContent = `${Math.round(monthlyProfit).toLocaleString()}`;
        totalReturn.textContent = `${Math.round(totalAmount).toLocaleString()}`;
        netProfit.textContent = `${Math.round(totalProfit).toLocaleString()}`;
        roi.textContent = `${Math.round((totalProfit / amount) * 100)}%`;
        referralIncome.textContent = `${Math.round(totalReferralIncome).toLocaleString()}`;
        
        // Actualizar gráfico
        updateChart(amount, totalProfit, totalReferralIncome);
    }
    
    // Event listeners
    investmentAmount.addEventListener('input', updateCalculator);
    investmentPlan.addEventListener('change', updateCalculator);
    investmentTime.addEventListener('input', updateCalculator);
    compoundToggle.addEventListener('change', updateCalculator);
    referralNumber.addEventListener('input', updateCalculator);
    
    // Inicializar calculadora
    updateCalculator();
    
    // Función para actualizar el gráfico
    function updateChart(investment, profit, referralIncome) {
        const ctx = document.getElementById('profit-chart').getContext('2d');
        
        // Destruir gráfico anterior si existe
        if (window.profitChart) {
            window.profitChart.destroy();
        }
        
        // Crear nuevo gráfico
        window.profitChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Inversión inicial', 'Ganancias por inversión', 'Ganancias por referidos'],
                datasets: [{
                    data: [investment, profit, referralIncome],
                    backgroundColor: [
                        '#33156b',
                        '#6b33c5',
                        '#3b82f6'
                    ],
                    borderColor: [
                        '#33156b',
                        '#6b33c5',
                        '#3b82f6'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: document.body.classList.contains('light-theme') ? '#333' : '#fff'
                        }
                    }
                }
            }
        });
    }
}

// Función para inicializar gráficos del dashboard
function initDashboardCharts() {
    // Gráfico de rendimiento mensual
    const monthlyPerformance = document.getElementById('monthly-performance');
    if (monthlyPerformance) {
        const ctx = monthlyPerformance.getContext('2d');
        
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                datasets: [{
                    label: 'Rendimiento 2025',
                    data: [250, 320, 380, 410, 490, 550, 600, 650, 720, 790, 850, 920],
                    backgroundColor: 'rgba(107, 51, 197, 0.1)',
                    borderColor: '#6b33c5',
                    borderWidth: 2,
                    tension: 0.3,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true, // Esto es clave
                aspectRatio: 2, // Proporción ancho/alto
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom',
                        labels: {
                            boxWidth: 12,
                            padding: 15,
                            color: document.body.classList.contains('light-theme') ? '#333' : '#fff'
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: document.body.classList.contains('light-theme') ? 
                                'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            callback: function(value) {
                                return '$' + value;
                            },
                            color: document.body.classList.contains('light-theme') ? '#333' : '#fff'
                        }
                    },
                    x: {
                        grid: {
                            color: document.body.classList.contains('light-theme') ? 
                                'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: document.body.classList.contains('light-theme') ? '#333' : '#fff'
                        }
                    }
                }
            }
        });
    }
    
    // Gráfico de distribución de inversiones
    const investmentDistribution = document.getElementById('investment-distribution');
    if (investmentDistribution) {
        const ctx = investmentDistribution.getContext('2d');
        
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Plan Growth', 'Plan Enterprise', 'Plan Starter'],
                datasets: [{
                    data: [40, 45, 15],
                    backgroundColor: [
                        '#6b33c5',
                        '#3b82f6',
                        '#33156b'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                aspectRatio: 2,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            boxWidth: 12,
                            padding: 10,
                            color: document.body.classList.contains('light-theme') ? '#333' : '#fff'
                        }
                    }
                }
            }
        });
    }
}

// También necesitamos ajustar la función updateChart para la calculadora
function updateChart(investment, profit, referralIncome) {
    const ctx = document.getElementById('profit-chart').getContext('2d');
    
    // Destruir gráfico anterior si existe
    if (window.profitChart) {
        window.profitChart.destroy();
    }
    
    // Crear nuevo gráfico con tamaño controlado
    window.profitChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Inversión inicial', 'Ganancias por inversión', 'Ganancias por referidos'],
            datasets: [{
                data: [investment, profit, referralIncome],
                backgroundColor: [
                    '#33156b',
                    '#6b33c5',
                    '#3b82f6'
                ],
                borderColor: [
                    '#33156b',
                    '#6b33c5',
                    '#3b82f6'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 2,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        boxWidth: 12,
                        padding: 15,
                        color: document.body.classList.contains('light-theme') ? '#333' : '#fff'
                    }
                }
            }
        }
    });
    
    // Gráfico de distribución de inversiones
    const investmentDistribution = document.getElementById('investment-distribution');
    if (investmentDistribution) {
        const ctx = investmentDistribution.getContext('2d');
        
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Plan Growth', 'Plan Enterprise', 'Plan Starter'],
                datasets: [{
                    data: [40, 45, 15],
                    backgroundColor: [
                        '#6b33c5',
                        '#3b82f6',
                        '#33156b'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: document.body.classList.contains('light-theme') ? '#333' : '#fff'
                        }
                    }
                }
            }
        });
    }
}

// Función para copiar el enlace de referido
document.addEventListener('click', function(e) {
    if (e.target.matches('.copy-button') || e.target.closest('.copy-button')) {
        const input = document.querySelector('.link-container input');
        input.select();
        document.execCommand('copy');
        
        const button = e.target.matches('.copy-button') ? e.target : e.target.closest('.copy-button');
        const originalText = button.innerHTML;
        
        button.innerHTML = '<i class="fas fa-check"></i> Copiado';
        
        setTimeout(() => {
            button.innerHTML = originalText;
        }, 2000);
    }
});

// Evento para actualizar el tema de los gráficos cuando se cambia el tema
document.getElementById('theme-toggle').addEventListener('change', function() {
    // Dar tiempo para que se aplique el cambio de tema
    setTimeout(() => {
        initDashboardCharts();
        
        // Actualizar el gráfico de la calculadora
        const calculatorForm = document.querySelector('.calculator-form');
        if (calculatorForm) {
            const event = new Event('input');
            document.getElementById('investment-amount').dispatchEvent(event);
        }
    }, 100);
});
