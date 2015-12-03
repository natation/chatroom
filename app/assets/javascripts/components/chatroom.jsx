(function(root) {
  'use strict';
  root.Chatroom = React.createClass({
    mixins: [React.addons.LinkedStateMixin],
    getInitialState: function() {
      return {chats: ChatStore.all(this.props.params.id),
              socket: new WebSocket("ws://" + window.location.host + "/chat"),
              message: "",
              name: ""};
    },
    componentDidMount: function() {
      ChatStore.addChangeListener(this._onChatChange);
    },
    componentWillUnmount: function() {
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
      return (
        <div className="chatRoom">
          <ul className="chats">
            {
              this.state.chats.map(function(chat, i) {
                return <li key={i}>{chat.name}: {chat.message} </li>;
              })
            }
          </ul>
          <form className="chatInput" onSubmit={this._handleSubmit}>
            <input type="text" valueLink={this.linkState("message")}/>
          </form>
        </div>
      );
    }
  });
}(this));
