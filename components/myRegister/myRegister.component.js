angular.
  module('myRegister').
  component('myRegister', {
      templateUrl: 'components/myRegister/myRegister.template.html',
      controller: ['$http', '$scope', '$location', function MymyRegisterController($http, $scope, $location) {
        console.log("Register OK!");

    
        $scope.diagnosis = "Diagnosis";
        $http.get('http://localhost/DSProject/api/DSDiagnosis').then(function (response) {
              $scope.diagnosisList = response.data;
              console.log($scope.diagnosisList);
        });
        $scope.question = "Security Question";
        $http.get('http://localhost/DSProject/api/DSQuestions').then(function (response) {
              $scope.questions = response.data;
              console.log($scope.questions);
        });

        $scope.btnName = "Create my account"
        

      }]
  });