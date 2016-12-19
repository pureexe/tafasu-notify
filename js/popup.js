var initalizeView = function(){
  if(!localStorage.isFetchBoard || localStorage.isFetchBoard == false){
    $("#switch-webboard").prop('checked', false);
  }else{
    $("#switch-webboard").prop('checked', true);
  }
}
$(function() {
  $("#open-option").click(function (){
    chrome.tabs.create({ url: "chrome-extension://"+chrome.runtime.id+"/options.html" }, function(){

    }) ;
  });
  initalizeView();
  $("#switch-webboard").change(function() {
      if(this.checked){
        localStorage.isFetchBoard = true;
        localStorage.lastBoardAlert = new Date();
      }else{
        localStorage.isFetchBoard = false;
      }
  });
});
