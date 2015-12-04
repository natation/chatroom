(function(root) {
  'use strict';
  var _unreadChats = {};
  var socket = new WebSocket("ws://" + window.location.host + "/chat");

  socket.onmessage = function(e) {
    var message = JSON.parse(e.data);
    setChat(message);
    ChatStore.emit(CHANGE_EVENT);
  };

  var CHANGE_EVENT = "CHANGE_EVENT";

  var setChat = function (message) {
    var id = message.chatroom_id;

    if (typeof _unreadChats[id] === "undefined") {
      _unreadChats[id] = [message];
    } else {
      _unreadChats[id].push(message);
    }
  };

  root.ChatStore = $.extend({}, EventEmitter.prototype, {
    all: function (id) {
      var unreadChats = typeof _unreadChats[id] === "undefined" ? [] : _unreadChats[id];
      _unreadChats[id] = [];
      return unreadChats;
    },
    getInfo: function (id) {
      var chats = _unreadChats[id];
      if (typeof chats === "undefined" || chats.length === 0) {
        return {};
      } else {
        return {unreadCount: chats.length,
                lastMessageUser: chats[chats.length - 1].name,
                lastMessage: chats[chats.length - 1].message};
      }
    },
    addChangeListener: function (callback) {
      ChatStore.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function (callback) {
      ChatStore.removeListener(CHANGE_EVENT, callback);
    }
  });
}(this));
