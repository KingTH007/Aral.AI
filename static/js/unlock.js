document.addEventListener("DOMContentLoaded", () => {
    // Disable all quizzes initially
    for (let i = 1; i <= 6; i++) {
        const quizList = document.querySelectorAll(`#filipino-quiz-${i} a`);
        quizList.forEach(quiz => {
            quiz.classList.add('disabled');
            quiz.style.pointerEvents = 'none'; // Makes it unclickable
            quiz.style.opacity = '0.5'; // Grays out the link
        });
    }

    // Add event listeners to unlock buttons
    for (let i = 1; i <= 6; i++) {
        const unlockButton = document.getElementById(`unlock-button-${i}`);
        if (unlockButton) {
            unlockButton.addEventListener('click', () => {
                console.log(`Unlock button ${i} clicked`); // Debugging log

                // Enable the specific quizzes
                const quizList = document.querySelectorAll(`#filipino-quiz-${i} a`);
                quizList.forEach(quiz => {
                    quiz.classList.remove('disabled');
                    quiz.style.pointerEvents = 'auto'; // Makes it clickable
                    quiz.style.opacity = '1'; // Restores visibility
                });

                // Optionally disable the unlock button after use
                unlockButton.disabled = true;
                unlockButton.style.opacity = '0.5';
                unlockButton.textContent = "Na-unlock na";
            });
        } else {
            console.error(`Unlock button ${i} not found`); // Debugging log
        }
    }
});

//show instruction

