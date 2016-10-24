console.log("javascript included");

//globals
var trivia = {
	triviaArray: [],
	qCorrect: 0,
	qIncorrect: 0,
	qUnanswered: 0,
	addTriviaQ: function (addQString, addAnswerArray, addCorrectIndex, addCorrectImg) {
		var newQ = Object.create(triviaElement);
		newQ.question = addQString;
		newQ.answers = addAnswerArray;
		newQ.correctIndex = addCorrectIndex;
		newQ.addCorrectImg = addCorrectImg;
		this.triviaArray.push(newQ);

	},
	//testing function
	initializeTriviaQuestions() {
		this.addTriviaQ("testQ1", ["herpaderp","2","3","4"], 0, "");
		this.addTriviaQ("testQ2", [1,2,3,4], 1, "");
		this.addTriviaQ("testQ3", [1,2,3,4], 2, "");
		this.addTriviaQ("testQ4", [1,2,3,4], 3, "");
	},

	initializeTriviaVars() {
		this.qCorrect = 0;
		this.qIncorrect = 0;
		this.qUnanswered = 0;
	}
};

//each entry in triviaArray is a triviaElement
var triviaElement = {
	question: "",
	answers: [],
	correctIndex : ""
};

//coding for timer
//pretty much stolen from the stopwatch skeleton
var myTimer;

var countdownTimer = {
	maxTime: 15,
	time: 0,
	reset: function() {
		countdownTimer.time = countdownTimer.maxTime;

        var currentTime = countdownTimer.timeConverter(countdownTimer.time);
        $("#display").html(currentTime);

        console.log('reset!');
	},
	stop: function() {
		clearInterval(myTimer);
	},
	start: function() {
		myTimer = setInterval(countdownTimer.count, 1000);
	},
	count: function() {
		countdownTimer.time--;
        var currentTime = countdownTimer.timeConverter(countdownTimer.time);

        $("#display").html(currentTime);

        if(countdownTimer.time == 0) {
        	countdownTimer.stop();
        	timeup();
        }
	},
	    timeConverter: function(t){
        // Takes the current time in seconds and convert it to minutes and seconds (mm:ss).
        var minutes = Math.floor(t/60);
        var seconds = t - (minutes * 60);
        if (seconds < 10){
            seconds = "0" + seconds;
        }
        if (minutes === 0){
            minutes = "00";
        } else if (minutes < 10){
            minutes = "0" + minutes;
        }

        return minutes + ":" + seconds;
    }

};

