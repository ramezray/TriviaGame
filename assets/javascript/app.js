$(document).ready(function () {
    var openScreen;
    var position = 0; //set position to zero value which is what first index value in an array. 
    var theTimer;
    var correctOnes = 0; //
    var incorrectOnes = 0;
    var quizHTML;
    var counter = 30;
    var questionArray = [
        "1- Which function among the following lets to register a function to be invoked once?",
        "2- Which function among the following lets to register a function to be invoked repeatedly after a certain time?",
        "3- Which is the handler method used to invoke when uncaught JavaScript exceptions occur?",
        "4- Which property is used to obtain browser vendor and version information?",
        "5- Which method receives the return value of setInterval() to cancel future invocations?",
        "6- The setTimeout() belongs to which object?",
        "7- Which method receives the return value of setTimeout() to cancel future invocations?",
        "8- What will happen if we call setTimeout() with a time of 0 ms?",
        "9- To which object does the location property belong?",
        "10- What is the result of the following code snippet? (window.location === document.location)"
    ]

    var answerArray = [
        ["setTimeout()", "setTotaltime()", "setInterval()", "none of the mentioned"],
        ["setTimeout()", "setTotaltime()", "setInterval()", "none of the mentioned"],
        ["Onhalt", "Onerror", "Both onhalt and onerror", "None of the mentioned"],
        ["modal", "version", "browser", "navigator"],
        ["clearInvocation()", "cancelInvocation()", "clearInterval()", "None of the mentioned"],
        ["Element", "Window", "Location", "None of the mentioned"],
        ["clearTimeout()", "clearInterval()", "clearSchedule()", "none of the mentioned"],
        ["Placed in stack", "Placed in queue", "Will run continuously", "None of the mentioned"],
        ["Window", "Position", "Element", "Location"],
        ["False", "True", "0", "1"]
    ]
    var correctAnswers = [
        "A. setTimeout()",
        "C. setInterval()",
        "B. Onerror",
        "D. navigator",
        "C. clearInterval()",
        "B. Window",
        "A. clearTimeout()",
        "B. Placed in queue",
        "A. Window",
        "B. True"
    ];
    //function to open first screen and add start quiz button
    function openingPage() {
        openScreen = "<p class='text-center'><a class='btn btn-secondary btn-md btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
        $("#mainArea").append(openScreen); //using append function to add the start button to the open screen.
    }
    openingPage(); //calling open fucntion 

    //this function will fire up after user clicks start quiz
    $("#mainArea").on("click", ".start-button", function (event) {
        event.preventDefault(); //stoping any defult action to happen
        // can add sound here.play();
        $('.jumbotron').hide(); //hide the jumbotron div
        generateQuestions(); //create first Q
        timerWrapper(); //start the timer
    });

    //this function will evaulte the click if it is correct or not
    $("body").on("click", ".answers", function (event) {
        selectedAnswer = $(this).text(); //pulling out what is inside the button
        if (selectedAnswer === correctAnswers[position]) { //if user choice answer that equal to the correct answer
            clearInterval(theTimer), //reset the timer
                generateWin() //increament winning by 1
        } else { //if the choicing answer with wrong
            clearInterval(theTimer), //set timer
                generateLoss(); //but increament losses by 1
        };
    });

    var quizHTML; //var to hold all HTML elements

    function generateQuestions() {
        quizHTML =
            "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p>" +
            "<p class='text-center'>" + questionArray[position] + "</p>" +
            "<button class='answers btn-secondary ml-3 mt-3 mb-1 p-2'>A. " + answerArray[position][0] + "</button><br>" +
            "<button class='answers btn-secondary ml-3 mb-1 p-2'>B. " + answerArray[position][1] + "</button><br>" +
            "<button class='answers btn-secondary ml-3 mb-1 p-2'>C. " + answerArray[position][2] + "</button><br>" +
            "<button class='answers btn-secondary ml-3 mb-3 p-2'>D. " + answerArray[position][3] + "</button>";
        $("#mainArea").html(quizHTML);
    };

    //timer functions
    function timerWrapper() {
        theTimer = setInterval(thirtySeconds, 1000);

        function thirtySeconds() {
            if (counter === 0) {
                clearInterval(theTimer);
                timeoutLoss();
            }
            if (counter > 0) {
                counter--;
            }
            $(".timer").html(counter);
        }
    }

    //click listner to start quiz button 
    $("body").on("click", ".reset-button", function (event) {
        resetGame();
    });

    //function if no answer till time is up
    function timeoutLoss() {
        incorrectOnes++;
        quizHTML = "<p class='text-center'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Time's Up!  The correct answer was: " + correctAnswers[position] + "</p>" + "<img class='result-img' src='assets/images/timeout.jpg'>";
        $("#mainArea").html(quizHTML);
        setTimeout(wait, 3000);
    }

    //function if user got correct answeer
    function generateWin() {
        correctOnes++; //increament win by 1
        quizHTML = "<p class='text-center'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[position] + "</p>" + "<img class='result-img' src='assets/images/correctanswer.jpg'>";
        $("#mainArea").html(quizHTML); //set timer to zero, show what is the correct answer, and show pic for getting correct answer
        setTimeout(wait, 3000); //wait 3 seconds for user to go over the answer
    }

    //same as previous 
    function generateLoss() {
        incorrectOnes++;
        quizHTML = "<p class='text-center'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: " + correctAnswers[position] + "</p>" + "<img class='result-img' src='assets/images/wronganswer.jpg'>";
        $("#mainArea").html(quizHTML);
        setTimeout(wait, 3000);
    }

    //this function at last question 
    function wait() {
        if (position < 9) { //this number can be changed depending on how many qustion we have.
            position++;
            generateQuestions();
            counter = 30;
            timerWrapper();
        } else {
            finalScreen()
        };

    };

    function timerWrapper() {
        theTimer = setInterval(thirtySeconds, 1000);

        function thirtySeconds() {
            if (counter === 0) {
                clearInterval(theTimer);
                timeoutLoss();
            }
            if (counter > 0) {
                counter--;
            }
            $(".timer").html(counter);
        }
    }

    //final screen function 
    function finalScreen() {
        quizHTML = "<p class='text-center'>Result Of Your Quiz!" + "</p>" + "<p class='text-center'>Correct Answers: " + correctOnes + "</p>" + "<p class='text-center'>Wrong Answers: " + incorrectOnes + "</p>" + "<p class='text-center'><a class='btn btn-warning btn-md btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
        $("#mainArea").html(quizHTML);
    }

    //reset the quiz
    function resetGame() {
        position = 0;
        correctOnes = 0;
        incorrectOnes = 0;
        counter = 30;
        generateQuestions();
        timerWrapper();
    }
}); //DONOT DEALETE THIS LINE