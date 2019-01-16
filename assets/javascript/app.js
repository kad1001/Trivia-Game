
	//     function startTimer(duration, display) {
	//     var timer = duration, minutes, seconds;
	//     setInterval(function () {
	//         minutes = parseInt(timer / 60, 10)
	//         seconds = parseInt(timer % 60, 10);
	
	//         minutes = minutes < 10 ? "0" + minutes : minutes;
	//         seconds = seconds < 10 ? "0" + seconds : seconds;
	
	//         display.textContent = minutes + ":" + seconds;
	
	//         if (--timer < 0) {
	//             timer = duration;
	//             alert("time's up!")
	//         }
	//     }, 1000);
        // };
//     // runs timer for 10 seconds
//     // startTimer(10, display);



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




//  global vars...
    // the money container
    var money = 0;

    // money array (test)
    var moneyArr = [];

    // winnings and losses arrays
    var winnings = [];
    var losses = [];

    // the question container
    var question;

    var subject;
    var difficulty;

    var easyMoney = 1000;
    var mediumMoney = 2000;
    var hardMoney = 3000;

    var queryURL = ("https://opentdb.com/api.php?amount=1&category=" + subject + difficulty + "&type=multiple");
    
    // difficulty APIs
    var easy = "&difficulty=easy";
    var medium = "&difficulty=medium";
    var hard = "&difficulty=hard";
    //   subject APIs
    var scienceSubject = 17;
    var compSubject = 11;
    var entSubject = 12;

    var question;
    var correct_answer;
    var incorrect_answer1;
    var incorrect_answer2;
    var incorrect_answer3;

    var input;
    var evaluateText;


        // newSum function for taking elems in array and adding them

        // const newEasySum = winnings.reduce((accumulator, currentValue) => {
        //     accumulator = 1000;
        //     console.log('The value of accumulator: ', accumulator);
        //     console.log('The value of currentValue: ', currentValue);
        //     return accumulator + currentValue;
        // }, 0);
    
        // console.log(newEasySum)
        // empties text of button

//  The createRow function takes data returned by newTrivia and appends the table data to the tbody
    var createRow = function(data) {



        
          var question = data.results[0].question;
    
           var correct_answer = data.results[0].correct_answer;
           var incorrect_answer1 = data.results[0].incorrect_answers[0];
           var incorrect_answer2 = data.results[0].incorrect_answers[1];
            var incorrect_answer3 = data.results[0].incorrect_answers[2];

        // the options container       
        var options = [];

        options.push(correct_answer, incorrect_answer1, incorrect_answer2, incorrect_answer3);
        options = shuffle(options);

        console.log("options:", options);

        // may not need to declare these vars
        var option1 = $("#option1").text(options[0]);
        var option2 = $("#option2").text(options[1]);
        var option3 = $("#option3").text(options[2]);
        var option4 = $("#option4").text(options[3]);


        // displays question and money
        console.log("question:", question);
        console.log("correct answer:", correct_answer)
        var moneyDisplay = $("#moneyDisplay").text(money);
        var questionDisplay = $("#question").text(question);

        // empties this button
    };

    
       
    // the updateScore function takes a value, determines if it matches the api value, and then updates money
    // based on difficulty
    // ???
        // var updateScore = function(input){
        // // stores the typed characters as var input
        // var input = $("#type-response").val().trim();

        // if (input == correct_answer); {
        //     console.log("nice u r right")
        //     // adds money
        //     // winnings.push(easyMoney);
        //     // console.log(winnings)
        // }
    // };
            
    
    // DATA RETRIVAL
	//  The newTrivia function takes a subject and difficulty, searches the api for it, and then passes the data to createRow

    var newTrivia = function(subject, difficulty) {
        var queryURL = ("https://opentdb.com/api.php?amount=1&category=" + subject + difficulty + "&type=multiple");
        
        // define which button's difficulty was triggered
        var easyBtn = (difficulty == easy);
        var medBtn = (difficulty == medium);
        var hardBtn = (difficulty == hard);

        $.ajax({
            url: queryURL,
            method: "GET"
            }).then(function(response) {
        
                createRow(response);
                // updateScore(input);
                
                // switch statement based on true or false button press
                // push money to each array
                switch (easyBtn) {
                    case true:
                        console.log("tru this is so easy");
                        moneyArr.push(easyMoney);
                    break;

                    // button other than easyBtn pressed
                    case false:
                        console.log("not an easy question");

                        switch (medBtn) {
                            case true:
                                console.log("tru this is medium");
                                moneyArr.push(mediumMoney);
                            break;

                            case false:
                                console.log("not a medium question");
                            
                            switch(hardBtn) {
                                case true:
                                    console.log("tru this shit is hard");
                                    moneyArr.push(hardMoney);
                                break;
                            }

                    }
                break;

                    default:
                        console.log("wym??")
                }
            });
        };
    