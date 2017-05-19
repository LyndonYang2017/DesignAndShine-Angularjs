angular.
  module('mySignin').
  component('mySignin', {
      templateUrl: 'components/mySignin/mySignin.template.html',
      controller: ['$http', '$scope', '$location', function MySigninController($http, $scope, $location) {
        console.log("OK!");

        //get station Name array.
        $scope.idNumber = "ID Number";
        $scope.email = "Email Address"
        $scope.btnName = "Sign In";

        //log in
        $scope.signin = function(){
        	//alert("OK!");
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
                return;
            }

        	
        	$scope.btnName = "Loading...";

        	var url = "http://localhost/DSProject/api/DSSignin?IDNumber=" + $scope.idNumber + "&email=" + $scope.email;
            //console.log(url);

            $http.get(url).then(function (response) {
                $scope.signin = response.data;
                if ($scope.signin.ID != 'undefined')
                    $location.path("/annoce");
            }, function(response){
                alert("Your ID Number or Email Address is not correct!");
                $scope.btnName = "Sing in";
                $("#idNumber").focus();
            });
        }
        

      }]
  });