(function(root) {
  'use strict';
  root.ApiUtil = {
    fetchAllChatrooms: function() {
      $.ajax({
        url: "/chatrooms/",
        type: "GET",
        dataType: "json",
        data: {json: true},
        success: function (chatRooms) {
          ApiActions.receiveAllChatRooms(chatRooms);
        }
      });
    }
  };
}(this));
