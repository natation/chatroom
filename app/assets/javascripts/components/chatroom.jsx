(function(root) {
  'use strict';
  root.Chatroom = React.createClass({
    getInitialState: function() {
      return {chats: ChatStore.all()};
    },
    componentDidMount: function() {
      ChatStore.addChangeListener();
    },
    componentWillUnmount: function() {
      ChatStore.removeChangeListener();
    },
    _onChange: function() {
      this.setState({chats: ChatStore.all()});
    },
    render: function() {
      return (
        <div className="chatrooms">
          {
            this.state.chatrooms.map(function(chatroom) {
              return <div className="row">
                       <Chatroom name={chatroom}/>
                     </div>;
            })
          }
        </div>
      );
    }
  });
}(this));
