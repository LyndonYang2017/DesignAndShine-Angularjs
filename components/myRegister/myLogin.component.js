angular.
  module('myLogin').
  component('myLogin', {
      templateUrl: 'components/myLogin/myLogin.template.html',
      controller: ['$http', '$scope', '$location', function MyLoginController($http, $scope, $location) {
        console.log("OK!");

        //get station Name array.
        $scope.stationNames = new Array('Discovery Zone', 'HCS Talk');
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

        	//....
        	$location.path("/signin")
        }
        

      }]
  });