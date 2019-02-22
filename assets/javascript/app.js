// import { setPriority } from "os";

var time;
moneyWon = [];
moneyLost = [];


var th1 = $("<th>");

var th2 = $("<th>");

var th3 = $("<th>");

var headers = [th1, th2, th3];



var body = $("#tBody");


// =====================
// arrays
// ================
var all = [];

var buttonsArr = [];



// this will shuffle the answers
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
};


// gets random category number to plug in for url
function getRndInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
};


// constructor for Categroy
function Category(Name, question, correct_answer, incorrect_answers, difficulty) {
    this.Name = Name,
        this.question = question,
        this.correct_answer = correct_answer,
        this.incorrect_answers = incorrect_answers,
        this.difficulty = difficulty

};



//  gets ajax response, can potentially be called for each column and append data but who the fuck knows these days
function newCat() {
    // gets always global (random) catNumb the random cat number
    // can take anywhere from 9 to 32 cats in 1 sitting hopefully
    var queryURL = ("https://opentdb.com/api.php?amount=3&category=" + catNumb + "&type=multiple");

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        // console.log(response.results[0]);
        catfunction1(response);

        catfunction2(response);

        // new Category(response.)

    });
};



// for each header (3), perform ajax and push category numbs to all
for (var a = 0; a < headers.length; a++) {
    var queries = [];

    var divBtn = $("<div>");


    var catNumb = getRndInt(9, 32);

    newCat();
    // newCat();

};





// gets data
function catfunction1(data) {

    // saves the data response into a new Category
    var d = data.results[0];
    var triviaName = d.category;
    var triviaQ = d.question;
    var triviaC = d.correct_answer;
    var triviaI = d.incorrect_answers;
    var triviaValue = d.difficulty;


    var category = new Category(triviaName, triviaQ, triviaC, triviaI, triviaValue);
    console.log(category);

    var header = $("<td>").text(category.Name);


    $("#sciRow").append(header);

    all.push(category);
    console.log(all);


    var question = $("<button>").text("$1000");

    $(question).attr("class", "button is-large");


    console.log(category.question);

    var answersArr = [];
    answersArr.push(category.incorrect_answers, category.correct_answer);
    var concatArr = answersArr[0].concat(answersArr[1]);

    console.log(concatArr);

    shuffle(concatArr);

    console.log(concatArr);


    // please append these to the response div
    function please() {
        var more = document.getElementById("responseDiv");
        for (var i = 0; i < concatArr.length; i++) {
            var butt = document.createElement("button");
            butt.innerHTML = concatArr[i];
            $(butt).attr("class", "answer");
            more.appendChild(butt);
        }


        var butt = $(".answer");
        console.log(butt);

        $(butt).click(function(){

   
            var clickedAnswer = $(this).html();

    
            console.log(category);
            console.log(clickedAnswer);

            if (clickedAnswer === category.correct_answer) {
                console.log("You're correct!")
            }

            else {
                console.log("Sorry, that's not correct.")
            }

            $("#responseDiv").empty();
            $("#displayQ").empty();
        });



    
    };




    var button = $(question);


    button.click(function () {

        // $(question).text(category.question);
        $("#displayQ").text(category.question);

        please();

    })


    button.appendTo("#rowOne");




};




function catfunction2(data) {
    console.log(data.results[0]);
};


//     //    creates new div for dynamic info
//     var buttonDiv = $("<div>");

//     //    displays question
//     $(header).text(question);

//     // assign whitefont class for css
//     $(header).attr("class", "whitefont");
//     $(header).attr("class", "font-effect-3d-float");

//     // append header to buttondiv
//     $(buttonDiv).append(header);


// ========================
// buttons
// =========================

//     // puts each incorrect answer in an array that will give it a button

//         incbuttonsArray = [];
//         incbuttonsArray.push(incorrect_answer1, incorrect_answer2, incorrect_answer3);
//         // buttonsArray = shuffle(buttonsArray);
//         // give each answer a button
//         for (let v = 0; v < incbuttonsArray.length; v++){
//             var buttonInc = $("<button>").append(incbuttonsArray[v]);
//             // append each button to buttons div
//             $(buttonDiv).append(buttonInc);
//             // assign buttoninc an id attribute of its element
//             $(buttonInc).attr("id", "incorrect");
//             $(buttonInc).attr("class", "font-effect-3d-float");
//         };


//         // create seperate btn for correct answer
//         var correctB = $("<button>").append(correct_answer);
//         // assign this an id to track
//         $(correctB).attr("id", correct_answer);
//         $(correctB).attr("class", "font-effect-3d-float");

//         // make array to shuffle order of questions
//         newArray = [buttonInc, correctB];
//         newArray = shuffle(newArray);

//         // add whitefont class to newArray for css
//         $(newArray).attr("class", "whitefont");


//         // add this to the button div
//         $(buttonDiv).append(newArray);

//     // append buttonDiv to practiceDiv
//     $("#practiceDiv").append(buttonDiv);
//     // display timer
//     // hooks to html div
//     // display = document.querySelector("time");
//     // startTimer(10, display);

//     // alerts the user "time's up" after 10 seconds



//     // function for answer selection

//     // ends the timeout
//     // updates money
//     function addMoney(){
//         if (difficulty == "medium"){
//             money += 2000;
//             moneyWon.push(money);
//             // update money display

//         };
//         if (difficulty == "easy"){
//             money += 1000;
//             // update money display
//             moneyWon.push(money);

//         };
//         if (difficulty == "hard"){
//             money += 3000;
//             moneyWon.push(money);

//         };
//         $("#moneyWon").text(moneyWon);
//     };

//     function subtractMoney(){
//         if (difficulty == "medium"){
//             // money -= 2000;
//             moneyLost.push(-2000);
//             // update money display

//         };
//         if (difficulty == "easy"){
//             // money -= 1000;
//             moneyLost.push(-1000);
//             // update money display

//         };
//         if (difficulty == "hard"){
//             // money -= 3000;
//             moneyLost.push(-3000);

//         };
//         $("#moneyLost").text(moneyLost);
//     };



//     // parent div event listener
// document.getElementById("easy2").addEventListener("click", function(e){


