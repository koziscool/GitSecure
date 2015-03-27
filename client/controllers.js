
'use strict';

angular.module('main',['ngMaterial'])
.controller('mainController', function($scope, mainly, $http){


  // Tab Functionality for Material Design

  $scope.next = function() {
    $scope.data.selectedIndex = Math.min($scope.data.selectedIndex + 1, 2) ;
  };

  $scope.previous = function() {
    $scope.data.selectedIndex = Math.max($scope.data.selectedIndex - 1, 0);
  };

  // Checkmarks a repo given a list of repos user has subscribed to
  
  var checkRepos = function(collection){
    var checkboxes = $('input:checkbox')
    checkboxes.each(function(index, repo){
      repo = $(repo)
      var repo_id = $(repo).attr('data-repo-id');
      if ( collection.indexOf(repo_id) !== -1 ){
        repo.prop('checked', true);
      }
    });
  }

  $scope.populateRepos = function(){
    console.log('populate called!');
    mainly.getRepos(function(data) {
      $scope.repos = data;
      $http.get('/repos').success(function(data){
        checkRepos(data);
      })
    });
  };

$scope.showReports = function(){
    console.log('show report called!');
    $scope.reportdata.report1 =  'parse results'
                // [{"results":[{"component":"qs","version":"0.5.6","parent":{"component":"tiny-lr-fork","version":"0.0.5","parent":{"component":"grunt-contrib-watch","version":"0.6.1","parent":{"component":"GitSecure","version":"0.0.1"},"level":1},"level":2},"level":3,"vulnerabilities":["https://nodesecurity.io/advisories/qs_dos_extended_event_loop_blocking"]}]}]
                // ;
    $scope.reportdata.report2  =     'scan results';
       // { '../2015-02-twittler/data_generator.js': 
       //       [ { type: 'finding',
       //           rule: [],
       //           filename: '../2015-02-twittler/data_generator.js',
       //           line: 55,
       //           col: undefined },
       //         filename: '../2015-02-twittler/data_generator.js' ],
       //      '../2015-02-twittler/jquery.js': 
       //       [ { type: 'finding',
       //           rule: [],
       //           filename: '../2015-02-twittler/jquery.js',
       //           line: 358,
       //           col: undefined }
       //           ;
    $scope.reportdata.report3  =     'retire results';
  };


  $scope.submit = function(e){
    var checked = $(':checked');
    var repos = [];
    checked.each(function(index, repo){
      var data = {};
      repo = $(repo)
      data.html_url = repo.attr('data-url');
      data.git_url = repo.attr('data-git-url');
      data.user_id = repo.attr('data-user-id');
      data.repo_id = repo.attr('data-repo-id');
      data.repo_name = repo.attr('data-repo-name');
      repos.push(data);
      // Example data object
      // var exdata = {
      //   html_url: "https://github.com/mrblueblue/exercism", 
      //   git_url: "git://github.com/mrblueblue/exercism.git", 
      //   user_id: "9220038", 
      //   repo_id: "28679810"
      // }
    });

    $http.post('/repos', repos).success(function(data){
      console.log("response received: ", data);
    });    
  };

})
.factory('mainly', function($rootScope, $http){
  // function that gets repos for curr user
  var getRepos = function(callback) {
    var url = 'https://api.github.com/users/' + $rootScope.username + '/repos';
    console.log('url used: ', url);
    $http.get(url)
      .success(function(data) { // unused status, headers, config
        console.log('get request succeded!: ', data);
        callback(data);
      })
      .error(function(data) { //unused status, headers, config
        console.log('error getting github repos!: ', data);
      });
  };

  return {getRepos: getRepos};
});

