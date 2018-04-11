// let key = 'AIzaSyCIegMYBA5X870rGRqwORr5iCgYD2BLyyE';
// let jsKey = 'AIzaSyBXgSKzU5-HOLnj6KUboXsZBeKUzDXf0nA';

// format userInput string
const formatAddress = input => {return input.replace(/\s+/g, '+');};
const formatType = input => {return input.split(",");};


var map;
var infowindow;

function initMap(myLocation={lat: 45.5230, lng: -122.676}, myType=['store']) {
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
			let list = `<p class="lead my-5">${results[i].name}</p>`;
			document.getElementById('list').append(results[i].name+"<br>");
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
		infowindow.setContent("<a href='#list'>"+place.name+"</a>");
		infowindow.open(map, this);
	});
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$(document).ready(function () {
	$(".search-form").submit(function (e) {
		e.preventDefault();
		let inputAddress = formatAddress($("#location").val());
		let inputType = formatType($("#type").val());
		// let url = 'https://crossorigin.me/https://maps.googleapis.com/maps/api/geocode/json';
		let url = 'https://maps.googleapis.com/maps/api/geocode/json';
		$.ajax({
			beforeSend: function (request) {
				request.setRequestHeader("Authorization", "Negotiate");
			},
			async: true,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			url: url,
			dataType: 'json',
			type: 'GET',
			data: {
				address: inputAddress,
				key: 'AIzaSyCIegMYBA5X870rGRqwORr5iCgYD2BLyyE',
			},
			success: function (data, textStatus, jqXHR) {
				let myLocation = data.results[0].geometry.location;
				initMap(myLocation,inputType);
			},
			error: function (jqXHR, textStatus, errorThrown) {
				console.log(textStatus);
			}
		});

		// empty files
		$("input").val('');

	});
});
