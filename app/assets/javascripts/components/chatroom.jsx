(function(root) {
  'use strict';
  root.Chatroom = React.createClass({
    getInitialState: function() {
      return {chats: ChatStore.all(this.props.params.id)};
    },
    componentDidMount: function() {
      ChatStore.addChangeListener(this._onChatChange);
    },
    componentWillUnmount: function() {
      ChatStore.removeChangeListener(this._onChatChange);
    },
    _onChatroomChange: function() {
      this.setState({chatrooms: ChatroomStore.all()});
    },
    _onChatChange: function() {
      this.setState({chats: this.state.chats.concat(ChatroomStore.all(this.props.params.id))});
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
        </div>
      );
    }
  });
}(this));
