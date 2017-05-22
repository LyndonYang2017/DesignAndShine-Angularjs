angular.
  module('myList').
  factory('myFactoryList', function($http, $location) {
        var service = {};

        //initialize user interface
        service.initialization = function (scope){
            scope.btnList = "Create new account";
            $http.get('http://localhost/DSProject/api/DSRegistration').then(function (response) {
                  scope.registList = response.data;
                  //console.log($scope.registList);
            })
        };

        //locate to registration page.
        service.list = function(scope){
            $location.path("/register/" + scope.round);
        }

        return service;
    }).
  component('myList', {
      templateUrl: 'components/myList/myList.template.html',
      controller: ['$scope', 'commonService', 'myFactoryList', 
      function MyLoginController($scope, commonService, myFactoryList) {
        console.log("List access!");

        //make sure user has been login
        commonService.identification($scope);

        //initialize the user interface
        myFactoryList.initialization($scope);

        //locate to registration page
        $scope.list = function(){
        	 myFactoryList.list($scope);
        } 
 	
    }]
  });