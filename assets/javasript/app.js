var topic = ["steve carell", "chris farley", "adam sandler", "paul rudd", "will ferrel", "jim carey", "jack black", "vince vaughn", "melissa mccarthy", "chevy chase", "owen wilson", "jerry seinfeld", "john candy", "ben stiller", "tina fey", "mike meyers", "jimmy fallon"]
console.log(topic)

function renderButtons() {
    //clearing buttons and divs to not duplicate buttons and to clear divs between div iterations with eacb button click
    $("#gifs-appear-here").empty();
    $(".buttons-view").empty();

    for (var i = 0; i < topic.length; i++) {

        //dynamic generating of buttons for each item in array
        var a = $("<button>");
        // adding classes to button
        a.addClass("btn");
        a.addClass("btn-info");
        a.addClass("button-name");
        // add data-attribute
        a.attr("data-name", topic[i]);
        // initial button text
        a.text(topic[i]);
        // adding button to html
        $(".buttons-view").append(a);
        // $("#user-search").val('')

    }
};
//function to add new search item to array and generate new button
function newSearch() {

    event.preventDefault();

    var userSearch = $("#user-search").val().trim();

    $("#user-search").val("");

    if (userSearch === "") {

    } else {
        topic.unshift(userSearch);
        renderButtons();
    }
};

renderButtons()

//function to generate gif from ajax call
function genGif() {
    var userSearch = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + userSearch +
        "&api_key=cj7ai5K7BTX6qzqvfuiX7O3yScasBb1f&limit=10";

    console.log(queryURL);

    $.ajax({
            url: queryURL,
            method: "GET"
        })
        .then(function (response) {

            console.log(response);

            var results = response.data;

            $("#gifs-appear-here").empty();
            //for loop 
            for (var i = 0; i < results.length; i++) {

                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                    // Creating a div for the gif
                    var gifDiv = $("<div>");

                    // Storing the result item's rating
                    //converting to string, storing in variable to change to Uppercase
                    var ratingString = JSON.stringify(results[i].rating);
                    var rating = ratingString.toUpperCase();


                    // Creating a paragraph tag with the result item's rating
                    var p = $("<span>").text(rating);

                    // // Creating an image tag
                    var dataImage = $("<img>");

                    // Setting the image properties/class
                    dataImage.attr("src", results[i].images.fixed_height_still.url);
                    dataImage.attr("data-animate", results[i].images.fixed_height.url);
                    dataImage.attr("data-still", results[i].images.fixed_height_still.url);
                    dataImage.addClass("gif");
                    dataImage.attr("data-state", "still");

                    //adding class to rating for styling
                    p.addClass("rating");
                    // Appending the paragraph and personImage we created to the "gifDiv" div we created
                    gifDiv.append(p);
                    gifDiv.append(dataImage);
                    //adding class for styling
                    gifDiv.addClass("textImg");


                    // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                    $("#gifs-appear-here").prepend(gifDiv);
                }
            }
        });
};

function toggle() {

    // $(".gif").on("click", function () {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
};

//listening events to call functions when gifs and buttons are clicked
$(document).on("click", ".gif", toggle);
$(document).on("click", ".button-name", genGif);
$(document).on("click", "#submit-button", newSearch);