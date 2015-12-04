(function(root) {
  'use strict';
  var Link = ReactRouter.Link;
  var EMOTICONS = ["😀", "😬", "😁", "😂", "😃", "😄",
                   "😅", "😆", "😇", "😉", "😋", "😌"];

  root.Chatroom = React.createClass({
    mixins: [React.addons.LinkedStateMixin],
    getInitialState: function() {
      return {chatrooms: ChatroomStore.all(),
              chats: ChatStore.all(this.props.params.id),
              socket: new WebSocket("ws://" + window.location.host + "/chat"),
              message: "",
              name: ""};
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
        name: this.state.name || "anonymous",
        message: this.state.message,
        chatroom_id: this.props.params.id
      };
      this.state.socket.send(JSON.stringify(message));
    },
    _handleClick: function(e) {
      e.preventDefault();
      this.setState({message: this.state.message + e.target.textContent});
    },
    render: function() {
      var chatroom = this.state.chatrooms[this.props.params.id - 1];
      return (
        <div className="col-xs-offset-3 col-xs-3">
          <div className="row chatroom">
            <h3>{chatroom} Chatroom</h3>
            <label>Your name</label>
            <input className="form-control" type="text"
                   placeholder="Type in your name here" valueLink={this.linkState("name")}/>
            <h4>Messages</h4>
            <ul className="chats">
              {
                this.state.chats.map(function(chat, i) {
                  return <li key={i}><strong>{chat.name}</strong>: {chat.message} </li>;
                })
              }
            </ul>
            <form className="chat-input" onSubmit={this._handleSubmit}>
              <label>Type message (then press enter)</label>
              <input className="form-control" type="text" valueLink={this.linkState("message")}/>
            </form>
          </div>
          <div className="row emoticon-group">
            {
              EMOTICONS.map(function(emoticon, i) {
                return <button key={i} className="emoticon btn"
                        onClick={this._handleClick}>{emoticon}</button>;
              }, this)
            }
          </div>
          <div className="row">
              <Link to="/" className="btn btn-warning">Back to all chatrooms</Link>
          </div>
        </div>
      );
    }
  });
}(this));
