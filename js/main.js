function onLoad() {
    updateTheme(loadData("ToDoTheme"));
    document.body.style.display = "flex";
}

function updateTheme(theme) {
    let bgColor = theme == 'light' ? "255, 255, 255" : "19, 19, 19";
    let textColor = theme == 'light' ? "12, 12, 12" : "255, 255, 255";
    let shadowColor = theme == 'light' ? "0, 0, 0" : "255, 255, 255";
    let grad1 = theme == 'light' ? "108, 29, 103" : "34, 208, 163";
    let grad2 = theme == 'light' ? "100, 25, 148" : "32, 173, 211";
    let sideGrad1 = theme == 'light' ? "255, 255, 255" : "35, 35, 35";
    let sideGrad2 = theme == 'light' ? "251, 247, 247" : "46, 46, 46";
    
    let root = document.documentElement;
    
    root.style.setProperty("--bg-color", bgColor);
    root.style.setProperty("--text-color", textColor);
    root.style.setProperty("--shadow-color", shadowColor);
    root.style.setProperty("--gradient-1", grad1);
    root.style.setProperty("--gradient-2",grad2);
    root.style.setProperty("--sidebar-gradient-1", sideGrad1);
    root.style.setProperty("--sidebar-gradient-2", sideGrad2);
    
    document.getElementsByClassName("current-theme")[0].classList.remove("current-theme");;
    
    let activateClass = theme == "light" ? "light" : "dark";
    document.getElementById(activateClass).classList.add("current-theme");
    
    saveData("ToDoTheme", theme);

    let invertStrength = theme == "light" ? "0%" : "100%";
    let icons = document.getElementsByClassName("icon");
    for(let i = 0; i < icons.length; i++) {
        icons[i].style.filter = `brightness(100%) invert(${invertStrength})`;
    }
}

function next(){
    document.getElementById('modal').style.display = 'block';
}

function level(level){
    
    if(level == 'level1'){

        document.getElementById('headers').style.display = 'none'
        document.getElementById('main').style.display = 'none'
        document.getElementById('main1').style.display = 'block'
    }
    else if(level == 'level2'){
        document.getElementById('headers').style.display = 'none'
        document.getElementById('main').style.display = 'none'
        document.getElementById('main1').style.display = 'block'
    }
    else if(level == 'level3'){
        document.getElementById('headers').style.display = 'none'
        document.getElementById('main').style.display = 'none'
        document.getElementById('main1').style.display = 'block'
    }

    document.getElementById('modal').style.display = 'none'
}

function saveData(key, value) {
    if(localStorage) {
        localStorage.setItem(key, value);
    } else {
        alert("You browser does not support localStorage API");
    }
}

function loadData(key) {
    if(localStorage) {
        if(key in localStorage) {
            return localStorage.getItem(key);
        }
    } else {
        alert("You browser does not support localStorage API");
    }
}

let database;

window.onload = function() {
    let req = window.indexedDB.open("my_DB", 1);

    req.onsuccess = function() {
        database = req.result;
        onLoad();
    }

    req.onerror = function(event) {
        alert("There was an error", event);
    }

    req.onupgradeneeded = function(event) {
        let db = req.result;
        console.log("Created Stores");
    }
}

const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD = document.getElementById("D");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

// create our questions
let questions = [
    
    {
        question : "What does  stand for?",
        choiceA : "Correct",
        choiceB : "Wrong",
        choiceC : "Wrong",
        choiceD : "Wrong",
        correct : "A"
    },{
        question : "What does CSS stand for?",
        choiceA : "Wrong",
        choiceB : "Correct",
        choiceC : "Wrong",
        choiceD : "Wrong",
        correct : "B"
    },{
        question : "What does JS stand for?",
        choiceA : "Wrong",
        choiceB : "Wrong",
        choiceC : "Correct",
        choiceD : "Wrong",
        correct : "C"
    },{
        question : "W3r?",
        choiceA : "Wrong",
        choiceB : "Wrong",
        choiceC : "Correct",
        choiceD : "Wrong",
        correct : "C"
    },{
        question : "4",
        choiceA : "Wrong",
        choiceB : "Wrong",
        choiceC : "Correct",
        choiceD : "Wrong",
        correct : "C"
    }
];
// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10; // 10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
}

start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * 10 + "%";
        count++
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block";
    
    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/questions.length);
    
    // choose the image based on the scorePerCent
    if(scorePerCent >= 60){
        scoreDiv.innerHTML = 'Congratulations you passed this level'
    }
    else{
        scoreDiv.innerHTML = 'Try again'
    }
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
    quiz.style.display = 'none'
    document.getElementById('nextlevel').style.display = 'block'
}

/*const questions = [

    {
        question: '21 - 12 / 3 * 2',
        answers: [
        { text: '13', correct: true },
        { text: '12', correct: false },
        { text: '10', correct: false },
        { text: '15', correct: false },
        ]
    },
    {
        question: '16 + 8 / 4 - 2 * 3',
        answers: [
        { text: '13', correct: false },
        { text: '12', correct: true },
        { text: '16', correct: false },
        { text: '24', correct: false },
        ]
    }
]

const questions2 = [

    {
        question: '25 + (2 * 3) - 5',
        answers: [
        { text: '33', correct: false },
        { text: '18', correct: false },
        { text: '15', correct: false },
        { text: '26', correct: true },
        ]
    },
    {
        question: '13 - (12 - 6 / 3)',
        answers: [
        { text: '3', correct: true },
        { text: '12', correct: false },
        { text: '16', correct: false },
        { text: '24', correct: false },
        ]
    }
]

const questions3 = [

    {
        question: '19 - [4 + {16 - (12 - 2)}]',
        answers: [
        { text: '8', correct: false },
        { text: '16', correct: false },
        { text: '9', correct: true },
        { text: '22', correct: false },
        ]
    },
    {
        question: '36 - [18 - {14 - (15 - 4 / 2 * 2)}]',
        answers: [
        { text: '26', correct: false },
        { text: '21', correct: true },
        { text: '14', correct: false },
        { text: '15', correct: false },
        ]
    }
]*/