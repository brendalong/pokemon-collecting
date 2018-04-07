//not work
function pokeSubmit(param){
    // var param = document.getElementById("pokeInput").value;
    var pokeURL = "http://pokeapi.co/api/v1/pokemon/" + param;

    $.getJSON(pokeURL, function(data){
        console.log(data);
        console.log(JSON.stringify(data, null, "  "));

        var pokeID = data.national_id;
        var pokeName = data.name;
        var pokeType1 = data.types[0].name;
        if (data.types.length == 2) {
            var pokeType2 = data.types[1].name;
        }
        else var pokeType2 = null;

        // concatenate new URL for next GET request
        var descriptionURI = "http://pokeapi.co" + data.descriptions[0].resource_uri;

        // this var will hold the description string
        var pokeDescription = "";

	// GET request to new URL
	$.getJSON(descriptionURI, function(data2){
		console.log(data2);

		console.log("Number: ", pokeID);
		console.log("Name: ", pokeName);
		console.log("Type 1: ", pokeType1);
		console.log("Type 2: ", pokeType2);
		console.log("Description URI: ", descriptionURI);
        });        

    });	// 2nd GET request is nested inside success function of 1st request
}

pokeSubmit(7);