$(document).ready(function () {

	// global variables
	var topics = ['Archer', 'Green Lantern', 'Fugazi', 'Radiohead', 'Transformers'];
	// api key
	var apiKey = "dc6zaTOxFJmzC";

	var tag = '';

	// api endpoint url
	var queryURL = "http://api.giphy.com/v1/gifs/random?";

	// declare query URL for giphy api with query of cats
	//  ripped from NYSearch.js have to edit still
    queryURL += $.param({
			'api_key': apiKey,
			'tag' : tag,
		});

	// helper functions

	// on click handler for button---fix cat button references
	//dynamically generate buttons
	// animate and stop gifs--yada yada
    $('#topicButton').on('click', function() {

        // makes the request for data from url
        $.ajax({url: queryURL, method: 'GET'})

            // defines what to do with datawhen done
            .done(function(response) {

                // dump image from response into variable
                var imageUrl = response.data.image_original_url;

                // create image HTML element with jquery
                var catImage = $("<img>");
                
                // set attributes for source and alt text in img element
                catImage.attr('src', imageUrl);
                catImage.attr('alt', 'topic image');

                // dump them to the page
                $('#images').prepend(catImage);
            });
    });

    // ========================================================

	// Generic function for displaying movie data 
	function renderButtons(){ 

		// Deletes the topics prior to adding new topics (this is necessary otherwise you will have repeat buttons)
		$('#buttonsView').empty();

		// Loops through the array of topics
		for (var i = 0; i < topics.length; i++){

			// Then dynamicaly generates buttons for each movie in the array

			// Note the jQUery syntax here... 
		    var a = $('<button>') // This code $('<button>') is all jQuery needs to create the beginning and end tag. (<button></button>)
		    a.addClass('topic'); // Added a class 
		    a.attr('data-name', topics[i]); // Added a data-attribute
		    a.text(topics[i]); // Provided the initial button text
		    $('#buttonsView').append(a); // Added the button to the HTML
		}
	}

	// ========================================================

	// This function handles events where one button is clicked
	$('#addTopic').on('click', function(){

		// This line of code will grab the input from the textbox
		var topic = $('#topicInput').val().trim();

		// The topic from the textbox is then added to our array
		topics.push(topic);
		
		// Our array then runs which handles the processing of our topic array
		renderButtons();

		// We have this line so that users can hit "enter" instead of clicking on ht button and it won't move to the next page
		return false;
	})

	// ========================================================

	// Generic function for displaying the movieInfo

	// $(document).on('click', '.topic', alertMovieName);


	// ========================================================

	// This calls the renderButtons() function
	renderButtons();
	// event listeners


});