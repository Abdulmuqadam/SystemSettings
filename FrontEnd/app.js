var app = angular.module("TestApp", ["ngRoute"]);
app.config(function ($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "systemSettings.html",
    })
    .when("/systemSettingDialog", {
      templateUrl: "systemSettingDialog.html",
    });
});
