// global variables
var easy;
var medium;
var hard;
var easy = "&difficulty=easy";
var medium = "&difficulty=medium";
var hard = "&difficulty=hard";
var scienceSubject = 17;
var compSubject = 27;
var entSubject = 12;
var time;
//  var money = 0;
// 10 second timer
var counter = 10;

//  this runs the timer when a question button is clicked
$(document).on("click", ".qBtn", function(){

    setInterval(function() {
        counter--;
        if (counter >= 0) {
            // displays countdown
          $("#time").text(counter);
        }
        if (counter === 0) {
          alert('times up!');
          clearInterval(counter);
        //   empties practice div
        $("#practiceDiv").empty();
        $("#quiz").show();
        }
      //   counts down every 1 second
      }, 1000);
});


// this will shuffle the array of answer buttons
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


// this runs when the user clicks on a answer with the class "answers" (when they guess on a question)
$(document).on("click", ".answers", function(){
    // stops the timer
clearInterval(counter);

    // determines whether they were correct and returns to home screen
    switch (($(this).attr("data-answer"))) {
     case ("correct"):
        alert("correct!");
        //  money++;
        //  $("#moneyDisplay").text(("$") + money);
         $("#practiceDiv").empty();
         $("#quiz").show();
     break;

     case ("incorrect"):
         alert("Wrong!");
        // money--;
        // $("#moneyDisplay").text(("$") + money);
         $("#practiceDiv").empty();
         $("#quiz").show();
     break;
    };
 });

//  retrieves info from button pressed and adjusts query url to return appropriate data
function newTrivia(subject, difficulty){
   var queryURL = ("https://opentdb.com/api.php?amount=1&category=" + subject + difficulty + "&type=multiple");
   $.ajax({
   url: queryURL,
   method: "GET"
   // passes the data to createButtons
 }).then(function(data){

    // data displayed on buttons on screen 
       var results = data.results[0];
       var question = results.question;
       var difficulty = results.difficulty;
       console.log(difficulty);

       var correct_answer = results.correct_answer;
       var incorrect_answer1 = results.incorrect_answers[0];
       var incorrect_answer2 = results.incorrect_answers[1];
       var incorrect_answer3 = results.incorrect_answers[2];
       // hides  quiz layout
      $("#quiz").hide();

    //   new p for timer
    var timerP = $("<p>");
    // give timerP an id so the function can hook to it
    $(timerP).attr("id", "newTime");
   //    creates new div for dynamic info
    var buttonDiv = $("<div>");
//    append timer to this div
    $(buttonDiv).append(timerP);
   // new header for question
   var header = $("<h2>");
   //   displays question
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
           $(buttonInc).attr("data-answer", "incorrect");
           $(buttonInc).attr("class", "font-effect-3d-float");
           $(buttonInc).attr("class", "answers");
       };

       // create seperate btn for correct answer
       var correctB = $("<button>").append(correct_answer);

       // assigned "correct" data attr
       $(correctB).attr('data-answer', 'correct');
       console.log(correctB);
       $(correctB).attr("class", "font-effect-3d-float");
       $(correctB).attr("class", "answers");


       // make array to shuffle order of questions
       newArray = [buttonInc, correctB];
       newArray = shuffle(newArray);

       // add whitefont class to newArray for css
       $(newArray).attr("class", "whitefont");


       // add this to the button div
       $(buttonDiv).append(newArray);

   // append buttonDiv to practiceDiv
   $("#practiceDiv").append(buttonDiv);

});
};


   // parent div event listener
//    function addMoney(difficulty){
//     if (difficulty == "medium"){
//         money += 2000;
//         // update money display
        
//         $("#moneyDisplay").text(money);
//     };
//     if (difficulty == "easy"){
//         money += 1000;
//         // update money display
//         $("#moneyDisplay").text(money);
//     };
//     if (difficulty == "hard"){
//         money += 3000;
//         // update money display
//         $("#moneyDisplay").text(money);
//     };
//     console.log(money);
// };

// function subtractMoney(difficulty){
//     if (difficulty == "medium"){
//         money -= 2000;
//         // update money display
//         $("#moneyDisplay").text(("$") + money);
//     };
//     if (difficulty == "easy"){
//         money -= 1000;
//         // update money display
//         $("#moneyDisplay").text(("$") + money);
//     };
//     if (difficulty == "hard"){
//         money -= 3000;
//         // update money display
//         $("#moneyDisplay").text(("$") + money);
//     };
//     console.log(money);
// };
