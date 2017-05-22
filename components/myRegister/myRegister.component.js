angular.
  module('myRegister').
  factory('myFactoryRegister', function($http, $cookieStore, $location) {
        var service = {};

        //initialize user interface
        service.initialization = function (scope){
            scope.diagnosis = "Diagnosis";
            $http.get('http://localhost/DSProject/api/DSDiagnosis').then(function (response) {
                  scope.diagnosisList = response.data;
                  //console.log(scope.diagnosisList);
            });
            scope.question = "Security Question";
            $http.get('http://localhost/DSProject/api/DSQuestions').then(function (response) {
                  scope.questions = response.data;
                  //console.log($scope.questions);
            });
            scope.btnName = "Create my account";
        };

        //valide the input data
        service.validation = function (){
            if (!$('#agree').is(':checked')) {
                alert("Please agree with the terms and conditions!");
                $("#agree").focus(); 
                event.preventDefault();
                return false;
            }
            if ($('#lastName').val() == "" || $('#lastName').val() == "Last Name"){
                alert("Please enter your last name");
                $("#lastName").focus(); 
                event.preventDefault();
                return false;
            }
            if ($('#diagnosis').val() == "" || $('#diagnosis').val() == "Diagnosis"){
                alert("Please select Diagnosis");
                $("#diagnosis").focus(); 
                event.preventDefault();
                return false;
            }
            if ($('#email').val() != "" && $('#email').val() != "Email" ){
                var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/; 
                if (!reg.test($('#email').val())){
                    alert("Please enter the current Email Address");
                    $('#email').focus();
                    event.preventDefault();
                    return false;
                }                        
            }
            if ($('#phone').val() == "" || $('#phone').val() == "Mobile phone number"){
                alert("Please enter your mobile phone number");
                $("#phone").focus(); 
                event.preventDefault();
                return false;
            }
            if ($('#password').val() == "" || $('#password').val() == "Password"){
                alert("Please enter password");
                $("#password").focus(); 
                event.preventDefault();
                return false;
            }
            if ($('#passwordconf').val() == "" || $('#passwordconf').val() == "Password Confirm"){
                alert("Please enter confirm password");
                $("#passwordconf").focus(); 
                event.preventDefault();
                return false;
            }
            if ($('#password').val() != $('#passwordconf').val()){
                alert("The password and confirm password are different.");
                $("#password").focus(); 
                event.preventDefault();
                return false;
            }

            return true;
        }

        //registration process
        service.registration = function(scope){
            scope.btnName = "loading ...";
            //console.log("Register write ok!");
            var req = {
                method: 'POST',
                url: 'http://localhost/DSProject/api/DSRegistration',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                data: { 
                  "FirstName": scope.firstName,
                  "LastName": scope.lastName,
                  "Diagnosis": scope.diagnosis,
                  "Email": scope.email,
                  "Phone": scope.phone,
                  "Question": scope.question,
                  "Answer": scope.answer,
                  "Password": scope.password,
                  "Notes": ""
                }
            }

            $http(req).then(function(response){
                //console.log(response);
                alert("Registration success!");
                $location.path("/success/" + response.data.ID + "/" + scope.round);
            }, function(response){
                //console.log(response);
                alert("Registration failture! Please ask the admin");
                scope.btnName = "Create my account";
            });
        }

        return service;
    }).
  component('myRegister', {
      templateUrl: 'components/myRegister/myRegister.template.html',
      controller: ['$scope', 'commonService', 'myFactoryRegister',
        function MymyRegisterController($scope, commonService, myFactoryRegister) {
        console.log("Register OK!");

        //make sure user has been login
        commonService.identification($scope);

        //initialize the user interface
        myFactoryRegister.initialization($scope);
    
        //attach the regist event to submit button
        $scope.regist = function(){
          if (myFactoryRegister.validation())
            myFactoryRegister.registration($scope);
        }
        
      }]
  });