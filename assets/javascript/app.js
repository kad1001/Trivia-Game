
 var time;
 moneyWon = [];
 moneyLost = [];


var th1 =  $("<th>");

var th2 = $("<th>");

var th3 =  $("<th>");


var headers = [th1, th2, th3];


// gets random category number to plug in for url
function getRndInt(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
};


    // constructor for Categroy
 function Category(Name, question, correct_answer, incorrect_answers, value) {
     this.Name = Name;
     this.question = question;
     this.correct_answer = correct_answer,
     this.incorrect_answers = incorrect_answers,
     this.value = value;

    // method that console logs the answers
    this.printAnswers = function(){
        console.log("Answers: " + this.correct_answer + this.incorrect_answers);
    }

 };



//  gets ajax response, can potentially be called for each column and append data but who the fuck knows these days
function newCat() {

    // gets always global (random) catNumb the random cat number
    // can take anywhere from 9 to 32 cats in 1 sitting hopefully
    var queryURL = ("https://opentdb.com/api.php?amount=3&category=" + catNumb + "&type=multiple");

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        // console.log(response);
        catfunction1(response);
    });
};

    // appends new category to each thing u know it does the thing
for (var v in headers) {
    var catNumb = getRndInt(9, 32);

    newCat();
}


function catfunction1(data){

    // saves the data response into a new Category
    var d = data.results[0];
    var triviaName = d.category;
    var triviaQ = d.question;
    var triviaC = d.correct_answer;
    var triviaI = d.incorrect_answers;
    var triviaValue = d.difficulty;

    console.log(d);

    var catty = new Category(triviaName, triviaQ, triviaC, triviaI, triviaValue);
    console.log(catty);

    var catsyo = $("<td>").text(catty.Name);


    $("#sciRow").append(catsyo);

    $(".easy").on("click", function (){
        console.log(catty);
        // if (event.target === $(".easy")) {
        // console.log(d);
        // }
    })


}




// // each of the headers in da categories array - the element is the literal th. maybe 
// headers.forEach(function(element){
//     var rand = getRndInt(9, 32);

//     var queryURL = ("https://opentdb.com/api.php?amount=3&category=" + rand + "&type=multiple");

// $.ajax({
// url: queryURL,
// method: "GET"
// // passes the data to createButtons
// }).then(function(response){

//     console.log(response);
  


//     // returns a category name purrr
//     var kitty = response.results[0].category;
//     console.log(kitty);
//     showQ1(response);
//     showQ2(response);

//     // add to fam
//     $(element).append(kitty);
//     $(element).attr("name", kitty);


//     var cat1 = new 

//     // let's store each of these kittehs in add it as an attr to the element, like a name
//     console.log($(element).attr("name"));
//     // return title;

//     // $(".easy").on("click", function(){
//     //     console.log("easy");
//     //     });
//  });
    
// });

// function showQ1(data){
// console.log(data);
// var question = data.results[0].question;
// console.log(question);

// }

// function showQ2(data){
//    console.log(data);
// }



// window.onload = function(){

//     $("#sciRow").append(th1, th2, th3);



// var catNumb = getRndInt(9, 32);

// console.log("Category number: ", catNumb);
// $.ajax({
// url: queryURL,
// method: "GET"
// // passes the data to createButtons
// }).then(function(response){
// //   createButtons(response);
//     console.log(response);
 
//  });
// };

    
// // this will shuffle the answers
// function shuffle(array) {
//     var currentIndex = array.length, temporaryValue, randomIndex;
//     // While there remain elements to shuffle...
//     while (0 !== currentIndex) {
//         // Pick a remaining element...
//         randomIndex = Math.floor(Math.random() * currentIndex);
//         currentIndex -= 1;
//         // And swap it with the current element.
//         temporaryValue = array[currentIndex];
//         array[currentIndex] = array[randomIndex];
//         array[randomIndex] = temporaryValue;
//     }
//     return array;
//     };

// function newTrivia(subject, difficulty){
//     var queryURL = ("https://opentdb.com/api.php?amount=1&category=" + subject + difficulty + "&type=multiple");
//     $.ajax({
//     url: queryURL,
//     method: "GET"
//     // passes the data to createButtons
//   }).then(function(response){
//       createButtons(response);
//      });
// };

//      // data displayed on buttons on screen
//      var createButtons = function(data){
         
//         var results = data.results[0];
//         // json
//         var question = results.question;
//         var difficulty = results.difficulty;
//         console.log(difficulty);

//         var correct_answer = results.correct_answer;
//         var incorrect_answer1 = results.incorrect_answers[0];
//         var incorrect_answer2 = results.incorrect_answers[1];
//         var incorrect_answer3 = results.incorrect_answers[2];

//     // initial money count
//     var money = 0;


//         // hides  quiz layout
//        $("#quiz").hide();


//     //    creates new div for dynamic info
//     var buttonDiv = $("<div>");
//     // new header for question
//     var header = $("<h2>");
//     //    displays question
//     $(header).text(question);
//     // assign whitefont class for css
//     $(header).attr("class", "whitefont");
//     $(header).attr("class", "font-effect-3d-float");
//     // append header to buttondiv
//     $(buttonDiv).append(header);


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
//     document.getElementById("practiceDiv").addEventListener("click", function(e){
    
//         // clears timer
//         clearInterval(counter);

//     // alerts the user of whether they were correct or not
//             // e.srcElement was the clicked element
//         if (e.srcElement.id == correct_answer) {
//             console.log("Correct answer!");
//             $("#winLose").text("Correct! Money Added!")
//             addMoney();
//             // empty button div
//             $(buttonDiv).empty();
//             // show quiz layout
//             $("#quiz").show();

//             };
//         if (e.srcElement.id == "incorrect") {
//             console.log("Sorry, wrong answer");
//             $("#winLose").text("NOPE! Money Lost")
//             subtractMoney();
//             $(buttonDiv).empty();
//             $("#quiz").show();
//         };
//     });
// };