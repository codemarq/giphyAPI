$(document).ready(function () {

	// global variables
	var topics = ['Superman', 'Batman', 'Wonder Woman', 'The Flash', 
		'Green Lantern', 'Aquaman', 'The Atom', 'Hawkman', 
		'Martian Manhunter', 'Zatanna', 'Black Canary', 'Batgirl', 'Supergirl'];
	
	// ========================================================
	// Generic function for displaying movie data 
	function renderButtons () { 

		// Deletes the topics prior to adding new topics (this is necessary otherwise you will have repeat buttons)
		$('#buttonsDiv').empty();

		// Loops through the array of topics
		for (var i = 0; i < topics.length; i++) {

			// Then dynamicaly generates buttons for each movie in the array

			// Note the jQUery syntax here... 
		    var a = $('<button>') // This code $('<button>') is all jQuery needs to create the beginning and end tag. (<button></button>)
		    a.addClass('topic'); // Added a class 
		    a.attr('data-name', topics[i]); // Added a data-attribute
		    a.text(topics[i]); // Provided the initial button text
		    $('#buttonsDiv').append(a); // Added the button to the HTML
		}
	};

	// ========================================================
	// This function handles events where one button is clicked
	$('#addTopic').on('click', function (event) {
		// prevents page reload if user its enter instead of clicks button
		event.preventDefault();

		// This line of code will grab the input from the textbox
		var topic = $('#topicInput').val().trim();

		// The topic from the textbox is then added to our array
		topics.push(topic);
		
		// Our array then runs which handles the processing of our topic array
		renderButtons();	
		$('#topicInput').empty();
	});

	// ========================================================


	// ========================================================
	// button on-click function
    function gifFetch () {
    	// empty the galleryDiv
    	$('#galleryDiv').empty();
		// query var will be where the search topic goes
		var query = $(this).data('name');

		// api endpoint url
		var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&limit=10&q=" + query;

        // makes the request for data from url
        $.ajax({
        		url: queryURL, 
        		method: 'GET'
       		}).done(function(response) {
            	// defines what to do with data when done

            	var results = response.data;

            	for (var i = 0; i < results.length; i++) {
            		if (results[i].rating == "r" || results[i].rating == "pg-13"){

            		}
            		else {
	            		var gifsDiv = $('<div>'); 
	            	
	            		var p = $('<p>').text("Rating: " + results[i].rating);
		                // dump image from response into variable
		                var imageUrl = results[i].images.fixed_height.url;
		                // remove .gif from end 
		                var urlCut = imageUrl.slice(0, (imageUrl.length - 4));
		                // add _s.gif to end for still images
		                var stillImage = urlCut + "_s.gif";

		                // create image HTML element with jquery
		                var topicImage = $("<img class='topicImage'>");
		                
		                // set attributes for source and alt text in img element
		                topicImage.attr('src', stillImage);
		                topicImage.attr('alt', 'topic image');
		                topicImage.attr('data-still', stillImage);
		                topicImage.attr('data-animate', imageUrl);
		                topicImage.attr('data-state', 'still');

		                // dump them to the page
		                $('#galleryDiv').prepend(topicImage);
		            }
            	}
            });
    };

    // ========================================================

    // animate or pause function
    function animate () {
    	var state = $(this).attr('data-state'); 
    	console.log(state);
    	// animate or pause
    	if (state == 'still'){
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
            }else{
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
            }
    };
	// need to do the animate/pause functions..
	// -can generate imgs with col-md-4 class.

	// This calls the renderButtons() function
	renderButtons();
	// event listeners
	$(document).on('click', '.topic', gifFetch);
	$(document).on('click', '.topicImage', animate)
});