//List of quiz questions
var questions = [
    {
        question: "1. HTML stands for?",
        answer: "Hyper Text Markup Language",
        options: [
            "Hyper Text Markup Language",
            "Hyper Tool Language",
            "Hyper Markup Language",
            "Hyper Text Machine Language",
        ]

    },
    
    {
        question: "2. What is CSS stands for?",
        answer: "Cascading Style Sheet",
        options: [
            "Style sheet",
            "Cascading Style Sheet",
            "Cascading Sheet",
            "Cascading Language"
        ]
    },

    {
        question: "3.What is the extension for Javascript?",
        answer: "js",
        options: [
            "CSS",
            "js",
            "HTML",
            "Script"
        ]
    },

];
//Varaibles 

var timerEl = document.querySelector(".countdown");
var start_btn = document.querySelector(".start_quiz");
var quiz_box = document.querySelector(".quiz-box");
var que_text = quiz_box.querySelector(".que_text");
var options_box = quiz_box.querySelector(".options");
var next_btn = document.querySelector(".next-btn");
var total_q = document.querySelector(".quiz-footer .total_que");
var total_que_r = document.querySelector(".total-que span");
var count_que = document.querySelector(".quiz-footer .count_que");
var result_box = document.querySelector(".result-box");
var right_ans_r = document.querySelector(".right-ans span");
var exit = document.querySelector(".result-footer .exit");

// Timer
var timeup = 0;
var timeLeft = 30;
function countdown() {

    //If the the timer reaches 0 then its call losequiz function 
    function losequiz(){
        timeup++;
        result_box.classList.remove("inactive");
        quiz_box.classList.add("inactive");
    }

    //Timer count 
    var timeInterval = setInterval(function() {
        if(timeLeft > 0) {
            timerEl.textContent = 'Time left: ' + timeLeft;
            timeLeft --;
        }
        else{
            timerEl.textContent = '';
            clearInterval(timeInterval);
            losequiz();
        }       
        
    },1000);
}


//Start button to activate the quiz
start_btn.addEventListener('click', () => {
    quiz_box.classList.remove("inactive");
    start_btn.classList.add("inactive");
    timerEl.classList.remove("inactive");
    countdown();
})


var que_index = 0;
var right_answers = 0;

//Get the length of the questions 1 of 3 questions 
total_q.innerHTML = questions.length;
total_que_r.innerText = questions.length;
count_que.innerText = que_index+1;
showQuestion(que_index);


function showQuestion(q_index){

    que_text.innerText = questions[q_index].question;

    var option_statement ="";

    for(var i=0;i<questions[q_index].options.length; i++){

        //Getting options from questions 
        option_statement += `<div class="option">${questions[q_index].options[i]} </div>`;
    }
options_box.innerHTML = option_statement;

    var AllOptions = options_box.querySelectorAll(".option");

    for (var j=0; j<AllOptions.length; j++) {
        AllOptions[j].setAttribute("onclick", "UserAnswer(this)");
    }
}

next_btn.addEventListener('click', () => {
    que_index++;

    if(questions.length > que_index){
        count_que.innerText = que_index+1;
        showQuestion(que_index);
    }
    else {
        //console.log("questions completed");
        quiz_box.classList.add("inactive");
        result_box.classList.remove("inactive");
        //Timer will stop when quiz is completed 
        timerEl.classList.add("inactive");
       right_ans_r.innerText = right_answers;

    }
//Last question will have finish button instead of next 
    if(questions.length-1 == que_index) {
        next_btn.innerText ="Finish";
       
    }
    
})

function UserAnswer(answer){
    //user selected answer will be in userAns 
    let userAns = answer.innerText;
    //correct answer from array will be in CorrectAns 
    let correctAns = questions[que_index].answer;

    if(userAns == correctAns){
        //console.log("Right answer");
        right_answers++;
    }
    else {
       // console.log("wrong answer");
       //When the user click the wrong answer then then 3 seconds will be reduce from the timer 
       timeLeft -= 3;
       timerEl.textContent = 'Time left: ' + timeLeft;
      
    }
    }

    //When we click homepage it will take to quiz start page. 
exit.addEventListener('click',() => {
    start_btn.classList.remove("inactive");
    result_box.classList.add("inactive");
    timerEl.classList.add("inactive");
    Reset();

})
//reset function to reset everything from 0
function Reset() {
    que_index = 0;
    right_answers = 0;
}
