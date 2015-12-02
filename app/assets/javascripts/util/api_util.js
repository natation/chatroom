(function(root) {
  'use strict';
  root.ApiUtil = {
    fetchAllChatrooms: function() {
      $.ajax({
        url: "/api/chatrooms/",
        type: "GET",
        dataType: "json",
        success: function (chatRooms) {
          ApiActions.receiveAllChatrooms(chatRooms);
        }
      });
    }
  };
}(this));
