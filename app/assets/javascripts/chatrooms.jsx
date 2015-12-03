$(function() {
  'use strict';
  var root = document.getElementById('mainContent');
  if (!root) {
    return;
  }

  var Router = ReactRouter.Router;
  var Route = ReactRouter.Route;

  var Chatrooms = React.createClass({
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
                       <ChatroomInfo name={chatroom}/>
                     </div>;
            })
          }
        </div>
      );
    }
  });

  var routes = (
    <Route path="/" component={Chatrooms}>
      <Route path="chatroom/:id" component={Chatroom}/>
    </Route>
  );
  React.render(<Router>{routes}</Router>, root);
});
