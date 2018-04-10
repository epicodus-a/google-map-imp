// get data from google map api
$(document).ready(function () {
	var url = 'https://crossorigin.me/https://maps.googleapis.com/maps/api/place/search/json';
	$.ajax({
		url: url,
		dataType: 'json',
		type: 'GET',
		data: {
			location: '33.787794,-117.853111',
			radius: 1000,
			name: 'coffee',
			key: 'AIzaSyCIegMYBA5X870rGRqwORr5iCgYD2BLyyE',
			sensor: 'false'
		},
		success: function (data, textStatus, jqXHR) {
			// console.log(data);
			console.log(jqXHR);
		},
		error: function (jqXHR, textStatus, errorThrown) {
			console.log(jqXHR);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});



});

