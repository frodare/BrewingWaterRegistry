var app = angular.module("brewingWaterRegistry", ['google-maps']);


app.controller('brewingWaterRegistryController', function ($scope) {
	$scope.map = {
		center: {latitude:30.4211323,longitude:-84.2517166},
		draggable: true,
		zoom: 6
	};

	var lat = 31.4406;
	var id = 1;


	var entries = [
		{
			id: id++, 
			latitude:31.4406, 
			longitude:-82.2843, 
			title: 'test'
		}
	];

	$scope.entries = entries;

	$scope.addEntry = function () {
		lat += 0.25;
		entries.push({
			id: id++, 
			latitude:lat, 
			longitude:-82.2843
		});
	};


	$scope.map.events = {
		click: function (map, name, args) {
			var loc = args[0].latLng;
			$scope.entries.push({
				id: id++, 
				latitude: loc.lat(), 
				longitude: loc.lng() 
			});

			$scope.$apply(function () {
				$scope.mapInstance = map;			
			});
		}
	};

	/*
	$scope.$watch('map', function(newVal, oldVal){
		console.log(newVal);
	}, true);


		{id: 1, latitude:30.4406, longitude:-84.2843, showWindow:true}
	


	*/
});

//Unable to MarkerParentModel dued scope