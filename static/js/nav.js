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
});
