Home = React.createClass({
  render() {
      console.log(this.props.team);
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
