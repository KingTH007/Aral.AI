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

document.addEventListener("DOMContentLoaded", () => {
    // Add event listeners for each quiz type
    const quizLinks = document.querySelectorAll('[id^="ToF-"], [id^="multiple-"], [id^="identify-"]');

    // Helper function to hide all lesson titles
    function hideAllInstruction() {
        // Add 'hidden' class to all instruction containers
        document.querySelectorAll(".instruction-design").forEach((instruction) => {
            instruction.classList.add("hidden");
        });
    }

    function hideAllContainer() {
        // Add 'hidden' class to all containers
        document.querySelectorAll(".container").forEach((container) => {
            container.classList.add("hidden");
        });
    }

    quizLinks.forEach((quizLink) => {
        quizLink.addEventListener("click", (e) => {
            e.preventDefault();
            hideAllInstruction();
            hideAllContainer();
            // Get the ID of the clicked quiz link (e.g., 'ToF-1-quiz')
            const quizId = quizLink.id;
            // Derive the instruction ID based on the quiz link's ID
            const instructionId = `instruction-${quizId.split("-")[1]}-${quizId.split("-")[0]}`;

            // Find the specific instruction element
            const instructionElement = document.getElementById(instructionId);
            // Remove 'hidden' class for the related instruction, if it exists
            if (instructionElement) {
                instructionElement.parentElement.classList.remove("hidden");
                instructionElement.classList.remove("hidden");
            } else {
                console.error(`Instruction for ${instructionId} not found!`);
            }
        });
    });
});


