
console.log ("Loaded Jlogic.js"); 

// Init global winodw varaible so paper.js can access and read its.
window.globals = {
	myText :"",
	totalNumOfColums :0,
	timeLastEvent:0,
	keepTractEventTime:0,
	positionInChunk:0,
	// This variable will init the bacground animation of ripple effect when not set to 3
	//  It is here because if a user can not autoplay videos I must dissable vidoes
	// from loading automaticallaylly
	slowComputer: 2
};
        
        function getText() {          
            fetch ("js/story1.txt")
            .then(response => response.text())
            .then(data => {
				// Remove all whitespace
                //window.globals.myText = data.replace(/ /g,'');
                //window.globals.myText = data.toUpperCase();
                window.globals.myText = data;
               
            })
            .catch(error => console.error(error));
            
        }
        
        getText();
        
function loadScript(url, setMyType, attributename, attributevalue, callback){  
	// Begin preloads the fonts and attaches the papa.js and mr.js script file special to paper.js
			
    var script = document.createElement("script")
    script.type = setMyType;
            
	if ( setMyType == "text/paperscript"){
    	script.setAttribute ( attributename , attributevalue ); 
    }
            
    if (script.readyState){  //IE
    	script.onreadystatechange = function(){
        	if (script.readyState == "loaded" || script.readyState == "complete"){
        		script.onreadystatechange = null;
            	callback();
        	}
        };
            } else {  //Others
                script.onload = function(){
                    callback();
                };
            }

	script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}
        
document.fonts.ready.then(function () {
	console.log ( 'Matrix Font Loaded? ' + document.fonts.check('1em Matrix') );
	
	//loadScript("https://unpkg.com/acorn", "text/javascript", null, null, function(){        
	loadScript("js/acorn.js", "text/javascript", null, null, function(){    
        /* Load the Paper.js library */
        loadScript("js/paper.js", "text/javascript", null, null, function(){
        //loadScript("https://unpkg.com/paper", "text/javascript", null, null, function(){
            console.log ("Loading js/paper.js");
            
            // This makes the div used to set the font avalaible for canvas invisible and take up no space
            document.getElementById('neededToPrelaodFont').style.display = 'none';

				/* Load my papaer.js script */
            	loadScript("js/mr.js", "text/paperscript", "canvas", "myCanvas", function(){
                	console.log ("Loading js/mr.js"); // This never calls back
            	});
        });
        
    });
	
	//loadBgConent();
	//startPlayingVideo();
	
});
	// End preloads the fonts and attaches the papa.js and mr.js script file special to paper.js

var videoElement;
var videoDiv;

// This helper function allow for setting mutiple attributes
function setAttributes(el, attrs) {
  for(var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}

function supportedVideoFormat(video) {
   var returnExtension = "";
   if (video.canPlayType("video/webm") =="probably" || 
       video.canPlayType("video/webm") == "maybe") {
         returnExtension = "webm";
   } else if(video.canPlayType("video/mp4") == "probably" || 
       video.canPlayType("video/mp4") == "maybe") {
         returnExtension = "mp4";
   } else if(video.canPlayType("video/ogg") =="probably" || 
       video.canPlayType("video/ogg") == "maybe") {
         returnExtension = "ogg";
   }

   return returnExtension;

}

//window.addEventListener('load', eventWindowLoaded, false);

const arrayVideos = [ "c2", "c4", "c6", "c8", "c11", "c14", "c16", "c18", "c20", "c22", "c24", "c26", "c28", "c30", "c34", "c36", "c38", "c40", "c42", "c44", "c46", "c48", "c50", "c52", "c54", "c56", "c58", "c60", "c62", "c64", "c66" ];
//const arrayVideos = [ "c11" ];

function  callCreateContentForVideo(){
	createContentForVideo ( arrayVideos[Math.floor(Math.random() * arrayVideos.length)], removeTheVideo );
}



function createContentForVideo( vidName, callMeAfterVideoEnds ){
	
	//document.getElementById("companyNameDiv").remove();
	//document.getElementById("companyNameDiv").innerHTML = "remove()";
	//console.log ( "WTF ID ::  " + document.getElementById("companyNameDiv")[0].id );
	//console.log ( "WTF ID2 ::  " + document.getElementById("companyNameDiv").id );
	//console.log ( "WTF ID4 ::  " + companyNameDiv.visible );
	
	//console.log("createContentForVideo");
	videoElement = document.createElement("video");
	videoDiv = document.createElement("div");
	// Attach dynamically to the body of the html
	document.body.appendChild(videoDiv);
	
	videoDiv.appendChild(videoElement);
	setAttributes( videoDiv , {"id": "divForVideo" } );

	var videoType = supportedVideoFormat(videoElement);
	
	// If no video play back capability exits before adding video content and remove div container
	if (videoType == "") {
		//alert("no video support");
		removeTheVideo();
    	return;
   }	
	//videoElement.setAttribute("src", "bgcontent/c6." + videoType);
	//This get time and add as attribute of no value to stop video from caching
	//let n = new Date().getTime();
	

	//setAttributes( videoElement , {"src": "bgcontent/c6." + videoType, "type": "video/" + videoType, "noCaching": n, "autoplay": "" } );
	//setAttributes( videoElement , {"src": "bgcontent/small." + videoType, "type": "video/" + videoType, "playsinline":"",  "muted":"",  "autoplay":"", "noCaching": n } );
	setAttributes( videoElement , {"src": "bgcontent/"+vidName+"." + videoType, "type": "video/" + videoType, "playsinline":"",  "muted":"",  "autoplay":"" } );
	
	// This event listener is to remove the video once playing has ended
	//videoElement.addEventListener('ended',  removeTheVideo ,false);
	videoElement.addEventListener('ended',  callMeAfterVideoEnds ,false);
	
	videoElement.autoplay = true;
	//videoElement.load();
	videoElement.play();	
	
	// Use this if the users device needs permission to play bg videos
	/*
	var promise = videoElement.play();

	if (promise !== undefined) {
		promise.catch(error => {
			// Auto-play was prevented
			// Show a UI element to let the user manually start playback
			//alert ( error );
			playVideosIfNotAllowedError();
		}).then(() => {
			// Auto-play started
			console.log ( "SETTING slowComputer = 2 ");
			window.globals.slowComputer = 2;
		});
	}
	*/
	
	
}


function playVideosIfNotAllowedError (){
	//console.log("playVideosIfNotAllowedError");
	videoPlayBackButton = document.createElement("div");
	document.body.appendChild(videoPlayBackButton);
	setAttributes( videoPlayBackButton , {"id": "enableVideoPlayBackButton" } );
	//videoPlayBackButton.innerHTML = "ARE</br>YOU</br>READY?";
	videoPlayBackButton.innerHTML = "CLICK</br>HERE</br>TO START";
	
	setAttributes( videoPlayBackButton , {"onclick": "continueIfCouldNotplayVideo()" } );
	
}

function continueIfCouldNotplayVideo(){
	//console.log("continueIfCouldNotplayVideo");
	videoPlayBackButton.remove();
	videoElement.play();
	
	// I need this variable so I can set a delay for the bg video if the
	// users browser test positive for them to init playing the screen saver
	// Why? Becasue two video will display on the screen at the same time
	//window.globals.timeLastEvent=window.globals.keepTractEventTime + 20;
	//console.log ("videoElement.duration :: " + videoElement.duration );
	window.globals.timeLastEvent=window.globals.keepTractEventTime + (2 * videoElement.duration );
	
	window.globals.slowComputer = 2;
}

function removeTheVideo (e) {
	//console.log ("Remove div containing video" );
	videoDiv.remove();
 	//alert (" What you want to do after the event " );
}


//window.addEventListener('load', createContentForVideo, false);
window.addEventListener('load', openingCredits, false);
//window.addEventListener('load', cleanupOpeningCredits, false);

function cleanupOpeningCredits (){
	// Hide Credits
	companyNameDiv.style.display = "none";
	// Remove video
	videoDiv.remove();	
	// Set number of colums
	window.globals.totalNumOfColums=  Math.round ( window.innerWidth/20 );
	//window.globals.totalNumOfColums= 10;
	
	// Duplicate the class with the columns
	layoutColumns();
}

// Opening CreditstotalNumOfColums
function openingCredits(){
	//console.log ("Opening Credits");
	
	/*
	alert ( "WW X HH :: " + window.innerWidth + " X " + window.innerHeight );
	shenanigansToFigureOutViewableScreenArea = document.createElement("div");
	document.body.appendChild( shenanigansToFigureOutViewableScreenArea );
	setAttributes( shenanigansToFigureOutViewableScreenArea , {"id": "shenanigansToFigureOutViewableScreenArea" } );
	shenanigansToFigureOutViewableScreenArea.innerHTML = shenanigansToFigureOutViewableScreenArea.offsetWidth + " X " + shenanigansToFigureOutViewableScreenArea.offsetHeight;
	*/
		
	
	companyNameDiv = document.createElement("div");
	document.body.appendChild(companyNameDiv);
	setAttributes( companyNameDiv , {"id": "companyNameDiv" } );
	companyNameDiv.innerHTML = "CREATED BY MOTION DESIGN STUDIO </br>WWW.FACEBOOK.COM/MOTIONDESIGNSTUDIO";
	
	createContentForVideo ( "c2", cleanupOpeningCredits );
	//createContentForVideo ( "short", cleanupOpeningCredits );
	
	// Check if video is paused or playing Firefox BUG fixed here
	// Firefox plays the bg opening credits video and test positive for
	// not being able to play videos without user input << NOT TRUE!
	videoElement.onplaying = function() { 		
		if(typeof( videoPlayBackButton ) != 'undefined' && videoPlayBackButton != null){
			// Remove BIG RED BUTTON IN CENTER
			videoPlayBackButton.remove();
    	} else{
        	//console.log('Element does not exist!');
    	}
	}
	
	
	//window.globals.slowComputer = 2;
	
	// Use this if the users device needs permission to play bg videos
	
	var promise = videoElement.play();
	// Chrome and Firefox error here.  Chrome tests positive 
	if (promise !== undefined) {
		promise.catch(error => {
			// Auto-play was prevented
			// Show a UI element to let the user manually start playback
			window.globals.slowComputer = 3;
			playVideosIfNotAllowedError();
		});
	}
	
	// Check if mouse was moved and show the brand bellow 
	// Hide after certain amount of time
	document.getElementById("myCanvas").onmousemove = function (){
		// Set visibility of company name to visible
		if ( companyNameDiv.style.display == "none" ){
			companyNameDiv.style.display = "block";
		}
		setTimeout ( function () {
			companyNameDiv.style.display = "none";
		}, 10000);
	}

}




