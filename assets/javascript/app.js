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
		newQ.correctImg = addCorrectImg;
		this.triviaArray.push(newQ);

	},
	//testing function
	initializeTriviaQuestions() {

		this.addTriviaQ("When was Hello Kitty born?", 
			[
				"Nov 1, 1974",
				"Apr 1, 1991",
				"Sep 9, 1999",
				"Dec 31, 9999"
			], 
			0, "0.jpg");
		this.addTriviaQ("Where does Hello Kitty live?", 
			[
				"Tokyo, Japan",
				"San Francisco, California",
				"London, England",
				"In the hearts of children and women with disposable income"
			], 
			2, "1.jpg");		

		this.addTriviaQ("What is Hello Kitty's real name?", 
			[
				"Hello Kitty is her real name",
				"Hello Stacy",
				"Mimmy",
				"Kitty White"
			], 
			3, "2.jpg");
		this.addTriviaQ("Hello Kitty has a boyfriend. What's his name?", 
			[
				"Dear John",
				"Dear Daniel",
				"Chump Charlie",
				"Gorgeous George"
			], 
			1, "3.jpg");
		this.addTriviaQ("Hello Kitty has a sister. What's her name?", 
			[
				"Goodbye Kitty",
				"Margaret",
				"Mimmy",
				"Stacy"				
			], 
			2, "4.jpg");
		this.addTriviaQ("Hello Kitty has a pet cat. What's it's name?", 
			[
				"Sugar",
				"Margaret",
				"Dog Daniel",
				"Charmmy Kitty"
			], 
			3, "5.jpg");
		this.addTriviaQ("Who is Hello Kitty's original designer?", 
			[
				"Yuko Shimizu",
				"Shintaro Tsuji",
				"Lewis Carol",
				"Yuko Yamaguchi"
			], 
			0, "6.jpg");
		this.addTriviaQ("How tall is Hello Kitty?", 
			[	
				"Five apples",
				"Five feet",
				"Five hands",
				"Unknown"
			], 
			0, "7.jpg");

		this.addTriviaQ("How much does Hello Kitty weight?", 
			[
				"Three stones",
				"Three kilograms",
				"Three apples",
				"Unknown"
			], 
			2, "8.jpg");

		this.addTriviaQ("In 2014, what announcement turned the Hello Kitty fandom upside-down?", 
			[
				"Hello Kitty is dating Badtz Maru",
				"Sanrio sold Hello Kitty",
				"She's not really a cat",		 
				"Hello Kitty got a divorce"
			], 
			2, "9.jpg");


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
	correctIndex: "",
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
        $("#timer").html(currentTime);

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

        $("#timer").html(currentTime);

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
	acimg.html("<img src= assets/images/" + newTrivia.triviaArray[iterator].correctImg + ">");

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
