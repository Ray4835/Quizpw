
const start_btn_home = document.querySelector(".start_btn");
const start_btn = document.querySelector(".start_btn #button_play");
const info_box = document.querySelector(".info_box");
const highscores = document.querySelector("#highscores");
const scoreTextPoint = document.getElementById("score");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");
var aleatorios = []
const totalQuestoes = 10
const loader = document.getElementById("loader");
loader.classList.add("hidden");


start_btn.onclick = () => {
  info_box.classList.add("activeInfo"); 
};


exit_btn.onclick = () => {
  info_box.classList.remove("activeInfo"); 
};


continue_btn.onclick = () => {
  
  info_box.classList.remove("activeInfo"); 
  start_btn_home.classList.add("hidden");

  loader.classList.remove("hidden");
  const myTimeout = setTimeout(startQuiz, 3000);

  function startQuiz() {    
    loader.classList.add("hidden");
    start_btn_home.classList.remove("hidden");
    quiz_box.classList.add("activeQuiz"); 
    selecionarAleatorio(questions, questions.length)
    escolherTema()
    showQuetions(0);
    queCounter(1); 
    startTimer(15); 
    startTimerLine(0);
  }
};

function escolherTema(){
  
}
let timeValue = 15;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");


restart_quiz.onclick = () => {
  localStorage.setItem("mostRecentScore", userScore); 
  return window.location.assign("./Páginas/end.html");
};


quit_quiz.onclick = () => {
  window.location.reload(); 
};

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");


next_btn.onclick = () => {
  if (que_count < totalQuestoes) {
    
    que_count++; 
    que_numb++; 
    showQuetions(que_count); 
    queCounter(que_numb); 
    clearInterval(counter); 
    clearInterval(counterLine); 
    startTimer(timeValue); 
    startTimerLine(widthValue); 
    timeText.textContent = "Tempo Restante"; 
    next_btn.classList.remove("show"); 
  } else {
    clearInterval(counter); 
    clearInterval(counterLine); 
    showResult(); 
  }
};

// INSERINDO QUESTOES

function showQuetions(index) {
  loader.classList.add("hidden");
  const que_text = document.querySelector(".que_text");
  const numPergunta = index +1
  let que_tag =
    "<span>" +
    numPergunta+
    ". " +
    aleatorios[index].question +
    "</span>";
  let option_tag =
    '<div class="option"><p class="choice-prefix">A</p><p class="choice-text" data-number="1"><span class="question">' +
    aleatorios[index].options[0] +
    "</span></div>" +
    '<div class="option"><p class="choice-prefix">B</p><p class="choice-text" data-number="2"><span class="question">' +
    aleatorios[index].options[1] +
    "</span></p></div>" +
    '<div class="option"><p class="choice-prefix">C</p><p class="choice-text" data-number="3"><span class="question">' +
    aleatorios[index].options[2] +
    "</span></p></div>" +
    '<div class="option"><p class="choice-prefix">D</p><p class="choice-text" data-number="4"><span class="question">' +
    aleatorios[index].options[3] +
    "</span></p></div>";
  que_text.innerHTML = que_tag; 
  option_list.innerHTML = option_tag; 

  const option = option_list.querySelectorAll(".option");


  for (i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
}
// creating the new div tags which for icons
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';


function optionSelected(answer) {
  clearInterval(counter); 
  clearInterval(counterLine); 
  let userAns = answer.querySelector(".choice-text").textContent; 
  let correcAns = aleatorios[que_count].answer; 
  const allOptions = option_list.children.length; 
  if (userAns == correcAns) {
   
    userScore += 1; 
    scoreTextPoint.innerHTML = userScore * 10;
    answer.classList.add("correct"); 
    answer.insertAdjacentHTML("beforeend", tickIconTag); 
    console.log("Correct Answer");
    console.log("Your correct answers = " + userScore);
  } else {
    answer.classList.add("incorrect"); 
    answer.insertAdjacentHTML("beforeend", crossIconTag); 
    console.log("Wrong Answer");

    for (i = 0; i < allOptions; i++) {
      if (option_list.children[i].textContent == correcAns) {
        //if there is an option which is matched to an array answer
        option_list.children[i].setAttribute("class", "option correct"); 
        option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); 
        console.log("Auto selected correct answer.");
      }
    }
  }
  for (i = 0; i < allOptions; i++) {
    option_list.children[i].classList.add("disabled"); 
  }
  next_btn.classList.add("show"); 
}

function showResult() {
  info_box.classList.remove("activeInfo"); 
  quiz_box.classList.remove("activeQuiz"); 
  result_box.classList.add("activeResult"); 
  const scoreText = result_box.querySelector(".score_text");
  if (userScore > 3) {

    let scoreTag =
      "<span>E parabéns!! 🎉, você fez <p>" +
      userScore * 10 +
      "</p> de <p>" +
      totalQuestoes * 10 +
      "</p></span>";
    scoreText.innerHTML = scoreTag; 
  } else if (userScore > 1) {
    // if user scored more than 1
    let scoreTag =
      "<span>E legal 😎, você fez  <p>" +
      userScore * 10 +
      "</p> de <p>" +
      totalQuestoes * 10 +
      "</p></span>";
    scoreText.innerHTML = scoreTag;
  } else {
    // if user scored less than 1
    let scoreTag =
      "<span>e desculpe 😐, Você fez apenas <p>" +
      userScore * 10 +
      "</p> de <p>" +
      totalQuestoes * 10 +
      "</p></span>";
    scoreText.innerHTML = scoreTag;
  }
}

function startTimer(time) {
  counter = setInterval(timer, 1000);
  function timer() {
    timeCount.textContent = time; 
    time--; //decrement the time value
    if (time < 9) {
      //if timer is less than 9
      let addZero = timeCount.textContent;
      timeCount.textContent = "0" + addZero; 
    }
    if (time < 0) {
      //if timer is less than 0
      clearInterval(counter); 
      timeText.textContent = "Intervalo"; 
      const allOptions = option_list.children.length; 
      let correcAns = questions[que_count].answer; 
      for (i = 0; i < allOptions; i++) {
        if (option_list.children[i].textContent == correcAns) {
         
          option_list.children[i].setAttribute("class", "option correct"); 
          option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); 
          console.log("Time Off: Auto selected correct answer.");
        }
      }
      for (i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled"); 
      }
      next_btn.classList.add("show"); 
    }
  }
}

function startTimerLine(time) {
  counterLine = setInterval(timer, 29);
  function timer() {
    time += 1;
    time_line.style.width = time + "px"; 
    if (time > 549) {
      //if time value is greater than 549
      clearInterval(counterLine); 
    }
  }
}

function queCounter(index) {
 
  let totalQueCounTag =
    "<span><p>" +
    index +
    "</p> de <p>" +
    totalQuestoes +
    "</p> Questões</span>";
  bottom_ques_counter.innerHTML = totalQueCounTag; 
}


//Aleatória

function selecionarAleatorio(vetor, quantidade) {
  const selecionados = [];
  while (selecionados.length < quantidade) {
      const indiceAleatorio = Math.floor(Math.random() * vetor.length);
      const elementoAleatorio = vetor[indiceAleatorio];
      if (!selecionados.includes(elementoAleatorio)) {
          selecionados.push(elementoAleatorio);
      }
  }
  return aleatorios = selecionados;
  
}
