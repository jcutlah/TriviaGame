// show question/answer options w/ timer above
// when answered, mark question as answered and remove question from HTML
// if correct, pause timer and celebrate by showing something cool...remove cool thing
// show question
// if all questions answered, show results
// functions: showQuestion(), pauseTimer(), startTimer(), celebrate(), showResults()
// click listeners: startGame button, questionAnswer
window.addEventListener('DOMContentLoaded', function(){
    var game = {
        currentQuestion: {},
        gameTimer: 4,
        questions: [
            {
                question:"Is the sky sometimes blue?",
                answers:["yes","no","well that depends, are we assuming the earth is flat?"],
                correctAnswer:"yes",
                celebrate:"Wooop wooop!",
                answer: "yes",
                answered: false
            },
            {
                question:"Why do babies cry?",
                answers:["growing is hard","they hate their makers"],
                correctAnswer:"growing is hard",
                celebrate:"Nice work!",
                answer: "growing is hard",
                answered: false
            },
            {
                question:"Do you love Toby?",
                answers:["yes, duh","no thanks","who is Toby?"],
                correctAnswer:"yes, duh",
                celebrate:"Ruff!?",
                answer: "yes, duh",
                answered: false
            }
        ],
        loadQuestion: function(){
            // debugger;
            var questionHolder = $('#question-holder');
            var question = $('<div>');
            var timer = $('<div>');
            var questionForm = 
            timer.addClass('timer');
            question.addClass('question-card');
            question.append(timer);
            for (i=0;i<this.questions.length;i++){
                if (!this.questions[i].answered){
                    this.currentQuestion = this.questions[i];
                    console.log(game);
                    question.append("<p class=question>"+ this.questions[i].question +"</p>");
                    // debugger;
                    for (ind=0;ind<this.questions[i].answers.length;ind++){
                        var answer = $('<input>');
                        var answerHolder = $('<p>');
                        answerHolder.addClass('answer');
                        answer.attr('type','radio');
                        answer.val(this.questions[i].answers[ind]);
                        answerHolder.text(this.questions[i].answers[ind])
                        answerHolder.prepend(answer);
                        question.append(answerHolder);
                    };
                    break; 
                }
                
            };
            questionHolder.append(question);
            $('.answer input').click(function(){
                game.currentQuestion.answered = true;
                var guess = $(this).get(0).value;
                if (guess === game.currentQuestion.answer){
                    alert('correct');
                } else {
                    alert('incorrect');
                }
            });
        },
        timeConverter: function(t) {
            var minutes = Math.floor(t / 60);
            var seconds = t - (minutes * 60);
            if (seconds < 10) {
                seconds = "0" + seconds;
            }
            if (minutes === 0) {
                minutes = "00";
            }
            else if (minutes < 10) {
                minutes = "0" + minutes;
            }
            return minutes + ":" + seconds;
        },
        timer: function(){
            var timer = setInterval(function(){
                // decrement gameTimer
                game.gameTimer--;
                timeNow = game.timeConverter(game.gameTimer);
                $('.timer').each(function(){
                    $(this).text(timeNow);
                });
                // find timer containers
                // set the innerText with the current time
                if (game.gameTimer === 0){
                    clearInterval(timer);
                    // alert("Time's up!!!");
                }
            },1000);
        }
    };
    game.timer()
    game.loadQuestion();
});