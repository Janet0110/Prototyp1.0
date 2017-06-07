MainLayout = React.createClass({
    /*Layout für Chat*/
  render() {
    return (
      <div>
        <Header {...this.props}/>
        {this.props.sidebar}
        <main>{this.props.content}</main>
        <ChannelSidebar/>
        <Footer />
      </div>
    );
  }
});
