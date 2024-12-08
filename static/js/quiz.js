document.addEventListener("DOMContentLoaded", function () {
    const quizMappings = {
        "start-1-ToF": "lesson-1-ToF",
        "start-1-identify": "lesson-1-identify",
        "start-2-ToF": "lesson-2-ToF",
        "start-2-multiple": "lesson-2-Multiple",
        "start-2-identify": "lesson-2-identify",
        "start-3-ToF": "lesson-3-ToF",
        "start-3-multiple": "lesson-3-Multiple",
        "start-3-identify": "lesson-3-identify",
        "start-4-ToF": "lesson-4-ToF",
        "start-4-multiple": "lesson-4-Multiple",
        "start-4-identify": "lesson-4-identify",
        "start-5-ToF": "lesson-5-ToF",
        "start-5-multiple": "lesson-5-Multiple",
        "start-5-identify": "lesson-5-identify",
        "start-6-ToF": "lesson-6-ToF",
        "start-6-multiple": "lesson-6-Multiple",
        "start-6-identify": "lesson-6-identify",
    };

    const timerDuration = 10; // in seconds
    let score = 0;

    // Function to start a quiz
    function startQuiz(startButtonId) {
        const lessonId = quizMappings[startButtonId];
        if (lessonId) {
            // Hide all instructions and quizzes
            document.querySelectorAll(".instruction-design").forEach(el => el.classList.add("hidden"));
            document.querySelectorAll(".quiz-design").forEach(el => el.classList.add("hidden"));

            // Show the specific quiz
            const quizElement = document.getElementById(lessonId);
            if (quizElement) {
                quizElement.classList.remove("hidden");

                // Initialize timer and score
                let timeLeft = timerDuration;
                score = 0;
                updateScore(quizElement);
                const timerElement = quizElement.querySelector(".timer");

                const timerInterval = setInterval(() => {
                    if (timeLeft > 0) {
                        timeLeft--;
                        timerElement.textContent = `Time: ${timeLeft}`;
                    } else {
                        clearInterval(timerInterval);
                        alert("Time's up!");
                    }
                }, 1000);
            }
        } else {
            console.error("No quiz mapping found for button:", startButtonId);
        }
    }

    // Function to update the score display
    function updateScore(quizElement) {
        const scoreElement = quizElement.querySelector(".score");
        if (scoreElement) {
            scoreElement.textContent = `Score: ${score}/10`;
        }
    }

    // Add event listeners to "SIMULAN" buttons
    Object.keys(quizMappings).forEach(startButtonId => {
        const startButton = document.getElementById(startButtonId);
        if (startButton) {
            startButton.addEventListener("click", () => startQuiz(startButtonId));
        }
    });
});
