$(document).ready(function () {

	// global variables
	var topics = ['Archer', 'Green Lantern', 'Fugazi', 'Radiohead', 'Transformers'];
	// api key
	var apiKey = "dc6zaTOxFJmzC";

	// api endpoint url
	var queryURL = "http://api.giphy.com/v1/gifs/random?";

	// declare query URL for giphy api with query of cats
	//  ripped from NYSearch.js have to edit still
    queryURL += $.param({
			'api-key': apiKey,
			'q' : q,
			'begin_date': begin_date,
			'end_date': end_date
		});

	// helper functions

	// on click handler for button---fix cat button references
	//dynamically generate buttons
	// animate and stop gifs--yada yada
    $('#catButton').on('click', function() {

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
                catImage.attr('alt', 'cat image');

                // dump them to the page
                $('#images').prepend(catImage);
            });
    });


	// event listeners


});