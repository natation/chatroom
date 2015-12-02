$(function() {
  'use strict';
  var root = document.getElementById('mainContent');
  if (!root) {
    return;
  }
  var Chatrooms = React.createClass({
    getInitialState: function() {
      return {chatrooms: ChatroomStore.all()};
    },
    componentDidMount: function() {
      ChatroomStore.addChangeListener(this._onChange);
      ApiUtil.fetchAllChatrooms();
    },
    componentWillUnmount: function() {
      ChatStore.removeChangeListener();
    },
    _onChange: function() {
      this.setState({chatrooms: ChatroomStore.all()});
    },
    render: function() {
      return (
        <div className="chatrooms">
          {
            this.state.chatrooms.map(function(chatroom, i) {
              return <div className="row" key={i}>
                       <Chatroom name={chatroom}/>
                     </div>;
            })
          }
        </div>
      );
    }
  });

  React.render(<Chatrooms/>, root);
});
