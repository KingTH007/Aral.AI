// Global Variables
let currentQuestionIndex = 0;
let currentType = '';
let score = 0;
let timer;
let timeLeft = 5; // Timer for each question
let recognition; // Declare Speech Recognition globally

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

// Function to initialize the quiz
function displayQuiz(type) {
    document.querySelectorAll('.container').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.quiz-design').forEach(el => el.classList.add('hidden'));

    const quizContainer = document.querySelector(`#lesson-1-${type}`);
    quizContainer?.closest('.container')?.classList.remove('hidden');
    quizContainer?.classList.remove('hidden');

    currentType = type;
    currentQuestionIndex = 0;
    score = 0;

    displayQuestion();
    timeLeft = 5;
    document.querySelector(`#lesson-1-${type} .timer`).textContent = `Time: ${timeLeft}`;
    startTimer();
}

// Function to start the timer
function startTimer() {
    const timerElement = document.querySelector(`#lesson-1-${currentType} .timer`);
    clearInterval(timer); // Clear any existing timer to prevent overlap

    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            timerElement.textContent = `Time: ${timeLeft}`;
        } else {
            clearInterval(timer);
            timerElement.textContent = "Time's up!";
            autoSubmitAnswer(); // Automatically handle time-out scenario
        }
    }, 1000);
}

// Function to handle time-out
function autoSubmitAnswer() {
    const answerElement = document.getElementById('answer');
    const questionData = questions[currentType]?.[currentQuestionIndex];
    
    if (!questionData) return;

    answerElement.textContent = `Walang sagot! Ang tamang sagot ay: ${questionData.answer}. ${questionData.explanation}`;
    readAnswerAloud(answerElement.textContent);

    setTimeout(nextQuestion, 3000); // Move to the next question after a delay
}
// Other parts of the code remain the same...


// Function to display the current question
function displayQuestion() {
    const questionData = questions[currentType]?.[currentQuestionIndex];

    if (!questionData) {
        console.error(`No question data found for type "${currentType}" and index ${currentQuestionIndex}`);
        return;
    }

    const questionElement = document.getElementById('question');
    const respondElement = document.getElementById('respond');
    const answerElement = document.getElementById('answer');

    // Clear previous content
    questionElement.textContent = '';
    respondElement.textContent = '';
    answerElement.textContent = '';

    // Display the question
    questionElement.textContent = questionData.question;

    // Read the question aloud
    readQuestionAloud(questionData.question);
}

// Function to initialize Speech Recognition (STT)
function setupSTT() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'fil-PH'; // Filipino language
    recognition.continuous = false;
    recognition.interimResults = false;

    const holdMicButton = document.getElementById('hold-mic');
    const respondElement = document.getElementById('respond');
    const answerElement = document.getElementById('answer');

    // Start recognition on button press
    holdMicButton.addEventListener('mousedown', () => {
        recognition.start();
        respondElement.textContent = 'Nakikinig...'; // Feedback while listening
    });

    // Stop recognition on button release
    holdMicButton.addEventListener('mouseup', () => {
        recognition.stop();
    });

    // Handle recognition result
    recognition.onresult = (event) => {
        const userAnswer = event.results[0][0].transcript.toLowerCase().trim();
        respondElement.textContent = `Sinagot mo: ${userAnswer}`;
        checkAnswer(userAnswer);
    };

    // Log errors for debugging
    recognition.onerror = (event) => {
        answerElement.textContent = 'Speech recognition error. Please try again.';
        console.error('STT Error:', event.error); // Log error details
    };
}

// Function to check the answer
function checkAnswer(userAnswer) {
    const questionData = questions[currentType]?.[currentQuestionIndex];
    const answerElement = document.getElementById('answer');

    if (!questionData) return;

    if (userAnswer === '') {
        answerElement.textContent = `Walang sagot! Ang tamang sagot ay: ${questionData.answer}. ${questionData.explanation}`;
        readAnswerAloud(answerElement.textContent, () => nextQuestion()); // Pass the nextQuestion callback
    } else if (userAnswer === questionData.answer.toLowerCase()) {
        score += 2;
        answerElement.textContent = `Tama! (+2 puntos)`;
        readAnswerAloud(answerElement.textContent, () => nextQuestion()); // Pass the nextQuestion callback
    } else {
        answerElement.textContent = `Mali! Ang tamang sagot ay: ${questionData.answer}. ${questionData.explanation}`;
        readAnswerAloud(answerElement.textContent, () => nextQuestion()); // Pass the nextQuestion callback
    }

    document.querySelector(`#lesson-1-${currentType} .score`).textContent = `Score: ${score}`;
}

// Function to read the question aloud
function readQuestionAloud(questionText) {
    const speech = new SpeechSynthesisUtterance();
    speech.text = questionText;
    speech.lang = 'fil-PH'; // Filipino language
    speech.rate = 1;

    // Clear any existing timer when speech starts
    speech.onstart = () => clearInterval(timer);

    // Start the timer only after TTS finishes
    speech.onend = () => {
        timeLeft = 5; // Reset the timer for the new question
        document.querySelector(`#lesson-1-${currentType} .timer`).textContent = `Time: ${timeLeft}`;
        startTimer();
    };

    speechSynthesis.speak(speech);
}

// Function to read the answer aloud with a callback
function readAnswerAloud(answerText, callback) {
    const speech = new SpeechSynthesisUtterance();
    speech.text = answerText;
    speech.lang = 'fil-PH';
    speech.rate = 1;

    // Trigger callback when speech ends
    speech.onend = () => {
        if (typeof callback === 'function') {
            callback();
        }
    };

    speechSynthesis.speak(speech);
}

// Function to move to the next question
function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions[currentType].length) {
        displayQuestion();
        timeLeft = 5;
        startTimer();
    } else {
        alert(`Tapos na ang quiz! Kabuuang puntos: ${score}`);
        displayQuiz('');
    }
}

// Initialize STT and setup event listeners
setupSTT();
document.getElementById('ToF-1-quiz')?.addEventListener('click', () => displayQuiz('trueFalse'));
document.getElementById('multify-1-quiz')?.addEventListener('click', () => displayQuiz('multipleChoice'));
document.getElementById('identify-1-quiz')?.addEventListener('click', () => displayQuiz('identify'));
