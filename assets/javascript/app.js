console.log("javascript included");

//objects
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
	correctIndex : "",
	correctImg: ""
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

/////
var i = 0; //question array iterator.

//your Trivia class object
var newTrivia = Object.create(trivia);
newTrivia.initializeTriviaQuestions();

//div DOM vars
var q, a0, a1, a2, a3, ac, acimg;

//global game functions. Acts on your global vars
function initializePage() {
	i = 0;
	seedQuestions(i);
	newTrivia.initializeTriviaVars();

	showQuestions();
	hideAnswer();

	hideStart();
	hideScore();
}

function iterate() {
	console.log("iterate");
	i++;

	if (i < newTrivia.triviaArray.length) {
		seedQuestions(i);
		showQuestions();
		hideAnswer();
	}
	else { //endgame condition
		hideAnswer();
		showScore();
		$("#start").html("try again");
		showStart();
	}

}

function score() {
	if ( $(this).data('index') == newTrivia.triviaArray[i].correctIndex ) {
		newTrivia.qCorrect++;
		console.log("right");
	}
	else {
		newTrivia.qIncorrect++;
		console.log("wrong");	
	}

	hideQuestions();
	showAnswer();

	setTimeout(iterate, 5 * 1000);
	
}

function timeup() {
	newTrivia.qUnanswered++;
	hideQuestions();
	showAnswer();

	setTimeout(iterate, 5 * 1000);
	
}

function seedQuestions(iterator) {
	q.html(newTrivia.triviaArray[iterator].question);
	a0.html(newTrivia.triviaArray[iterator].answers[0]);
	a1.html(newTrivia.triviaArray[iterator].answers[1]);
	a2.html(newTrivia.triviaArray[iterator].answers[2]);
	a3.html(newTrivia.triviaArray[iterator].answers[3]);
	ac.html(newTrivia.triviaArray[iterator].answers[newTrivia.triviaArray[iterator].correctIndex]);
	acimg.html(newTrivia.triviaArray[iterator].correctImg);

	countdownTimer.reset();
}

function showScore() {
	$("#scoreCorrect").html("correct: " + newTrivia.qCorrect);
	$("#scoreIncorrect").html("Incorrect: " + newTrivia.qIncorrect);
	$("#scoreUnanswered").html("Unanswered: " + newTrivia.qUnanswered);
	$("#score").show();
}

function hideScore() {
	$("#score").hide();
}

function showQuestions() { 
	$("#question").show(); 
	countdownTimer.start();
}

function hideQuestions() { 
	$("#question").hide();
	countdownTimer.stop(); 
}

//just for readability
function hideAnswer() { $("#answer").hide(); }
function showAnswer() { $("#answer").show(); }
function hideStart() { $("#start").hide(); }
function showStart() { $("#start").show(); }
