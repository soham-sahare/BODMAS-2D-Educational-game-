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

        var nums = []
        var operations = ['+', '-', '/', '*']
        var as

        for(i = 0; i < 6; i++){

            a = Math.floor(Math.random() * 101);
            op = Math.floor(Math.random() * 4);
            
            nums.push(a, operations[op]);
        }
        nums.pop()
        str = nums.join(' ')
        ans = eval(str)
        console.log(ans);
        
        
        document.getElementById('give').innerHTML = str;
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