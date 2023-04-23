# chrome-extension
## content-script 与 background 建立长连接

`content-script.js`

```
let port = chrome.runtime.connect({ name: 'from-content' })
port.onMessage.addListener(function (msg) {
  if (msg.question == "Who's there?") port.postMessage({ answer: 'Madame' })
  else if (msg.question == 'Madame who?')
    port.postMessage({ answer: 'Madame... Bovary' })
})
port.postMessage({ joke: 'open' })
```

`background.js`

```
chrome.runtime.onConnect.addListener(function (port) {
  port.onMessage.addListener(function (msg) {
    if (port.name === 'from-content') {
      if (msg.joke == 'Knock knock') {
        port.postMessage({ question: "Who's there?" })
      }
    }
  })
})
```
## content-script 向 background 发送消息

`content-script.js`

```
 chrome.runtime.sendMessage(
    { greeting: '你好，我是content-script呀，我主动发消息给后台！' },
    function (response) {
      console.log('收到来自后台的回复：' + response)
    }
  )
```

`background.js`

```
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log('收到来自content-script的消息：')
  console.log(request, 1)
  console.log(sender, 2)
  console.log(sendResponse, 3)
  sendResponse('我是后台，我已收到你的消息：' + JSON.stringify(request))
})
```

## background 向content-script 发送消息

`background.js`

```
function getCurrentTabId(callback) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    if (callback) callback(tabs.length ? tabs[0].id : null)
  })
}

function sendMessageToContentScript(message, callback) {
  getCurrentTabId((tabId) => {
    chrome.tabs.sendMessage(tabId, message, function (response) {
      if (callback) callback(response)
    })
  })
}

sendMessageToContentScript('你好，我是bg！', (response) => {
  if (response) alert('收到来自content-script的回复：' + response)
})
```
`content-script.js`

```
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log('收到来自background的消息：')
  console.log(request, 1)
  console.log(sender, 2)
  console.log(sendResponse, 3)
  sendResponse('我是content-script，我已收到你的消息：' + JSON.stringify(request))
})
```

## popup.js 与 content-script.js建立长连接

`popup.js`

```
 chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    let port = chrome.tabs.connect(tabs[0].id, { name: 'from-popup' })
    port.postMessage({ joke: 'popup knock' })
    port.onMessage.addListener((msg) => {
      console.log(msg)
    })
  })
```

`content-script.js`

```
chrome.runtime.onConnect.addListener(function (port) {
  port.onMessage.addListener(function (msg) {
    if (port.name === 'from-popup') {
      if (msg.joke == 'popup knock') {
        port.postMessage({ question: "Who's there?" })
      }
    }
  })
})
```

## popup.js 向 content-script.js发送消息

`popup.js`

```
const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true
  })
const response = await chrome.tabs.sendMessage(tab.id, { greeting: 'hello' })
```

`content-script.js`

```
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log('收到来自popup的消息：')
  console.log(request, 1)
  console.log(sender, 2)
  console.log(sendResponse, 3)
  sendResponse(
    '我是content-script，我已收到你的消息：' + JSON.stringify(request)
  )
})
```

## mainfest.json

```
  {
  // Required - 通俗易懂
  "manifest_version": 3,
  "name": "My Extension",
  "version": "versionString",

   // 『重点』action配置项主要用于点击图标弹出框，对于弹出框接受的是html文件
  "action": {
     "default_title": "Click to view a popup",
   	 "default_popup": "popup.html"
   }
    
  // 通俗易懂
  "default_locale": "en",
  "description": "A plain text description",
  "icons": {...},
  "author": ...,

  // 『重点』下面将出现的background.js 配置service work
  "background": {
    // Required
    "service_worker": "service-worker.js",
  },

    // 『重点』下面将出现content_script.js 应用于所有页面上下文的js
  "content_scripts": [
     {
       "matches": ["https://*.nytimes.com/*"],
       "css": ["my-styles.css"],
       "js": ["content-script.js"]
     }
   ],

    // 使用/添加devtools中的功能
  "devtools_page": "devtools.html",


    /**
    * 三个permission
    * host_permissions - 允许使用扩展的域名
    * permissions - 包含已知字符串列表中的项目 【只需一次弹框要求允许】
    * optional_permissions - 与常规类似permissions，但由扩展的用户在运行时授予，而不是提前授予【安全】
    * 列出常见选项
    * {
    *		activeTab: 当扩展卡选项被改变需要重新获取新的权限
    *		tabs: 操作选项卡api（改变位置等）
    *		downloads: 访问chrome.downloads API 的权限 便于下载但还是会受到跨域影响
    *		history: history api权限
    *		storage: 访问localstorage/sessionStorage权限
    * }
    */
  "host_permissions": ["http://*/*", "https://*/*"],
  "permissions": ["tabs"],
  "optional_permissions": ["downloads"],

    // 内部弹出可选页面 - 见fehelper操作页
  "options_page": "options.html",
  "options_ui": {
    "chrome_style": true,
    "page": "options.html"
  },
}

```