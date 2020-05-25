
console.log ("Loading mr.js");

var myChar = new PointText({ 
    fontSize : "30",
    fontFamily : "Matrix",   
    strokeWidth : 1,
    shadowBlur : 14,
    visible: false
});


class Columns{

    constructor (numColumns, xPostion){
        this.numColumns = numColumns;
        this.xPostion= xPostion;
        // Stores each paper.js character object
        this.columnArray = [];
        this.myChunk="";
        this.counterForFallingText = 0;
        this.previousTime = 0;
        this.whenToMove = .5; // messsured in seconds
        this.fadeRage=5;
        this.trailingFadeRage=null;
        
        this.lastPosition =null;
        this.trailingLastPosition =null;
        this.counterForGreenGradient=0;
        
        this.hideRemainingChar = false;
        
        /// Begin Ripple
        this.pauseForRipple = false;
        this.rippleColor= null;
        this.howLongBeforeReturningToOriginalCOlor = 3;
        this.previousTimeForRipple = null;
        /// End Ripple
		
		// Start grab chunk text logic
		//this.startSubstring = this.numColumns;
		this.startSubstring = 0;
		// End grab chunk text logic
		
		this.languageToDisplay = ["English", "Mix", "Katana" ];
		
		
        // Build arrays for gradient green
        // Doing this will minimize resource usage
        this.arrayOfGreen =[];
        this.startingPercent = .9;
        for ( var i = 0; i< 24; i++){           
            this.arrayOfGreen.push( .96 * this.startingPercent );
            //this.startingPercent -=.1; // Change to make longer set of falling text
            this.startingPercent -=.036;
        }
        //console.log ("this.arrayOfGreen :  " +  this.arrayOfGreen );
       
    }
    
    grabChunkOfTextAndFillColumnWithContent(){
        //this.myChunk = globals.myText.substring(0, this.numColumns);
        //console.log (  this.myChunk  );
        //return this.myChunk;
		
		let whatLanguage =  this.languageToDisplay[ Math.floor( Math.random() * this.languageToDisplay.length  ) ] ;
		// The case statement does not require a test for Mix mode.   That is the default mode
		// text arrives

		if ( this.startSubstring + this.numColumns < globals.myText.length ){
			this.myChunk = globals.myText.substring( this.startSubstring, this.startSubstring+this.numColumns );
			this.startSubstring += this.numColumns;
			
			switch ( whatLanguage ){
			case "English":
				this.myChunk = this.myChunk.toUpperCase();
				this.fillWithContent();
				break;
				return;
			case "Katana":
				this.myChunk = this.myChunk.toLowerCase();
				this.fillWithContent();
				return;
			}
			
			
		} else {
			let tmp = globals.myText.length -  ( globals.myText.length - this.startSubstring );
			let firstPart = globals.myText.substring ( tmp );
			let SecondPart = globals.myText.substring ( 0,  (   this.numColumns -   ( globals.myText.length - this.startSubstring )   ) );
			// Reset 
			this.startSubstring = ( this.numColumns -   ( globals.myText.length - this.startSubstring )   );
			this.myChunk = firstPart.toString() + SecondPart.toString();
			
			switch ( whatLanguage ){
			case "English":
				this.myChunk = this.myChunk.toUpperCase();
				this.fillWithContent();
				break;
				return;
			case "Katana":
				this.myChunk = this.myChunk.toLowerCase();
				this.fillWithContent();
				return;
			}
			
			/*
			switch ( whatLanguage ){
			case "English":
				return this.myChunk.toUpperCase();
				break;
			case "Katana":
				return this.myChunk.replace(/ /g,'');
			}
			*/
		}
	
    }

	randomNumberRounded(min, max) {  
    	return Math.round ( Math.random() * (max - min) + min ); 
	}
	
    createRows(){
		if ( this.xPostion == "randomX"){
			this.xPostion = randomNumberRounded ( 0, 1200);
			
			for ( var i = 0; i< this.numColumns; i++){
               this.columnArray[i] = myChar.clone();
               //this.columnArray[i].point = [ this.xPostion, 0 + (i* ( this.columnArray[i].fontSize -1) ) ];
               this.columnArray[i].point = [ this.xPostion, 40 + (i* ( this.columnArray[i].fontSize -1) ) ];
        	}
			
			// Reset to keep in random x position mode
			this.xPostion = "randomX";
		}else{
		    for ( var i = 0; i< this.numColumns; i++){
               this.columnArray[i] = myChar.clone();
               //this.columnArray[i].point = [ this.xPostion, 0 + (i* ( this.columnArray[i].fontSize -1) ) ];
               this.columnArray[i].point = [ this.xPostion, 40 + (i* ( this.columnArray[i].fontSize -1) ) ];
        	}	
			
		}
			
    }
    
    fillWithContent(){
        //this.grabChunkOfText();
        for ( var i = 0; i< this.numColumns; i++){
            this.columnArray[i].content =  this.myChunk.charAt(i);
			//console.log (   this.columnArray[i].content );
        }
        
    }
    
    // Matrix efect
    matrixEffect( timePAssed ){
        
        // Timmer for returning to original green color after ripple
        if  ( ( timePAssed - this.previousTimeForRipple ) > this.howLongBeforeReturningToOriginalCOlor){
           this.pauseForRipple = false; 
        }
        
        if ( ( timePAssed - this.previousTime ) > this.whenToMove  ){
                        
            //console.log ("this.columnArray[ 0 ].visible :: " + this.columnArray[ 0 ].visible );
            //console.log ("this.counterForFallingText FIRST :: " + this.counterForFallingText );
            // Set the leading character bright glowing effect
            //if ( this.counterForFallingText < this.numColumns-1 && this.hideRemainingChar == false){
            if ( this.counterForFallingText < this.numColumns && this.hideRemainingChar == false){
                // This must always be the character ahead by one
                // It gives the effect for the others to follow look
                
                //this.columnArray[ this.counterForFallingText + 1 ].fillColor = "#ebffe4";
                //this.columnArray[ this.counterForFallingText + 1 ].strokeColor = "#ebffe4";
                //this.columnArray[ this.counterForFallingText + 1 ].shadowColor = "#61df5b";

                //this.columnArray[ this.counterForFallingText + 1 ].visible = true;
				
				this.columnArray[ this.counterForFallingText ].fillColor = "#ebffe4";
                this.columnArray[ this.counterForFallingText ].strokeColor = "#ebffe4";
                this.columnArray[ this.counterForFallingText ].shadowColor = "#61df5b";

                this.columnArray[ this.counterForFallingText ].visible = true;   
            }
            
			//console.log ( "OOO this.counterForFallingText :: " + this.counterForFallingText );
			//console.log ( "OOO this.fadeRage :: " + this.fadeRage );
            // Get range of character(s) to apply gradient to
            if ( this.counterForFallingText - this.fadeRage < 0 ){
                this.lastPosition =0;
            } else {
				//console.log ( "III this.counterForFallingText :: " + this.counterForFallingText );
				//console.log ( "III this.fadeRage :: " + this.fadeRage );
				
                this.lastPosition =this.counterForFallingText - this.fadeRage;
				//console.log ( "III this.lastPosition :: " + this.lastPosition );
				//console.log ( "Range :: " +this.counterForFallingText + " - " + this.lastPosition );
            }
           
            //console.log ("this.counterForFallingText :: " + this.counterForFallingText );
            // Modify these character colors
            //for ( var i = this.counterForFallingText; i>=this.lastPosition && this.hideRemainingChar == false; i--  ){ // Change Behavior
            for ( var i = this.counterForFallingText-1; i>=this.lastPosition && this.hideRemainingChar == false; i--  ){ // Change Behavior
                //console.log ("XXXXXXX this.columnArray[ 0 ].visible :: " + this.columnArray[ 0 ].visible );
                
                if (this.pauseForRipple == false && i >-1){
                    this.columnArray[ i ].fillColor = new Color(.11, this.arrayOfGreen[ this.counterForGreenGradient] , .09 );
                    this.columnArray[ i ].strokeColor = new Color(.11, this.arrayOfGreen[ this.counterForGreenGradient ] , .09 );
                    this.columnArray[ i ].shadowColor = "#61df5b";
                }else{
                    this.columnArray[ i ].fillColor = this.rippleColor;
                    this.columnArray[ i ].strokeColor = this.rippleColor; 
                    this.columnArray[ i ].shadowColor = this.rippleColor;
                }  
                
                this.counterForGreenGradient+=1;
            }
            // Reset 
            this.counterForGreenGradient=0;
            
            // Make all the characters behind the range of zero invisible
            // :::::::::
            // :::::::::
			//console.log ("OUT this.lastPosition :: " + this.lastPosition );
            //if (this.lastPosition > 0 && this.lastPosition < this.numColumns - ( this.fadeRage-1 )  ) {
            if (this.lastPosition > 0 && this.lastPosition < this.numColumns - this.fadeRage  ) {
            //if (this.lastPosition >= 0 && this.lastPosition < this.numColumns - this.fadeRage  ) {
				//console.log ("ININ this.lastPosition :: " + this.lastPosition );
                this.columnArray[ this.lastPosition -1  ].visible = false;
                //this.columnArray[ this.lastPosition  ].visible = false;
            }

            // This initializes the fade out effect at the very end
            if ( this.counterForFallingText == this.numColumns -1 ){
                this.hideRemainingChar = true;
                this.trailingLastPosition = this.lastPosition;
                this.trailingFadeRage = 0;
            }
            
            // set color for remaining characters
            if ( this.hideRemainingChar ){                 
                this.columnArray[ this.trailingLastPosition ].visible = false;
                
                // Adjust color for the remaining characters
                this.countBackwards = this.numColumns - 1;
                   
               // for ( var ii = this.trailingFadeRage; ii < this.fadeRage && this.pauseForRipple == false; ii++ ){                
                for ( var ii = this.trailingFadeRage; ii < this.fadeRage; ii++ ){
                    
                    if (this.pauseForRipple == false ){
                        this.columnArray[ this.countBackwards ].fillColor = new Color(.11, this.arrayOfGreen[ ii] , .09 );
                        this.columnArray[ this.countBackwards ].strokeColor = new Color(.11, this.arrayOfGreen[ ii ] , .09 );
                        this.columnArray[ this.countBackwards ].shadowColor = "#61df5b";
                    }else{
                        this.columnArray[ this.countBackwards ].fillColor = this.rippleColor;
                        this.columnArray[ this.countBackwards ].strokeColor = this.rippleColor; 
                        this.columnArray[ this.countBackwards ].shadowColor = this.rippleColor;
                    }
                        
                    this.countBackwards -=1;
                }
                
                this.trailingLastPosition+=1;
                this.trailingFadeRage+=1;
            }
            
  
            
            // Reset the the counter so we can start from the top first character
            if ( this.counterForFallingText < this.numColumns ){ 
                this.counterForFallingText = this.counterForFallingText+1;
            }
            
            // This must get to numColumns or it will never apply the visibility to
            // the last chracter in the column
            // Then it RESETS
            if ( this.trailingLastPosition == this.numColumns ){
                this.hideRemainingChar = false;
                this.trailingLastPosition = null; // Change I added here to reset the first character falling positions

                this.setRandomValues();
				if ( this.xPostion == "randomX"){
					this.createRows();
				}
								
				// GrabCheuckOfText progresses through the text
				this.grabChunkOfTextAndFillColumnWithContent();
            }

            //console.log ( "::::::::::::::::::: :::  " );
            // Store the current time in this call so I can compare against velocity of movement
            this.previousTime = timePAssed;
        }
        
    } // End Matrix effect
    
    rippleEffect( whatColor, timePAssedForRipple ){
        this.pauseForRipple = true;
        this.rippleColor = whatColor;
        this.previousTimeForRipple = timePAssedForRipple;
    }
    
    setRandomValues(){
        function randomNumber(min, max) {  
            return Math.random() * (max - min) + min; 
        }
        
        //function randomNumberRounded(min, max) {  
       //     return Math.round ( Math.random() * (max - min) + min ); 
        //}
        
        this.whenToMove = randomNumber( .02,.09 );
        //this.whenToMove = randomNumber( .8,.9 );
        // fadeRage and counterForFallingText can never be greater than the number of rows
        this.fadeRage = this.randomNumberRounded( 8, 23 );
        //this.fadeRage = randomNumberRounded( 5, 5 ); 
        //this.fadeRage = this.randomNumberRounded( 3, 3 ); 
        this.counterForFallingText = this.randomNumberRounded( 0, 14 ); // How far from top to start
        //this.counterForFallingText = this.randomNumberRounded( 0, 0 ); // How far from top to start
    }
    
	deleteRow(){
		console.log ( "Delete Rows" );
		for ( var i = 0; i< this.numColumns; i++){
        	this.columnArray[i].remove();
        }	
		
	}
	
    initMe(){
        this.createRows();
        //this.fillWithContent();
        this.grabChunkOfTextAndFillColumnWithContent();
        this.setRandomValues();
		//console.log ("fontSize :: " + this.columnArray[0].fontSize );
    }
    
}

//let totalNumOfColums=0;

let arrayOfColumns = [];

// Layout the number of columns

function layoutColumns () {
	//console.log ("Calling layoutColumns ::", globals.totalNumOfColums);
	//console.log ("Winbdow Height In LayoutColums / 40 :: " + ( window.innerHeight/30 ) );
	//alert ("Winbdow Height In LayoutColums / 40 :: " + ( Math.round ( window.innerHeight/30 )+0 ) );
	// *** Beloow is a remprary solution for screens that are less that max value of
	// fade range
	let setNumberOfRows = ( Math.round ( window.innerHeight/30 )+0 );
	if ( setNumberOfRows < 23 ){
		setNumberOfRows = 24;
	}
	
	for ( setup =0; setup < globals.totalNumOfColums; setup++){
		// *** the first parameter for the number of rows must never be 
		// *** less than the fade range max ( this.fadeRage)  it will freeze
		
    	//arrayOfColumns[ setup ] = new Columns ( 35, "randomX");
    	//arrayOfColumns[ setup ] = new Columns ( 30, 20*setup);  
    	//arrayOfColumns[ setup ] = new Columns ( ( Math.round ( window.innerHeight/30 )+0 ) , 20*setup);
    	arrayOfColumns[ setup ] = new Columns ( setNumberOfRows , 20*setup);
		
		// *** The first value in this parameter must never be less than 
		// the sum of content in loaded text file
    	arrayOfColumns[ setup ].initMe();
	}
}
// Make this global so Javascript can call it
window.layoutColumns = layoutColumns;

//globals.totalNumOfColums = 1;
//layoutColumns ();
// Random Event Coding

function randomNumberRounded(min, max) {  
    return Math.round ( Math.random() * (max - min) + min ); 
}

//let slowComputer = 2;
//globals.slowComputer = 2;

/// Ripple Effect
// minDelay must never be less than the shortest play time of any bg video + some seconds padded for download
const minDelay = 30; // 300
const maxDelay = 120; // 400
let randomInterval = randomNumberRounded( minDelay, maxDelay );
let randomColumnStartRipple; // Stores which column to start effect from
let doRippleEffect = false;
let startTimeForRipple;
let howFastToRipple = .06;
let columCounterLeft = null;
let columCounterRight = null;
let stopLeft = false;
let stopRight = false;
const arrayOfColors =[ "#48001b", "#302a69", "#0939b7" ];
let randomColor = null;

// Which random background effect to do decided here
let whichRanbdomBGEffect;

// Pause variable
let pauseAnimation = false;

function onFrame(event){
	// I need this variable so I can set a delay for the bg video if the
	// users browser test positive for them to init playing the screen saver
	// Why? Becasue two video will display on the screen at the same time
	globals.keepTractEventTime = event.time;

    if ( event.time - globals.timeLastEvent > randomInterval && globals.slowComputer != 3 ){
        //console.log ("DO SOMETHING randomInterval :: " + randomInterval);
        
		//whichRanbdomBGEffect = randomNumberRounded( 0, 0 );
		whichRanbdomBGEffect = randomNumberRounded( 0, 1 );
	
		// Begin Choose The BG Effect	
		switch ( whichRanbdomBGEffect ){
			case 0:
				//createContentForVideo();
				callCreateContentForVideo();
				break;
			case 1:
				/// Ripple Effect
				randomColumnStartRipple = randomNumberRounded( 0, globals.totalNumOfColums );
				columCounterLeft = randomColumnStartRipple - 1;
				columCounterRight = randomColumnStartRipple;

				startTimeForRipple = event.time;
				doRippleEffect = true;
				stopLeft = false;
				stopRight = false;
				randomColor = arrayOfColors[Math.floor(Math.random() * arrayOfColors.length)] ;
		}
			
		// Reset
        randomInterval = randomNumberRounded( minDelay, maxDelay );
        globals.timeLastEvent = event.time;
    }
    
    //  Start the ripple effect
    if ( doRippleEffect && globals.slowComputer != 3 ){
        if ( event.time - startTimeForRipple > howFastToRipple  ){
            // Rest
            startTimeForRipple = event.time;
            //console.log (" Do Ripple");
            if ( columCounterLeft >=0){
                arrayOfColumns[ columCounterLeft ].rippleEffect( randomColor , event.time );
                columCounterLeft-=1;
            }else{
                stopLeft = true;
            }
            
            if ( columCounterRight < globals.totalNumOfColums){
                arrayOfColumns[ columCounterRight ].rippleEffect( randomColor , event.time );
                columCounterRight+=1;
            } else {
                stopRight = true;
            }
            
        }
        
        // Stop the effect here 
        if ( stopLeft == true && stopRight == true && globals.slowComputer != 3 ){
            doRippleEffect = false;
        }
    }
    
    //  End the ripple effect
    
    // Animate the characters down
    //for ( setup =0; setup < globals.totalNumOfColums; setup++){
    for ( setup =0; setup < globals.totalNumOfColums && pauseAnimation == false; setup++){
        arrayOfColumns[ setup ].matrixEffect( event.time ); 
    }

}


function onResize (event){
    // Whenever the window is resized, recenter the path:
   // pth.position = view.center;
	//console.log ("Winbdow Width :: " + window.innerWidth );
	//console.log ("Dimensions W X H :: " + window.innerWidth + " :: " + window.innerHeight );
	//console.log ("Winbdow Height :: " + window.innerHeight );
	//console.log ("Winbdow Height / 40 :: " + ( window.innerHeight/30 ) );
	
	// update the number of row when the user changes the size of the window
	// This is a failed atempt so far the reset the number of columns and rows
	// if user resized the screen
	//pauseAnimation = true;
	//project.clear();
	//for ( setup =0; setup < globals.totalNumOfColums; setup++){
		
		//arrayOfColumns[ setup ].deleteRow();
        //arrayOfColumns[ setup ].numColumns = ( Math.round ( window.innerHeight/30 )+0 );
		//arrayOfColumns[ setup ].initMe();
		//arrayOfColumns[ setup ].numColumns = ( Math.round ( window.innerHeight/30 )+0 );
		//arrayOfColumns[ setup ].remove();
		//project.clear();
    //}
	//pauseAnimation = false;
	
}

/*
document.getElementById('myCanvas').onMouseDown = function(event){
	console.log( "pauseAnimation :: " + pauseAnimation);	
}

*/
