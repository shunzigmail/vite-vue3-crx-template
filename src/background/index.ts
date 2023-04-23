import db from './db'
import http from '@/utils/http'
import { onMessage, sendMessage } from './utils'
;(async () => {
  await db.setValue('key1', 123)
  const res = await db.getValue('key1')
  console.log(res)
})()

chrome.runtime.onInstalled.addListener(() => {
  // http.get('https://api.rcxcyzya.cc/common/configKey/all').then((res) => {
  //   console.log(res, 233)
  // })
})
// chrome.alarms.create({ periodInMinutes: 1 })
// chrome.alarms.onAlarm.addListener(() => {
//   console.log('alarms')
// })

const callback = (request) => {
  console.log(request, 1)
  chrome.runtime.onMessage.removeListener(callback)
}
chrome.runtime.onMessage.addListener(callback)

// function getCurrentTabId(callback) {
//   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//     if (callback) callback(tabs.length ? tabs[0].id : null)
//   })
// }

// function sendMessageToContentScript(message, callback) {
//   getCurrentTabId((tabId) => {
//     chrome.tabs.sendMessage(tabId, message, function (response) {
//       if (callback) callback(response)
//     })
//   })
// }

// sendMessageToContentScript('你好，我是bg！', (response) => {
//   if (response) alert('收到来自content-script的回复：' + response)
// })
