angular.
  module('mySuccess').
  factory('myFactorySuccess', function($location, $routeParams) {
        var service = {};

        //initialize user interface
        service.initialization = function (scope){
            scope.ID = $routeParams.ID;
            scope.btnList = "View List";
        };

        //sign in process
        service.success = function(scope){
            $location.path("/list/" + scope.round);
        }

        return service;
    }).
  component('mySuccess', {
      templateUrl: 'components/mySuccess/mySuccess.template.html',
      controller: ['$scope', 'commonService', 'myFactorySuccess',
        function mySuccessController($scope, commonService, myFactorySuccess) {
            console.log("Success OK");  

            //make sure user has been login
            commonService.identification($scope);

            //initialize the user interface
            myFactorySuccess.initialization($scope);
                
            //attach the success event to sumbit button
            $scope.success = function(){
            	 myFactorySuccess.success($scope);
            }; 	
      }]
  });