Home = React.createClass({
  render() {
    return (
      <div>
          <Header {...this.props}/>
          <Listings {...this.props}/>
          <Messages {...this.props}/>
          <Footer {...this.props}/>
      </div>
    );
  }
});
