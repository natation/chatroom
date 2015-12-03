(function(root) {
  'use strict';
  var _unreadChats = {};
      // _readChats = {};

  var CHANGE_EVENT = "CHANGE_EVENT";

  var setChat = function (chat) {
    var id = chat.chatroom;
    if (typeof _unreadChats[id] == "undefined") {
      _unreadChats[id] = [chat];
      // _readChats[id] = [];
    } else {
      _unreadChats[id].push(chat);
    }
  };

  root.ChatStore = $.extend({}, EventEmitter.prototype, {
    all: function (id) {
      var unreadChats = _unreadChats[id];
      _unreadChats[id] = [];
      return unreadChats;
    },
    addChangeListener: function (callback) {
      ChatStore.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function (callback) {
      ChatStore.removeListener(CHANGE_EVENT, callback);
    },
    dispatcherId: AppDispatcher.register(function (payload) {
      switch (payload.actionType) {
        case ChatConstants.CHAT_RECEIVED:
          setChats(payload.chats);
          ChatroomStore.emit(CHANGE_EVENT);
          break;
      }
    })
  });
}(this));
