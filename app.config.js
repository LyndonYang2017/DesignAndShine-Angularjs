'use strict';

angular.
  module('designShineApp').
  config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');
        //$locationProvider.html5Mode(true);
        $routeProvider.
          when('/login', {
              template: '<my-Login></my-Login>'
          }).
          when('/signin/:round', {
              template: '<my-Signin></my-Signin>'
          }).
          when('/annoce/:round', {
              template: '<my-Annoce></my-Annoce>'
          }).
          when('/register/:round', {
              template: '<my-Register></my-Register>'
          }).
          when('/success/:ID/:round', {
              template: '<my-Success></my-Success>'
          }).
          when('/list/:round', {
              template: '<my-List></my-List>'
          }).
          otherwise('/login', {
              template: '<my-Login></my-Login>'
          });
    }
  ]).
  service('commonService', function( $routeParams, $cookieStore, $location){
    this.identification = function(scope){
      scope.round = $routeParams.round;
      scope.roundCookie = $cookieStore.get('roundValue');
      if (scope.round != scope.roundCookie){
          alert("The information of Login is not correct, please login again!");
          $location.path("/login");
      }
    }
  });