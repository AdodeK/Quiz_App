"use strict";

//create a question bank
const questionBank = [
  {
    question: "What is the Capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },

  {
    question: "What year did Nigeria become a Republic?",
    options: ["1942", "1963", "1960", "1976"],
    answer: "1963",
  },

  {
    question: "The Headquarters of ECOWAS is in?",
    options: ["Cameroun", "Sierra Leonne", "Nigeria", "Ghana"],
    answer: "Nigeria",
  },

  {
    question: "These are domestic animals except?",
    options: ["Lion", "Dogs", "Cats", "Parrot"],
    answer: "Lion",
  },
  {
    question: "These are highlevel programming languages except",
    options: ["Python", "HTML", "Javascript", "Typescript"],
    answer: "HTML",
  },
  {
    question: "All but one are cities in Nigeria",
    options: ["Lagos", "Warri", "Texas", "Abuja"],
    answer: "Texas",
  },
];
//quiz div
const quizContainer = document.getElementById("quiz");

const questionContainer = document.getElementById("kueshion");

//results div
const resultContainer = document.getElementById("result");

//h1replaced
const h1Now = document.getElementById("h1Replaced");

//counts
const countIncease = document.getElementById("testnumber");

//all three buttons

const submitButton = document.getElementById("submit");
const retryButton = document.getElementById("retry");
const showAnswerButton = document.getElementById("showAnswer");

//we need to define a mechanism to display the quastions

let currentQuestionIndex = 0;
let score = 0;
let incorrectAnswer = [];

//displayQuestion
//displayQuestion
function displayQuestion() {
  //my configuration
  retryButton.style.display = "none";
  showAnswerButton.style.display = "none";

  const questionData = questionBank[currentQuestionIndex];

  const questionElement = document.createElement("div"); //createElement is a method;
  questionElement.className = "question"; //created div now has a class of question.
  questionElement.innerHTML = questionData.question;

  const optionsElement = document.createElement("div");
  optionsElement.className = "options";

  //shuffling not done
  const options = [...questionData.options]; //three dots is to spread out the object
  for (let i = 0; i < options.length; i++) {
    const option = document.createElement("label");
    option.className = "option";
    //radio for each option
    const radioInput = document.createElement("input");
    radioInput.type = "radio";
    radioInput.className = "styleradio";
    radioInput.name = "quiz";
    radioInput.value = options[i];
    const optionText = document.createTextNode(options[i]); //to create label
    option.appendChild(radioInput);
    option.appendChild(optionText);
    optionsElement.appendChild(option);
  }
  quizContainer.innerHTML = ""; //making sure its empty by default
  questionContainer.innerHTML = "";
  questionContainer.appendChild(questionElement);
  quizContainer.appendChild(optionsElement);
  countIncease.innerHTML = "";
  countIncease.innerHTML = `${currentQuestionIndex} / ${questionBank.length}`;
}

//checkanswer
//checkanswer
function checkAnswer() {
  let selectedOption = document.querySelector("input[name = 'quiz']:checked");
  if (selectedOption) {
    const answer = selectedOption.value;
    if (answer === questionBank[currentQuestionIndex].answer) {
      score++;
    } else {
      incorrectAnswer.push({
        question: questionBank[currentQuestionIndex].question,
        incorrectAnswer: answer,
        correctAnswer: questionBank[currentQuestionIndex].answer,
      });
    }
  }
  currentQuestionIndex++;
  selectedOption = false;
  if (currentQuestionIndex < questionBank.length) {
    displayQuestion();
  } else {
    displayResult();
    countIncease.innerHTML = `${currentQuestionIndex} / ${questionBank.length}`;
  }
}

//displayresult
function displayResult() {
  quizContainer.style.display = "none";
  questionContainer.style.display = "none";
  submitButton.style.display = "none";
  retryButton.style.display = "inline-block";
  showAnswerButton.style.display = "inline-block";
  h1Now.innerHTML = `GOOD JOB YOU SCORED ${score} out of ${questionBank.length}`;
  resultContainer.style.display = "none";
}

//retryquiz
function retryQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  incorrectAnswer = [];
  quizContainer.style.display = "block";
  questionContainer.style.display = "block";
  submitButton.style.display = "inline-block";
  retryButton.style.display = "none";
  showAnswerButton.style.display = "none";
  resultContainer.innerHTML = "";
  h1Now.innerHTML = "Javascript Beginner's Test";
  displayQuestion();
}

//showanswer
//showanswer
function showAnswer() {
  quizContainer.style.display = "none";
  questionContainer.style.display = "none";
  submitButton.style.display = "none";
  showAnswerButton.style.display = "none";
  let incorrectAnswerHtml = "";
  for (let i = 0; i < incorrectAnswer.length; i++) {
    incorrectAnswerHtml += `
    <p class = 'herenow'>
    <strong>${i + 1}.  Question:</strong> ${incorrectAnswer[i].question} <br>
    <strong>Your Answer:</strong> ${incorrectAnswer[i].incorrectAnswer} <br>
    <strong>Correct Answer:</strong> ${incorrectAnswer[i].correctAnswer} <br>
    </p>`;
  }
  resultContainer.style.display = "inline-block";
  resultContainer.innerHTML = `
  <p class = 'herenow'> You scored ${score} out of ${questionBank.length}!</p>
  <p class = 'herenow'> Correct Answers: ${score}</p>
  ${incorrectAnswerHtml}
  `;
}

submitButton.addEventListener("click", checkAnswer); //you don't put parenthesis, cos it'll fire already..
retryButton.addEventListener("click", retryQuiz);
showAnswerButton.addEventListener("click", showAnswer);
displayQuestion();
