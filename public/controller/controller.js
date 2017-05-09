angular.module('contactApp', [])

.controller('appCtrl', ['$scope', '$http', function($scope, $http){
	$scope.refresh = function(){
		$http.get('/contactlist').then(function(response){
			$scope.contactlist = response.data;
			console.log(response.data);
		});
	};
	
	$scope.refresh();

	$scope.addContact = function(){
		var data = $scope.contact;
		$http.post('/contactAdd', data).then(function(response){
			console.log(response);
			$scope.refresh();
			$scope.contact = {};
		});
	};

	$scope.deleteContact = function(id){
		$http.delete('/contactDel/' + id).then(function(response){
			console.log(response);
			$scope.refresh();
		});
	};

	$scope.editPerson = function(person){
		$scope.selected = angular.copy(person);
	};

	$scope.editContact = function(id){
		var data = $scope.selected;
		$http.put('/contactUpdate/' + id, data).then(function(response){
			$scope.editMode = false;
			console.log(response.data);
			$scope.refresh();
		});
	};
}])