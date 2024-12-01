// Global Variables
let currentQuestionIndex = 0;
let currentType = '';
let score = 0;
let timer;
let timeLeft = 5; // Set timer to 5 seconds

// Quiz Data
const questions = {
    identify: [
        { question: "Ano ang tawag sa mga kasabihan o kawikaan na may dalang aral at ginagamit bilang idyoma?", answer: "sawikain", explanation: "Ito ay mga idyoma na may dalang aral." },
        { question: "Ano ang tawag sa bahagi ng kulturang pilipino na ipinasa pa galing sa mga ninuno?", answer: "kasabihan", explanation: "Ang kasabihan ay bahagi ng ating kultura at tradisyon." },
        { question: "Ano ang tawag sa tanong o pangungusap na may nakatagong kahulugan na nilulutas bilang palaisipan?", answer: "bugtong", explanation: "Ang bugtong ay isang palaisipan na may nakatagong kahulugan." },
        { question: "Anong anyo ng panitikan ang nagbibigay ng magagandang aral o gabay sa pamumuhay?", answer: "salawikain", explanation: "Ang salawikain ay nagbibigay ng magagandang gabay sa buhay." },
        { question: "Anong akdang may kinalaman sa kathang-isip, pag-ibig, at kasaysayan?", answer: "panitikan", explanation: "Ang panitikan ay akdang pampanitikan na sumasalamin sa buhay." }
    ],
    multipleChoice: [
        { question: "Ito ay nagmumula sa salitang 'pang-titik-an' na ibig sabihin ay literatura or mga akdang nasusulat.", choices: ["Salawikain", "Sawikain", "Bugtong", "Panitikan"], answer: "Panitikan", explanation: "Ang panitikan ay galing sa salitang 'pang-titik-an' na nangangahulugang literatura." },
        { question: "Ito ay isang pangungusap o tanong na may doble o nakatagong kahulugan na nilulutas bilang isang palaisipan.", choices: ["Kasabihan", "Bugtong", "Salawikain", "Sawikain"], answer: "Bugtong", explanation: "Ang bugtong ay isang palaisipan na may nakatagong kahulugan." }
    ],
    trueFalse: [
        { question: "Ang salitang 'panitikan' ay nagmula sa salitang Latin na 'littera,' na ang ibig sabihin ay 'titik'.", answer: "True", explanation: "Ang salitang 'panitikan' ay may pinagmulan sa Latin na 'littera'." },
        { question: "Ang panitikan ay naglalaman lamang ng mga akdang kathang-isip.", answer: "False", explanation: "Naglalaman din ang panitikan ng akdang di-kathang-isip." }
    ]
};

// Function to display the correct quiz container
function displayQuiz(type) {
    // Hide all main containers
    document.querySelectorAll('.container').forEach(el => el.classList.add('hidden'));

    // Show the QUIZZES container
    const quizzesContainer = document.querySelector('#lesson-1-identify').closest('.container');
    quizzesContainer.classList.remove('hidden');

    // Show the selected quiz design container
    document.querySelectorAll('.quiz-design').forEach(el => el.classList.add('hidden'));
    document.getElementById(`lesson-1-${type}`).classList.remove('hidden');

    // Initialize quiz state
    currentType = type;
    currentQuestionIndex = 0;
    score = 0;

    // Display the first question
    displayQuestion();

    // Start the timer
    timeLeft = 5;
    document.querySelector(`#lesson-1-${type} .timer`).textContent = `Time: ${timeLeft}`;
    startTimer();
}

// Function to display the current question
function displayQuestion() {
    const questionData = questions[currentType]?.[currentQuestionIndex];

    if (!questionData) {
        console.error(`No question data found for type "${currentType}" and index ${currentQuestionIndex}`);
        return;
    }

    const questionElement = document.querySelector(`#lesson-1-${currentType} #question`);
    const answerElement = document.querySelector(`#lesson-1-${currentType} #answer`);
    const respondElement = document.querySelector(`#lesson-1-${currentType} #respond`);
    const choicesContainer = document.querySelector(`#lesson-1-${currentType} #choices`);

    // Clear previous question state
    questionElement.textContent = '';
    respondElement.textContent = '';
    answerElement.textContent = '';
    if (choicesContainer) choicesContainer.innerHTML = ''; // Clear multiple-choice options

    // Display the question
    questionElement.textContent = questionData.question;

    // If it's multiple-choice, display choices
    if (currentType === 'multipleChoice') {
        questionData.choices.forEach((choice, index) => {
            const choiceButton = document.createElement('button');
            choiceButton.textContent = choice;
            choiceButton.classList.add('choice-btn');
            choiceButton.onclick = () => checkAnswer(choice.toLowerCase());
            choicesContainer.appendChild(choiceButton);
        });
    }

    // Read the question aloud using TTS (Text-to-Speech)
    readQuestionAloud(questionData.question);
}

// Function to read the question aloud
function readQuestionAloud(questionText) {
    const speech = new SpeechSynthesisUtterance();
    speech.text = questionText;
    speech.lang = 'fil-PH'; // Filipino language
    speech.rate = 1;
    
    speech.onstart = () => {
        // Pause the timer when TTS is speaking
        clearInterval(timer);
    };

    speech.onend = () => {
        // Resume the timer after TTS stops
        startTimer();
    };

    speechSynthesis.speak(speech);
}

// Function to start the timer
function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        document.querySelector(`#lesson-1-${currentType} .timer`).textContent = `Time: ${timeLeft}`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            nextQuestion();  // Move to the next question after timer runs out
        }
    }, 1000);
}

// Function to check the answer
function checkAnswer(userAnswer) {
    const questionData = questions[currentType]?.[currentQuestionIndex];
    const answerElement = document.querySelector(`#lesson-1-${currentType} #answer`);
    const respondElement = document.querySelector(`#lesson-1-${currentType} #respond`);

    if (!questionData) {
        console.error(`No question data found for type "${currentType}" and index ${currentQuestionIndex}`);
        return;
    }

    let userAnswerText = userAnswer.trim();

    if (userAnswerText === '') {
        respondElement.textContent = `Wala kang sagot! Ang tamang sagot ay: ${questionData.answer}. ${questionData.explanation}`;
    } else if (userAnswerText === questionData.answer.toLowerCase()) {
        score += 2;
        respondElement.textContent = `Tama! (+2 puntos)`;
    } else {
        respondElement.textContent = `Mali! Ang tamang sagot ay: ${questionData.answer}. ${questionData.explanation}`;
    }

    answerElement.textContent = `User's Answer: ${userAnswerText}`; // Show the user's answer

    // Update score display
    document.querySelector(`#lesson-1-${currentType} .score`).textContent = `Score: ${score}/10`;

    // Move to the next question after a short delay
    setTimeout(nextQuestion, 3000);
}

// Function to move to the next question
function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions[currentType].length) {
        displayQuestion();
        timeLeft = 5;
        document.querySelector(`#lesson-1-${currentType} .timer`).textContent = `Time: ${timeLeft}`;
        startTimer();
    } else {
        alert(`Tapos na ang quiz! Kabuuang puntos: ${score}`);
        // Optionally reset quiz or show a summary
        displayQuiz('');
    }
}

// Event listeners for buttons to start quizzes
document.getElementById('ToF-1-quiz')?.addEventListener('click', () => displayQuiz('trueFalse'));
document.getElementById('multify-1-quiz')?.addEventListener('click', () => displayQuiz('multipleChoice'));
document.getElementById('identify-1-quiz')?.addEventListener('click', () => displayQuiz('identify'));

// Speech-to-Text Functionality
const micButton = document.getElementById('hold-mic');
let recognition;

if ('webkitSpeechRecognition' in window) {
    recognition = new webkitSpeechRecognition();
    recognition.lang = 'fil-PH';
    recognition.continuous = false;
    recognition.interimResults = false;

    micButton.addEventListener('mousedown', () => {
        recognition.start();
    });

    micButton.addEventListener('mouseup', () => {
        recognition.stop();
    });

    recognition.onresult = function (event) {
        const spokenText = event.results[0][0].transcript.toLowerCase();
        document.querySelector(`#lesson-1-${currentType} #user-respond`).textContent = `Sinabi mo: ${spokenText}`;
        checkAnswer(spokenText);
    };

    recognition.onerror = function (event) {
        console.error('Speech recognition error:', event.error);
    };
}
