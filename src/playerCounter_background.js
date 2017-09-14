let playerCount = {};
const _t = function (s) { return chrome.i18n.getMessage(s) }
const badgeMessageReceiver = (message, sender) => {
  let id = sender.tab.id;
  if (message.icon) {
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
