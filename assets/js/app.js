// show question/answer options w/ timer above
// when answered, mark question as answered and remove question from HTML
// if correct, pause timer and celebrate by showing something cool...remove cool thing
// show question
// if all questions answered, show results
// functions: showQuestion(), pauseTimer(), startTimer(), celebrate(), showResults()
// click listeners: startGame button, questionAnswer
window.addEventListener('DOMContentLoaded', function(){
    var game = {
        correctAnswers: 0,
        currentQuestion: {},
        gameTimer: 90,
        incorrectAnswers: 0,
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
        timerPaused: false,
        unansweredQuestions: 0,
        celebrateAnswer: function(){
            this.correctAnswers ++;
            $('#question-holder .question-card').hide('slow', function(){ 
                $('#question-holder .question-card').remove();
                game.loadQuestion();
            });
            setTimeout(function(){
                game.timerPaused = false;
                game.timer();
            }, 1000);
        },
        checkAnswer: function(event){
            this.unansweredQuestions --;
            this.currentQuestion.answered = true;
            var guess = event.get(0).value;
            if (guess === game.currentQuestion.answer){
                game.timerPaused = true;
                this.celebrateAnswer();
            } else {
                alert('incorrect');
            }
        },
        falseAnswer: function(){
            this.incorrectAnswers ++;
        },
        gameOver: function(){
            console.log('running game over()');
            $('#correct-answers').text(this.correctAnswers);
            $('#incorrect-answers').text(this.incorrectAnswers);
        },
        loadQuestion: function(){
            // debugger;
            console.log('running loadQuestin()');
            console.log(this.unansweredQuestions)
            if (this.unansweredQuestions === 0){
                // run endgame function
                this.gameOver();
                return false;
            }
            var questionHolder = $('#question-holder');
            var question = $('<div>');
            var answerContainer = $('<div>');
            answerContainer.addClass('answer-container');
            var timer = $('<div>');
            question.addClass('question-card');
            question.append(timer);
            for (i=0;i<this.questions.length;i++){
                if (!this.questions[i].answered){
                    this.currentQuestion = this.questions[i];
                    console.log(game);
                    question.append("<h2 class=question>"+ this.questions[i].question +"</h2>");
                    for (ind=0;ind<this.questions[i].answers.length;ind++){
                        var answer = $('<input>');
                        var answerHolder = $('<p>');
                        var answerText = $('<span>');
                        answerHolder.addClass('answer');
                        answer.attr('type','radio');
                        answer.val(this.questions[i].answers[ind]);
                        answerText.text(this.questions[i].answers[ind])
                        answerHolder.prepend(answer);
                        answerHolder.append(answerText);
                        answerContainer.append(answerHolder);
                        question.append(answerContainer);
                    };
                    break; 
                }
                
            };
            questionHolder.append(question);
            $('.answer input').click(function(){
                game.checkAnswer($(this));
            });
        },
        setUpGame: function(){
            this.unansweredQuestions = this.questions.length;
            $('#start-game-container').hide('slow', function(){
                $('#start-game-container').remove();
            });
            this.loadQuestion();
            this.timer();
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
            timeNow = game.timeConverter(game.gameTimer);
            $('.timer').text(timeNow);
            var timer = setInterval(function(){
                timeNow = game.timeConverter(game.gameTimer);
                $('.timer').text(timeNow);
                game.gameTimer--;
                if (game.gameTimer === 0 || game.timerPaused){
                    clearInterval(timer);
                } 
            },1000);
        }
    };
    $('#start-game-container button').click(function(){
        game.setUpGame();
    });
});