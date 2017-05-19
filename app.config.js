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
          when('/annoce', {
              template: '<my-Annoce></my-Annoce>'
          }).
          when('/register', {
              template: '<my-Register></my-Register>'
          }).
          otherwise('/login', {
              template: '<my-Login></my-Login>'
          });

    }
  ]);