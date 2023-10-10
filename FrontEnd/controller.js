app.controller("TestController", TestController);

TestController.$inject = ["$scope", "TestService"];

function TestController($scope, TestService) {
  $scope.config = {
    Name: "",
    Description: "",
    Phone: "",
    Email: "",
  };

  $scope.setting = {
    companyId: "",
    description: "",
    type: "",
    reference: "",
    configuration: function () {
      return JSON.stringify($scope.config);
    },
    createdBy: "",
    updatedBy: "",
  };

  $scope.ref = $scope.setting.reference;
  $scope.Id = $scope.setting.id;

  $scope.init = function () {
    TestService.getData().then(
      function (response) {
        $scope.data = response.data;
      },
      function (error) {
        console.error(error);
      }
    );
  };

  $scope.init();

  $scope.getSettingInfo = function (Id) {
    TestService.getById(Id).then(
      function (response) {
        $scope.settingInfo = response.data;
      },
      function (error) {
        alert(error.status);
      }
    );
  };

  $scope.loadSettings = function (id, reference) {
    $scope.ref = reference;
    $scope.Id = id;
    TestService.getSettings(id, reference).then(
      function (response) {
        $scope.config = response.data;
      },
      function (error) {
        console.error(error.status);
      }
    );
  };

  $scope.saveSettings = function (setting) {
    TestService.postSetting(setting).then(
      function (response) {
        $scope.status = response.data.status;
        console.log("Saved");
        location.reload();
      },
      function (error) {
        console.error(error.status);
      }
    );
  };

  $scope.updateConfig = function (id, reference, data) {
    TestService.updateConfig(id, reference, data).then(
      function (response) {
        console.log(response);
        alert("Updated");
        location.reload();
      },
      function (error) {
        console.error(error);
        alert(error.status);
      }
    );
  };

  $scope.deleteSettings = function (id) {
    TestService.deleteSetting(id).then(
      function (response) {
        alert("Deleted");
        location.reload();
      },
      function (error) {
        console.error(error.status);
      }
    );
  };
}
