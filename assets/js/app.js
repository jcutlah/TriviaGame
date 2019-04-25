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
        gameTimer: 10,
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
        isLive: true, 
        timerPaused: false,
        unansweredQuestions: 0,
        celebrateAnswer: function(){
            this.correctAnswers ++;
            
        },
        checkAnswer: function(event){
            this.unansweredQuestions --;
            this.currentQuestion.answered = true;
            var guess = event.get(0).value;
            game.timerPaused = true;
            if (guess === game.currentQuestion.answer){
                this.celebrateAnswer();
            } else {
                this.falseAnswer();
            }
            if (this.unansweredQuestions > 0){
                this.rotateQuestions();
            } else {
                this.removeQuestion();
                this.gameOver();
            }
        },
        falseAnswer: function(){
            this.incorrectAnswers ++;
            // this.rotateQuestions();
        },
        gameOver: function(){
            // debugger;
            this.isLive = false;
            this.timerPaused = true;
            this.incorrectAnswers += this.unansweredQuestions;
            console.log('running game over()');
            $('#danger-overlay').removeClass('danger-zone');
            $('#game-over').show();
            $('#correct-answers').text(this.correctAnswers);
            $('#incorrect-answers').text(this.incorrectAnswers);
        },
        removeQuestion: function(){
            $('#question-holder .question-card').hide('slow', function(){ 
                $('#question-holder .question-card').remove();
            });
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
            question.addClass('question-card');
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
                if (game.unansweredQuestions === 1){
                    // debugger;
                }
                game.checkAnswer($(this));

            });
        },
        rotateQuestions: function(){
            this.removeQuestion();
            setTimeout(function(){
                game.loadQuestion();
            }, 1000);
            setTimeout(function(){
                if (game.isLive){
                    game.timerPaused = false;
                    game.timer();
                }
            }, 1000);
        },
        setUpGame: function(){
            this.unansweredQuestions = this.questions.length;
            $('#start-game-container').hide('slow', function(){
                $('#start-game-container').remove();
            });
            this.loadQuestion();
            this.timer();
        },
        timeAlert: function(){
            if (this.gameTimer < 10 && this.unansweredQuestions > 0){
                // console.log('alert');
                $('#danger-overlay').toggleClass('danger-zone');                   
            }
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
                // console.log(game.gameTimer);
                game.timeAlert();
                timeNow = game.timeConverter(game.gameTimer);
                $('.timer').text(timeNow);
                if (game.timerPaused){
                    clearInterval(timer);
                } else if (game.gameTimer === 0){
                    clearInterval(timer);
                    $('#question-holder .question-card').hide('slow', function(){ 
                        $('#question-holder .question-card').remove();
                        game.gameOver();
                    });
                }
                game.gameTimer--;
            },1000);
        }
    };
    $('#start-game-container button').click(function(){
        game.setUpGame();
    });
});