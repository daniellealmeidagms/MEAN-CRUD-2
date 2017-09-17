myApp.controller('compController', function($scope,$route,$routeParams,$http){
	$scope.getCompanies = function(){
		$http.get('/api/companies/').then(function(response){
			$scope.companies = response.data;
		});
	};
	$scope.showCompany = function(){
		var id = $routeParams.id;
		$http.get('/api/companies/'+ id).then(function(response){
			$scope.company = response.data;
		});
	};
	$scope.addCompany = function(){
		//var id = $routeParams.id;
		$http.post('/api/companies/', $scope.company).then(function(response){
			//$scope.company = response.data;
			window.location.href = '/';
		});
	};
	$scope.updateCompany = function(){
		var id = $routeParams.id;
		$http.put('/api/companies/'+ id , $scope.company).then(function(response){
			//$scope.company = response.data;
			window.location.href = '/';
		});
	};
	$scope.deleteCompany = function(id){
		var id = id;
		$http.delete('/api/companies/'+ id).then(function(response){
			$route.reload();
		});
	};
	
});