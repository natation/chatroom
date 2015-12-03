(function(root) {
  'use strict';
  root.Index = React.createClass({
    getInitialState: function() {
      return {chatrooms: ChatroomStore.all()};
    },
    componentDidMount: function() {
      ChatroomStore.addChangeListener(this._onChange);
      ApiUtil.fetchAllChatrooms();
    },
    componentWillUnmount: function() {
      ChatStore.removeChangeListener(this._onChange);
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
                       <ChatroomInfo name={chatroom} id={i + 1}/>
                     </div>;
            })
          }
        </div>
      );
    }
  });
})(this);
