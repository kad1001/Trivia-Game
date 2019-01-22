
var easy;
 var medium;
 var hard;
 var money = 0;
 var easy = "&difficulty=easy";
 var medium = "&difficulty=medium";
 var hard = "&difficulty=hard";
 var scienceSubject = 17;
 var compSubject = 11;
 var entSubject = 12;
 var time;

// call game function to set vars

    // timer function
    function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        display.textContent = minutes + ":" + seconds;
        if (--timer < 0) {
            timer = duration;
            alert("time's up!");
            $("#quiz").show();
            // returns back to quiz page
        }
    }, 1000);};
    

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


$("#moneyDisplay").append(money);

function newTrivia(subject, difficulty){
    var queryURL = ("https://opentdb.com/api.php?amount=1&category=" + subject + difficulty + "&type=multiple");
    $.ajax({
    url: queryURL,
    method: "GET"
    // passes the data to createButtons
  }).then(function(response){
      createButtons(response);
    //   restartGame(response);
     });
};
     // data displayed on buttons on screen
     var createButtons = function(data){
        // readability
        var results = data.results[0];
        // json
        var question = results.question;
        var difficulty = results.difficulty;
        console.log(difficulty);

        var correct_answer = results.correct_answer;
        var incorrect_answer1 = results.incorrect_answers[0];
        var incorrect_answer2 = results.incorrect_answers[1];
        var incorrect_answer3 = results.incorrect_answers[2];

        // display timer
        // display = document.querySelector('#time');
        // var time = startTimer(10, display);
        
        // $("#showTimer").append(time);
        // alerts the user "time's up" after 10 seconds
        
        // hides  quiz layout
       $("#quiz").hide();

    //    creates new div for dynamic info
    var buttonDiv = $("<div>");

    //    displays question
       $("#question").text(question);

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
        };

        // create seperate btn for correct answer
        var correctB = $("<button>").append(correct_answer);
        // assign this an id to track
        $(correctB).attr("id", correct_answer);

        // make array to shuffle order of questions
        newArray = [buttonInc, correctB];
        newArray = shuffle(newArray);

        // add this to the button div
        $(buttonDiv).append(newArray);

    // append buttonDiv to practiceDiv
    $("#practiceDiv").append(buttonDiv);

    // function for answer selection

    // ends the timeout
    // updates money
    // restarts game

    // parent div event listener
    document.getElementById("practiceDiv").addEventListener("click", function(e){

    // alerts the user of whether they were correct or not
            // e.srcElement was the clicked element
        if (e.srcElement.id == correct_answer) {
            console.log("Correct answer!");
            };
        if (e.srcElement.id == "incorrect") {
            console.log("Sorry, wrong answer");
        }
    })


        // $(correctB).click(function(){
        //     console.log("correct answer clicked");
        // })



        // function for clicking correct button
        // $(button1).on("click",function(){
        //     alert("Correct!"); 
        //     $(buttonsArray).empty;
        //     // money = money += difficulty.value;

        //     $("#praciceDiv").empty();
        //     $("#quiz").show();
        // });

    };


// // called if user clicks correct answer
//  function addMoney(){
//      if (difficulty == "medium"){
//          money += 2000;
//          console.log(money);
//      };
//      if (difficulty == "easy"){
//          money += 1000;
//          console.log(money)
//      };
//      if (difficulty == "hard"){
//          money += 3000;
//          console.log(money)
//      };
//  };


 // called if user clicks incorrect answer
//  function subtractMoney (difficulty, money){
//      if (difficulty == "easy"){
//          (money -= 1000);
//          console.log(money);
//      };
//      if (difficulty == "medium"){
//          (money -= 2000);
//          console.log(money);
//      };
//      if (difficulty == "hard"){
//          (money -= 3000);
//          console.log(money);
//      };
//  };
 


//     var newBtn = $("<button>");
//     $("button").on("click", function() {
//     $.ajax({
//         url: queryURL,
//         method: "GET"}).then(function(data){
//             console.log(queryURL);


//         // making variables for each question option
//         var sci1 = (scienceSubject, easy);
//         var sci2 = (scienceSubject, medium);
//         var sci3 = (scienceSubject, hard);
//         $("<button>").appendTo($(sci1), $(sci2), $(sci3));

//         // begin storing json data in results as shortcut
//         // var results = response.data.results[0];
//         // console.log(results);
//         // var question = results.question;
//         // console.log(question);
//         // var difficulty = results.difficulty;
//         // var easySci = newTrivia(scienceSubject, easy);
//         // $(easySci).attr("val", 1000);
//         // console.log(easySci.results);
//     });
// // });



        
// // var easy = "&difficulty=easy";
// // var medium = "&difficulty=medium";
// // var hard = "&difficulty=hard";
// // var scienceSubject = 17;
// // var compSubject = 11;
// // var entSubject = 12;
// // var easySci = newTrivia(scienceSubject, easy);
// // $(easySci).attr("val", 1000);
// // console.log(easySci);
// //     var results = data.results[0];
// //     var question = results.question;
// //     var difficulty = results.difficulty;
// // };



    // switch (difficulty) {
    //     case ("easy"):
    //         value = 1000;
    //         console.log("question value:", value);
    //     break;
    //     case("medium"):
    //         value = 2000;
    //         console.log("question value:", value);
    //     break;
    //     case("hard"):
    //         value = 3000;
    //         console.log("question value:", value);
    //     break;
    // };


    // var correct_answer = results.correct_answer;
    // var incorrect_answer1 = results.incorrect_answers[0];
    // var incorrect_answer2 = results.incorrect_answers[1];
    // var incorrect_answer3 = results.incorrect_answers[2];
    // var containa = $("<table>");
    // // css class
    // // containa.addClass("container");
    // var heada = $("<td>");
    // $(heada).text(question);
    // containa.append(heada);

    // // add a button for each answer
    // var answerBtn = $("<button>");

    // // row for easy diff questions
    // var easyRow = $("<tr>");
    
 
    // perform function for grabbing each question
    // science




    // var medSci = newTrivia(scienceSubject, medium);
    // var hardSci = newTrivia(scienceSubject, hard);
    // // new tr - var med
    // var medRow = $("<tr>");


    // // new tr - var hard
    // var hardRow = $("<tr>");



    // // display the answer on each button
    // // add the buttons to the rows
    // // add the rows to the tables
    // // add the timer ... :)



    // // put the answers in buttons
    // var button1 = $("<button>").text(correct_answer);
    // var button2 = $("<button>").text(incorrect_answer1);
    // var button3 = $("<button>").text(incorrect_answer2);
    // var button4 = $("<button>").text(incorrect_answer3);
   
    // buttonsArray = [];
    // buttonsArray.push(button1, button2, button3, button4);
    // console.log("correct", correct_answer);
    // // shuffle answer+bttn array
    // buttonsArray = shuffle(buttonsArray);
    // // add the buttons and question and timer to the div
    // // adds each button from array to div
    // for (let i = 0; i < buttonsArray.length; i++){
    //     $(containa).append(buttonsArray[i])
    // };

    //     $(containa).show();
    //     $(button1).on("click", function() {
    //         console.log("You are CORRECT!");
    //         (money += value);
    //         $(".moneyContainer").text("$" + money);
    //         // $(containa).empty();
    //     });
    //     $(button2).on("click", function(){
    //         console.log("You are not correct!");
    //         (money -= value);
    //         $(".moneyContainer").text("$" + money); 
    //         // $(containa).empty();     
    //     });
    //     $(button3).on("click", function(){
    //         console.log("You are not correct!");
    //         (money -= value);
    //         $(".moneyContainer").text("$" + money);
    //         // $(containa).empty();
    //     });
    //     $(button4).on("click", function(){
    //         console.log("You are not correct!");
    //         (money -= value);
    //         $(".moneyContainer").text("$" + money);
    //         // $(containa).empty(); 
    //     })
