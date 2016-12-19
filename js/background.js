var forumUrl = 'https://www.tafasu.com/board';
var BoardFeed = "https://www.tafasu.com/board/index.php?action=.xml;type=atom";
if(!localStorage.lastBoardAlert){
  localStorage.lastBoardAlert = new Date();
}
var opt = {
    type: "basic",
    title: "Primary Title",
    message: "Primary message to display",
    iconUrl: "/img/tafasu.png",
    contextMessage: "www.tafasu.com",
    isClickable: true,
}

var BoardCheck = function(){
  $.get(BoardFeed,function(xml){
    if(!localStorage.isFetchBoard || localStorage.isFetchBoard == false){
      return;
    }
    var entry = $(xml).find("entry");
    var needUpdateDate = false;
    var localDate = new Date(localStorage.lastBoardAlert);
    $.each(entry,function(index,obj){
      var topicDate = new Date($(obj).find("updated").text());
      if(topicDate > localDate){
        var id = $(obj).find("id").text();
        opt.title = $(obj).find("title").text();
        opt.contextMessage = $(obj).find("name").text();
        opt.message = $(obj).find("summary").text();
        opt.message = $("<div>"+opt.message+"</div>").text();
        chrome.notifications.create(id,opt,function(){});
        needUpdateDate = true;
      }
    });
    if(needUpdateDate){
      localStorage.lastBoardAlert = new Date();
    }
  });
}

//chrome.notifications.create(forumUrl,opt);
chrome.notifications.onClicked.addListener(function(notificationId) {
  chrome.tabs.create({url: notificationId});
  chrome.notifications.clear(notificationId);
});

$(function() {
  BoardCheck();
  setInterval(BoardCheck,300000);
});
