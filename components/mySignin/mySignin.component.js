angular.
    module('mySignin').
    factory('myFactorySignin', function($http, $cookieStore, $location) {
        var service = {};

        //initialize user interface
        service.initialization = function (scope){
            scope.idNumber = "ID Number";
            scope.email = "Email Address";
            scope.btnName = "Sign In";
        };

        //valide the input data
        service.validation = function (){
            var isIDNull = false;
            var isEmailNull = false;
            if ($('#idNumber').val() == "" || $('#idNumber').val() == "ID Number")
                isIDNull = true;
            if ($('#email').val() == "" || $('#email').val() == "Email Address")
                isEmailNull = true;
            if (isIDNull && isEmailNull){
                alert("Please enter ID Number or Email Address");
                $("#idNumber").focus(); 
                event.preventDefault();
                return false;
            }
            if ($('#email').val() != "" && $('#email').val() != "Email Address" ){
                var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/; 
                if (!reg.test($('#email').val())){
                    alert("Please enter the current Email Address");
                    $('#email').focus();
                    event.preventDefault();
                    return false;
                }                        
            }
            return true;
        }

        //sign in process
        service.signin = function(scope){
            scope.btnName = "Loading...";

            var myID = scope.idNumber == "ID Number" ? "" : scope.idNumber;
            var myEmail = scope.email == "Email Address" ? "" : scope.email;
            var url = "http://localhost/DSProject/api/DSSignin?IDNumber=" + myID + "&email=" + myEmail;
            //console.log(url);

            $http.get(url).then(function (response) {
                scope.signin = response.data;
                if (scope.signin.ID != 'undefined'){
                    var round = Math.round(Math.random()*10000)
                    $cookieStore.put('roundValue',round);
                    $location.path("/annoce/" + round);
                }
            }, function(response){
                alert("Your ID Number or Email Address is not correct!");
                scope.btnName = "Sing in";
                $("#idNumber").focus();
            });
        }

        return service;
    }).
    component('mySignin', {
        templateUrl: 'components/mySignin/mySignin.template.html',
        controller: ['$scope', 'commonService', 'myFactorySignin',
            function MySigninController($scope, commonService, myFactorySignin) {
            console.log("Sign in access!");

            //make sure user has been login
            commonService.identification($scope);

            //initialize the user interface
            myFactorySignin.initialization($scope);            

            //attach signin event to submit button
            $scope.signin = function(){                
                if (myFactorySignin.validation())
                    myFactorySignin.signin($scope);
            };

        }]
    });