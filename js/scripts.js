
// format userInput string
const formatAddress = input => input.replace(/\s+/g, '+');
const formatType = input => input.split(",");

let map;
let infowindow;

function placeDetail(place) {
	let detail = '';
	if (place.name) {
		detail += `<div class="more-info container my-5">
								<div class="row">
									<div class="col-12">
										<h3 class="text-uppercase">${place.name}</h3>`;
	}
	if (place.types) {
		detail += `<h5>This place is about ${place.types.join()}</h5>`;
	}
	if (place.rating) {
		detail += `<h5>Rating: ${place.rating}</h5>`;
	}
	if (place.opening_hours) {
		detail += `<p>It is open</p>
								</div>
							</div>
						</div>`;
	} else {
		detail += `<p>It is closed</p>
								</div>
							</div>
						</div>`;
	}
	return detail;
}

function initMap(myLocation = {lat: 45.5230, lng: -122.676}, myType = ['store']) {
	map = new google.maps.Map(document.getElementById('map'), {
		center: myLocation,
		zoom: 15
	});

	infowindow = new google.maps.InfoWindow();
	let service = new google.maps.places.PlacesService(map);
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
		}
	}
}

function createMarker(place) {
	var placeLoc = place.geometry.location;
	var marker = new google.maps.Marker({
		draggable: true,
		map: map,
		position: place.geometry.location,
		animation: google.maps.Animation.DROP,
	});

	google.maps.event.addListener(marker, 'click', function () {
		infowindow.setContent("<a href='#detail'>" + place.name + "</a>");
		console.log(place);
		infowindow.open(map, this);
		document.getElementById('detail').innerHTML = placeDetail(place);
	});
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$(document).ready(function () {
	$(".place").click(function () {
		$(".detail").append('something');
	});
	$(".search-form").submit(function (e) {
		e.preventDefault();
		let inputAddress = formatAddress($("#location").val());
		let inputType = formatType($("#type").val());
		let url = 'https://maps.googleapis.com/maps/api/geocode/json';
		$.ajax({
			async: true,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			xhrFields: {
				withCredentials: false
			},
			url: url,
			dataType: 'json',
			type: 'GET',
			data: {
				address: inputAddress,
				key: key,
			},
			success: function (data) {
				let myLocation = data.results[0].geometry.location;
				initMap(myLocation, inputType);
			},
			error: function (jqXHR, textStatus, errorThrown) {
				console.log(textStatus);
			}
		});

		// empty files
		$("input").val('');

	});
});
