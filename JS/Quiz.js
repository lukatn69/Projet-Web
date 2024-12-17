// Global variables
var currentQuestion = {};
var acceptingAnswers = true;
var score = 0;
var questionCounter = 0;
var availableQuestions = [];

// Questions list
var questions = [
    {
        question:"Which agent is known as the 'Radiant Duelist'?",
        choice1:'Phoenix',
        choice2:'Jett',
        choice3:'Raze',
        choice4:'Reyna',
        answer:4
    },
    {
        question:"Which ability is used to heal allies in Valorant?",
        choice1:'Hot Hands',
        choice2:'Regrowth',
        choice3:'Heal Orb',
        choice4:'Sky Smoke',
        answer:3
        
    },
    {
        question: "What is the currency used to buy weapons in Valorant?",
        choice1:'Credits',
        choice2:'Valor Coins',
        choice3:'Gold',
        choice4:'Orbs',
        answer:1
    },
    {
        question: "What is the maximum number of rounds in a standard Valorant game?",
        choice1:'13',
        choice2:'24',
        choice3:'25',
        choice4:'26',
        answer:2
    },
    {
        question: "Which agent has the ability 'Shock Dart'?", 
        choice1:'Sova',
        choice2:'Brimstone',
        choice3:'Omen',
        choice4:'Viper',
        answer:1
    },
    {
        question: "How many players are on a team in a standard Valorant match?",
        choice1:'4',
        choice2:'5',
        choice3:'6',
        choice4:'7',
        answer:2
    },
    {
        question: "What is the name of Jett's ultimate ability?",
        choice1:'Tailwind',
        choice2:'Blade Storm',
        choice3:'Cloudburst',
        choice4:'Updraft',
        answer:2
    },
    {
        question: "Which agent can deploy 'Toxic Screen'?",
        choice1:'Viper',
        choice2:'Omen',
        choice3:'Sage',
        choice4:'Brimstone',
        answer:1
    },
    {
        question: "What is the win condition for a round in Valorant?",
        choice1:'Killing all enemies',
        choice2:'Planting the Spike and letting it explode',
        choice3:'Defusing the Spike',
        choice4:'All of the above',
        answer:4
    },
    {
        question: "Which map has teleporters?",
        choices: ["", "", "", ""],
        choice1:'Split',
        choice2:'Bind',
        choice3:'Ascent',
        choice4:'Haven',
        answer:2
    },
];

//Constants
const SCORE_POINTS = 100;
const MAX_QUESTIONS = questions.length;

// Picking elements
var question = document.getElementById("question");
var choices = Array.from(document.getElementsByClassName("choice-text"));
var progressText = document.getElementById("progressText");
var scoreText = document.getElementById("score");
var progressBarFull = document.getElementById("progressBarFull");

// Quiz Start
function startGame() {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
}

// Next question generation
function getNewQuestion() {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        alert(`Quiz completed! Your final score is: ${score}`);
        return;
       
    }

    questionCounter++;
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
        choice.classList.remove("correct", "incorrect");
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
}

// Answer verification
choices.forEach(choice => {
    choice.addEventListener("click", function (e) {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        selectedChoice.classList.add(classToApply);

        if (classToApply === "correct") {
            incrementScore(SCORE_POINTS);
        }

        // Class application for correct answers 
        choices.forEach(choice => {
            if (choice.dataset["number"] == currentQuestion.answer) {
                choice.classList.add("correct");
            }
        });

        setTimeout(() => {
            getNewQuestion();
        }, 1500); 
    });
});

// Score counter
function incrementScore(num) {
    score += num;
    scoreText.innerText = score;
}

startGame();

