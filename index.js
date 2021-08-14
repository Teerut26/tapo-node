const axios = require("axios");
const https = require("https");

class Config {
  constructor() {
    this.url =
      "https://n-wap-gw.tplinkcloud.com/?appName=TP-Link_Tapo_Android&appVer=2.2.39&netType=wifi&termID=9C-A5-C0-F2-4C-81&ospf=Android%206.0.1&brand=TPLINK&locale=th_TH";
    this.headers = {
      "Content-Type": "application/json; charset=UTF-8",
      // "Content-Length": "250",
      Host: "n-wap-gw.tplinkcloud.com",
      Connection: "close",
      "Accept-Encoding": "gzip, deflate",
      "User-Agent": "okhttp/3.12.12",
    };
  }
}

class TapoLogin extends Config {
  constructor(email, password, refreshTokenNeeded = false) {
    super();
    this.email = email;
    this.password = password;
    this.data = {
      method: "login",
      params: {
        appType: "TP-Link_Tapo_Android",
        appVersion: "2.2.39",
        cloudPassword: password,
        cloudUserName: email,
        platform: "Android 6.0.1",
        refreshTokenNeeded,
        terminalUUID: "9C-A5-C0-F2-4C-81",
      },
    };
    this.config = {
      method: "post",
      url: this.url,
      headers: this.headers,
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
      data: this.data,
    };
    this.result = axios(this.config).then((item) => item.data.result);
  }

  getToken() {
    return this.result.then((item) => item.token);
  }

  getAccountId() {
    return this.result.then((item) => item.accountId);
  }

  getRegTime() {
    return this.result.then((item) => item.regTime);
  }

  getCountryCode() {
    return this.result.then((item) => item.countryCode);
  }

  getNickname() {
    return this.result.then((item) => item.nickname);
  }

  getEmail() {
    return this.result.then((item) => item.email);
  }
}

class Tapo extends Config {
  constructor(token) {
    super();
    this.token = token;
  }

  getCameraLists(index = 0, limit = 20) {
    var data = {
      method: "getDeviceListByPage",
      params: {
        deviceTypeList: ["SMART.TAPOPLUG", "SMART.TAPOBULB", "SMART.IPCAMERA"],
        index,
        limit,
      },
    };

    var config = {
      method: "post",
      url: `${this.url}&token=${this.token}`,
      headers: this.headers,
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
      data: data,
    };
    return axios(config).then((item) => item.data.result);
  }

  getCameraDetail(deviceId) {
    var data = {
      method: "passthrough",
      params: {
        deviceId,
        requestData: {
          method: "multipleRequest",
          params: {
            requests: [
              {
                method: "getConnectionType",
                params: { network: { get_connection_type: "null" } },
              },
            ],
          },
        },
      },
    };

    var config = {
      method: "post",
      url: `${this.url}&token=${this.token}`,
      headers: this.headers,
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
      data: data,
    };
    return axios(config).then(
      (item) => item.data.result.responseData.result.responses[0]
    );
  }

  getHanddiskInfo(deviceId) {
    var data = {
      method: "passthrough",
      params: {
        deviceId,
        requestData: {
          method: "multipleRequest",
          params: {
            requests: [
              {
                method: "getLedStatus",
                params: {
                  harddisk_manage: {
                    name: ["harddisk"],
                    table: ["hd_info"],
                  },
                },
              },
            ],
          },
        },
      },
    };

    var config = {
      method: "post",
      url: `${this.url}&token=${this.token}`,
      headers: this.headers,
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
      data: data,
    };
    return axios(config).then(
      (item) =>
        item.data.result.responseData.result.responses[0].result.harddisk_manage
          .hd_info[0].hd_info_1
    );
  }

  getPlayback(deviceId,start_date="20210801",end_date="20210813") {
    var data = {
      method: "passthrough",
      params: {
        deviceId,
        requestData: {
          method: "multipleRequest",
          params: {
            requests: [
              {
                method: "searchDateWithVideo",
                params: {
                  playback: {
                    search_year_utility: {
                      channel: [0],
                      end_date,
                      start_date,
                    },
                  },
                },
              },
            ],
          },
        },
      },
    };

    var config = {
      method: "post",
      url: `${this.url}&token=${this.token}`,
      headers: this.headers,
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
      data: data,
    };
    return axios(config).then((item) =>({
      resultsCount:item.data.result.responseData.result.responses[0].result.playback.search_results.length,
      results:item.data.result.responseData.result.responses[0].result.playback.search_results.map(
        (item2, index) => item2[`search_results_${index + 1}`].date
      )
    }));
  }

  getPresetConfig(deviceId) {
    var data = {
      method: "passthrough",
      params: {
        deviceId,
        requestData: {
          method: "multipleRequest",
          params: {
            requests: [
              {"method":"getPresetConfig","params":{"preset":{"name":["preset"]}}}
            ],
          },
        },
      },
    };

    var config = {
      method: "post",
      url: `${this.url}&token=${this.token}`,
      headers: this.headers,
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
      data: data,
    };
    return axios(config).then((item) =>item.data.result.responseData.result.responses[0].result.preset.preset);
  }

}

module.exports = { TapoLogin, Tapo };
