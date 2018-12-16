

var liriworks = process.argv;

var order= liriworks[2];
var search = liriworks[3];


var actions;
var concerts;
var axios = require("axios");
var Spotify = require("node-spotify-api");
var BandsInTownEvents = require('bandsintown-events');

if (order === "movie-this") {

    // apply api  ombdb order  to search for the artist so can have the dates of concert
    actions = "http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy";


    axios.get(actions).then (

        function(response) {
          console.log("Movie's Title: " + response.data.Title);

            console.log("The movie talks about: " + response.data.Plot);
          }
    );


}



else if (order === "spotify-this-song") {
// apply api  spotifyto order  to search for the artist so can have the dates of concert

spotify = new Spotify({
    id:"API-KEY",
    secret: "API-SECRET-KEY" 
  });


  spotify.search({ type: 'track', query:search, limit: "1" }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
  console.log(data); 
  });

} 

else if (order === "concert-this") {

  concerts = "https://rest.bandsintown.com/artists/" + search + "/events?app_id=codingbootcamp";

  axios.get(concerts).then (

    function(response) {
      var concertData = response.data[0];

      var showData = [
        "Artist Name: " + concertData.lineup,
        "Date: " + concertData.datetime,
        "Name of The Venue: " + concertData.venue.name,
        "Country: " + concertData.venue.country,
      ].join("\n\n");

      console.log(showData);


      }
);
 


}
