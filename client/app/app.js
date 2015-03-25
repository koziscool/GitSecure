
var util = require('../../server/utilities.js');

angular.module('GitSecureResults', [])

.factory('results', function() {
  var instance = {};
  var counts;

  instance.getResults = function() {
  
  counts = util.getCounts();
  
  return instance;
})

.controller('showResults', ['$scope', 'results', function($scope, results) {

  $scope.results = function() {
    $scope.display = results.getResults();
  };
}])
