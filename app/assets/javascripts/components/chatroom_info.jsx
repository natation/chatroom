(function(root) {
  'use strict';
  root.ChatroomInfo = React.createClass({
    getInitialState: function() {
      return {chats: ChatStore.all()};
    },
    componentDidMount: function() {
      ChatStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function() {
      ChatStore.removeChangeListener(this._onChange);
    },
    _onChange: function() {
      this.setState({chats: ChatStore.all()});
    },
    render: function() {
      return (
        <div className="chatroom_info">
          {this.props.name}
        </div>
      );
    }
  });
}(this));
