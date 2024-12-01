document.addEventListener('DOMContentLoaded', function() {
    // Main Subject Dropdown Toggle (only show the Filipino button first)
    const mainDropdown = document.querySelector('.dropdown > a');
    const mainDropContent = document.querySelector('.dropdown .drop-content');

    // Toggle ARIA attributes for main dropdown
    mainDropdown.addEventListener('click', function(event) {
        event.preventDefault();
        mainDropContent.classList.toggle('show');
        const expanded = this.getAttribute('aria-expanded') === 'true' || false;
        this.setAttribute('aria-expanded', !expanded);

        // Toggle arrow direction
        const arrow = this.querySelector('.ri-arrow-down-s-line');
        arrow.classList.toggle('ri-arrow-up-s-line');
    });

    // Sidebar Dropdown Functionality for Subjects
    document.querySelectorAll('.dropSub > a').forEach(item => {
        item.addEventListener('click', function (event) {
            event.preventDefault();
            const parent = this.parentElement;
            const subjectContent = parent.querySelector('.drop-content');

            // Toggle the Filipino subject's dropdown
            subjectContent.classList.toggle('show');
            this.querySelector('.ri-arrow-down-s-line').classList.toggle('ri-arrow-up-s-line');

            // Close other subjects' dropdowns if opened
            document.querySelectorAll('.dropSub').forEach(sub => {
                if (sub !== parent) {
                    const subContent = sub.querySelector('.drop-content');
                    if (subContent.classList.contains('show')) {
                        subContent.classList.remove('show');
                        sub.querySelector('.ri-arrow-down-s-line').classList.remove('ri-arrow-up-s-line');
                    }
                }
            });

            // Hide Aralin dropdowns by default when subject is clicked
            const aralinList = parent.querySelectorAll('.dropLesson');
            aralinList.forEach(aralin => {
                const aralinContent = aralin.querySelector('.lesson-content');
                aralinContent.classList.remove('show');
                aralin.querySelector('.ri-arrow-down-s-line').classList.remove('ri-arrow-up-s-line');
            });
        });
    });

    document.querySelectorAll('.dropLesson > a').forEach(item => {
        item.addEventListener('click', function (event) {
            event.preventDefault();
            const parentLesson = this.parentElement;
            const lessonContent = parentLesson.querySelector('.lesson-content');

            lessonContent.classList.toggle('show');
            this.querySelector('.ri-arrow-down-s-line').classList.toggle('ri-arrow-up-s-line');

            parentLesson.parentElement.querySelectorAll('.dropLesson').forEach(subLesson => {
                if (subLesson !== parentLesson) {
                    const subLessonContent = subLesson.querySelector('.lesson-content');
                    if (subLessonContent.classList.contains('show')) {
                        subLessonContent.classList.remove('show');
                        subLesson.querySelector('.ri-arrow-down-s-line').classList.remove('ri-arrow-up-s-line');
                    }
                }
            });
        });
    });

    // Function to unlock lesson items for a specific lesson
    function unlockLesson(buttonId, lessonId) {
        // Add event listener to the unlock button
        document.getElementById(buttonId).addEventListener('click', function () {
            // Find all quiz links within the specified lesson
            const lessonItems = document.querySelectorAll(`#${lessonId} + .drop-content a`);

            // Unlock each item by removing "locked" styles
            lessonItems.forEach(item => {
                item.classList.remove('locked');
                item.style.color = ''; // Reset to default color
                item.style.cursor = ''; // Reset to default cursor
            });

            // Optional: Provide feedback that the lesson has been unlocked
            alert(`${lessonId.replace('filipino-', '').replace('-', ' ').toUpperCase()} quizzes have been unlocked!`);
        });
    }

    // Unlock buttons and lesson IDs mapping
    const unlockButtonsAndLessons = [
        { buttonId: 'unlock-button-1', lessonId: 'filipino-lesson-1' },
        { buttonId: 'unlock-button-2', lessonId: 'filipino-lesson-2' },
        { buttonId: 'unlock-button-3', lessonId: 'filipino-lesson-3' },
        { buttonId: 'unlock-button-4', lessonId: 'filipino-lesson-4' },
        { buttonId: 'unlock-button-5', lessonId: 'filipino-lesson-5' },
        { buttonId: 'unlock-button-6', lessonId: 'filipino-lesson-6' }
    ];

    // Iterate over each unlock button and associate it with its lesson
    unlockButtonsAndLessons.forEach(mapping => {
        unlockLesson(mapping.buttonId, mapping.lessonId);
    });

    // Function to handle quiz link clicks
    function showInstruction(instructionId) {
        // Hide all instruction containers
        document.querySelectorAll('.instruction-design').forEach(container => {
            container.classList.add('hidden');
        });

        // Show the selected instruction container
        const instructionContainer = document.getElementById(instructionId);
        if (instructionContainer) {
            instructionContainer.classList.remove('hidden');
        }
    }

    // Attach click events to quiz links
    document.querySelectorAll('.lesson-content a').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            // Determine the corresponding instruction ID
            const quizId = this.id; // e.g., "ToF-1-quiz"
            const instructionId = quizId.replace('-quiz', '').replace('ToF', 'Instruction-ToF');

            // Show the corresponding instruction container
            showInstruction(instructionId);
        });
    });
});
