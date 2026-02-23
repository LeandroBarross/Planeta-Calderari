console.log('Script.js carregado com sucesso!');

    
    // --- 1. LÓGICA DO MENU HAMBÚRGUER ---
    const menuToggleLabel = document.getElementById('menu-toggle-label');
    const menuLinks = document.querySelector('.menu-links');
    const menuFecharLabel = document.getElementById('menu-fechar-label');
    const navLinks = document.querySelectorAll('.menu-links a');

    function fecharMenu() {
        if (menuLinks) menuLinks.classList.remove('menu-aberto');
        document.body.style.overflow = '';
    }

    if (menuToggleLabel && menuLinks) {
        menuToggleLabel.addEventListener('click', () => {
            menuLinks.classList.add('menu-aberto');
            document.body.style.overflow = 'hidden';
        });
    }

    if (menuFecharLabel) {
        menuFecharLabel.addEventListener('click', fecharMenu);
    }

    navLinks.forEach(link => {
        link.addEventListener('click', fecharMenu);
    });

    // --- 2. LÓGICA DO SUBMENU (CATEGORIAS) ---
    const toggleSubmenu = document.querySelector('.toggle-submenu');
    const submenu = document.querySelector('.submenu');

    if (toggleSubmenu && submenu) {
        toggleSubmenu.addEventListener('click', (e) => {
            e.stopPropagation();
            submenu.classList.toggle('is-open');
            toggleSubmenu.classList.toggle('is-open');
        });

        document.addEventListener('click', (e) => {
            if (!toggleSubmenu.contains(e.target) && !submenu.contains(e.target)) {
                submenu.classList.remove('is-open');
            }
        });
    }

    // --- 3. LÓGICA DE PAUSA CORRIGIDA PARA SAFARI ---
    const allSliders = document.querySelectorAll('.slider');

    allSliders.forEach(slider => {
        const playSlider = () => slider.classList.remove('paused');
        const pauseSlider = () => slider.classList.add('paused');

        // Desktop
        slider.addEventListener('mouseenter', pauseSlider);
        slider.addEventListener('mouseleave', playSlider);

        // Mobile (Safari/Chrome)
        slider.addEventListener('touchstart', (e) => {
            // Remove a pausa de outros sliders antes de pausar este
            allSliders.forEach(s => s.classList.remove('paused'));
            pauseSlider();
        }, { passive: true });
    });

    // CORREÇÃO SAFARI: Clicar em qualquer lugar da tela retoma a animação
    document.addEventListener('touchstart', (e) => {
        allSliders.forEach(slider => {
            // Se o toque NÃO for dentro de um slider, ele volta a girar
            if (!slider.contains(e.target)) {
                slider.classList.remove('paused');
            }
        });
    }, { passive: true });