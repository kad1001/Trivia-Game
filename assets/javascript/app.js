
 var easy = "&difficulty=easy";
 var medium = "&difficulty=medium";
 var hard = "&difficulty=hard";

 var time;
 moneyWon = [];
 moneyLost = [];

    // timer function
    var counter = 10;

//  this runs the timer when a question button is clicked
// $(document).on("click", ".qBtn", function(){
//     setInterval(function() {
//         counter--;
//         if (counter >= 0) {
//             // displays countdown
//           $("#time").text(counter);
//         }
//         if (counter === 0) {
//           alert('times up!');
//           clearInterval(counter);
//         //   empties practice div
//         $("#practiceDiv").empty();
//         $("#quiz").show();
//         }
//       //   counts down every 1 second
//       }, 1000);
// });
var th1 = {
    head: $("<th>"),
    // each button in the first column
    question: $(".col1"),
};


var th2 = {
    head: $("<th>")
};

var th3 = {
    head: $("<th>")
}

var headers = [th1.head, th2.head, th3.head];
var questions = [th1.question];

var cols = [col1, col2, col3];
var col1 = $(".col1");
var col2 = $(".col2");
var col3 = $(".col3");

var easys = [e1, e2, e3];
var e1 = $("#easy1");
var e2 = $("#easy2");
var e3 = $("#easy3");


function getRndInt(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

// each of the headers in da categories array - the element is the literal th. maybe 
headers.forEach(function(element){
    var rand = getRndInt(9, 32);

    var queryURL = ("https://opentdb.com/api.php?amount=3&category=" + rand + "&type=multiple");

$.ajax({
url: queryURL,
method: "GET"
// passes the data to createButtons
}).then(function(response){

    console.log(response);
  


    // returns a category name purrr
    var kitty = response.results[0].category;
    console.log(kitty);
    showQ1(response);
    showQ2(response);

    // add to fam
    $(element).append(kitty);
    $(element).attr("name", kitty);

    // let's store each of these kittehs in add it as an attr to the element, like a name
    console.log($(element).attr("name"));
    // return title;

    // $(".easy").on("click", function(){
    //     console.log("easy");
    //     });
 });
    
});

function showQ1(data){
console.log(data);
var question = data.results[0].question;
console.log(question);
$("#easy1").append(question);

// for (var i in easys){
// console.log(i);
// $(easys[i]).text("hi");
    // $(i).text(question);
}

function showQ2(data){
    $("#easy2").append(data.results[0].question);
}
// $(".easy").append(data.results[0].question);



// get a random category name for each thing!!! column!!
window.onload = function(){

    $("#sciRow").append(th1, th2, th3);




var catNumb = getRndInt(9, 32);

console.log("Category number: ", catNumb);
var queryURL = ("https://opentdb.com/api.php?amount=1&category=" + catNumb + "&type=multiple");
$.ajax({
url: queryURL,
method: "GET"
// passes the data to createButtons
}).then(function(response){
//   createButtons(response);
    console.log(response);
 
 });
};

    
// this will shuffle the answers
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
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

function newTrivia(subject, difficulty){
    var queryURL = ("https://opentdb.com/api.php?amount=1&category=" + subject + difficulty + "&type=multiple");
    $.ajax({
    url: queryURL,
    method: "GET"
    // passes the data to createButtons
  }).then(function(response){
      createButtons(response);
     });
};

     // data displayed on buttons on screen
     var createButtons = function(data){
         
        var results = data.results[0];
        // json
        var question = results.question;
        var difficulty = results.difficulty;
        console.log(difficulty);

        var correct_answer = results.correct_answer;
        var incorrect_answer1 = results.incorrect_answers[0];
        var incorrect_answer2 = results.incorrect_answers[1];
        var incorrect_answer3 = results.incorrect_answers[2];

    // initial money count
    var money = 0;


        // hides  quiz layout
       $("#quiz").hide();


    //    creates new div for dynamic info
    var buttonDiv = $("<div>");
    // new header for question
    var header = $("<h2>");
    //    displays question
    $(header).text(question);
    // assign whitefont class for css
    $(header).attr("class", "whitefont");
    $(header).attr("class", "font-effect-3d-float");
    // append header to buttondiv
    $(buttonDiv).append(header);


    // puts each incorrect answer in an array that will give it a button
        incbuttonsArray = [];
        incbuttonsArray.push(incorrect_answer1, incorrect_answer2, incorrect_answer3);
        // buttonsArray = shuffle(buttonsArray);
        // give each answer a button
        for (let v = 0; v < incbuttonsArray.length; v++){
            var buttonInc = $("<button>").append(incbuttonsArray[v]);
            // append each button to buttons div
            $(buttonDiv).append(buttonInc);
            // assign buttoninc an id attribute of its element
            $(buttonInc).attr("id", "incorrect");
            $(buttonInc).attr("class", "font-effect-3d-float");
        };

        // create seperate btn for correct answer
        var correctB = $("<button>").append(correct_answer);
        // assign this an id to track
        $(correctB).attr("id", correct_answer);
        $(correctB).attr("class", "font-effect-3d-float");

        // make array to shuffle order of questions
        newArray = [buttonInc, correctB];
        newArray = shuffle(newArray);

        // add whitefont class to newArray for css
        $(newArray).attr("class", "whitefont");


        // add this to the button div
        $(buttonDiv).append(newArray);

    // append buttonDiv to practiceDiv
    $("#practiceDiv").append(buttonDiv);
    // display timer
    // hooks to html div
    // display = document.querySelector("time");
    // startTimer(10, display);

    // alerts the user "time's up" after 10 seconds



    // function for answer selection

    // ends the timeout
    // updates money
    function addMoney(){
        if (difficulty == "medium"){
            money += 2000;
            moneyWon.push(money);
            // update money display

        };
        if (difficulty == "easy"){
            money += 1000;
            // update money display
            moneyWon.push(money);

        };
        if (difficulty == "hard"){
            money += 3000;
            moneyWon.push(money);

        };
        $("#moneyWon").text(moneyWon);
    };

    function subtractMoney(){
        if (difficulty == "medium"){
            // money -= 2000;
            moneyLost.push(-2000);
            // update money display

        };
        if (difficulty == "easy"){
            // money -= 1000;
            moneyLost.push(-1000);
            // update money display
 
        };
        if (difficulty == "hard"){
            // money -= 3000;
            moneyLost.push(-3000);

        };
        $("#moneyLost").text(moneyLost);
    };
   
   

    // parent div event listener
    document.getElementById("practiceDiv").addEventListener("click", function(e){
    
        // clears timer
        clearInterval(counter);

    // alerts the user of whether they were correct or not
            // e.srcElement was the clicked element
        if (e.srcElement.id == correct_answer) {
            console.log("Correct answer!");
            $("#winLose").text("Correct! Money Added!")
            addMoney();
            // empty button div
            $(buttonDiv).empty();
            // show quiz layout
            $("#quiz").show();

            };
        if (e.srcElement.id == "incorrect") {
            console.log("Sorry, wrong answer");
            $("#winLose").text("NOPE! Money Lost")
            subtractMoney();
            $(buttonDiv).empty();
            $("#quiz").show();
        };
    });
};