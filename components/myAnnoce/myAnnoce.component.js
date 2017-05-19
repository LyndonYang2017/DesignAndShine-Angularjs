angular.
  module('myAnnoce').
  component('myAnnoce', {
      templateUrl: 'components/myAnnoce/myAnnoce.template.html',
      controller: ['$http', '$scope', '$location', function MyAnnoceController($http, $scope, $location) {
            console.log("Annoce OK");   
            $scope.btnRegister = "Register"    

            $scope.regist = function(){
            	$location.path("/register");
            } 	
      }]
  });