// import { setPriority } from "os";

var time;
moneyWon = 0;
// moneyLost = 0;


var th1 = $("<th>");

var th2 = $("<th>");

var th3 = $("<th>");

var headers = [th1, th2, th3];

var easy = 'easy';
var medium = 'medium';
var hard = 'hard';
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
        this.difficulty = difficulty,

        // determines value of question this will upvote in correctA
        this.score = function (difficulty) {
            if (this.difficulty === 'easy') {
                console.log(this.difficulty);
                // if they are correct
                moneyWon += 1000;
                var lastItem = moneyWon.pop();

                return moneyWon
            }

            // if (this.difficulty === 'medium') {
            //     moneyWon2000);
            //     return moneyWon
            // }

            // if (this.difficulty === 'hard') {
            //     moneyWon.push(3000);
            //     return moneyWon
            // }
        }

        this.down = function (difficulty) {
            if (this.difficulty === 'easy') {
                console.log(this.difficulty);
                // if they are correct
                moneyWon -= 1000;
                return moneyWon
            }

            // if (this.difficulty === 'medium') {
            //     moneyLost.push(2000);
            //     return moneyLost
            // }

            // if (this.difficulty === 'hard') {
            //     moneyLost.push(3000);
            //     return moneyLost
            // }
        }
}



//  gets ajax response of random difficulties
function newCat(difficulty) {
    // console.log(difficulty);
    // gets always global (random) catNumb the random cat number
    // can take anywhere from 9 to 32 cats in 1 sitting hopefully
    var queryURL = ("https://opentdb.com/api.php?amount=3&category=" + catNumb + "&difficulty=" + difficulty + "&type=multiple");

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        catfunction1(response);
    });
};


// for each header (3), perform ajax and push category numbs to all

for (var a = 0; a < headers.length; a++) {
    var queries = [];
    var divBtn = $("<div>");
    var catNumb = getRndInt(9, 32);
    // returns all easy questions
    newCat(easy);
}

// newCat(medium);
// newCat(hard);


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
    // console.log(all);

    // console.log(category.difficulty);

    var question = $("<button>").text("$1000");

    var medQ = $("<button>").text("$2000");

    var hardQ = $("<button>").text("$3000");

    $(question).attr("class", "moneyButtons");
    $(medQ).attr("class", "moneyButtons");
    $(hardQ).attr("class", "moneyButtons");

    // console.log(category.score());
    var answersArr = [];
    answersArr.push(category.incorrect_answers, category.correct_answer);
    var concatArr = answersArr[0].concat(answersArr[1]);
    // shuffle incorrect & correct answers
    shuffle(concatArr);

    // please append these to the response div
    function please() {
        // ========================
        // buttons
        // =========================

        var more = document.getElementById("responseDiv");
        for (var i = 0; i < concatArr.length; i++) {
            var butt = document.createElement("button");
            butt.innerHTML = concatArr[i];
            $(butt).attr("class", "answerBtn");
            more.appendChild(butt);
        }


        // answer buttons
        var butt = $(".answerBtn");
        // console.log(butt);
        $(butt).attr("class", "answerQ");

        $(butt).click(function () {

            // reads which button they clicked
            var clickedAnswer = $(this).html();

            console.log(category);
            // console.log(clickedAnswer);

            if (clickedAnswer === category.correct_answer) {

                $("#results").text("Correct!");
                category.score();
                console.log(lastItem);
                $("#moneyWon").append(moneyWon);

            } else {
                $("#results").text("Sorry, that's not correct!");
                category.down();
                console.log(lastItem);
                $("#moneyWon").append(moneyWon);
                

            }

            $("#responseDiv").empty();
            $("#displayQ").empty();
        });


    };


    var button1 = $(question);

    // var button2 = $(medQ);

    // var button3 = $(hardQ);

    button1.click(function () {

        $("#displayQ").text(category.question);
        $("#results").empty();

        please();

    });

    // button2.click(function () {
    //     $("#displayQ").text(category.question);
    //     $("#results").empty();

    //     please();
    // });

    // button3.click(function () {
    //     $("#displayQ").text(category.question);
    //     $("#results").empty();

    //     please();
    // })



    button1.appendTo("#rowOne");

    // button2.appendTo("#rowTwo");

    // button3.appendTo("#rowThree");


};