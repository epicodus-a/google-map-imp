// format userInput string into 'input1+inputb+inputc'
const formatUserInput = input => {return input.replace(/\s+/g, '+');};

// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

var map;
var infowindow;
// var myLocation = {lat: -33.867, lng: 151.195};
// var myType =['store'];

function initMap(myLocation={lat: -33.867, lng: 151.195}, myType=['store']) {

	map = new google.maps.Map(document.getElementById('map'), {
		center: myLocation,
		zoom: 15
	});

	infowindow = new google.maps.InfoWindow();
	var service = new google.maps.places.PlacesService(map);
	service.nearbySearch({
		location: myLocation,
		radius: 500,
		type: myType,
	}, callback);
}

function callback(results, status) {
	if (status === google.maps.places.PlacesServiceStatus.OK) {
		for (var i = 0; i < results.length; i++) {
			createMarker(results[i]);
			// document.getElementById('output').append(results[i]);
			document.getElementById('output').append(results[i].name);
		}
	}
}

function createMarker(place) {
	var placeLoc = place.geometry.location;
	var marker = new google.maps.Marker({
		map: map,
		position: place.geometry.location
	});

	google.maps.event.addListener(marker, 'click', function() {
		infowindow.setContent(place.name);
		infowindow.open(map, this);
	});
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$(document).ready(function () {
	$(".search-form").submit(function (e) {
		e.preventDefault();
		var query = formatUserInput($("#location").val());
		var url = 'https://crossorigin.me/https://maps.googleapis.com/maps/api/place/textsearch/json';
		$.ajax({
			url: url,
			dataType: 'json',
			type: 'GET',
			data: {
				query: query,
				key: 'AIzaSyCIegMYBA5X870rGRqwORr5iCgYD2BLyyE',
			},
			success: function (data, textStatus, jqXHR) {
				console.log()
			},
			error: function (jqXHR, textStatus, errorThrown) {
				// console.log(jqXHR);
			}
		});

		let key = 'AIzaSyCIegMYBA5X870rGRqwORr5iCgYD2BLyyE';
		let jsKey = 'AIzaSyBXgSKzU5-HOLnj6KUboXsZBeKUzDXf0nA';


		'https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyCIegMYBA5X870rGRqwORr5iCgYD2BLyyE'



		// $("#map").append(map);
	});
});
