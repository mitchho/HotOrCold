
var lastGameDistanceFromGlory = 0;

$(document).ready(function(){
	
	var gameOver = false;
	var numberOfGuesses = 0;
  	var targetNumber = startNewGame();
  	var lastGameDistanceFromGlory = 0;
    console.log(targetNumber);
 
	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);

  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});

  	/*--- Display information modal box ---*/
  	$(".new").click(function(){
    	//$(".overlay").fadeIn(1000);

    	console.log("New Game element clicked.");
    	targetNumber = startNewGame();

  	});


    //console.log($("h1").siblings('ul').children('.text').hide()); 
	//console.log($("#feedback").siblings('form'));
  	$("#feedback").siblings('form').submit(function(event) {
        //alert( "Handler for .submit() called." );
  		console.log('guess button clicked');
  		
  			// the code below logs the form text, not the input box text (see above for that)
  			// console.log($(event.currentTarget).text());

  			//  prevents the submit button from submitting the form. Apparently without
  			//  this statement the page refreshes and the append function below is
  			//  not called - will investigate this further - not sure about it.
  	    event.preventDefault();

  	    //  for some reason this method CANNOT SEE the boolean value
  	    //  gameOver so this function call is necessary. I banged my
  	    //  head against this brick wall for 2+ hrs and have no clue why.
  	    var gameOverInSubmit = testIfGameOver();  
  	    console.log('gameOverInSubmit from before submit: if -' + gameOverInSubmit);

  		if (gameOverInSubmit == false)
  		{ 
 			console.log($(event.currentTarget).children('input').val());
  			var userGuess = parseInt($(event.currentTarget).children('input').val());
        	console.log(userGuess);



        	var warmness = getGuessWarmness(targetNumber, userGuess);
        	//console.log(warmness);
       		// $("#feedback").text(warmness);
  
        	
        }
        else 
        {
        	alert("This game is over. Please click '+ New Game' in the upper right corner to start a new game, or refresh this page.");
        }
 		
	});
	 

});

function startNewGame()
{
	 
	gameOver = false;
	numberOfGuesses = 0;
	//console.log("numberOfGuesses from startNewGame: " + numberOfGuesses);
	$("#count").text(numberOfGuesses);

	$("#feedback").text("Make your guess!");
	$("#userGuess").val("Enter your guess here");
 
	//$(':input','#theForm')
	$('#userGuess')
  		.not(':button, :submit, :reset, :hidden')
  		.val('')
  		.removeAttr('checked')
  		.removeAttr('selected');
 

	var gameRange = 100;
	targetNumber = getRandomNumber(gameRange);
	console.log("targetNumber from startNewGame: " + targetNumber);

	$("#guessList").empty();
  
    return targetNumber;
 }

function getRandomNumber(range)
{
   //  what is returned here is a number between 
   //  1 and range, not 0 and range.
   var randomNumber = 0;
   randomNumber = Math.floor((Math.random() * range) + 1);

   return randomNumber;
}

function getGuessWarmness(number, guessOfNumber)
{
 	console.log("number from top of getGuessWarmness: " + number);
 	var guessWarmth;
 	var distanceFromGlory;

 	if ((guessOfNumber >= 1) && (guessOfNumber <= 100))
 	{ 
 		distanceFromGlory = Math.abs(guessOfNumber - number);

 		if (guessOfNumber == number)
 		{
 			guessWarmth = "You Win:  " + guessOfNumber + " is the number";
 			gameOver = true; 
 		//	console.log('gameOver from getGuessWarmness: ' + gameOver);
 		}
 		else if (Math.abs(guessOfNumber - number) >= 50)
 			guessWarmth = "Ice Cold";
 		else if ((Math.abs(guessOfNumber - number) >= 30)
 	     	  && (Math.abs(guessOfNumber - number) < 50))
 			guessWarmth = "Cold";
 		else if ((Math.abs(guessOfNumber - number) >= 20)
 	     	  && (Math.abs(guessOfNumber - number) < 30))
 			guessWarmth = "Warm";
 		else if ((Math.abs(guessOfNumber - number) >= 10)
 	      	&& (Math.abs(guessOfNumber - number) < 20))
 			guessWarmth = "Hot";
 		else  //  less than 10
 			guessWarmth = "Very Hot";

		$("#feedback").text(guessWarmth);

 		numberOfGuesses++;
 		console.log("numberOfGuesses from getGuessWarmness: " + numberOfGuesses);
 		$("#count").text(numberOfGuesses);

 		var hotterOrColderString;

 		if (numberOfGuesses == 1)
 			hotterOrColderString = guessWarmth;
 		else
 		{ 
 			if (lastGameDistanceFromGlory > distanceFromGlory)
 				hotterOrColderString = "Hotter";
 			else if (distanceFromGlory > lastGameDistanceFromGlory)
 				hotterOrColderString = "Colder";
 			else 
 				hotterOrColderString = "Same";
 		}

 		if (number != guessOfNumber)
      	 		$("#guessList").append("<li class = 'result'>" + guessOfNumber + " - " + hotterOrColderString + "</li>");
      		else
      			$("#guessList").append("<li class = 'result'>" + guessWarmth + "</li>");
 	}
 	else
 	{
 		alert("Please enter a number between 1 and 100");
 		guessWarmth = "";
 	}

 	lastGameDistanceFromGlory = distanceFromGlory;
	//console.log('gameOver from bottom of getGuessWarmness: ' + gameOver);

 	return guessWarmth;
}

function testIfGameOver()
{
	console.log("gameOver from testIfGameOver(): " + gameOver);

	if (gameOver == true)
		return true;
	else 
		return false;
}



