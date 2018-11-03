$(document).ready(function () {
    var openScreen;
    var position = 0;
    var theTimer;
    var correctOnes = 0;
    var incorrectOnes = 0;
    var quizHTML;
    var counter = 30;
    var questionArray = [
        "1- Which function among the following lets to register a function to be invoked once?",
        "2- Which function among the following lets to register a function to be invoked repeatedly after a certain time?",
        "3- Which is the handler method used to invoke when uncaught JavaScript exceptions occur?",
        // "4- Which property is used to obtain browser vendor and version information?",
        // "5- Which method receives the return value of setInterval() to cancel future invocations?",
        // "6- The setTimeout() belongs to which object?",
        // "7- Which method receives the return value of setTimeout() to cancel future invocations?",
        // "8- What will happen if we call setTimeout() with a time of 0 ms?",
        // "9- To which object does the location property belong?",
        // "10- What is the result of the following code snippet? (window.location === document.location)"
    ]

    var answerArray = [
        ["setTimeout()", "setTotaltime()", "setInterval()", "none of the mentioned"],
        ["setTimeout()", "setTotaltime()", "setInterval()", "none of the mentioned"],
        ["Onhalt", "Onerror", "Both onhalt and onerror", "None of the mentioned"],
        // ["modal", "version", "browser", "navigator"],
        // ["clearInvocation()", "cancelInvocation()", "clearInterval()", "None of the mentioned"],
        // ["Element", "Window", "Location", "None of the mentioned"],
        // ["clearTimeout()", "clearInterval()", "clearSchedule()", "none of the mentioned"],
        // ["Placed in stack", "Placed in queue", "Will run continuously", "None of the mentioned"],
        // ["Window", "Position", "Element", "Location"],
        // ["False", "True", "0", "1"]
    ]
    var correctAnswers = [
        "setTimeout()",
        "setInterval()",
        "Onerror",
        // "D. navigator",
        // "C. clearInterval()",
        // "B. Window",
        // "A. clearTimeout()",
        // "B. Placed in queue",
        // "A. Window",
        // "B. True"
    ];

    function openingPage() {
        openScreen = "<p class='text-center'><a class='btn btn-secondary btn-md btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
        $("#mainArea").append(openScreen);
    }
    openingPage();

    $("#mainArea").on("click", ".start-button", function (event) {
        event.preventDefault();
        // can add sound here.play();
        $('.jumbotron').hide();
        generateQuestions();
        timerWrapper();
    });

    $("body").on("click", ".answers", function (event) {
        selectedAnswer = $(this).text(); //pulling out what is inside the button
        if (selectedAnswer === correctAnswers[position]) {
            clearInterval(theTimer),
                generateWin()
        } else {
            clearInterval(theTimer),
                generateLoss();
        };
    });

    var quizHTML;

    function generateQuestions() {
        quizHTML =
            "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p>" +
            "<p class='text-center'>" + questionArray[position] + "</p>" +
            "<button class='answers btn-secondary ml-3 mt-3 mb-1 p-2'>" + answerArray[position][0] + "</button><br>" +
            "<button class='answers btn-secondary ml-3 mb-1 p-2'>" + answerArray[position][1] + "</button><br>" +
            "<button class='answers btn-secondary ml-3 mb-1 p-2'>" + answerArray[position][2] + "</button><br>" +
            "<button class='answers btn-secondary ml-3 mb-3 p-2'>" + answerArray[position][3] + "</button>";
        $("#mainArea").html(quizHTML);
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

    $("body").on("click", ".reset-button", function (event) {
        resetGame();
    });

    function timeoutLoss() {
        incorrectOnes++;
        quizHTML = "<p class='text-center'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Time's Up!  The correct answer was: " + correctAnswers[position] + "</p>" + "<img class='result-img' src='assets/images/timeout.jpg'>";
        $("#mainArea").html(quizHTML);
        setTimeout(wait, 3000);
    }

    function generateWin() {
        correctOnes++;
        quizHTML = "<p class='text-center'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[position] + "</p>" + "<img class='result-img' src='assets/images/correctanswer.jpg'>";
        $("#mainArea").html(quizHTML);

        setTimeout(wait, 3000);
    }

    function generateLoss() {
        incorrectOnes++;
        quizHTML = "<p class='text-center'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: " + correctAnswers[position] + "</p>" + "<img class='result-img' src='assets/images/wronganswer.jpg'>";
        $("#mainArea").html(quizHTML);
        setTimeout(wait, 3000);
    }
    //end generate loss

    function wait() {
        position < 2 ? //remember to adjust this number to match your question
            (position++,
                generateQuestions(),
                counter = 30,
                timerWrapper()) :

            (finalScreen())
    }; //end function

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

    function finalScreen() {

        quizHTML = "<p class='text-center'>Result Of Your Quiz!" + "</p>" + "<p class='text-center'>Correct Answers: " + correctOnes + "</p>" + "<p class='text-center'>Wrong Answers: " + incorrectOnes + "</p>" + "<p class='text-center'><a class='btn btn-warning btn-md btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
        $("#mainArea").html(quizHTML);
    }

    function resetGame() {
        position = 0;
        correctOnes = 0;
        incorrectOnes = 0;
        counter = 30;
        generateQuestions();
        timerWrapper();
    }
}); //DONOT DEALETE THIS LINE
