//
// const convertUserInput = addressStr => {
// 	let addressArray = addressStr.split(",");
// 	let result = '';
// 	addressArray.forEach((element, index) => {
// 		if (index < addressArray.length - 1){
// 			result += element+'+';
// 		} else{
// 			result += element;
// 		}
// 	});
// 	return result;
// };

const convertUserInput2 = input => {return input.replace(/\s+/g, '+');};

// alert(convertUserInput2('valeu portland food'));
// get data from google map api
$(document).ready(function () {
	// var newAddress;
	$(".search-form").submit(function (e) {
		e.preventDefault();
		// var keywords = convertUserInput2($("#type").val());
		var query = convertUserInput2($("#location").val());
		// var url2 = 'https://maps.googleapis.com/maps/api/geocode/json';
		var url2 = 'https://crossorigin.me/https://maps.googleapis.com/maps/api/place/textsearch/json';

		$.ajax({
			url: url2,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			// async: false,
			dataType: 'json',
			type: 'GET',
			data: {
				query: query,
				key: 'AIzaSyCIegMYBA5X870rGRqwORr5iCgYD2BLyyE',
			},
			success: function (data, textStatus, jqXHR) {
				// newAddress = [data.results[0].geometry.location.lat, data.results[0].geometry.location.lng];
				console.log(data);
			},
			error: function (jqXHR, textStatus, errorThrown) {
				console.log(jqXHR);
				console.log(textStatus);
				console.log(errorThrown);
			}
		});
	});
});
		// $.ajax({
		// 	url: url2,
		// 	headers: {
		// 		'Content-Type': 'application/x-www-form-urlencoded'
		// 	},
		// 	async: false,
		// 	dataType: 'json',
		// 	type: 'GET',
		// 	data: {
		// 		address: address,
		// 		key: 'AIzaSyCIegMYBA5X870rGRqwORr5iCgYD2BLyyE',
		// 	},
		// 	success: function (data, textStatus, jqXHR) {
		// 		newAddress = [data.results[0].geometry.location.lat, data.results[0].geometry.location.lng];
		// 		console.log(newAddress);
		// 	},
		// 	error: function (jqXHR, textStatus, errorThrown) {
		// 		console.log(jqXHR);
		// 		console.log(textStatus);
		// 		console.log(errorThrown);
		// 	}
		// });

	//
	// 	var url = 'https://crossorigin.me/https://maps.googleapis.com/maps/api/place/search/json';
	// 	$.ajax({
	// 		url: url,
	// 		headers: {
	// 			'Content-Type': 'application/x-www-form-urlencoded'
	// 		},
	// 		async: false,
	// 		dataType: 'json',
	// 		type: 'GET',
	// 		data: {
	// 			location: newAddress[0] +", "+ newAddress[1],
	// 			radius: 1000,
	// 			name: keywords,
	// 			key: 'AIzaSyCIegMYBA5X870rGRqwORr5iCgYD2BLyyE',
	// 			sensor: 'false'
	// 		},
	// 		success: function (data, textStatus, jqXHR) {
	// 			console.log(data);
	// 		},
	// 		error: function (jqXHR, textStatus, errorThrown) {
	// 			console.log(jqXHR);
	// 			console.log(textStatus);
	// 			console.log(errorThrown);
	// 		}
	// 	});
	// });
	// var url2 = 'https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyCIegMYBA5X870rGRqwORr5iCgYD2BLyyE';

/////////////////////////////////////////////////////////////////////////////////////////////
// });