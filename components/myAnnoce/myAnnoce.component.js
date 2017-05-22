angular.
  module('myAnnoce').
  factory('myFactoryAnnoce', function($location) {
        var service = {};

        //initialize user interface
        service.initialization = function (scope){
            scope.btnRegister = "Register";
        };

        //regist in process
        service.regist = function(scope){
            $location.path("/register/" + scope.round);
        }

        return service;
    }).
  component('myAnnoce', {
      templateUrl: 'components/myAnnoce/myAnnoce.template.html',
      controller: ['$scope', 'commonService', 'myFactoryAnnoce',  
        function MyAnnoceController($scope, commonService, myFactoryAnnoce) {
            console.log("Annoce access!");   
            
            //make sure user has been login
            commonService.identification($scope);

            //initialize the user interface
            myFactoryAnnoce.initialization($scope);

            $scope.regist = function(){
            	myFactoryAnnoce.regist($scope);
            }
      }]
  });