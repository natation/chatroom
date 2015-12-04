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
      ChatroomStore.removeChangeListener(this._onChange);
    },
    _onChange: function() {
      this.setState({chatrooms: ChatroomStore.all()});
    },
    render: function() {
      return (
        <div className="row chatrooms">
          <div className="col-xs-offset-3 col-xs-3">
            <h1>Chatrooms</h1>
            {
              this.state.chatrooms.map(function(chatroom, i) {
                return <div className="row" key={i}>
                         <ChatroomInfo name={chatroom} id={i + 1}/>
                       </div>;
              })
            }
          </div>
        </div>
      );
    }
  });
})(this);
