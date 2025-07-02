buttonColors=["red", "blue", "green", "yellow"];
gamePattern=[];
userClickedPattern=[];
var level=0;

function makeSound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}

function nextSequence(){  //for creating a pattern of colors
    userClickedPattern=[]; // soon as one sequence is right then before checking for the next sequence it must make sure that the user clicked patter is empty, so that the user clicks all the previous pattern
    level=level+1;
    $("h1").text("Level "+level);
    randomNum= Math.floor(Math.random()*4); 
    randomChosenColor= buttonColors[randomNum]; //use the random number to access the colors specified in buttonColors array
    gamePattern.push(randomChosenColor); //gamePattern is an empty array which adds the random color selected as the sequence
   
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100); //to create flash
    
    var audio=new Audio("sounds/"+randomChosenColor+".mp3"); //to play the chosen color sound
    audio.play();  
        
}

// $("button").click(function(){
//     var userChosenColour= $("button").attr("id");
//     console.log(userChosenColour);
// })

$(".btn").click(function() {

    var userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);
    makeSound($(this).attr('id'));
    animatePress(userChosenColour); //calling animatePress for userchosencolor
    checkAnswer(userClickedPattern.length-1); //to check qwether the last color clicked by user is same as the color generated in gamePattern


});

  function animatePress(currentColor){ //parameter for clicked color

       $("#"+currentColor).addClass("pressed"); //add css class pressed
        setTimeout(function(){ //to remove the pressed class after 100 millisec
            $("#"+currentColor).removeClass("pressed");
        },100);

    }

    var started= true; // needed for keydown function to execute only once when the game starts

    $(document).keydown(function(){

        if(started){
            $("h1").text("Level "+ level); //setting the first level
            nextSequence();
            started= false; // set it to false after game has been started. so tht the above statements wont execute again
        }   

    });

    function checkAnswer(currentLevel){ // function to check the correct sequence. here the currentLevel is the last index of the  arrays when we call the function.

        if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){ //to check if color in both arrays are same.
            console.log("Success");
            if(userClickedPattern.length===gamePattern.length){ //to check if all the colors have been   matched.
                setTimeout(function(){
                    nextSequence();
                },1000);
            }    
        }
        else{
            console.log("wrong");
            makeSound("wrong");
            // $("btn").click(function(){
            //     var wrongAudio= new Audio("sounds/wrong.mp3");
            //     wrongAudio.play();
            $("body").addClass("game-over");
            setTimeout(function(){
            $("body").removeClass("game-over");
            },200);
            $("h1").text("Game Over. Press any Key to Restart!");
           startOver();
           
        }

    }

    function startOver(){
        gamePattern=[];
        userClickedPattern=[];
        level=0;
        started=true;
    }


   
  

// $(".green").click( function(){
//     var gsound=new Audio("sounds/green.mp3");
//     gsound.play();
// })


// $(".red").click( function(){
//     var rsound=new Audio("sounds/red.mp3");
//     rsound.play();
// })

// $(".yellow").click( function(){
//     var ysound=new Audio("sounds/yellow.mp3");
//     ysound.play();
// })

// $(".blue").click( function(){
//     var bsound=new Audio("sounds/blue.mp3");
//     bsound.play();
// })


