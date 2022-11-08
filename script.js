// constante
const container = document.querySelector(".container"); // getting container from html for green and red answer
const bgAnswer = document.getElementById("bgAnswer"); // getting the id of h1 by id
const startButton = document.querySelector("#startBtn"); // getting the start button by id
const nextButton = document.querySelector("#nextBtn"); // getting the next button by id
const restartBtn = document.querySelector("#restartBtn"); // getting the next button by id
const scoreText = document.querySelector("#scoreText"); // getting the next button by id
const numberQuestion = document.querySelector("#numberQuestion"); // getting numberQuestion
const questionContainer = document.querySelector("#questionContainer"); // getting the question container by id
const resultCont = document.getElementById("result"); //  getting result container class
const questionElement = document.querySelector("#question"); // getting the question id
const answerButtonsElement = document.getElementById("answerBtn"); // getting the id of answerBtn
const option1 = document.getElementById("option1"); // getting answer 1
const option2 = document.getElementById("option2"); // getting answer 2
const option3 = document.getElementById("option3"); // getting answer 3
const option4 = document.getElementById("option4"); // getting answer 4
const timer = document.getElementById("timer"); // getting Timer
const congrat = document.getElementById("congrat"); // getting congrat id
const highScoreContainer = document.querySelector(".highScoreContainer"); // getting highScoreContainer

// variable
let currentQuestion = 0; // current question
let score = 0; // score
let questionCounter = 0;
let totalQuestions = questions.length; // total of questions
let countdownTimer = 30; // timer set at 45 seconds
let highScore = 0;
let getHighScoreName;

// onLoad function
window.onload = function () {
  let scoreFromBrowser = localStorage.getItem("highScore");
  if (scoreFromBrowser != undefined) highScore = scoreFromBrowser;
  document.getElementById("bestScore").innerHTML = highScore;
};

// starting the game with the function showQustion with random shuffled question
startButton.addEventListener("click", () => {
  startButton.classList.add("hide");
  document.getElementById("audioGame").play();
  highScoreContainer.classList.add("hide");
  questionContainer.classList.remove("hide");
  scoreText.classList.remove("hide");
  numberQuestion.classList.remove("hide");
  bgAnswer.textContent = "Game In Progress Good Luck!";
  shuffeldQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestion = 0;
  scoreText.textContent = `Score : 0`;
  questionCounter = 1;
  numberQuestion.textContent = `Question : ${questionCounter} /25`;
  showQuestion(currentQuestion++);
  // show start countdown
  timer.innerText = `${countdownTimer}`;
  // countdown with condition if reaching 0
  setInterval(() => {
    --countdownTimer;
    timer.innerText = `${countdownTimer}`;
    // when timer reach 0
    if (countdownTimer == 0) {
      nextButton.classList.remove("hide");
      questionContainer.classList.add("hide");
      // condition change background timer
    } else if (countdownTimer <= 20) {
      timer.style.background = "Orange";
    }
    if (countdownTimer <= 10) {
      timer.style.background = "Red";
    }
  }, 1000);
});

//  Next boutton for next question
nextButton.addEventListener("click", () => {
  questionContainer.classList.remove("hide");
  nextButton.classList.add("hide");
  numberQuestion.textContent = `Question : ${(questionCounter += 1)}/25`;
  bgAnswer.style.background = "initial";
  bgAnswer.textContent = "Game In Progress Good Luck!";
  timer.style.background = "green";
  showQuestion(currentQuestion++);
  countdownTimer = 31;
});

// show the question with answer and correct answer condition
function showQuestion(questionIndex) {
  let q = questions[questionIndex];
  // inject question to dom html
  questionElement.textContent = questionIndex + 1 + " : " + q.question;
  // inject answer option to dom html
  option1.textContent = q.option1;
  option2.textContent = q.option2;
  option3.textContent = q.option3;
  option4.textContent = q.option4;

  // correct answer condition made with ternaires
  option1.addEventListener("click", () => {
    option1.textContent == q.answer ? goodAnswer() : wrongAnswer();
  });

  option2.addEventListener("click", () => {
    option2.textContent == q.answer ? goodAnswer() : wrongAnswer();
  });

  option3.addEventListener("click", () => {
    option3.textContent == q.answer ? goodAnswer() : wrongAnswer();
  });

  option4.addEventListener("click", () => {
    option4.textContent == q.answer ? goodAnswer() : wrongAnswer();
  });

  // function end game after 25 question
  endGame();
}

// good answer function with incrementation of score
function goodAnswer() {
  bgAnswer.style.background = "green";
  bgAnswer.textContent = "Correct Well Done ";
  scoreText.textContent = `Score : ${(score += 10)}`;
  nextButton.classList.remove("hide");
  questionContainer.classList.add("hide");
}

// wrong answer function
function wrongAnswer() {
  bgAnswer.style.background = "red";
  bgAnswer.textContent = "Oh No It's Wrong";
  nextButton.classList.remove("hide");
  questionContainer.classList.add("hide");
}

// next question with shuffeld
function nextQuestion() {
  showQuestion(shuffeldQuestions[currentQuestion]);
}

// function end game with restart the game
function endGame() {
  if (questionCounter > 25) {
    questionContainer.classList.add("hide");
    numberQuestion.classList.add("hide");
    restartBtn.classList.remove("hide");
    congrat.classList.remove("hide");
    congrat.textContent = `Well done you are now done with the quiz ! Your Score is : ${score} and it is : ${Math.round(
      (score / 250) * 100
    )} %`;
    // condition high score
    if (score > highScore) {
      highScore = score;
    }
    // local storage high score
    localStorage.setItem("highScore", highScore);
    // restart game button
    restartBtn.addEventListener("click", () => {
      location.reload(true);
    });
  }
}
