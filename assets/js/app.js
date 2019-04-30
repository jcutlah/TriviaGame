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
        gameTimer: 0,
        incorrectAnswers: 0,
        questions: [
            {
                question:"Is the sky sometimes blue?",
                answers:["yes","no","I guess I don't fully understand the question"],
                celebrate:"Eh, nice work. But we're just getting started.",
                false: "You make me sick already",
                answer: "yes",
                answered: false
            },
            {
                question:"According to Holden Caulfield, how can most people be labeled? (aside from nuns and Phoebe, of course)",
                answers:["self-centered","insecure","phony","apathetic"],
                celebrate:"You might have gotten this right, but I don't think you actually GET it",
                false: "Whatever it was, I think you just proved him right",
                answer: "phony",
                answered: false
            },
            {
                question:"How many bends does a standard paperclip have?",
                answers:["6","2","4","3"],
                celebrate:"Amazing",
                false: "I have no words",
                answer: "3",
                answered: false
            },
            {
                question:"Why do babies cry?",
                answers:["growing up is hard","they hate their makers"],
                celebrate:"Nice work!",
                false: "Oh come on!!",
                answer: "growing up is hard",
                answered: false
            },
            {
                question:"Who was the only one of the six main characters on \"Friends\" to not get married at any time on the show??",
                answers:["Phoebe","Joey","Ross","Monica"],
                celebrate:"Sad but true.",
                false: "You really should watch the show more, ya know",
                answer: "Joey",
                answered: false
            },
            {
                question:"What was the first national park in the United States?",
                answers:["Yosemite","Everglades","Yellowstone","Zion"],
                celebrate:"Send it, brah!!",
                false: "Harsh, dude",
                answer: "Yellowstone",
                answered: false
            },
            {
                question:"What mathematical formula was allegedly first discovered by Pythagoras?",
                answers:["a^2 + b^2 = c^2","y = mx + b","e = mc^2"],
                celebrate:"Looks like someone was paying attention",
                false: "I feel like this was an easy one, buuuuut okay.",
                answer: "a^2 + b^2 = c^2",
                answered: false
            }
        ],
        isLive: true, 
        timerPaused: false,
        unansweredQuestions: 0,
        celebrateAnswer: function(){
            this.correctAnswers ++;
            // $('#question-holder').hide();
            var celebrate = $('#celebrate');
            celebrate.text('');
            celebrate.show();
            this.typer('#celebrate', [this.currentQuestion.celebrate], true, true);
            // celebrate.text(this.currentQuestion.celebrate);
            console.log(this.currentQuestion.celebrate);
            setTimeout(function(){
                // game.wait(1500);
                // celebrate.hide();
                $('#question-holder').show();
            }, 5000);
        },
        checkAnswer: function(event){
            this.unansweredQuestions --;
            this.removeQuestion();
            this.currentQuestion.answered = true;
            var guess = event.get(0).value;
            game.timerPaused = true;
            if (guess === game.currentQuestion.answer){
                this.celebrateAnswer();
            } else {
                this.falseAnswer();
            }
            // if (this.unansweredQuestions > 0){
            //     // this.rotateQuestions();
            // } else {
            //     // this.removeQuestion();
            //     this.gameOver();
            // }
        },
        falseAnswer: function(){
            this.incorrectAnswers ++;
            // this.rotateQuestions();
            // $('#question-holder').hide();
            var bummer = $('#celebrate');
            bummer.text('');
            bummer.show();
            this.typer('#celebrate', [this.currentQuestion.false], true, true);
            
            
            // bummer.text(this.currentQuestion.false);
            console.log(this.currentQuestion.false);
            setTimeout(function(){
                // game.wait(2500);
                // bummer.text('');
                $('#question-holder').show();
                // bummer.hide();
            }, 5000);
        },
        gameOver: function(){
            setTimeout(function(){
                game.isLive = false;
                game.timerPaused = true;
                game.incorrectAnswers += game.unansweredQuestions;
                console.log('running game over()');
                $('#danger-overlay').removeClass('danger-zone');
                $('#game-over').show();
                $('#correct-answers').text(game.correctAnswers);
                $('#incorrect-answers').text(game.incorrectAnswers);
            }, 1000);
        },
        reset: function(){
            this.correctAnswers = 0;
            this.currentQuestion = {};
            this.gameTimer = 60;
            this.incorrectAnswers = 0;
            this.isLive = true;
            this.timerPaused = false;
            this.unansweredQuestions = 0;
            for(i=0;i<this.questions.length;i++){
                this.questions[i].answered = false;
            }
            $('#danger-overlay').removeClass('danger-zone');
            $('#game-over').hide();
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
            // debugger;
            this.gameTimer = this.questions.length * 7;
            this.unansweredQuestions = this.questions.length;
            this.loadQuestion();
            this.timer();
            $('#start-game-container').hide('slow', function(){
                $('#start-game-container').remove();
            });
            // this.loadQuestion();
            // this.timer();
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
                } else if (game.gameTimer <= 0){
                    clearInterval(timer);
                    game.gameTimer = 0;
                    $('#question-holder .question-card').hide('slow', function(){ 
                        $('#question-holder .question-card').remove();
                        game.gameOver();
                    });
                }
                game.gameTimer--;
            },1000);
        },
        typer: function(target, arr, hideAfter, isBetweenTurns){
            if(hideAfter){
                var options = {
                    strings: arr,
                    typeSpeed: 70,
                    onComplete: function(){
                        setTimeout(function(){
                            $(target).hide('slow');
                        }, 700);
                        if (isBetweenTurns && game.unansweredQuestions > 0){
                            game.rotateQuestions();
                        } else if (isBetweenTurns && game.unansweredQuestions == 0){
                            game.gameOver();
                        }
                    }
                }
            } else {
                var options = {
                    strings: arr,
                    typeSpeed: 50,
                    onComplete: function(){
                        setTimeout(function(){
                            $('#start-game-btn').show();
                        }, 1500);
                        
                    }
                }
            }
            
            var typed = new Typed(target, options);
        },
        wait: function(ms){
            var start = Date.now(),
                now = start;
            while (now - start < ms) {
                now = Date.now();
            }
        }
    };
    setTimeout(function(){
        game.typer("#have-a-seat",["Have a seat. We're gonna need you to answer some questions.","We know what you did, so don't think you can mess with us.","Now, you're gonna answer some random trivia questions for us right now.","...Or else.","Click below to get started"], false, false);
    },1000);
    $('#start-game-btn').click(function(){
        game.setUpGame();
    });
    $('#reset').click(function(){
        game.reset();
        game.setUpGame();
    });
    $(document).on('click', '.answer input', function(){
        if (game.unansweredQuestions === 1){
            // debugger;
        }
        game.checkAnswer($(this));

    });
});