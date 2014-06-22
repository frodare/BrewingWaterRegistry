var app = angular.module("brewingWaterRegistry", ['google-maps']);

app.directive('waterEntryForm', function() {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'waterEntryForm.html',
		scope: {
			'water': '=water'
		}
	};
});

app.directive('ionFormField', function() {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'ionFormField.html',
		scope: {
			'ion': '=',
			'ionName': '@',
			'warn': '@'
		},
		controller: function ($scope, $element) {

			var ion, ionNum;

			function reset() {
				ion = $scope.ion;
				ionNum = +$scope.ion;
				$element.removeClass('has-error').removeClass('has-warning').removeClass('has-success');
				$scope.glyphicon = '';
			}

			function isEmpty() {
				return ion === '' || ion == null;
			}

			function isValid() {
				return (ionNum || ionNum === 0) && ionNum < 900;
			}

			function isWarn() {
				return $scope.warn && ionNum > $scope.warn;
			}

			function setWarn() {
				$scope.glyphicon = 'warning-sign';
				$element.addClass('has-warning');
			}

			function setSuccess() {
				$scope.glyphicon = 'ok';
				$element.addClass('has-success');
			}

			function setError() {
				$scope.glyphicon = 'remove';
				$element.addClass('has-error');
			}

			function check() {
				reset();

				if(isEmpty()){
					return;
				}

				if(!isValid()){
					setError();
					return;
				}

				if(isWarn()){
					setWarn();
				}else{
					setSuccess();
				}
			}

			$scope.$watch('ion', check, true);

			check();
		}
	};
});

app.directive('raResult', function () {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'raWaterFormField.html'
	};
});

app.controller('raWaterController', function ($scope) {
	
	function toRa() {
		var profile = $scope.water.profile;
		if(!profile){
			return 0;
		}
		var r = (profile.HCO * 0.819672131) - (0.714 * profile.Ca) - (0.585 * profile.Mg);
		if(!r || isNaN(r)){
			r = 0;
		}
		return r;
	};

	$scope.$watch('water.profile', function(){
		$scope.water.ra = toRa();
	}, true);
	
});


app.controller('brewingWaterRegistryController', function ($scope) {

	$scope.map = {
		zoom: 6,
		center: {latitude:30.4211323,longitude:-84.2517166}
	};

	/*


Calcium (ppm):  294  352
Magnesium (ppm): 	 24


Sulfates (ppm): 	 820
Chloride (ppm): 	 36


Sodium (ppm): 	 24 	44

Carbonates (ppm): 	200  320

*/
	$scope.openEntry = function (){
		console.log('openEntry: ', arguments);
	};


	$scope.water1 = {
		profile: {
			Ca: 42,
			Mg: 12,
			HCO: 142
		}
	};

	$scope.water1.coords = {};



	var lat = 31.4406;
	var id = 1;


	var entries = [];

	$scope.entries = entries;

	$scope.addEntry = function () {
		console.log('addEntry(): ', $scope.water1, entries);
		var entry = angular.copy($scope.water1);
		entry.id = id++;
		entry.icon = "http://maps.google.com/mapfiles/marker_white.png";
		entries.push(entry);
	};

	entries.icon = "http://maps.google.com/mapfiles/marker_white.png";


	$scope.map.events = {
		click: function (map, name, args) {
			var loc = args[0].latLng;
			
			$scope.water1.coords = {
				latitude: loc.lat(), 
				longitude: loc.lng() 
			};

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