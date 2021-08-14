
# API Reference Update : 14/8/21

## Install

```
$ npm i https://github.com/Teerut26/tapo-node.git
```

## Import 

```javascript
const { TapoLogin, Tapo } = require("./modules.js");
```
## Create Instance 

#### Get Token With Email & Password
```javascript
let tapoLogin = new TapoLogin("email","password")

tapoLogin.getToken().then((result) => {
  console.log(result);
}).catch((err) => {
  console.log(err);
});
```

```javascript
let tapo = new Tapo("token");
```
## Use Methods

#### getCameraLists()
```javascript
//example
tapo.getCameraLists().then((result) => {
  console.log(result);
}).catch((err) => {
  console.log(err);
});


//response
{
  totalNum: 1,
  deviceList: [
    {
      deviceType: 'SMART.IPCAMERA',
      role: 0,
      fwVer: '1.0.10 Build 200520 Rel.45325n(4555)',
      appServerUrl: 'https://n-aps1-wap-gw.tplinkcloud.com',
      deviceRegion: 'ap-southeast-1',
      deviceId: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
      deviceName: 'C200',
      deviceHwVer: '1.0',
      alias: 'HOME',
      deviceMac: 'XXXXXXXXXXXX',
      oemId: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
      deviceModel: 'C200',
      hwId: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
      fwId: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
      isSameRegion: true,
      status: 1
    }
  ],
  currentIndex: 1
}
```

#### getCameraDetail(deviceId)
```javascript
//example
tapo.getCameraDetail("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").then((result) => {
  console.log(result);
}).catch((err) => {
  console.log(err);
});


//response
{
  result: { link_type: 'wifi', rssi: '3', rssiValue: -57, ssid: 'XXXXXXX' },
  method: 'getConnectionType',
  error_code: 0
}
```

#### getHanddiskInfo(deviceId)
```javascript
//example
tapo.getHanddiskInfo("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").then((result) => {
  console.log(result);
}).catch((err) => {
  console.log(err);
});


//response
{
  video_total_space: '118.3GB',
  disk_name: '1',
  loop_record_status: '1',
  msg_push_total_space: '210.0MB',
  msg_push_free_space: '210.0MB',
  type: 'local',
  picture_total_space: '1.0MB',
  percent: '100',
  detect_status: 'normal',
  write_protect: '0',
  rw_attr: 'rw',
  record_start_time: '1600835303',
  video_free_space: '0B',
  record_free_duration: '0',
  total_space: '119.1GB',
  picture_free_space: '1.0MB',
  record_duration: '1318832',
  free_space: '467.0MB',
  status: 'normal'
}
```

#### getPlayback(deviceId,getPlayback,end_date)
```javascript
//example
tapo.getPlayback("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX","20210801","20210813").then((result) => {
  console.log(result);
}).catch((err) => {
  console.log(err);
});


//response
{
  resultsCount: 13,
  results: [
    '20210801', '20210802',
    '20210803', '20210804',
    '20210805', '20210806',
    '20210807', '20210808',
    '20210809', '20210810',
    '20210811', '20210812',
    '20210813'
  ]
}
```

#### getPresetConfig(deviceId)
```javascript
//example
tapo.getPresetConfig("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").then((result) => {
  console.log(result)
}).catch((err) => {
  console.log(err)
});


//response
{
  read_only: [ '0', '0', '0' ],
  name: [ 'XXX', 'XXX', 'XXX' ],
  id: [ '1', '2', '3' ],
  position_pan: [ '-0.373837', '0.911582', '0.359876' ],
  position_tilt: [ '0.281407', '0.424623', '0.424623' ]
}
```


