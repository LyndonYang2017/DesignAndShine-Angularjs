angular.
    module('myLogin').
    factory('myFactoryLogin', function($http, $cookieStore, $location) {
        var service = {};

        //initialize user interface
        service.initialization = function (scope){
            $http.get('http://localhost/DSProject/api/DSStationName').then(function (response) {
                scope.stationNames = response.data;
            });
            scope.iPadName = "IPad Name";
            scope.stationName = "Station Name"
            scope.btnName = "Sign In";
        };

        //valide the input data
        service.validation = function (){
            if ($('#iPadName').val() == "" || $('#iPadName').val() == "IPad Name"){
                alert("Please enter iPad Name");
                $("#iPadName").focus(); 
                event.preventDefault();
                return false;
            }
            if ($('#stationName').val() == "Station Name"){
                alert("Please select a Station Name");
                $("#stationName").focus(); 
                event.preventDefault();
                return false;
            };
            if ($('#Password').val() == "" || $('#Password').val() == "Password"){
                alert("Please enter your Password");
                $("#Password").focus(); 
                event.preventDefault();
                return false;
            }
            return true;
        }

        //log in process
        service.login = function(scope){
            scope.btnName = "Loading...";
            var url = "http://localhost/DSProject/api/DSLogin?iPadName=" + scope.iPadName + 
                                                            "&password=" + scope.password + 
                                                            "&stationName=" + scope.stationName;
            
            $http.get(url).then(function (response) {
                scope.login = response.data;
                if (scope.login.ID != 'undefined'){
                    var round = Math.round(Math.random()*10000)
                    $cookieStore.put('roundValue',round);
                    $location.path("/signin/" + round);
                }
            }, function(response){
                alert("Your iPad Name or passowrd is not correct!");
                scope.btnName = "Sing in";
                $("#iPadName").focus();
            });  
        }

        return service;
    }).
    component('myLogin', {
        templateUrl: 'components/myLogin/myLogin.template.html',
        controller: [ '$scope', 'myFactoryLogin', 
        function MyLoginController( $scope, myFactoryLogin) {
            console.log("Login access!");

            //initialize user interface
            myFactoryLogin.initialization($scope);

            //attach login event to submit button
            $scope.login = function(){
            	if (myFactoryLogin.validation())
                    myFactoryLogin.login($scope);            	
            };
        	
        }]
  });


  