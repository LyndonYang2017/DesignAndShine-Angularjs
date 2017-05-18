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
          when('/signin', {
              template: '<my-Signin></my-Signin>'
          }).
          otherwise('/login', {
              template: '<my-Login></my-Login>'
          });

    }
  ]);