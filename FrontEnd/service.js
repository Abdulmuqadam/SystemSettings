app.factory("TestService", TestService);

TestService.$inject = ["$http"];

function TestService($http) {
  var service = {
    getData: getData,
    getById: getById,
    getSettings: getSettings,
    postSetting: postSetting,
    updateConfig: updateConfig,
    deleteSetting: deleteSetting,
  };

  return service;

  function getData() {
    return $http.get("https://localhost:7118/api/SystemSetting/all");
  }

  function getSettings(id, reference) {
    return $http.get("https://localhost:7118/api/SystemSetting/Configuration", {
      params: {
        id: id,
        reference: reference,
      },
    });
  }

  function getById(Id) {
    return $http.get("https://localhost:7118/api/SystemSetting/" + Id);
  }

  function postSetting(data) {
    debugger;
    const formattedData = {
      companyId: data.companyId,
      description: data.description,
      type: data.type,
      reference: data.reference,
      configuration: data.configuration(),
      createdOn: new Date().toISOString(),
      createdBy: data.createdBy,
      updatedOn: new Date().toISOString(),
      updatedBy: data.updatedBy,
    };

    const formattedDataJSON = JSON.stringify(formattedData);

    return $http.post(
      "https://localhost:7118/api/SystemSetting",
      formattedDataJSON
    );
  }

  function updateConfig(id, reference, data) {
    debugger;
    return $http.put(
      "https://localhost:7118/api/SystemSetting/Configuration/" +
        id +
        "/" +
        reference,
      data
    );
  }

  function deleteSetting(id) {
    return $http.delete("https://localhost:7118/api/SystemSetting/" + id);
  }
}
