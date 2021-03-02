var clickvraag1 = document.querySelector(".quest:nth-of-type(1)");
var clickvraag2 = document.querySelector("#vr_id{{this.id}}");
var clickvraag3 = document.querySelector("#vr_id{{this.id}}");
var clickvraag4 = document.querySelector("#vr_id{{this.id}}");
var clickvraag5 = document.querySelector("#vr_id{{this.id}}");

var clickAnt1 = document.querySelector("#ant_id{{this.id}}");
var clickAnt2 = document.querySelector("#ant_id{{this.id}}");
var clickAnt3 = document.querySelector("#ant_id{{this.id}}");
var clickAnt4 = document.querySelector("#ant_id{{this.id}}");
var clickAnt5 = document.querySelector("#ant_id{{this.id}}");

var questions = document.querySelector("#questions");

clickvraag1.addEventListener("click", invisItems);

function invisItems() {
    clickAnt1.classList.remove("invisible");
    questions.classList.add("invisible");
}

clickvraag2.addEventListener("click", invisItems2);

function invisItems2() {
    clickAnt2.classList.remove("invisible");
    questions.classList.add("invisible");
}

clickvraag3.addEventListener("click", invisItems3);

function invisItems3() {
    clickAnt3.classList.remove("invisible");
    questions.classList.add("invisible");
}

clickvraag4.addEventListener("click", invisItems4);

function invisItems4() {
    clickAnt4.classList.remove("invisible");
    questions.classList.add("invisible");
}

clickvraag5.addEventListener("click", invisItems5);

function invisItems5() {
    clickAnt5.classList.remove("invisible");
    questions.classList.add("invisible");
}
