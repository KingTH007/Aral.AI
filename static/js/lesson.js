document.addEventListener("DOMContentLoaded", () => {
    const lessonContents = {
        lesson1: document.getElementById("lesson-1-content"),
        lesson2: document.getElementById("lesson-2-content"),
        lesson3: document.getElementById("lesson-3-content"),
        lesson4: document.getElementById("lesson-4-content"),
        lesson5: document.getElementById("lesson-5-content"),
        lesson6: document.getElementById("lesson-6-content"),
    };

    const buttonContainers = {
        lesson1: document.getElementById("lesson-1-btn"),
        lesson2: document.getElementById("lesson-2-btn"),
        lesson3: document.getElementById("lesson-3-btn"),
        lesson4: document.getElementById("lesson-4-btn"),
        lesson5: document.getElementById("lesson-5-btn"),
        lesson6: document.getElementById("lesson-6-btn"),
    };

    let currentLessonKey = "lesson1"; // Default to the first lesson
    let isTTSSpeaking = false; // Track if TTS is active
    let isInLesson = false; // Track if the user is in a lesson view

    function speakLessonContent(lessonKey) {
        const lessonContent = lessonContents[lessonKey];
        if (!lessonContent) return;

        // Stop ongoing speech
        speechSynthesis.cancel();

        const lessonText = lessonContent.innerText;

        // Create a new SpeechSynthesisUtterance
        const utterance = new SpeechSynthesisUtterance(lessonText);
        utterance.lang = "fil-PH"; // Filipino accent

        // Handle TTS start and end
        utterance.onstart = () => {
            isTTSSpeaking = true;
        };
        utterance.onend = () => {
            isTTSSpeaking = false;
        };

        speechSynthesis.speak(utterance);

        // Show the current lesson content
        Object.values(lessonContents).forEach(content => content.classList.add("hidden"));
        lessonContent.classList.remove("hidden");

        // Show the relevant buttons
        Object.values(buttonContainers).forEach(container => container.classList.add("hidden"));
        buttonContainers[lessonKey]?.classList.remove("hidden");

        // Mark as in lesson
        isInLesson = true;
    }

    function navigateLesson(direction) {
        const lessonKeys = Object.keys(lessonContents);
        let currentIndex = lessonKeys.indexOf(currentLessonKey);

        // Determine the next lesson key
        if (direction === "next") {
            currentIndex = Math.min(currentIndex + 1, lessonKeys.length - 1);
        } else if (direction === "previous") {
            currentIndex = Math.max(currentIndex - 1, 0);
        }

        const nextLessonKey = lessonKeys[currentIndex];

        if (isTTSSpeaking) {
            const userConfirmed = confirm("May TTS pa na naglalaro. Gusto mo bang itigil ang aralin?");
            if (userConfirmed) {
                speechSynthesis.cancel(); // Stop TTS
                isTTSSpeaking = false;
                currentLessonKey = nextLessonKey;
                speakLessonContent(currentLessonKey);
            }
        } else {
            currentLessonKey = nextLessonKey;
            speakLessonContent(currentLessonKey);
        }
    }

    // Add event listeners to next and previous buttons
    Object.keys(buttonContainers).forEach(lessonKey => {
        const prevButton = buttonContainers[lessonKey].querySelector(`[id^="prevous-lesson"]`);
        const nextButton = buttonContainers[lessonKey].querySelector(`[id^="next-lesson"]`);

        if (prevButton) {
            prevButton.addEventListener("click", () => navigateLesson("previous"));
        }

        if (nextButton) {
            nextButton.addEventListener("click", () => navigateLesson("next"));
        }
    });

    const sidebarButtons = document.querySelectorAll('.sidebar-menu a, .filipino-link a, .btn-container button');

    // Add alert for exiting lesson when TTS is active
    sidebarButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            // Only hide buttons if not currently in lesson view
            if (!isInLesson) {
                Object.values(buttonContainers).forEach(container => container.classList.add("hidden"));
            }

            if (isTTSSpeaking) {
                const userConfirmed = confirm("May TTS pa na naglalaro. Gusto mo bang itigil ang aralin?");
                if (userConfirmed) {
                    speechSynthesis.cancel(); // Stop TTS
                    isTTSSpeaking = false;
                    // If leaving lesson, hide buttons
                    if (!isInLesson) {
                        Object.values(buttonContainers).forEach(container => container.classList.add("hidden"));
                    }
                } else {
                    event.preventDefault(); // Prevent button action
                }
            }
        });
    });

    // Event listeners for "Start Lesson" buttons
    document.querySelectorAll('.start-lesson-btn').forEach(button => {
        button.addEventListener("click", function () {
            const lessonKey = this.id.replace("start-lesson-btn", "lesson"); // Convert start-lesson-btn1 to lesson1
            currentLessonKey = lessonKey; // Update the current lesson key
            speakLessonContent(lessonKey);
        });
    });

    // Stop text-to-speech on page unload
    window.addEventListener('beforeunload', () => {
        speechSynthesis.cancel();
    });

    // Function to handle sidebar navigation
    function handleSidebarNavigation() {
        if (!isInLesson) {
            // Hide the buttons if not in lesson view
            Object.values(buttonContainers).forEach(container => container.classList.add("hidden"));
        }
    }

    // Call this function to ensure the buttons are not hidden while in the lesson content
    handleSidebarNavigation();
});
