// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var nameApp = angular.module('starter', ['ionic', 'starter.controllers']);

nameApp.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('list', {
      url: '/',
      templateUrl: 'templates/search.html',
      controller: 'ListCtrl'
    })
    .state('view', {
      url: '/movie/:movieid',
      templateUrl: 'templates/view.html',
      controller: 'ViewCtrl'
    });

  $urlRouterProvider.otherwise("/");
  // if none of the above states are matched, use this as the fallback

});

nameApp.factory('Movies', function($http) {
  var cachedData;

  function getData(moviename, callback) {

    var url = 'http://api.themoviedb.org/3/',
      mode = 'search/movie?query=',
      name = '&query=' + encodeURI(moviename),
      key = '&api_key=470fd2ec8853e25d2f8d86f685d2270e';

    $http.get(url + mode + key + name).success(function(data) {

      cachedData = data.results;
      callback(data.results);
    });
  }

  return {
    list: getData,
    find: function(name, callback) {
      console.log(name);
      var movie = cachedData.filter(function(entry) {
        return entry.id == name;
      })[0];
      callback(movie);
    }
  };

});

nameApp.controller('ListCtrl', function($scope, $http, Movies) {

  $scope.movie = {
    name: ''
  }

  $scope.searchMovieDB = function() {

    Movies.list($scope.movie.name, function(movies) {
      $scope.movies = movies;
    });

  };
});

nameApp.controller('ViewCtrl', function($scope, $http, $stateParams, Movies) {
  Movies.find($stateParams.movieid, function(movie) {
    $scope.movie = movie;
  });
});
