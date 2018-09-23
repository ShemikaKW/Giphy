$(document).ready(function () {

    // Variables

    var topics = ["batman", "superman", "daredevil", "aquaman", "spiderman", "black panther", "luke cage"];

    // Functions

    function createButtons() {
        // Empty the buttons
        $("#button-area").empty();


        for (var i = 0; i < topics.length; i++) {
            var newButton = $("<button>");
            newButton.addClass("superhero-button");
            newButton.attr("data-name", topics[i]);
            newButton.text(topics[i]);
            $("#button-area").append(newButton);
            // Testing
            console.log(topics[i]);

        }
    }

    function displayImages() {

        // Deletes Images prior to adding new Images
        $("#gifs-image").empty();
        // Removes error message
        $("#message").text("");

        var superhero = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + superhero + "&api_key=sCp50VxKTHKEjlDU6kC615usEOOPDrnF&limit=25";

        // AJAX GET request
        $.ajax({
            url: queryURL,
            method: "GET"
        })

            .then(function (response) {

                var results = response.data;
                var x = 10;

                for (var i = 0; i < x; i++) {

                    var imgDiv = $("<div>");
                    imgDiv.addClass("image-container");

                    var rating = results[i].rating;


                    //Rating on html in paragraph
                    var p = $("<p>").text("Rating: " + rating);

                    //Variable called SuperheroImage in image element
                    var SuperheroImage = $("<img>");

                    //SuperheroImage src and image information
                    SuperheroImage.attr("src", results[i].images.fixed_height_still.url);

                    //SuperheroImage data-state info to allow image in still state
                    SuperheroImage.attr("data-state", "still");

                    //give SuperheroImage data-still image information to allow image to be in still state
                    SuperheroImage.attr("data-still", results[i].images.fixed_height_still.url);

                    //give SuperheroImage data-animate image information so when clicked it will play gif
                    SuperheroImage.attr("data-animate", results[i].images.fixed_height.url);

                    //add a class to SuperheroImage
                    SuperheroImage.addClass("gif");


                    //for each image/paragraph prepend to div 
                    imgDiv.prepend(SuperheroImage);
                    imgDiv.prepend(p);


                    //put image and image div on browser
                    $("#gifs-image").prepend(imgDiv);

                }
            });

    }
    //Click function to play gif
    $("#gifs-image").on("click", ".gif", function () {
        $("#message").text("");
        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }

        else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

    //this allows user to add new superhero to list
    $("#add-superhero").on("click", function (event) {
        $("#message").text("");
        //event.preventDefault() prevents the form from trying to submit itself
        //form used so that the user can hit enter instead of clicking the button if they want
        event.preventDefault();


        //grab the text from the input box and trim any extra spaces entered
        var newTopic = $("#superhero-input").val().trim();
        newTopic = newTopic.toLowerCase();
        $("#superhero-input").val("");
        if (newTopic.length <= 0) {
            $("#message").text("You forgot to enter a Superhero");
            return;
        }
        if (topics.indexOf(newTopic) === -1) {
            //takes superhero entered from the textbox and adds it to our array of topics
            topics.push(newTopic);

            // call createButtons which handles the processing of topics
            createButtons();
        } else {
            $("#message").text("That Superhero already exists");
        }

    });

    //createButtons function called to display the initial list of superheros
    createButtons();

    // click event on the superhero-button to listen for which superhero user pics
    $(document).on("click", ".superhero-button", displayImages);

});

