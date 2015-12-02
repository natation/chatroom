(function(root) {
  'use strict';
  var _chatrooms = [];

  var CHANGE_EVENT = "CHANGE_EVENT";

  var resetChatrooms = function (chatRooms) {
    _chatrooms = chatRooms;
  };

  root.ChatroomStore = $.extend({}, EventEmitter.prototype, {
    all: function () {
      return _chatrooms.slice();
    },
    addChangeListener: function (callback) {
      ChatroomStore.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function (callback) {
      ChatroomStore.removeListener(CHANGE_EVENT, callback);
    },
    dispatcherId: AppDispatcher.register(function (payload) {
      switch (payload.actionType) {
        case MessageConstants.CHATROOMS_RECEIVED:
          resetChatrooms(payload.chatrooms);
          ChatroomStore.emit(CHANGE_EVENT);
          break;
      }
    })
  });
}(this));
