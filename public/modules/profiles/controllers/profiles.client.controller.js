'use strict';

angular.module('profiles').controller('ProfilesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Profiles',
	function($scope, $stateParams, $location, Authentication, Profiles) {
		$scope.authentication = Authentication;

		$scope.create = function() {
			var profile = new Profiles({
				title: this.title,
				content: this.content
			});
			profile.$save(function(response) {
				$location.path('profiles/' + response._id);

				$scope.title = '';
				$scope.content = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(profile) {
			if (profile) {
				profile.$remove();

				for (var i in $scope.profiles) {
					if ($scope.profiles[i] === profile) {
						$scope.profiles.splice(i, 1);
					}
				}
			} else {
				$scope.profile.$remove(function() {
					$location.path('profiles');
				});
			}
		};

		$scope.update = function() {
			var profile = $scope.profile;

			profile.$update(function() {
				$location.path('profiles/' + profile._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.profiles = Profiles.query();
		};

		$scope.findOne = function() {
			$scope.profile = Profiles.get({
				profileId: $stateParams.profileId
			});
		};
	}
]);