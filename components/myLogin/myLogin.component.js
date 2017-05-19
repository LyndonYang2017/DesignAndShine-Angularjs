angular.
  module('myLogin').
  component('myLogin', {
      templateUrl: 'components/myLogin/myLogin.template.html',
      controller: ['$http', '$scope', '$location', function MyLoginController($http, $scope, $location) {
        //console.log("OK!");

        //get station Name array.
        $http.get('http://localhost/DSProject/api/DSStationName').then(function (response) {
              $scope.stationNames = response.data;
              //console.log($scope.stationNames);
        });
        $scope.iPadName = "IPad Name";
        $scope.stationName = "Station Name"
        $scope.btnName = "Sign In";

        //log in
        $scope.login = function(){
        	//alert("OK!");
        	if ($('#iPadName').val() == "" || $('#iPadName').val() == "IPad Name"){
        		alert("Please enter iPad Name");
        		$("#iPadName").focus(); 
        		event.preventDefault();
        		return;
        	}
        	if ($('#stationName').val() == "Station Name"){
        		alert("Please select a Station Name");
        		$("#stationName").focus(); 
        		event.preventDefault();
        		return;
        	}
        	if ($('#Password').val() == "" || $('#Password').val() == "Password"){
        		alert("Please enter your Password");
        		$("#Password").focus(); 
        		event.preventDefault();
        		return;
        	}

        	$scope.btnName = "Loading...";

            //console.log($scope.iPadName);
            //console.log($scope.password);
            //console.log($scope.stationName);
            var url = "http://localhost/DSProject/api/DSLogin?iPadName=" + $scope.iPadName + "&password=" + $scope.password + "&stationName=" + $scope.stationName;
            //console.log(url);

        	$http.get(url).then(function (response) {
                $scope.login = response.data;
                if ($scope.login.ID != 'undefined')
                    $location.path("/signin");
            }, function(response){
                alert("Your iPad Name or passowrd is not correct!");
                $scope.btnName = "Sing in";
                $("#iPadName").focus();
            });
        }
        	
    }]
  });