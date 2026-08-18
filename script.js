const areas = document.querySelectorAll('.area');

areas.forEach(area => {
    area.addEventListener('click', () => {
        const targetId = area.dataset.target;
        const targetSection = document.getElementById(targetId);

        targetSection.scrollIntoView({
            behavior: 'smooth'
        });
    });
});