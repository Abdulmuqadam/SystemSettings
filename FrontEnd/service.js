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
    var query = {
      CompanyId: data.companyId,
      Description: data.description,
      Type: data.type,
      Reference: data.reference,
      Configuration: data.configuration,
      CreatedOn: data.createdOn,
      CreatedBy: data.createdBy,
      UpdatedOn: data.createdOn,
      UpdatedBy: data.updatedOn,
    };
    return $http.post("https://localhost:7118/api/SystemSetting?", null, {
      params: query,
      headers: { "Content-Type": "application/json;charset=utf-8" },
    });
    // ?CompanyId=122&Description=asda&Type=asda&Reference=asd&Configuration=asdaas&CreatedOn=0001-01-01%2000%3A00%3A00.0000000&CreatedBy=asdas&UpdatedOn=0001-01-01%2000%3A00%3A00.0000000&UpdatedBy=dasd
  }

  function updateConfig(id, reference, data) {
    var config = { Configuration: JSON.stringify(data) };

    return $http.put(
      "https://localhost:7118/api/SystemSetting/Configuration/" +
        id +
        "/" +
        reference,
      null,
      {
        params: config,
        headers: { "Content-Type": "application/json;charset=utf-8" },
      }
    );
  }

  function deleteSetting(id) {
    return $http.delete("https://localhost:7118/api/SystemSetting/" + id);
  }
}
