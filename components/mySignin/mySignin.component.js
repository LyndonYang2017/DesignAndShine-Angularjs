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

        	//....
        	$location.path("/myRegister")
        }
        

      }]
  });