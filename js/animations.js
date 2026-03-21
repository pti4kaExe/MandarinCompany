
// Мандариновая анимация при загрузке
function initMandarinAnimation() {
    const splash = document.getElementById("splashScreen");
    const mandarin = document.getElementById("mandarinFruit");
    const mainContent = document.getElementById("mainContent");
    
    if (mandarin) {
        mandarin.addEventListener("click", function(e) {
            e.stopPropagation();
            this.classList.add("falling");
            
            setTimeout(() => {
                if (splash) splash.classList.add("hide");
                if (mainContent) mainContent.classList.add("visible");
                
                // Эффект разбивания
                const burst = document.createElement("div");
                burst.innerHTML = "💥🍊✨🍊✨";
                burst.style.cssText = `
                    position: fixed;
                    top: 45%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    font-size: 80px;
                    z-index: 10000;
                    pointer-events: none;
                    animation: fadeOut 0.5s ease;
                `;
                document.body.appendChild(burst);
                setTimeout(() => burst.remove(), 500);
            }, 700);
        });
    }
}

// Анимация появления элементов при скролле
function initScrollAnimations() {
    const elements = document.querySelectorAll('.advantage-card, .product-card, .portfolio-item, .blog-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Анимация для кнопок
function initButtonAnimations() {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'translateY(-3px)';
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translateY(0)';
        });
    });
}

// Плавная прокрутка для якорей
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}