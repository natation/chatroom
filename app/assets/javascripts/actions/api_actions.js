(function(root) {
  'use strict';
  root.ApiActions = {
    receiveAllChatrooms: function (chatrooms) {
      AppDispatcher.dispatch({
        actionType: ChatroomConstants.CHATROOMS_RECEIVED,
        chatrooms: chatrooms
      });
    },
  };
}(this));
