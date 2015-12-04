(function(root) {
  'use strict';
  var Link = ReactRouter.Link;
  var emoticons = ["😀", "😬", "😁", "😂", "😃", "😄", "😅",
                   "😆", "😇", "😉", "😋", "😌", "😜", "😛"];

  root.Chatroom = React.createClass({
    mixins: [React.addons.LinkedStateMixin],
    getInitialState: function() {
      return {chatrooms: ChatroomStore.all(),
              chats: ChatStore.all(this.props.params.id),
              socket: new WebSocket("ws://" + window.location.host + "/chat"),
              message: "",
              name: "anonymous"};
    },
    componentDidMount: function() {
      ChatroomStore.addChangeListener(this._onChatroomChange);
      ChatStore.addChangeListener(this._onChatChange);
      ApiUtil.fetchAllChatrooms();
    },
    componentWillUnmount: function() {
      ChatroomStore.removeChangeListener(this._onChatroomChange);
      ChatStore.removeChangeListener(this._onChatChange);
      this.state.socket.close();
    },
    _onChatroomChange: function() {
      this.setState({chatrooms: ChatroomStore.all()});
    },
    _onChatChange: function() {
      var chats = this.state.chats.concat(ChatStore.all(this.props.params.id));
      if (chats.length > 0) {
        this.setState({chats: chats});
      }
    },
    _handleSubmit: function(e) {
      e.preventDefault();
      var message = {
        name: this.state.name,
        message: this.state.message,
        chatroom_id: this.props.params.id
      };
      this.state.socket.send(JSON.stringify(message));
    },
    render: function() {
      var chatroom = this.state.chatrooms[this.props.params.id - 1];
      return (
        <div className="col-xs-offset-3 col-xs-3">
          <div className="row chatRoom">
            <h1>{chatroom} Chatroom</h1>
            <label>Your name</label>
            <input className="form-control" type="text" valueLink={this.linkState("name")}/>
            <h3>Messages</h3>
            <ul className="chats">
              {
                this.state.chats.map(function(chat, i) {
                  return <li key={i}>{chat.name}: {chat.message} </li>;
                })
              }
            </ul>
            <form className="chatInput" onSubmit={this._handleSubmit}>
              <label>Type message (then press enter)</label>
              <input className="form-control" type="text" valueLink={this.linkState("message")}/>
            </form>
          </div>
          <div className="row">
            <div className="btn-toolbar">
              <div className="btn-group">
                {
                  emoticons.map(function(emoticon, i) {
                    return <button key={i} className="emoticon">{emoticon}</button>;
                  })
                }
              </div>
            </div>
          </div>
          <div className="row">
            <Link to="/">Back to all chatrooms</Link>
          </div>
        </div>
      );
    }
  });
}(this));
