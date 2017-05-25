MainLayout = React.createClass({
  render() {
    return (
      <div>
        <Header {...this.props}/>
        {this.props.sidebar}
        <main>{this.props.content}</main>
        <ChannelSidebar/>

      </div>
    );
  }
});
