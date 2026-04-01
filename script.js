const killBtn = document.getElementById('kill-btn');
const marryBtn = document.getElementById('marry-btn');
const mainCard = document.getElementById('main-card');
const loadingScreen = document.getElementById('loading-screen');
const successScreen = document.getElementById('success-screen');
const app = document.getElementById('app');
const groom = document.getElementById('groom');
const bride = document.getElementById('bride');
const finalDate = document.getElementById('final-date');

// Fleeing logic for the 'Kill Me' button
const moveKillBtn = () => {
    // Disable fleeing on small screens or touch devices for better usability
    if (window.innerWidth < 600 || window.matchMedia("(pointer: coarse)").matches) {
        return;
    }

    const maxX = window.innerWidth - killBtn.offsetWidth - 20;
    const maxY = window.innerHeight - killBtn.offsetHeight - 20;
    
    // Calculate new random position within the viewport
    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;
    
    killBtn.style.position = 'fixed';
    killBtn.style.left = `${newX}px`;
    killBtn.style.top = `${newY}px`;
    killBtn.style.margin = '0';
    killBtn.style.zIndex = '1000';
    killBtn.style.transition = 'all 0.2s ease'; // Smooth flee
};

// Listen for mousemove to trigger fleeing early
document.addEventListener('mousemove', (e) => {
    if (killBtn.classList.contains('hidden')) return;

    const btnRect = killBtn.getBoundingClientRect();
    const btnCenterX = btnRect.left + btnRect.width / 2;
    const btnCenterY = btnRect.top + btnRect.height / 2;

    const distance = Math.sqrt(
        Math.pow(e.clientX - btnCenterX, 2) + 
        Math.pow(e.clientY - btnCenterY, 2)
    );

    // If cursor is within 100px, move the button
    if (distance < 120) {
        moveKillBtn();
    }
});

// If the user somehow manages to click it (or on mobile)
killBtn.addEventListener('click', () => {
    mainCard.classList.add('hidden');
    killBtn.classList.add('hidden');
    loadingScreen.classList.remove('hidden');

    // Wait 2 seconds as requested by the user
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        mainCard.classList.remove('hidden');
        killBtn.classList.remove('hidden');
        
        // Reset the button position back to original layout inside the container
        killBtn.style.position = 'static';
        killBtn.style.margin = '0';
        killBtn.style.zIndex = 'auto';
    }, 2000);
});

// Marry Me Success Logic
marryBtn.addEventListener('click', () => {
    mainCard.classList.add('hidden');
    killBtn.classList.add('hidden');
    successScreen.classList.remove('hidden');

    // Trigger the romantic animation
    startSuccessAnimation();
});

function startSuccessAnimation() {
    // Small delay to ensure display is active
    setTimeout(() => {
        // Move to center from opposite sides
        groom.style.left = 'calc(50% - 70px)';
        bride.style.right = 'calc(50% - 70px)';

        // When they meet
        setTimeout(() => {
            // Final celebration
            finalDate.classList.remove('hidden');
            groom.style.transform = 'translateY(-50%) scale(1.5)';
            bride.style.transform = 'translateY(-50%) scale(1.5)';
            
            // Add heart
            const heart = document.createElement('div');
            heart.innerHTML = '❤️';
            heart.style.position = 'absolute';
            heart.style.left = '50%';
            heart.style.top = '50%';
            heart.style.transform = 'translate(-50%, -50%)';
            heart.style.fontSize = '4rem';
            heart.style.animation = 'pop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards';
            successScreen.querySelector('.emoji-container').appendChild(heart);

            createConfetti();
        }, 5000);
    }, 100);
}

function createConfetti() {
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-10px';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 70%)`;
        confetti.style.borderRadius = '50%';
        confetti.style.zIndex = '2000';
        confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
        document.body.appendChild(confetti);
    }
}

// Add falling animation style dynamically
const styleSheet = document.createElement("style");
styleSheet.innerText = `
@keyframes fall {
    to {
        transform: translateY(110vh) rotate(360deg);
        opacity: 0;
    }
}`;
document.head.appendChild(styleSheet);
