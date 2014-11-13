'use strict';

angular.module('core').controller('SearchCtrl', function($scope, $http, Profiles) {
  $scope.selected = undefined;
  $scope.profiles = [];
  Profiles.query().$promise.then(function(data){
    for (var i in data) {
      $scope.profiles.push(data[i].title);
    }
  });
});