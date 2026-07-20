const TOTAL_RETOS = 6;

// Cargar retos completados desde localStorage
let completedChallenges = JSON.parse(localStorage.getItem('completedChallenges')) || [];

// Esperar a que cargue toda la página
document.addEventListener('DOMContentLoaded', () => {

    // ---------------- FILTROS ----------------
    const filterButtons = document.querySelectorAll('.filter-btn');
    const challengeCards = document.querySelectorAll('.challenge-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {

            // Solo aplicar filtros si el botón tiene data-filter
            if (!button.dataset.filter) return;

            // Quitar clase active de todos
            filterButtons.forEach(btn => btn.classList.remove('active'));

            // Agregar clase active al botón presionado
            button.classList.add('active');

            const filter = button.dataset.filter;

            challengeCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // ---------------- PROGRESO ----------------
    updateProgress();

    // ---------------- CONFIRMAR RETO ----------------
    const confirmButton = document.getElementById('confirmChallenge');

    if (confirmButton) {
        const challengeId = confirmButton.dataset.id;

        // Si ya está completado
        if (completedChallenges.includes(challengeId)) {
            confirmButton.textContent = 'Reto ya completado';
            confirmButton.disabled = true;
            confirmButton.classList.add('completed');
        }

        confirmButton.addEventListener('click', () => {

            // No permitir duplicados ni pasar el límite
            if (!completedChallenges.includes(challengeId) && completedChallenges.length < TOTAL_RETOS) {

                completedChallenges.push(challengeId);

                localStorage.setItem(
                    'completedChallenges',
                    JSON.stringify(completedChallenges)
                );

                alert('¡Reto completado correctamente!');

                confirmButton.textContent = 'Reto ya completado';
                confirmButton.disabled = true;
                confirmButton.classList.add('completed');

                updateProgress();

            } else if (completedChallenges.includes(challengeId)) {

                alert('Este reto ya fue completado.');

            } else {

                alert('Ya has completado todos los retos disponibles.');

            }
        });
    }

    // ---------------- REINICIAR PROGRESO ----------------
    const resetButton = document.getElementById('resetProgress');

    if (resetButton) {
        resetButton.addEventListener('click', () => {

            const confirmar = confirm(
                '¿Seguro que quieres reiniciar todo el progreso?'
            );

            if (confirmar) {
                localStorage.removeItem('completedChallenges');
                location.reload();
            }
        });
    }

    // ---------------- CAMBIAR TEMA ----------------
    const themeToggle = document.getElementById('themeToggle');

    if (themeToggle) {

        // Cargar tema guardado
        const savedTheme = localStorage.getItem('theme');

        if (savedTheme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
            themeToggle.textContent = '☀️';
        }

        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');

            if (currentTheme === 'light') {
                // Cambiar a oscuro
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'dark');
                themeToggle.textContent = '🌙';
            } else {
                // Cambiar a claro
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
                themeToggle.textContent = '☀️';
            }
        });
    }
});

// Función para actualizar el progreso
function updateProgress() {

    const completed = completedChallenges.length;
    const percentage = Math.round((completed / TOTAL_RETOS) * 100);

    const completedCount = document.getElementById('completedCount');
    const totalCount = document.getElementById('totalCount');
    const progressPercent = document.getElementById('progressPercent');
    const progressText = document.getElementById('progressText');
    const progressFill = document.getElementById('progressFill');

    if (completedCount) completedCount.textContent = completed;
    if (totalCount) totalCount.textContent = TOTAL_RETOS;
    if (progressPercent) progressPercent.textContent = percentage + '%';
    if (progressText) progressText.textContent = `${completed} de ${TOTAL_RETOS} retos completados`;
    if (progressFill) progressFill.style.width = percentage + '%';

    // Logros
    const achievement1 = document.getElementById('achievement1');
    const achievement3 = document.getElementById('achievement3');
    const achievement6 = document.getElementById('achievement6');

    if (achievement1) {
        achievement1.classList.toggle('unlocked', completed >= 1);
    }

    if (achievement3) {
        achievement3.classList.toggle('unlocked', completed >= 3);
    }

    if (achievement6) {
        achievement6.classList.toggle('unlocked', completed >= 6);
    }
}