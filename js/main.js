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
var que;
function level(level){
    
    if(level == 'level1'){
        document.getElementById('headers').style.display = 'none'
        document.getElementById('main').style.display = 'none'
        document.getElementById('main1').style.display = 'block'

        que = 1;
    }
    else if(level == 'level2'){
        document.getElementById('headers').style.display = 'none'
        document.getElementById('main').style.display = 'none'
        document.getElementById('main1').style.display = 'block'

        que = 2;
    }
    else if(level == 'level3'){
        document.getElementById('headers').style.display = 'none'
        document.getElementById('main').style.display = 'none'
        document.getElementById('main1').style.display = 'block'

        que = 3;
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

var questions
questions1 = [
    
    {
        question : "21 - 12 / 3 * 2",
        choiceA : "15",
        choiceB : "13",
        choiceC : "16",
        choiceD : "12",
        
        correct : "B"
    },{
        question : "16 + 8 / 4 - 2 * 3",
        choiceA : "12",
        choiceB : "11",
        choiceC : "16",
        choiceD : "15",

        correct : "A"
    },{
        question : "30 * 2 / 3 - 10",
        choiceA : "15",
        choiceB : "20",
        choiceC : "10",
        choiceD : "23",

        correct : "C"
    },{
        question : "15 / 3 * 2 - 10",
        choiceA : "8",
        choiceB : "5",
        choiceC : "1",
        choiceD : "0",

        correct : "D"
    },{
        question : "30 - 10 * 8 + 60",
        choiceA : "8",
        choiceB : "9",
        choiceC : "10",
        choiceD : "11",

        correct : "C"
    }
];


questions2 = [
    
    {
        question : "25 + (2 * 3) - 5",
        choiceA : "10",
        choiceB : "26",
        choiceC : "15",
        choiceD : "20",
        
        correct : "B"
    },{
        question : "13 - (12 - 6 / 3)",
        choiceA : "3",
        choiceB : "1",
        choiceC : "6",
        choiceD : "5",

        correct : "A"
    },{
        question : "3 * 5 + (10 / 5 - 2)",
        choiceA : "11",
        choiceB : "20",
        choiceC : "15",
        choiceD : "23",

        correct : "C"
    },{
        question : "(10 - 8) * 2 + 10",
        choiceA : "18",
        choiceB : "15",
        choiceC : "16",
        choiceD : "14",

        correct : "D"
    },{
        question : "10 + (2 * 5) - 10 / 2",
        choiceA : "28",
        choiceB : "19",
        choiceC : "15",
        choiceD : "11",

        correct : "C"
    }
];

questions3 = [
    
    {
        question : "19 - [4 + {16 - (12 - 2)}]",
        choiceA : "15",
        choiceB : "9",
        choiceC : "12",
        choiceD : "11",
        
        correct : "B"
    },{
        question : "36 - [18 - {14 - (15 - 4 / 2 * 2)}]",
        choiceA : "21",
        choiceB : "18",
        choiceC : "12",
        choiceD : "11",

        correct : "A"
    },{
        question : "15 + 10 - [{10 - 1} / (2 + 1)]",
        choiceA : "10",
        choiceB : "20",
        choiceC : "22",
        choiceD : "23",

        correct : "C"
    },{
        question : "30 + [{(20 + 1) * 5 - (2 + 1) / 3}]",
        choiceA : "80",
        choiceB : "115",
        choiceC : "120",
        choiceD : "134",

        correct : "D"
    },{
        question : "19 - [4 + {16 - (12 - 8)}]",
        choiceA : "8",
        choiceB : "9",
        choiceC : "3",
        choiceD : "1",

        correct : "C"
    }
];

const lastQuestion = 4;
let runningQuestion = 0;
let count = 0;
const questionTime = 10; 
const gaugeWidth = 150; 
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

function renderQuestion(que){

    if(que == 1){
        questions = questions1;
    }
    else if(que == 2){
        questions = questions2;
    }
    else if(que == 3){
        questions = questions3;
    }
    
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
}

start.addEventListener("click",startQuiz);

function startQuiz(){
    start.style.display = "none";
    renderQuestion(que);
    quiz.style.display = "block";
    renderCounter();
    TIMER = setInterval(renderCounter,1000); 
}

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * 10 + "%";
        count++
    }else{
        count = 0;

        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        score++;
        answerIsCorrect();
    }else{
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        clearInterval(TIMER);
        scoreRender();
    }
}

function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

function scoreRender(){
    scoreDiv.style.display = "block";
    
    var scorePerCent = Math.round(100 * score/questions.length);
    
    if(scorePerCent >= 60){
        scoreDiv.innerHTML = 'Congratulations you passed this level'
        if(que == 3){
            document.getElementById('back').style.display = 'block'          
            document.getElementById('replay').style.display = 'block'
        }
        else if(que == 1){
            document.getElementById('continue').style.display = 'block'            
            document.getElementById('replay').style.display = 'block'
        }
        else{
            document.getElementById('continue').style.display = 'block'            
            document.getElementById('replay').style.display = 'block'
            document.getElementById('back').style.display = 'block'
        }
    }
    else{
        scoreDiv.innerHTML = 'Sorry level not cleared <br> Keep trying...Your brain is growing!'
        if(que == 1){
            document.getElementById('replay').style.display = 'block'
        }
        else if(que == 2){
            document.getElementById('back').style.display = 'block'
            document.getElementById('replay').style.display = 'block'
        }
        else{
            document.getElementById('back').style.display = 'block'
            document.getElementById('replay').style.display = 'block'
        }
    }
    
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
    quiz.style.display = 'none'
    document.getElementById('nextlevel').style.display = 'block'
}

function bg_clr(){
    for(i = 0; i <= 4; i++){
        document.getElementById(i).style.backgroundColor = "rgba(var(--bg-color), 1)";
    }
}

function reset(){
    document.getElementById('start').style.display = 'block'
    runningQuestion = 0;
    count = 0;
    score = 0;
    lastQuestion = 4;
    document.getElementById(1).style.backgroundColor = "yellow";
}

function cont(){
    if(que == 1){
        que = 2
        
        document.getElementById('scoreContainer').style.display = 'none'
        document.getElementById('btns').style.display = 'none'
        reset();
    }
    else if(que == 2){
        que = 3

        document.getElementById('scoreContainer').style.display = 'none'
        document.getElementById('btns').style.display = 'none'
        reset();
    }
}

function replay(){
    if(que == 1){
        document.getElementById('scoreContainer').style.display = 'none'
        document.getElementById('btns').style.display = 'none'
        reset();
    }
    else if(que == 2){
        document.getElementById('scoreContainer').style.display = 'none'
        document.getElementById('btns').style.display = 'none'
        reset();
    }
    else if(que == 3){
        document.getElementById('scoreContainer').style.display = 'none'
        document.getElementById('btns').style.display = 'none'
        reset();
    }
}

function back(){
    if(que == 2){
        que = 1; 

        document.getElementById('scoreContainer').style.display = 'none'
        document.getElementById('btns').style.display = 'none'
        reset();
    }
    else if(que == 3){
        que = 2

        document.getElementById('scoreContainer').style.display = 'none'
        document.getElementById('btns').style.display = 'none'
        reset();
    }
}