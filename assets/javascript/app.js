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
var buttonsArr = [];

ajaxResponses = [];

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
        switch (difficulty) {
            case easy:
                categoryFunction(response, easy)
                break;

            case medium:
                categoryFunction(response, medium)
                break;

            case hard:
                categoryFunction(response, hard)
                break;
        }
    });
};


// for each header (3), perform ajax and push category numbs to all

for (var a = 0; a < 3; a++) {
    var catNumb = getRndInt(9, 32);
    newCat(easy);
    newCat(medium);
    newCat(hard);
}

// please append these to the response div
function please(array) {
    // console.log(array)
    // ========================
    // buttons
    // =========================
    var more = document.getElementById("responseDiv");

    for (var i = 0; i < array.length; i++) {

        var butt = document.createElement("button");
        butt.innerHTML = array[i];
        $(butt).attr("class", "answerBtn");
        more.appendChild(butt);

    }
};

function getAnswer(selected) {
    // reads which button they clicked
    var clickedAnswer = $(this).html();

    for (let x = 0; x < ajaxResponses.length; x++) {

        if (clickedAnswer === ajaxResponses[x].correct_answer) {
            $("#results").text("Correct!");
            ajaxResponses[x].score();
            $("#moneyWon").text(moneyWon);

        } else {
            $("#results").text("Sorry, that's not correct!");
            ajaxResponses[x].down();
            $("#moneyWon").text(moneyWon);
        }
    }
}

// clears game evidence
$("#responseDiv").empty();
$("#displayQ").empty();

// gets data
function categoryFunction(data, difficulty) {
    // saves the data response into a new Category
    var d = data.results[0];
    var triviaName = d.category;
    var triviaQ = d.question;
    var triviaC = d.correct_answer;
    var triviaI = d.incorrect_answers;
    var triviaValue = difficulty;

    ajaxResponses.push(new Category(triviaName, triviaQ, triviaC, triviaI, triviaValue));
    console.log(ajaxResponses);

    var question = $("<button>").text("$3000");
    $(question).attr("class", "moneyButtons");
    $(question).on("click", function () {
        $("#quiz").css("visibility", "hidden");
        $("#quiz").css("height", "0px");

    })
    var answersArr = [];

    var selectedArr = [];


    for (x = 0; x < ajaxResponses.length; x++) {
        answersArr.push(ajaxResponses[x].incorrect_answers, ajaxResponses[x].correct_answer);
        console.log(answersArr)

        // shuffle incorrect & correct answers
        // shuffle(concatArr);
    
        // please(concatArr);

    }
    for (x = 0; x < answersArr.length; x++){
        selectedArr.push(answersArr[x]);

        // var concatArr = answersArr[0].concat(answersArr[1]);

    }
    console.log(selectedArr)





    //===================================
    // answer buttons
    var butt = $(".answerBtn");
    $(butt).attr("class", "answerQ");

    $(butt).on("click", function () {
        $("#quiz").css("visibility", "inherit");
        $("#quiz").css("height", "auto");

        getAnswer(butt);

    });

    var moneyButton = $(question);
    moneyButton.appendTo("#quiz");

    moneyButton.on("click", function () {
            $(this).prop('disabled', true);

            console.log($(this))


            // $("#displayQ").text(hardCat.question);
            $("#results").empty();
            please();

        });


    };