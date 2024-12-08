document.addEventListener("DOMContentLoaded", () => {
    // Get key elements
    const filipinoLessonsContainer = document.getElementById("filipino-lessons");
    const lessonTitles = {
        lesson1: document.getElementById("lesson-1-title"),
        lesson2: document.getElementById("lesson-2-title"),
        lesson3: document.getElementById("lesson-3-title"),
        lesson4: document.getElementById("lesson-4-title"),
        lesson5: document.getElementById("lesson-5-title"),
        lesson6: document.getElementById("lesson-6-title"),
    };
    const lessonContents = {
        lesson1: document.getElementById("lesson-1-content"),
        lesson2: document.getElementById("lesson-2-content"),
        lesson3: document.getElementById("lesson-3-content"),
        lesson4: document.getElementById("lesson-4-content"),
        lesson5: document.getElementById("lesson-5-content"),
        lesson6: document.getElementById("lesson-6-content"),
    };
    const lessonButtons = {
        lesson1: document.getElementById("lesson-1-btn"),
        lesson2: document.getElementById("lesson-2-btn"),
        lesson3: document.getElementById("lesson-3-btn"),
        lesson4: document.getElementById("lesson-4-btn"),
        lesson5: document.getElementById("lesson-5-btn"),
        lesson6: document.getElementById("lesson-6-btn"),
    };
    const sidebarButtons = {
        subjectButton: document.getElementById("filipino-subject"),
        aralin1: document.getElementById("filipino-lesson-1"),
        aralin2: document.getElementById("filipino-lesson-2"),
        aralin3: document.getElementById("filipino-lesson-3"),
        aralin4: document.getElementById("filipino-lesson-4"),
        aralin5: document.getElementById("filipino-lesson-5"),
        aralin6: document.getElementById("filipino-lesson-6"),
    };

    const filipinoLinks = document.querySelectorAll(".filipino-link .button1");

    // Helper function to hide all sections
    function hideAllSections() {
        document.querySelectorAll(".container").forEach((container) => {
            container.classList.add("hidden");
        });
    }

    // Helper function to hide all lesson titles
    function hideAllLessonTitles() {
        Object.values(lessonTitles).forEach((title) => {
            title.classList.add("hidden");
        });
    }

    // Helper function to hide all lesson contents and buttons
    function hideAllLessonContentAndButtons() {
        Object.values(lessonContents).forEach((content) => {
            content.classList.add("hidden");
        });
        Object.values(lessonButtons).forEach((button) => {
            button.classList.add("hidden");
        });
    }

    // Event listener for Filipino Subject button
    sidebarButtons.subjectButton.addEventListener("click", (e) => {
        e.preventDefault();
        hideAllSections();
        filipinoLessonsContainer.parentElement.classList.remove("hidden");
    });

    // Event listener for each Filipino lesson link button
    filipinoLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const lessonId = link.id.replace("-link", "-title"); // Convert 'lesson-1-link' to 'lesson-1-title'

            hideAllSections();
            hideAllLessonTitles();
            hideAllLessonContentAndButtons();

            const selectedLessonTitle = document.getElementById(lessonId);
            if (selectedLessonTitle) {
                selectedLessonTitle.parentElement.classList.remove("hidden");
                selectedLessonTitle.classList.remove("hidden");
            }
        });
    });

    // Event listeners for each Aralin button in the sidebar
    Object.entries(sidebarButtons).forEach(([key, button]) => {
        if (key.startsWith("aralin")) {
            button.addEventListener("click", (e) => {
                e.preventDefault();
                hideAllSections();
                hideAllLessonTitles();
                hideAllLessonContentAndButtons();

                const lessonIndex = key.replace("aralin", "lesson"); // Convert 'aralin1' to 'lesson1'
                const lessonTitle = lessonTitles[lessonIndex];
                if (lessonTitle) {
                    lessonTitle.parentElement.classList.remove("hidden");
                    lessonTitle.classList.remove("hidden");
                }
            });
        }
    });

    // Event listeners for "Start Lesson" buttons in lesson titles
    Object.entries(lessonTitles).forEach(([lessonIndex, lessonTitle]) => {
        const startButton = lessonTitle.querySelector(".start-lesson-btn");
        if (startButton) {
            startButton.addEventListener("click", () => {
                hideAllSections();
                hideAllLessonTitles();
                hideAllLessonContentAndButtons();

                const lessonContent = lessonContents[lessonIndex];
                const lessonButton = lessonButtons[lessonIndex];
                if (lessonContent && lessonButton) {
                    lessonContent.parentElement.classList.remove("hidden");
                    lessonContent.classList.remove("hidden");
                    lessonButton.classList.remove("hidden");
                    
                }
            });
        }
    });
});


//btnFunction.js
document.addEventListener("DOMContentLoaded", () => {
    // Get key elements
    const filipinoLessonsContainer = document.getElementById("filipino-lessons");
    const lessonTitles = {
        lesson1: document.getElementById("lesson-1-title"),
        lesson2: document.getElementById("lesson-2-title"),
        lesson3: document.getElementById("lesson-3-title"),
        lesson4: document.getElementById("lesson-4-title"),
        lesson5: document.getElementById("lesson-5-title"),
        lesson6: document.getElementById("lesson-6-title"),
    };
    const lessonContents = {
        lesson1: document.getElementById("lesson-1-content"),
        lesson2: document.getElementById("lesson-2-content"),
        lesson3: document.getElementById("lesson-3-content"),
        lesson4: document.getElementById("lesson-4-content"),
        lesson5: document.getElementById("lesson-5-content"),
        lesson6: document.getElementById("lesson-6-content"),
    };
    const lessonButtons = {
        lesson1: document.getElementById("lesson-1-btn"),
        lesson2: document.getElementById("lesson-2-btn"),
        lesson3: document.getElementById("lesson-3-btn"),
        lesson4: document.getElementById("lesson-4-btn"),
        lesson5: document.getElementById("lesson-5-btn"),
        lesson6: document.getElementById("lesson-6-btn"),
    };
    const sidebarButtons = {
        subjectButton: document.getElementById("filipino-subject"),
        aralin1: document.getElementById("filipino-lesson-1"),
        aralin2: document.getElementById("filipino-lesson-2"),
        aralin3: document.getElementById("filipino-lesson-3"),
        aralin4: document.getElementById("filipino-lesson-4"),
        aralin5: document.getElementById("filipino-lesson-5"),
        aralin6: document.getElementById("filipino-lesson-6"),
    };

    const filipinoLinks = document.querySelectorAll(".filipino-link .button1");

    // Helper function to hide all sections
    function hideAllSections() {
        document.querySelectorAll(".container").forEach((container) => {
            container.classList.add("hidden");
        });
    }

    // Helper function to hide all lesson titles
    function hideAllLessonTitles() {
        Object.values(lessonTitles).forEach((title) => {
            title.classList.add("hidden");
        });
    }

    // Helper function to hide all lesson contents and buttons
    function hideAllLessonContentAndButtons() {
        Object.values(lessonContents).forEach((content) => {
            content.classList.add("hidden");
        });
        Object.values(lessonButtons).forEach((button) => {
            button.classList.add("hidden");
        });
    }

    // Event listener for Filipino Subject button
    sidebarButtons.subjectButton.addEventListener("click", (e) => {
        e.preventDefault();
        hideAllSections();
        filipinoLessonsContainer.parentElement.classList.remove("hidden");
    });

    // Event listener for each Filipino lesson link button
    filipinoLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const lessonId = link.id.replace("-link", "-title"); // Convert 'lesson-1-link' to 'lesson-1-title'

            hideAllSections();
            hideAllLessonTitles();
            hideAllLessonContentAndButtons();

            const selectedLessonTitle = document.getElementById(lessonId);
            if (selectedLessonTitle) {
                selectedLessonTitle.parentElement.classList.remove("hidden");
                selectedLessonTitle.classList.remove("hidden");
            }
        });
    });

    // Event listeners for each Aralin button in the sidebar
    Object.entries(sidebarButtons).forEach(([key, button]) => {
        if (key.startsWith("aralin")) {
            button.addEventListener("click", (e) => {
                e.preventDefault();
                hideAllSections();
                hideAllLessonTitles();
                hideAllLessonContentAndButtons();

                const lessonIndex = key.replace("aralin", "lesson"); // Convert 'aralin1' to 'lesson1'
                const lessonTitle = lessonTitles[lessonIndex];
                if (lessonTitle) {
                    lessonTitle.parentElement.classList.remove("hidden");
                    lessonTitle.classList.remove("hidden");
                }
            });
        }
    });

    // Event listeners for "Start Lesson" buttons in lesson titles
    Object.entries(lessonTitles).forEach(([lessonIndex, lessonTitle]) => {
        const startButton = lessonTitle.querySelector(".start-lesson-btn");
        if (startButton) {
            startButton.addEventListener("click", () => {
                hideAllSections();
                hideAllLessonTitles();
                hideAllLessonContentAndButtons();

                const lessonContent = lessonContents[lessonIndex];
                const lessonButton = lessonButtons[lessonIndex];
                if (lessonContent && lessonButton) {
                    lessonContent.parentElement.classList.remove("hidden");
                    lessonContent.classList.remove("hidden");
                    lessonButton.classList.remove("hidden"); // Ensure the button appears
                }
            });
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    // Get key elements
    const lessonContents = {
        lesson1: document.getElementById("lesson-1-content"),
        lesson2: document.getElementById("lesson-2-content"),
        lesson3: document.getElementById("lesson-3-content"),
        lesson4: document.getElementById("lesson-4-content"),
        lesson5: document.getElementById("lesson-5-content"),
        lesson6: document.getElementById("lesson-6-content"),
    };
    const lessonButtons = {
        lesson1: document.getElementById("lesson-1-btn"),
        lesson2: document.getElementById("lesson-2-btn"),
        lesson3: document.getElementById("lesson-3-btn"),
        lesson4: document.getElementById("lesson-4-btn"),
        lesson5: document.getElementById("lesson-5-btn"),
        lesson6: document.getElementById("lesson-6-btn"),
    };
    const lessonTitles = {
        lesson1: document.getElementById("lesson-1-title"),
        lesson2: document.getElementById("lesson-2-title"),
        lesson3: document.getElementById("lesson-3-title"),
        lesson4: document.getElementById("lesson-4-title"),
        lesson5: document.getElementById("lesson-5-title"),
        lesson6: document.getElementById("lesson-6-title"),
    };

    // Helper function to hide all lesson-related sections
    function hideAllLessons() {
        Object.values(lessonContents).forEach((content) => content.classList.add("hidden"));
        Object.values(lessonButtons).forEach((button) => button.classList.add("hidden"));
        Object.values(lessonTitles).forEach((title) => title.classList.add("hidden"));
    }

    // Show specific lesson content and buttons
    function showLessonContent(lessonKey) {
        hideAllLessons();  // Hide all lessons

        // Show the current lesson content and its button
        if (lessonContents[lessonKey]) {
            lessonContents[lessonKey].classList.remove("hidden");
        }
        if (lessonButtons[lessonKey]) {
            lessonButtons[lessonKey].classList.remove("hidden");  // Ensure the button appears
        }
    }

    // Add event listeners for lesson titles' Start Lesson buttons
    Object.keys(lessonTitles).forEach((lessonKey) => {
        const startButton = document.querySelector(`#start-lesson-btn${lessonKey.replace("lesson", "")}`);
        if (startButton) {
            startButton.addEventListener("click", () => {
                showLessonContent(lessonKey);
            });
        }
    });

    // Add event listeners for Next and Back buttons
    Object.keys(lessonButtons).forEach((_lessonKey, index) => {
        const nextButton = document.querySelector(`#next-lesson-${index + 1}`);
        const backButton = document.querySelector(`#prevous-lesson-${index + 2}`);

        // Handle Next button
        if (nextButton) {
            nextButton.addEventListener("click", () => {
                const nextLessonKey = `lesson${index + 2}`;
                showLessonContent(nextLessonKey);
            });
        }

        // Handle Back button
        if (backButton) {
            backButton.addEventListener("click", () => {
                const prevLessonKey = `lesson${index + 1}`;
                showLessonContent(prevLessonKey);
            });
        }
    });

    // Disable the "Previous" button on Lesson 1 and "Next" button on Lesson 6
    const prevLesson1Button = document.getElementById("prevous-lesson-1");
    const nextLesson6Button = document.getElementById("next-lesson-6");

    if (prevLesson1Button) {
        prevLesson1Button.disabled = true;
        prevLesson1Button.style.color = '#888';  // Disable button visually
        prevLesson1Button.style.cursor = 'not-allowed';  // Change cursor to "not-allowed"
        prevLesson1Button.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent click event
            alert('You cannot go back from Lesson 1.');
        });
    }

    if (nextLesson6Button) {
        nextLesson6Button.disabled = true;
        nextLesson6Button.style.color = '#888';  // Disable button visually
        nextLesson6Button.style.cursor = 'not-allowed';  // Change cursor to "not-allowed"
        nextLesson6Button.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent click event
            alert('You cannot go forward from Lesson 6.');
        });
    }
});
