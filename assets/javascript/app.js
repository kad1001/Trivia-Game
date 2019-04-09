
var th1 = $("<th>");
var th2 = $("<th>");
var th3 = $("<th>");
var headers = [th1, th2, th3];
var body = $("#tBody");


var easy = 'easy';
var medium = 'medium';
var hard = 'hard';

// =====================
// arrays
// =====================
var all = [];
var buttonsArr = [];

moneyWon = [];


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
                return moneyWon
            }

            if (this.difficulty === 'medium') {
                moneyWon += 2000;
                return moneyWon
            }

            if (this.difficulty === 'hard') {
                moneyWon += 3000;
                return moneyWon
            }
        }

    this.down = function (difficulty) {
        if (this.difficulty === 'easy') {
            // if they are correct
            moneyWon -= 1000;
            return moneyWon
        }

        if (this.difficulty === 'medium') {
            moneyWon -= 2000;
            return moneyWon
        }

         if (this.difficulty === 'hard') {
            moneyWon -= 3000;
            return moneyWon
        }
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
        if (difficulty === easy) {
            catfunction1(response);
        }

        if (difficulty === medium) {
            catfunction2(response);
        }
        if (difficulty === hard) {
            catfunction3(response);
        }
    });
};


// for each header (3), perform ajax and push category numbs to all

for (var a = 0; a < headers.length; a++) {
    var queries = [];
    var divBtn = $("<div>");
    var catNumb = getRndInt(9, 32);

    newCat(easy);
    newCat(medium);
    newCat(hard);
}


// gets data
function catfunction1(data) {
    // saves the data response into a new Category
    var d = data.results[0];
    var triviaName = d.category;
    var triviaQ = d.question;
    var triviaC = d.correct_answer;
    var triviaI = d.incorrect_answers;
    var triviaValue = d.difficulty;

    var easyCat = new Category(triviaName, triviaQ, triviaC, triviaI, triviaValue);
    console.log(easyCat);
    var header = $("<td>").text(easyCat.Name);
    $("#sciRow").append(header);
    all.push(easyCat);
    var question = $("<button>").text("$1000");
    $(question).attr("class", "moneyButtons");
    $(question).on("click", function(){
        $("#quiz").css("visibility", "hidden");
        $("#quiz").css("height", "0px");

    })


    var answersArr = [];
    answersArr.push(easyCat.incorrect_answers, easyCat.correct_answer);
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
        //===================================
        // answer buttons
        var butt = $(".answerBtn");
        $(butt).attr("class", "answerQ");
        $(butt).click(function () {
            $("#quiz").css("visibility", "inherit");
            $("#quiz").css("height", "auto");


            // reads which button they clicked
            var clickedAnswer = $(this).html();

            if (clickedAnswer === easyCat.correct_answer) {
                $("#results").text("Correct!");
                easyCat.score();
                $("#moneyWon").text(moneyWon);

            } else {
                $("#results").text("Sorry, that's not correct!");
                easyCat.down();
                $("#moneyWon").text(moneyWon);
            }

            // clears game evidence
            $("#responseDiv").empty();
            $("#displayQ").empty();
        });
    };

    var button1 = $(question);

    button1.click(function () {

        // disable all buttons in the quiz
        $(this).prop('disabled', true);

        $("#displayQ").text(easyCat.question);
        $("#results").empty();
        please();

    });
    button1.appendTo("#rowOne");
};


// gets data
function catfunction2(data) {
    // saves the data response into a new Category
    var d = data.results[0];
    var triviaName = d.category;
    var triviaQ = d.question;
    var triviaC = d.correct_answer;
    var triviaI = d.incorrect_answers;
    var triviaValue = d.difficulty;

    var medCat = new Category(triviaName, triviaQ, triviaC, triviaI, triviaValue);
    console.log(medCat);

    all.push(medCat);
    var question = $("<button>").text("$2000");
    $(question).attr("class", "moneyButtons");
    $(question).on("click", function(){
        $("#quiz").css("visibility", "hidden");
        $("#quiz").css("height", "0px");
    })
    var answersArr = [];
    answersArr.push(medCat.incorrect_answers, medCat.correct_answer);
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

        //===================================

        // answer buttons
        var butt = $(".answerBtn");
        $(butt).attr("class", "answerQ");
        $(butt).click(function () {
            $("#quiz").css("visibility", "inherit");
            $("#quiz").css("height", "auto");


            // reads which button they clicked
            var clickedAnswer = $(this).html();

            if (clickedAnswer === medCat.correct_answer) {
                $("#results").text("Correct!");
                medCat.score();
                $("#moneyWon").text(moneyWon);

            } else {
                $("#results").text("Sorry, that's not correct!");
                medCat.down();
                $("#moneyWon").text(moneyWon);
            }

            // clears game evidence
            $("#responseDiv").empty();
            $("#displayQ").empty();
        });
    };

    var button2 = $(question);

    button2.click(function () {
        $(this).prop('disabled', true);


        $("#displayQ").text(medCat.question);
        $("#results").empty();
        please();
    });
    button2.appendTo("#rowTwo");
};


// gets data
function catfunction3(data) {
    // saves the data response into a new Category
    var d = data.results[0];
    var triviaName = d.category;
    var triviaQ = d.question;
    var triviaC = d.correct_answer;
    var triviaI = d.incorrect_answers;
    var triviaValue = d.difficulty;

    var hardCat = new Category(triviaName, triviaQ, triviaC, triviaI, triviaValue);
    console.log(hardCat);

    all.push(hardCat);
    var question = $("<button>").text("$3000");
    $(question).attr("class", "moneyButtons");
    $(question).on("click", function(){
        $("#quiz").css("visibility", "hidden");
        $("#quiz").css("height", "0px");

    })
    var answersArr = [];
    answersArr.push(hardCat.incorrect_answers, hardCat.correct_answer);
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
        //===================================
        // answer buttons
        var butt = $(".answerBtn");
        $(butt).attr("class", "answerQ");

        $(butt).click(function () {
            $("#quiz").css("visibility", "inherit");
            $("#quiz").css("height", "auto");



            // reads which button they clicked
            var clickedAnswer = $(this).html();

            if (clickedAnswer === hardCat.correct_answer) {
                $("#results").text("Correct!");
                hardCat.score();
                $("#moneyWon").text(moneyWon);

            } else {
                $("#results").text("Sorry, that's not correct!");
                hardCat.down();
                $("#moneyWon").text(moneyWon);
            }

            // clears game evidence
            $("#responseDiv").empty();
            $("#displayQ").empty();
        });
    };

    var button3 = $(question);

    button3.click(function () {
        $(this).prop('disabled', true);


        $("#displayQ").text(hardCat.question);
        $("#results").empty();
        please();

    });
    button3.appendTo("#rowThree");
};