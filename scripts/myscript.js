

var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
var port = chrome.extension.connect();

// 选择目标节点
var target = document.querySelector('#bofqi');
var danmakuBtn = ".bilibili-player-video-btn-danmaku";
var con2 = false;
var observer;

function closeDanmaku() {
  var par = target.firstChild.tagName == "IFRAME" ? document.querySelector('.player').contentWindow.document : document;
  var event = new MouseEvent('click', {
    'view': window,
    'bubbles': true,
    'cancelable': true
  })
    , ele = par.querySelector('.bilibili-player-video-btn-danmaku');
  setTimeout(function () {
    ele.dispatchEvent(event);
  }, 300);
  // var offed = -1 != ele.getAttribute("class").split(" ").indexOf("video-state-danmaku-off");
  chrome.extension.sendRequest({ greeting: "hello" }, function (response) {
  });
}

// 创建观察者对象
observer = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    mutation.removedNodes.forEach(function (node) {
      var removedLoadWrap = node.nodeType == 1 && node.hasAttribute("class") && -1 != node.getAttribute("class").split(" ").indexOf("bilibili-player-video-load-wrap");
      if (removedLoadWrap) {
        con2 = true;
      }
    })
  });

  if (con2) {
    observer.disconnect();

    closeDanmaku();
  }
});

function onPageChanged() {
  con2 = false;
  observer.observe(target, config);
}

function closeAndDisconnect() {
  closeDanmaku()
  observer.disconnect();
}

$(document).on("click", ".episode-item,.bilibili-player-video-toast-item-jump", closeAndDisconnect);
// 配置观察选项:
var config = { childList: true, characterData: true, subtree: true }

observer.observe(target, config);

window.addEventListener("hashchange", onPageChanged, false);
