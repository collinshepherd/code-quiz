var highScoreButton = document.getElementById("high-scores-button");
var highScorePage = document.getElementById("high-score-page");
var quizContainer = document.getElementById("coding-quiz");
var questionEl = document.getElementById("question");
var startButton = document.getElementById("start-button");
var quizTitle = document.getElementById("quiz-title");
var testingThis = document.getElementById("quiz-questions");

var randomInt = 0;
var score = 0;
var timerText = document.getElementById("timer");
var time = 100;
var isGameOver = false;
var goingAgain = false;

var quizQuestions;

highScoreButton.addEventListener("click", function (event) {
  var state = highScorePage.getAttribute("data-state");
  if (isGameOver) {
    goingAgain = true;
    quizContainer.style.display = "block";
    testingThis.style.display = "none";
    quizTitle.style.display = "block";

    highScorePage.style.display = "none";
    highScorePage.dataset.state = "hidden";

    highScoreButton.textContent = "View High Scores";
    isGameOver = false;
  } else {
    if (state === "hidden") {
      // Showing the High Score container
      highScorePage.dataset.state = "show";
      highScorePage.style.display = "block";

      // Removing the quiz container from view
      quizContainer.style.display = "none";
      quizContainer.dataset.state = "hidden";

      // Setting the text on the button on the top left
      highScoreButton.textContent = "Go back to the quiz";
    } else {
      // Bringing the quiz container back into view
      quizContainer.dataset.state = "show";
      quizContainer.style.display = "block";

      // Putting the high score page back to hidden
      highScorePage.style.display = "none";
      highScorePage.dataset.state = "hidden";

      // Setting the text on the button on the top left
      highScoreButton.textContent = "View High Scores";
    }
  }
});

startButton.addEventListener("click", function () {
  // Getting a random question to
  quizTitle.style.display = "none";
  testingThis.style.display = "grid";
  declareVariables();
  showNextQuestion();
  startTimer();
});

function showNextQuestion() {
  randomInt = Math.floor(Math.random() * quizQuestions.length);
  var question = quizQuestions[randomInt].question;
  var answers = quizQuestions[randomInt].answers;

  questionEl.textContent = question;

  if (quizQuestions.length > 3 && !goingAgain) {
    for (var i = 0; i < answers.length; i++) {
      var choiceText = document.createElement("button");
      choiceText.name = "answer";
      choiceText.value = i;
      choiceText.textContent = answers[i].text;
      choiceText.setAttribute("id", "answer" + i);
      testingThis.appendChild(choiceText);
    }
  } else {
    for (var i = 0; i < answers.length; i++) {
      var choiceText = document.getElementById("answer" + i);
      choiceText.textContent = answers[i].text;
    }
  }
}

testingThis.addEventListener("click", function (event) {
  var selectedAns = event.target;

  if (selectedAns.matches("button")) {
    if (quizQuestions[randomInt].answers[selectedAns.value].isCorrect) {
      score++;
      console.log(score);
      if (quizQuestions.length > 1) {
        minusQuestion();
        showNextQuestion();
      } else {
        gameOver();
        console.log("This will be an game-over function");
      }
    } else {
      time = time - 10;
      if (quizQuestions.length > 1) {
        minusQuestion();
        showNextQuestion();
      } else {
        gameOver();
      }
    }
  }
});

function minusQuestion() {
  var index = quizQuestions.indexOf(quizQuestions[randomInt]);
  if (index > -1) {
    quizQuestions.splice(index, 1);
  }
}

function startTimer() {
  time = 100;
  var timeInterval = setInterval(function () {
    time--;
    timerText.textContent = time;

    if (time === 0) {
      clearInterval(timeInterval);
    }
  }, 1000);
}

function gameOver() {
  isGameOver = true;
  time = 1;
  var state = highScorePage.getAttribute("data-state");

  // Removing the quiz container from view
  quizContainer.style.display = "none";
  quizContainer.dataset.state = "hidden";

  storeUserValues();
  init();
  setHighScores();

  if (state === "hidden") {
    // Showing the High Score container
    highScorePage.dataset.state = "show";
    highScorePage.style.display = "block";

    // Setting the text on the button on the top left
    highScoreButton.textContent = "Retake the quiz";
  }

  declareVariables();
}

function storeUserValues() {
  var username = window.prompt("Enter your first and last name (first last)");

  var highScores = JSON.parse(localStorage.getItem("score"));
  var highScoreNames = JSON.parse(localStorage.getItem("names"));

  highScoreNames[highScoreNames.length] = username;
  highScores[highScores.length] = score;

  localStorage.setItem("score", JSON.stringify(highScores));
  localStorage.setItem("names", JSON.stringify(highScoreNames));

  console.log(JSON.parse(localStorage.getItem("score")));
}

function init() {
  var names = JSON.parse(localStorage.getItem("names"));
  if (names !== null) {
    storedNames = names;
  }
  var scores = JSON.parse(localStorage.getItem("score"));
  if (scores !== null) {
    storedScores = scores;
  }
}

var storedNames = [];
var storedScores = [];

function setHighScores() {
  var scoreContainerEl = document.createElement("div");
  for (var i = 0; i < storedNames.length; i++) {
    var scoreEl = document.createElement("li");
    scoreEl.setAttribute("class", "highScoresText" + i);
    scoreEl.textContent = storedNames[i] + ": " + storedScores[i];
    scoreContainer.appendChild(scoreEl);
    highScorePage.appendChild(scoreContainer);
  }
}

function declareVariables() {
  randomInt = 0;
  score = 0;

  quizQuestions = [
    {
      question: "Inside which HTML element do we put the JavaScript?",
      answers: [
        { text: "<js>", isCorrect: false },
        { text: "<script>", isCorrect: true },
        { text: "<scripting>", isCorrect: false },
        { text: "<javascript>", isCorrect: false },
      ],
    },
    {
      question: "Which one of the following will provide no errors?",
      answers: [
        { text: "i =+ 1;", isCorrect: false },
        { text: "i += 1;", isCorrect: true },
        { text: "i = i ++ 1", isCorrect: false },
        { text: "+i+;", isCorrect: false },
      ],
    },
    {
      question: "How do you create a new function in JavaScript?",
      answers: [
        { text: "new.function() {}", isCorrect: false },
        { text: "function = myFunction() {}", isCorrect: false },
        { text: "function:myFunction() {}", isCorrect: false },
        { text: "function myFunction() {}", isCorrect: true },
      ],
    },
    {
      question: "Which of the following does the pop() method do?",
      answers: [
        { text: "It increments the total length by 1", isCorrect: false },
        { text: "It decrements the total length by 1", isCorrect: false },
        {
          text: "It prints the first element but no effect on the length",
          isCorrect: false,
        },
        { text: "None of the above options", isCorrect: true },
      ],
    },
  ];
}

init();
setHighScores();
