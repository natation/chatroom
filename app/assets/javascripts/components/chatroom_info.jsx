(function(root) {
  'use strict';
  var Link = ReactRouter.Link;

  root.ChatroomInfo = React.createClass({
    getInitialState: function() {
      return {info: ChatStore.getInfo(this.props.id)};
    },
    componentDidMount: function() {
      ChatStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function() {
      ChatStore.removeChangeListener(this._onChange);
    },
    _onChange: function() {
      this.setState({info: ChatStore.getInfo(this.props.id)});
    },
    render: function() {
      var url = "/chatroom/" + this.props.id;
      var unreadCount = this.state.info.unreadCount || 0;
      var footer = "";
      if (this.state.info.unreadCount) {
        footer = <ul>
                   <li>Last message by: {this.state.info.lastMessageUser}</li>
                   <li>Last message: {this.state.info.lastMessage}</li>
                 </ul>;
      }
      return (
        <div className="chatroom_info">
          <Link to={url}>{this.props.name}</Link>
          <span className="badge badge-important">{unreadCount}</span>
          {footer}
        </div>
      );
    }
  });
}(this));
