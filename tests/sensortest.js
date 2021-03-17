const axios = require('axios')

const token =  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYXN0ZXJub2RlIjp7ImlkX21hc3Rlcm5vZGUiOjEsIm1hc3Rlcm5vZGVfbmFtZSI6InByaW5jaXBhbCIsImlkdXNlciI6MX0sImlhdCI6MTU4NjM0MzMzNiwiYXVkIjoiaHR0cDovLzEyNy4wLjAuMTozMDAwIiwiaXNzIjoiREVWVEVBTSIsInN1YiI6IkRFVlRFQU0ifQ.mqkeuqK_QriOPiRy6UZI2JJwju5ASmfVhd0aPPuZerzi07IXqpEiPIeUuJ2F0dfjX-_gw-G2P9HCAYxq7SzdYrXwdOCGmo8U4EF1BcT2eweM9c8Gz1wjuiLpKkcm-mzyJc_zFKqaPmdRg5ztWs6izfx29R0o-3h06S2mufDSvXyYQI6a97fUSQ9I5Wg1rp4DLpk6iWUIhP3Yz1VGqOev8HZgnI-czgE96dMvmgtiKgx8DoYUhpycogZ5W9PMmWPJCq9EhNHLFXgoH_igiIgtgmplfXQXh-qTUZ2uiA8gPMO3PUYgLivriVAiPvZUjX7WF75j8SCoMeWZTRbtLqXCew"


const token2 = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYXN0ZXJub2RlIjp7ImlkX21hc3Rlcm5vZGUiOjMsIm1hc3Rlcm5vZGVfbmFtZSI6IlRlc3QiLCJpZHVzZXIiOjQsInN5bmN3b3JkIjoxNzksIm5hbWVfbGlua2F1dGhvcml6YXRpb24iOiJBRE1JTiIsImlzb3duZXIiOjF9LCJpYXQiOjE1ODkyMjQxNTEsImF1ZCI6Imh0dHA6Ly8xMjcuMC4wLjE6MzAwMCIsImlzcyI6IkRFVlRFQU0iLCJzdWIiOiJERVZURUFNIn0.k8uAyzwmp2U4qo-A3tgFJLGfh72QZEWYqDIAcITwS4YTkuaDy49r2Vcu__UjLDYc3iskkJnLuweAtri5IHqDX31vNq3ItTwP7ZgDJYRmaOcMmL48dqWFSAzTvpgIdoWTjbjwYXVKpXHqMvC4FrMGEfOskP-Hj9sVXfUbX9sESlcMCdhpdXZ0xn3xDrPJjy67wHcYyAFhmttnvwIwI82atEA3HCJIa_k2nJbchWAmYJk-r8xHicVv_NcFn6haZWacyme583i2BMHcAMZzou5yci1-Fm6tVTJdTX5E8CM7TurOOCmcJm0Rk-8IRMFjigcknkW4VqGxEpHBL2tA8MGnXA'

const id_device =  "941188286f24"
const sensor1State = "1"
const sensor2State = "0"
const bootCount = "10"
const batteryPorcent = "21"
const filling_porcent = "50"

const data = "sn:"+id_device+ ":" + sensor1State +":" + sensor2State +  ":" + bootCount + ":" + batteryPorcent + ":" + filling_porcent

const API_URL = "https://ydeo-monitor.com/"

let config = {
    headers: {
      'Authorization': 'Bearer ' + token2
    }
  }


  axios.get(API_URL+'activate/masternode',config).then(function (response) {
      console.log(response.data);
    }).catch(function (error) {
      console.log(error.response.data);
    });


axios.post(API_URL+'sensor/data', {data:data,snr:'12',rssi:'12'},config).then(function (response) {
    console.log(response.data);
  }).catch(function (error) {
    console.log(error.response.data);
  });
