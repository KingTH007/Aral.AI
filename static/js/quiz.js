    // DOM Elements
    const instructionButtons = document.querySelectorAll(".instruction-btn-design"); // "SIMULAN" buttons

    // Speech Recognition and Synthesis
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "fil-PH";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;  // Limit number of alternatives to avoid confusion

    const synth = window.speechSynthesis;

    // Quiz Data (example for lesson1 and lesson2)
    const questions = {
        lesson1: {
            ToF: [
                { question: "Ang salitang 'panitikan' ay nagmula sa salitang Latin na 'littera'.", answer: "Tama", explanation: "Ang salitang 'panitikan' ay may pinagmulan sa Latin na 'littera'." }
            ],
            multiple: [
                { question: "Ito ay nagmumula sa salitang 'pang-titik-an' na ibig sabihin ay literatura o mga akdang nasusulat. A. Salawikain B. Sawikain C. Bugtong D. Panitikan",
                    answer: "Panitikan",
                    explanation: "Ang panitikan ay nangangahulugan ng literatura o mga nasusulat na akda."}
            ],
            identify: [
                { question: "Anong anyo ng panitikan ang nagbibigay ng magagandang aral o gabay sa pamumuhay?", answer: "salawikain", explanation: "Ang salawikain ay nagbibigay-aral at ginagamit bilang gabay sa pamumuhay." },
                { question: "Ano ang tawag sa tanong o pangungusap na may nakatagong kahulugan na nilulutas bilang palaisipan?", answer: "bugtong", explanation: "Isang pangungusap o tanong na may doble o nakatagong kahulugan na nilulutas bilang isang palaisipan." },
                { question: "Ano ang tawag sa mga kasabihan o kawikaan na may dalang aral at ginagamit bilang idyoma?", answer: "sawikain", explanation: "Ang sawikain ay kasabihan o kawikaan na may dalang aral na maaaring tumukoysa isang idyoma, isang pagpapahayag na ang kahulugan ay hindi komposisyunal omatatalinghagang salita."},
                { question: "Ano ang tawag sa bahagi ng kulturang pilipino na ipinasa pa galing sa mga ninuno?", answer: "kasabihan", explanation: "Ang kasabihan ay bahagi na ng kulturang Pilipino. Ito ay ipinasa sa atin ng ating mga ninuno, ang kasabihan ay nagbibigay ng paalala at mabuting aral sa atin."},
                { question: "Anong akdang may kinalaman sa kathang-isip, pag-ibig, at kasaysayan?", answer: "panitikan", explanation: "Ito ay nagmula sa salitang “pang-titik-an” na ang ibig sabihin ay literatura o mgaakdang nasusulat."}
            ]
        },
        lesson2: {
            ToF: [
                { question: "Ang paghahambing na magkatulad ay nagpapakita ng magkaibang antas ng katangian ng dalawang bagay.", answer: "mali", explanation: "Ginagamit ito kung ang dalawang ihinahambing ay antas na katangian ng isang bagay o anuman." }
            ],
            multiple: [
                { question: "Alin ang ginagamit sa paghahambing na di-magkatulad, pasahol? A. Mas B. Di-lubha C. Kasing- D. Di-lubha",
                    answer: "di Lubha",
                    explanation: "Ang PASAHOL ay paghahambing ng mas maliit o may mahabangkatangian halimbawa ang salitang di-lubha."}
            ],
            identify: [
                { question: "Anong uri ng paghahambing na di-magkatulad kung saan ang isa ay nakahihigit sa isa pa?", answer: "palamang", explanation: "Ang PALAMANG naman ay nakahihigit o nakalalamang ang katangian sa isang dalawang pinaghahambing." }
            ]
        },
        lesson3: {
            ToF: [
                { question: "Ang epiko ay tumatalakay sa kabayanihan at makakabalaghan.", answer: "tama", explanation: "Ang Epiko ay tumatalakay sa kabayanihan at pakikipagtunggali ng isang tao o mga tao laban samga kaaway. Halos hindi kapani paniwala ang mga tagpuan dahilmakakabalaghan ang mga ito." }
            ],
            multiple: [
                { question: "Aling salita ang ginagamit upang ipakita ang sanhi? A. At B. Dahil C. Ay D. Sina",
                    answer: "dahil",
                    explanation: "Ang sanhi ay tumutukoy sa pinagmulan o dahilan ng isang pangyayari."}
            ],
            identify: [
                { question: "Ito ang kinalabasan o dulot ng isang pangyayari.", answer: "bunga", explanation: "Ang bunga  ay ang siyang kinalabasan o dulot ng naturang pangyayari." }
            ]
        },
        lesson4: {
            ToF: [
                { question: "Ang sugnay na di-makapag-iisa ay may buong diwa at maaring ituring na pangungusap.", answer: "mali", explanation: "Ang Sugnay na di-makapag-iisa ay mayroon itong simuno at panaguri ngunit hindi buo ang diwa kaya gumaganap lamang bilang bahagi ng pananalita tulad ng sugnay na pang-uri, pang-abay at pangngalan." }
            ],
            multiple: [
                { question: "Anong uri ng sugnay ang “sapagkat masipag mag-aral”? A. Sugnay na Makapag-iisa B. Sugnay na Di-makapag-iisa C. Tambalang Pangungusap D. Hugnayang Pangungusap",
                    answer: "Sugnay na Di Makapag iisa",
                    explanation: "Ang Sugnay na di-makapag-iisa ay mayroon itong simuno at panaguri ngunit hindi buo ang diwa."}
            ],
            identify: [
                { question: "Anong tawag sa isang pangungusap na may isang buong diwa at kaisipan?", answer: "payak na pangungusap", explanation: "Ang Payak na Pangungusap ay may isang buong diwa at kaisipan." }
            ]
        },
        lesson5: {
            ToF: [
                { question: "Ang `TV Patrol` ay tamang paggamit ng malaking titik para sa pamagat ng palabas.", answer: "Tama", explanation: "Ang mga aklat, kwento, at ang mga palabas ay ginagamitan ng malaking titik bawat salita. " }
            ],
            multiple: [
                { question: "Alin sa mga sumusunod ang tiyak na pangngalan? A. aso B. Anna C. lapis D. bahay",
                    answer: "anna",
                    explanation: "Ang lahat na tiyak na pangngalan ng TAO, BAGAY, LUGAR, PANGYAYARI at HAYOP ay nakasulat sa malaking titik."}
            ],
            identify: [
                { question: "Sa anong uri ng mga pangalan ginagamit ang malaking titik, tulad ng `Anna`` o `Bohol`?", answer: "tiyak na pangngalan", explanation: "Ang lahat na tiyak na pangngalan ng TAO, BAGAY, LUGAR, PANGYAYARI at HAYOP ay nakasulat sa malaking titik." }
            ]
        },
        lesson6: {
            ToF: [
                { question: "Ginagamit ang gitling (-) upang paghiwalayin ang mga sugnay na walang pangatnig.", answer: "mali", explanation: "Ginagamit ang gitling (-) sa loob ng salita sa mga sumusunod na pagkakataon." }
            ],
            multiple: [
                { question: "Anong bantas ang ginagamit sa pagpapahayag ng matinding damdamin? A. Kuwit B. Padamdam C. Tuldok D. Pananong",
                    answer: "padamdam",
                    explanation: "Ang bantas na padamdam ay ginagamit sa hulihan ng isang kataga, parirala opangungusap na nagsasaad ng matindi o masidhing damdamin."}
            ],
            identify: [
                { question: "Bantas na ginagamit sa pangungusap na patanong.", answer: "pananong", explanation: "Ang Pananong ay ginagamit sa pangungusap na patanong." }
            ]
        }
    };

    // Global Variables
    let currentLesson = "";
    let currentType = "";
    let currentQuestionIndex = 0;
    let score = 0;
    let timer;
    let timeLeft = 10;
    let isTTSCompleted = false; // Flag to check if TTS is completed

    function hideAllContainer() {
        document.querySelectorAll(".container").forEach(container => {
            container.classList.add("hidden");
        });
    }

    function hideAllQuiz() {
        document.querySelectorAll(".quiz-design").forEach(quiz => {
            quiz.classList.add("hidden");
        });
    }

    // Initialize Quiz
    function initializeQuiz(type, lessonId) {
        hideAllContainer();
        hideAllQuiz();

        const quizLessonId = `lesson-${lessonId}-${type}`;
        const quizLesson = document.querySelector(`#${quizLessonId}`);

        if (!quizLesson) {
            console.error(`Quiz container with ID "${quizLessonId}" not found.`);
            return;
        }

        quizLesson.classList.remove("hidden");
        quizLesson.parentElement.classList.remove("hidden");

        currentLesson = `lesson${lessonId}`;
        currentType = type;
        currentQuestionIndex = 0;
        score = 0;

        shuffledQuestions = [...questions[currentLesson][currentType]];

        const startButton = quizLesson.querySelector(`#start-${lessonId}-${type}`);
        if (startButton) {
            startButton.onclick = () => {
                displayQuestion();
            };
        } else {
            console.error(`"Start" button not found in quiz container "${quizLessonId}".`);
        }

        // Initialize mic button
        const micButton = quizLesson.querySelector(`#mic-${lessonId}-${type}`);
        if (micButton) {
            micButton.addEventListener("mousedown", () => {
                try {
                    recognition.start();
                } catch (error) {
                    console.error("Error starting microphone: ", error);
                }
            });

            micButton.addEventListener("mouseup", () => {
                try {
                    recognition.stop();
                } catch (error) {
                    console.error("Error stopping microphone: ", error);
                }
            });
        }
    }

    function updateScore() {
        // Get the correct score element for the current lesson and question type
        const scoreDisplay = document.getElementById(`score-${currentLesson.split('lesson')[1]}-${currentType}`);
        if (scoreDisplay) {
            scoreDisplay.textContent = `Puntos: ${score}`; // Update the displayed score
        } else {
            console.error("Score element not found.");
        }
    }

    // Display Question
    function displayQuestion() {
        const questionData = shuffledQuestions[currentQuestionIndex];
        if (!questionData) {
            endQuiz();
            return;
        }

        const questionElem = document.getElementById(`question-${currentLesson.split('lesson')[1]}-${currentType}`);
        const respondElem = document.getElementById(`respond-${currentLesson.split('lesson')[1]}-${currentType}`);

        if (questionElem) questionElem.textContent = questionData.question;

        respondElem.innerHTML = "";

        speak(questionData.question, () => {
            resetTimer();
            startTimer();
        });
    }

    // Speak Function
    function speak(text, callback) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "fil-PH"; // Set language to Filipino/Tagalog
    
        utterance.onstart = () => {
            isTTSActive = true; // TTS started speaking
        };
    
        utterance.onend = () => {
            isTTSActive = false; // TTS has finished speaking
            if (callback) callback();
        };
    
        synth.speak(utterance);
    }

    // Reset Timer
    function resetTimer() {
        clearInterval(timer);
        timeLeft = 10;
        const timerElement = document.querySelector(`#timer-${currentLesson.split('lesson')[1]}-${currentType}`);
        if (timerElement) timerElement.textContent = `Time: ${timeLeft}`;
    }

    // Start Timer
    function startTimer() {
        const timerElement = document.querySelector(`#timer-${currentLesson.split('lesson')[1]}-${currentType}`);

        timer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                if (timerElement) timerElement.textContent = `Time: ${timeLeft}`;
            } else {
                clearInterval(timer);
                if (timerElement) timerElement.textContent = "Time's up!";
                handleTimeout();
            }
        }, 1000);
    }

    // Check Answer
    function checkAnswer(answer) {
        // Stop the timer when the user responds
        clearInterval(timer);
        
        const timerElement = document.querySelector(`#timer-${currentLesson.split('lesson')[1]}-${currentType}`);
        if (timerElement) timerElement.textContent = "Timer stopped.";
    
        const questionData = questions[currentLesson]?.[currentType]?.[currentQuestionIndex];
        if (!questionData) return;
    
        const normalizedAnswer = normalizeAnswer(answer);
        const correctAnswer = normalizeAnswer(questionData.answer);
    
        const respondElem = document.getElementById(`respond-${currentLesson.split('lesson')[1]}-${currentType}`);
        const answerElem = document.getElementById(`answer-${currentLesson.split('lesson')[1]}-${currentType}`);
    
        if (respondElem) respondElem.textContent = `${answer}`;
    
        if (normalizedAnswer === correctAnswer) {
            score += 2;  // Correct answer, increment score
            if (answerElem) {
                answerElem.textContent = `Tama! ${questionData.explanation}`;
            }
            speak(answerElem.textContent, () => {
                isTTSCompleted = true; // Set the flag when TTS is done
                if (isTTSCompleted) {
                    updateScore();  // Update score display
                    nextQuestion();
                }
            });
        } else {
            if (answerElem) {
                answerElem.textContent = `Mali! Ang tamang sagot ay ${questionData.answer}. ${questionData.explanation}`;
            }
            speak(answerElem.textContent, () => {
                isTTSCompleted = true; // Set the flag when TTS is done
                if (isTTSCompleted) {
                    updateScore();  // Update score display
                    nextQuestion();
                }
            });
        }
    }

    // Function to normalize answers
    function normalizeAnswer(answer) {
        return answer.trim().toLowerCase().replace(/[^\w\s]/g, '');
    }

    // Handle Timeout
    function handleTimeout() {
        const questionData = shuffledQuestions[currentQuestionIndex];
        if (!questionData) return;

        const answerElem = document.getElementById(`answer-${currentLesson.split('lesson')[1]}-${currentType}`);
        if (answerElem) answerElem.textContent = `Walang sagot! Ang tamang sagot ay: ${questionData.answer}.`;
        speak(answerElem.textContent, nextQuestion);
    }

    // Next Question
    function nextQuestion() {
        // Clear the answer element before moving to the next question
        const answerElem = document.getElementById(`answer-${currentLesson.split('lesson')[1]}-${currentType}`);
        if (answerElem) {
            answerElem.textContent = "";
        }
    
        // Move to the next question
        currentQuestionIndex++;
        if (currentQuestionIndex < shuffledQuestions.length) {
            displayQuestion();
        } else {
            endQuiz();
        }
    }    

    // End Quiz
    function endQuiz() {
        // Clear the question, answer, and respond elements
        const questionElem = document.getElementById(`question-${currentLesson.split('lesson')[1]}-${currentType}`);
        const respondElem = document.getElementById(`respond-${currentLesson.split('lesson')[1]}-${currentType}`);
        const answerElem = document.getElementById(`answer-${currentLesson.split('lesson')[1]}-${currentType}`);
    
        if (questionElem) questionElem.textContent = "";
        if (respondElem) respondElem.textContent = "";
        if (answerElem) answerElem.textContent = "";
    
        // Display the quiz result
        alert(`Tapos na ang quiz! Kabuuang puntos: ${score}`);
    
        // Optionally, reset variables to prepare for the next quiz
        currentQuestionIndex = 0;
        score = 0;
        timeLeft = 10;  // Reset time if necessary
    
        // Clear the timer and stop any ongoing speech
        clearInterval(timer);
    
        // Clear the score display after quiz ends (optional, can reset to 0)
        updateScore();  // Reset score display to 0
    }

    // Event Listeners for buttons
    instructionButtons.forEach(button => {
        button.addEventListener("click", () => {
            const parts = button.id.split("-");
            const lessonId = parts[1];
            const type = parts[2];
            initializeQuiz(type, lessonId);
        });
    });

    // Add event listener for recognition start and end
    recognition.addEventListener("start", () => {
        console.log("Speech recognition started.");
    });

    recognition.addEventListener("end", () => {
        console.log("Speech recognition ended.");
    });

    recognition.addEventListener("result", (event) => {
        const answer = event.results[0][0].transcript.trim();
        checkAnswer(answer); // Call checkAnswer with the spoken answer
    });