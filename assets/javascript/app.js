 // variables
    var subject;
    var difficulty;
    var newTrivia;
    var question;
    var answerCorrect;
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

    
    // resets game variables
    // shows quiz page & money container
    function game(){
        $("#moneyDisplay").text(money);
        $("#practiceDiv").hide();
    };

    // call game function to set vars
    game(); 
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
                    // alert("time's up!");
                    // returns back to quiz page
                    game();
                }
            }, 1000);
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

    var newTrivia = function(subject, difficulty){
        var queryURL = ("https://opentdb.com/api.php?amount=1&category=" + subject + difficulty + "&type=multiple");
        $.ajax({
        url: queryURL,
        method: "GET"
        // passes the data to createButtons
      }).then(function(response){
          createButtons(response);
         });
    };



// called if user clicks correct answer
    function addMoney(){
        if (difficulty == "medium"){
            money += 2000;
            console.log(money);
        };
        if (difficulty == "easy"){
            money += 1000;
            console.log(money)
        };
        if (difficulty == "hard"){
            money += 3000;
            console.log(money)
        };
    };


    // called if user clicks incorrect answer
    function subtractMoney (difficulty, money){
        if (difficulty == "easy"){
            (money -= 1000);
            console.log(money);
        };
        if (difficulty == "medium"){
            (money -= 2000);
            console.log(money);
        };
        if (difficulty == "hard"){
            (money -= 3000);
            console.log(money);
        };
    };
    
        // data displayed on buttons on screen
        var createButtons = function(data){
            // readability
            var results = data.results[0];
            // json
            var question = results.question;
            var difficulty = results.difficulty;
            var correct_answer = results.correct_answer;
            var incorrect_answer1 = results.incorrect_answers[0];
            var incorrect_answer2 = results.incorrect_answers[1];
            var incorrect_answer3 = results.incorrect_answers[2];

            // display timer
            var time = startTimer(10, 0);
            console.log(time)
            $("#showTimer").append(time);
            // alerts the user "time's up" after 10 seconds
            
           $("#quiz").hide();
           $(".moneyContainer").hide();
           $("#question").text(question);
    
           var button1 = $("<button>").text(correct_answer);
                $(this).attr("val", difficulty);
            var button2 = $("<button>").text(incorrect_answer1);
                    $(this).attr("val", difficulty);
           var button3 = $("<button>").text(incorrect_answer2);
                $(this).attr("val", difficulty);
            var button4 = $("<button>").text(incorrect_answer3);
                    $(this).attr("val", difficulty);
            buttonsArray = [];
            buttonsArray.push(button1, button2, button3, button4);
    
            console.log(difficulty);
       
            // shuffle
            buttonsArray = shuffle(buttonsArray);
            // each div id in DOM is replaced with text from buttons array
            $("#btn1").append(buttonsArray[0]);
            $("#btn2").append(buttonsArray[1]);
            $("#btn3").append(buttonsArray[2]);
            $("#btn4").append(buttonsArray[3]);
    
    
            // function for clicking correct button
            $(button1).click(function(){
                alert("Correct!"); 
                addMoney();
                $(".moneyContainer").show();
                $("#praciceDiv").hide();
                $("#quiz").show();
            });
    
    
            $(".wrong").click(function(){
                alert("Incorrect!");
                subtractMoney();
                $(".moneyContainer").show();
                $("#praciceDiv").hide();
                $("#quiz").show();
            });  
        };
    