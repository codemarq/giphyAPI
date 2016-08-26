$(document).ready(function () {

	// global variables
	var topics = ['Archer', 'Green Lantern', 'Fugazi', 'Radiohead', 'Transformers'];
	
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
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + query + "&api_key=dc6zaTOxFJmzC&limit=10";

        // makes the request for data from url
        $.ajax({
        		url: queryURL, 
        		method: 'GET'
       		}).done(function(response) {
            	// defines what to do with data when done
            	// console logs 
            	console.log('queryURL: ' + queryURL);
            	console.log('Response: ' + response);

            	var results = response.data;

            	for (var i = 0; i < results.length; i++) {
            		var gifsDiv = $('<div>');
            	
            		var p = $('<p>').text("Rating: " + results[i].rating);
	                // dump image from response into variable
	                var imageUrl = results[i].images.fixed_height.url;

	                // create image HTML element with jquery
	                var topicImage = $("<img>");
	                
	                // set attributes for source and alt text in img element
	                topicImage.attr('src', imageUrl);
	                topicImage.attr('alt', 'topic image');

	                // dump them to the page
	                $('#galleryDiv').prepend(topicImage);
            	}
            });
    };

    // ========================================================

	// This calls the renderButtons() function
	renderButtons();
	// event listeners
	$(document).on('click', '.topic', gifFetch);
});