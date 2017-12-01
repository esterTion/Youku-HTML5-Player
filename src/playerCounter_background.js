let playerCount = {};
const _t = function (s) { return chrome.i18n.getMessage(s) }
const badgeMessageReceiver = (message, sender) => {
  if (message.icon) {
    let id = sender.tab.id;
    chrome.browserAction.enable(id);
    switch (message.state) {
      case 'playing':
        playerCount[id].playing++;
        break;
      case 'pending':
        playerCount[id].pending++;
        break;
      case 'pending-dec':
        playerCount[id].pending--;
        break;
    }
    let titleStr = [];
    if (playerCount[id].pending != 0)
      titleStr.push(playerCount[id].pending + _t('iconPending'));
    if (playerCount[id].playing != 0)
      titleStr.push(playerCount[id].playing + _t('iconPlaying'));
    chrome.browserAction.setTitle({ title: titleStr.join('\n'), tabId: id });
    chrome.browserAction.setIcon({ path: 'icon.png', tabId: id });
  }
};
const tabUpdateReceiver = (id, changeInfo) => {
  if (changeInfo.status != 'loading')
    return;
  playerCount[id] = {
    playing: 0,
    pending: 0
  };
  chrome.browserAction.setTitle({ title: _t('iconIdle'), tabId: id });
  chrome.browserAction.setIcon({ path: 'icon_gray.png', tabId: id });
};
chrome.runtime.onMessage.addListener(badgeMessageReceiver)
chrome.tabs.onUpdated.addListener(tabUpdateReceiver);
chrome.tabs.onRemoved.addListener((id, removeInfo) => {
  delete playerCount[id];
});

//Run through every tab to set badge
chrome.tabs.query({}, (tabs) => (tabs.forEach(tab => {
  tabUpdateReceiver(tab.id, { status: 'loading' });
})));

chrome.browserAction.setBadgeText({ 'text': '' });

let extVersion, hasNewVersion = false;
fetch(chrome.extension.getURL('manifest.json')).then(
  function (r) {
    r.json().then(function (manifest) {
      extVersion = manifest.version;
    });
  }
);
function versionChecker() {
  fetch('https://estertion.github.io/Youku-HTML5-Player/firefox_ext_update.json', { cache: 'no-cache' }).then(function (r) {
    r.json().then(function (json) {
      let storeVer = json.addons['{579e2d44-4478-4d57-b2ac-e17831a37eae}'].updates[0].version;
      if (storeVer != extVersion) hasNewVersion = storeVer, chrome.browserAction.setBadgeText({ text: '1' });
    });
  });
}
chrome.alarms.onAlarm.addListener(versionChecker);
chrome.alarms.create(
  'versionChecker',
  {
    periodInMinutes: 120
  }
);
versionChecker();
