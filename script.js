// Array containing quiz questions, options, and the index of the correct answer
const quizData = [
    {
        question: "What is the correct syntax to print a message in the console in JavaScript?",
        options: [
            "print('Hello World')",
            "console.log('Hello World')",
            "echo 'Hello World'",
            "System.out.println('Hello World')"
        ],
        answer: 1 // Index of the correct option in the options array
    },
    {
        question: "Which classic arcade game, released in 1980, features a yellow character who eats dots and is chased by ghosts?",
        options: [
            "Space Invaders",
            "Donkey Kong",
            "Pac-Man",
            "Frogger"
        ],
        answer: 2 // Index of the correct option in the options array
    },
    {
        question: "Which video game character is known as the iconic plumber who saves Princess Peach?",
        options: [
            "Link",
            "Sonic",
            "Mario",
            "Kirby"
        ],
        answer: 2 // Index of the correct option in the options array
    },
    {
        question: "What does === do in JavaScript?",
        options: [
            "Checks if values are the same, ignoring types",
            "Checks if values and types are exactly the same",
            "Assigns a variable",
            "Divides two numbers"
        ],
        answer: 1 // Index of the correct option in the options array
    },
    {
        question: "What is the correct way to declare a variable that cannot be changed later?",
        options: [
            "let",
            "const",
            "var",
            "define"
        ],
        answer: 1 // Index of the correct option in the options array
    },
    {
        question: "Which of these methods would you use to add an item to the end of an array?",
        options: [
            ".push()",
            ".pop()",
            ".shift()",
            ".unshift()"
        ],
        answer: 0 // Index of the correct option in the options array
    },
    {
        question: "What was the name of the first commercially successful arcade video game, released in 1972?",
        options: [
            "Space Invaders",
            "Pong",
            "Asteroids",
            "Breakout"
        ],
        answer: 1 // Index of the correct option in the options array
    },
    {
        question: "Which popular video game series is known for its 'Master Sword' and 'Triforce' icons?",
        options: [
            "Final Fantasy",
            "The Legend of Zelda",
            "Metroid",
            "Dragon Quest"
        ],
        answer: 1 // Index of the correct option in the options array
    },
];

// Variables to keep track of the current question, score, and user's answers
let currentQuestion = 0;
let score = 0;
let userAnswers = [];

// Get references to elements in the HTML using class selectors
const quizContainer = document.querySelector('.quiz');
const startButton = document.querySelector('.start-btn');
const nextButton = document.querySelector('.next-btn');
const submitButton = document.querySelector('.submit-btn');
const restartButton = document.querySelector('.restart-btn');
const progressText = document.querySelector('.progress');
const scoreText = document.querySelector('.score');
const reviewSection = document.querySelector('.review');
const reviewList = document.querySelector('.review-list');
const devider = document.querySelector('.devider');

// Add event listeners to buttons to handle user interactions
startButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', nextQuestion);
submitButton.addEventListener('click', submitQuiz);
restartButton.addEventListener('click', restartQuiz);

// Function to start the quiz
function startQuiz() {
    startButton.classList.add('hide'); // Hide the start button
    progressText.classList.remove('hide'); // Show the progress text
    showQuestion(); // Display the first question
}

// Function to display the current question and options
function showQuestion() {
    clearQuiz(); // Clear any previous content
    progressText.innerText = `Question ${currentQuestion + 1} of ${quizData.length}`; // Update progress

    const questionData = quizData[currentQuestion]; // Get current question data

    // Create and display the question
    const questionElement = document.createElement('div');
    questionElement.classList.add('question');
    questionElement.innerText = questionData.question;
    quizContainer.appendChild(questionElement);

    // Create and display the options
    questionData.options.forEach((option, index) => {
        const optionLabel = document.createElement('label');
        optionLabel.classList.add('option');

        const radioInput = document.createElement('input');
        radioInput.type = 'radio';
        radioInput.name = 'answer';
        radioInput.value = index;

        optionLabel.appendChild(radioInput); // Add radio button to label
        optionLabel.appendChild(document.createTextNode(option)); // Add option text to label
        quizContainer.appendChild(optionLabel); // Add label to quiz container

        // Allow the entire option area to be clickable
        optionLabel.addEventListener('click', () => {
            radioInput.checked = true; // Select the radio button when the label is clicked
        });
    });

    // Show the appropriate button based on the current question
    if (currentQuestion < quizData.length - 1) {
        nextButton.classList.remove('hide'); // Show 'Next Question' button
        devider.classList.remove('hide');
    } else {
        submitButton.classList.remove('hide'); // Show 'Submit Quiz' button
    }
}

// Function to clear the quiz area
function clearQuiz() {
    quizContainer.innerHTML = ''; // Remove all content inside the quiz container
    nextButton.classList.add('hide'); // Hide 'Next Question' button
    submitButton.classList.add('hide'); // Hide 'Submit Quiz' button
    scoreText.classList.add('hide'); // Hide the score display
    reviewSection.classList.add('hide'); // Hide the review section
}

// Function to handle the 'Next Question' button click
function nextQuestion() {
    const selectedOption = document.querySelector('input[name="answer"]:checked'); // Get the selected option
    if (selectedOption) {
        userAnswers.push(parseInt(selectedOption.value)); // Save the user's answer
        currentQuestion++; // Move to the next question
        showQuestion(); // Display the next question
    } else {
        alert('Please select an answer before proceeding.'); // Prompt the user to select an answer
    }
}

// Function to handle the 'Submit Quiz' button click
function submitQuiz() {
    const selectedOption = document.querySelector('input[name="answer"]:checked'); // Get the selected option
    if (selectedOption) {
        userAnswers.push(parseInt(selectedOption.value)); // Save the user's answer
        calculateScore(); // Calculate the total score
        displayScore(); // Display the user's score
    } else {
        alert('Please select an answer before submitting.'); // Prompt the user to select an answer
    }
}

// Function to calculate the user's score based on their answers
function calculateScore() {
    score = 0; // Reset score to 0
    // Loop through the user's answers and compare them to the correct answers
    for (let i = 0; i < quizData.length; i++) {
        if (userAnswers[i] === quizData[i].answer) {
            score++; // Increment score for each correct answer
        }
    }
}

// Function to display the user's score
 /* function displayScore() {
    clearQuiz(); // Clear the quiz area
    progressText.classList.add("hide"); // Hide the progress text
    scoreText.classList.remove("hide"); // Show the score display
    scoreText.innerText = "Your Score: ${score} / ${quizData.length}"; // Display the score
    restartButton.classList.remove("hide"); // Show the 'Restart Quiz' button

    // Create and add the 'Review Answers' button
    const reviewButton = document.createElement("button");
    reviewButton.innerText = "Review Answers";
    reviewButton.classList.add("review-btn");
    reviewButton.addEventListener("click", showReview); // Add event listener to the button
    quizContainer.appendChild(reviewButton);
} */


// Function to display the user's score
function displayScore() {
    clearQuiz(); // Clear the quiz area
    progressText.classList.add('hide'); // Hide the progress text
    scoreText.classList.remove('hide'); // Show the score display
    scoreText.innerText = `Your Score: ${score} / ${quizData.length}`; // Display the score
    restartButton.classList.remove('hide'); // Show the 'Restart Quiz' button

    // Create and add the 'Review Answers' button
    const reviewButton = document.createElement('button');
    reviewButton.innerText = 'Review Answers';
    reviewButton.classList.add('review-btn');
    reviewButton.addEventListener('click', showReview); // Add event listener to the button
    quizContainer.appendChild(reviewButton);
}

// Function to show the review of the user's answers
function showReview() {
    reviewSection.classList.remove('hide'); // Show the review section
    reviewList.innerHTML = ''; // Clear any previous content

    // Loop through each question to display the user's answer and the correct answer
    quizData.forEach((questionData, index) => {
        const reviewItem = document.createElement('div');
        reviewItem.classList.add('review-item');

        // Display the question
        const questionTitle = document.createElement('h3');
        questionTitle.innerText = `Question ${index + 1}: ${questionData.question}`;
        reviewItem.appendChild(questionTitle);

        // Display the user's answer
        const userAnswer = document.createElement('p');
        userAnswer.innerText = `Your Answer: ${questionData.options[userAnswers[index]]}`;
        userAnswer.classList.add(userAnswers[index] === questionData.answer ? 'correct' : 'incorrect'); // Style based on correctness
        reviewItem.appendChild(userAnswer);

        // Display the correct answer
        const correctAnswer = document.createElement('p');
        correctAnswer.innerText = `Correct Answer: ${questionData.options[questionData.answer]}`;
        correctAnswer.classList.add('correct');
        reviewItem.appendChild(correctAnswer);

        // Add the review item to the review list
        reviewList.appendChild(reviewItem);
    });
}

// Function to restart the quiz
function restartQuiz() {
    // Reset all quiz-related variables
    currentQuestion = 0;
    score = 0;
    userAnswers = [];
    restartButton.classList.add("hide"); // Hide the 'Restart Quiz' button
    reviewSection.classList.add("hide"); // Hide the review section
    startButton.classList.remove("hide"); // Show the 'Start Quiz' button
    clearQuiz(); // Clear the quiz area
}
