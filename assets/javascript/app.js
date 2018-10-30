$(document).ready(function () {
    var position = 0;
    var question;
    var choice1;
    var choice2;
    var choice3;
    var choice4;
    var correctAnswers = 0;
    var wrongAnswers = 0;

    var questions = [
        // 1
        ["1. Which function among the following lets to register a function to be invoked once?",
            "setTotaltime()", "setInterval()", "none of the mentioned", "setTimeout()", "D"
        ],
        // 2
        ["2. Which function among the following lets to register a function to be invoked repeatedly after a certain time?",
            "setTimeout()", "setTotaltime()", "setInterval()", "none of the mentioned", "C"
        ],
        // 3
        ["3. Which is the handler method used to invoke when uncaught JavaScript exceptions occur?",
            "Onhalt", "Onerror", "Both onhalt and onerror", "None of the mentioned", "B"
        ],
        // 4
        ["4. Which property is used to obtain browser vendor and version information?",
            "modal", "version", "browser", "navigator", "D"
        ],
        // 5
        ["5. Which method receives the return value of setInterval() to cancel future invocations?",
            "clearInvocation()", "cancelInvocation()", "clearInterval()", "None of the mentioned", "C"
        ]

    ];
    displayQuestion();

    function displayQuestion() {
        question = questions[position][0];
        choice1 = questions[position][1];
        choice2 = questions[position][2];
        choice3 = questions[position][3];
        choice4 = questions[position][4];
        correctChoice = questions[position][5];
        $("#question").html(question);
        $("#btn1").html(choice1);
        $("#btn2").html(choice2);
        $("#btn3").html(choice3);
        $("#btn4").html(choice4);
    }

    $("[name=choices]").on("click", function () {
        position++
        if (position === questions.length) {
            $("#quiz").hide();
            quizResults();
            return;
        }
        if (correctChoice === this.value) {
            correctAnswers++;
        } else if (correctChoice != this.value) {
            wrongAnswers++
        };
        console.log(correctAnswers);
        console.log(wrongAnswers);
        console.log("-------------------");
        displayQuestion();
    });

    function quizResults() {
        $("#question").html("You Have finished your quiz! <br><strong> Correct Answers: </strong>" + (correctAnswers) + "<br>" +
            "<strong> Wrong Answers: </strong>" + (wrongAnswers) + "<br>" + "<br>"+
            "<button id= startOver class=  btn-secondary m-1 onclick=>Start Over</button>");
        $("#startOver").on("click", function () {
            position = 0;
            correctAnswers = 0;
            wrongAnswers = 0;
            $("#startOver").hide();
            $("#quiz").show();
            displayQuestion();
        })
    }
}); //DONOT DEALETE THIS LINE
//More questions arrays
// ,
// // 6
// ["",
//     "", "", "", "", ""
// ],
// // 7
// ["",
//     "", "", "", "", ""
// ],
// // 8
// ["",
//     "", "", "", "", ""
// ],
// // 9
// ["",
//     "", "", "", "", ""
// ],
// // 10
// ["",
//     "", "", "", "", ""
// ]