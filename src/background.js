(function(chrome, undefined) {
  'use strict';

  function inspectMessage(msg) {
    if(!msg){
      return '';
    }
    return '名称：' + msg.title + '\n评分：' + msg.rating + ' 分 (' + msg.count + '人次)';
  }

  /**
   * message handler
   * @param  {Object} msg      {title, rating, count}
   * @param  {MessageSender} sender
   * @param  {Function} response
   */
  function onMessageReceived(msg, sender, response) {

    if(!msg || msg == {}){
      chrome.pageAction.hide(sender.tab.id);
      return;
    }

    var rating = parseInt(msg.rating, 10) || 0;
    var icon = 'images/rating-'+ rating +'.png'

    chrome.pageAction.setIcon({tabId: sender.tab.id, path: icon});
    chrome.pageAction.setTitle({tabId: sender.tab.id, title: inspectMessage(msg)});
    chrome.pageAction.show(sender.tab.id);
  }

  chrome.runtime.onMessage.addListener(onMessageReceived);

}(chrome));
