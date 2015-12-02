(function(root) {
  'use strict';
  var _chatrooms = [];

  var CHANGE_EVENT = "CHANGE_EVENT";

  var resetChatrooms = function (chatRooms) {
    _chatrooms = chatRooms;
  };

  root.ChatStore = $.extend({}, EventEmitter.prototype, {
    all: function () {
      return _chatrooms.slice();
    },
    addChangeListener: function (callback) {
      ChatStore.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function (callback) {
      ChatStore.removeListener(CHANGE_EVENT, callback);
    },
    // dispatcherId: AppDispatcher.register(function (payload) {
    //   switch (payload.actionType) {
    //     case ChatroomConstants.CHATROOMS_RECEIVED:
    //       resetChatrooms(payload.chatrooms);
    //       ChatroomStore.emit(CHANGE_EVENT);
    //       break;
    //   }
    // })
  });
}(this));
