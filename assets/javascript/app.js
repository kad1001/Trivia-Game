
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

    // timer function

    // function startTimer(duration, display) {
    //     var timer = duration, minutes, seconds;
    //     setInterval(function () {
    //         minutes = parseInt(timer / 60, 10)
    //         seconds = parseInt(timer % 60, 10);
    
    //         minutes = minutes < 10 ? "0" + minutes : minutes;
    //         seconds = seconds < 10 ? "0" + seconds : seconds;
    
    //         display.textContent = minutes + ":" + seconds;
    
    //         if (--timer < 0) {
    //             timer = duration;
    //         }
    //     }, 1000);
    // };
    
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

    jQuery(function ($) {
        var tenSeconds = 10,
            display = $('#time');
        startTimer(tenSeconds, display);
    });
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
            // update money display
            $("#moneyDisplay").text(money);
        };
        if (difficulty == "easy"){
            money += 1000;
            // update money display
            $("#moneyDisplay").text(money);
        };
        if (difficulty == "hard"){
            money += 3000;
            // update money display
            $("#moneyDisplay").text(money);
        };
    };

    function subtractMoney(){
        if (difficulty == "medium"){
            money -= 2000;
            // update money display
            $("#moneyDisplay").text(("$") + money);
        };
        if (difficulty == "easy"){
            money -= 1000;
            // update money display
            $("#moneyDisplay").text(("$") + money);
        };
        if (difficulty == "hard"){
            money -= 3000;
            // update money display
            $("#moneyDisplay").text(("$") + money);
        };
    };
   
   

    // parent div event listener
    document.getElementById("practiceDiv").addEventListener("click", function(e){

    // alerts the user of whether they were correct or not
            // e.srcElement was the clicked element
        if (e.srcElement.id == correct_answer) {
            console.log("Correct answer!");
            alert("CORRECT!");
            addMoney();
            // empty button div
            $(buttonDiv).empty();
            // show quiz layout
            $("#quiz").show();

            };
        if (e.srcElement.id == "incorrect") {
            console.log("Sorry, wrong answer");
            alert("NOPE!");
            subtractMoney();
            $(buttonDiv).empty();
            $("#quiz").show();

        };
    });
};