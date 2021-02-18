console.log('do you see me?');

var questions = [
    {
        title: '"Hello" is a type of ...',
        choices: ["boolean", "alert", "number", "string"],
        answer: "string"
    },
    {
        title: "What does NaN mean?",
        choices: ["Not a Number", "National Action Network", "No Action Necessary", "Not a Name"],
        answer: "Not a Number"
    },
    {
        title: "Which company developed JavaScript?",
        choices: ["Mozilla", "Apple", "Netscape", "Microsoft"],
        answer: "Netscape"
    },
    {
        title: "Which symbol is used for single line comments in Javascript?",
        choices: ["/*", "!--", "...", "//"],
        answer: "//"
    },
    {
        title: "Which of the following are not looping structures in Javascript:",
        choices: ["For", "Else", "While", "Do-while"],
        answer: "Else"
    },
];
console.log(questions);

var score = 0;
var questionArr = 0;

var quizBox = document.querySelector("#quizBox");
var timer = document.querySelector("#timer");
var questionsBox = document.querySelector('#questionsBox');
var startQuiz = document.querySelector("#startQuiz");

var startingTime = 100;
var secondsLeft = 0;
var error = 20;
var ulMaker = document.createElement('ul');

startQuiz.addEventListener("click", function () {
    if (secondsLeft === 0) {
        secondsLeft = setInterval(function () {
            startingTime--;
            timer.textContent = "Time: " + startingTime;

            if (startingTime <= 0) {
                clearInterval(secondsLeft);
                allDone();
                timer.textContent = "Time's up!";
            }
        }, 1000);
    }
    render(questionArr);
});
console.log(startQuiz);

function render(questionArr) {
    questionsBox.innerHTML = "";
    ulMaker.innerHTML = "";
    for (var i = 0; i < questions.length; i++) {
        var userQuestion = questions[questionArr].title;
        var userChoices = questions[questionArr].choices;
        questionsBox.textContent = userQuestion;
    }
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsBox.appendChild(ulMaker);
        ulMaker.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}
console.log(questionArr);

function compare(event) {
    var element = event.target;

    if (element.matches("li")) {

        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");

        if (element.textContent == questions[questionArr].answer) {
            score++;
            createDiv.textContent = "Correct! " + questions[questionArr].answer;

        } else {

            startingTime = startingTime - error;
            createDiv.textContent = "Answer is-->  " + questions[questionArr].answer;
        }
    }
    console.log(startingTime);

    questionArr++;

    if (questionArr >= questions.length) {

        allDone();
        createDiv.textContent = "End of quiz!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
    } else {
        render(questionArr);
    }
    questionsBox.appendChild(createDiv);

}

function allDone() {
    questionsBox.innerHTML = "";
    timer.innerHTML = "";


    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "All Done!"

    questionsBox.appendChild(createH1);


    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    questionsBox.appendChild(createP);


    if (startingTime >= 0) {
        var timeRemaining = startingTime;
        var createP2 = document.createElement("p");
        clearInterval(secondsLeft);
        createP.textContent = "Your final score is: " + timeRemaining;

        questionsBox.appendChild(createP2);
    }

    //Prepearing to create names for those taking the quiz!
    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Your Name ";

    questionsBox.appendChild(createLabel);

    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "Name");
    createInput.textContent = "";

    questionsBox.appendChild(createInput);

    var createResults = document.createElement("button");
    createResults.setAttribute("type", "results");
    createResults.setAttribute("id", "results");
    createResults.textContent = "Results";

    questionsBox.appendChild(createResults);

    //This was tricky and I needed to do a lot of research here!
    createResults.addEventListener("click", function () {
        var initials = createInput.value;

        if (initials === null) {

        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);

            window.location.replace("./highscores.html");
        }
    });
}