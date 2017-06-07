AdminLayout = React.createClass({
    /*Admin-Layout für Permission und Role_page*/
    render() {
        return(
        <main>
            {this.props.header}
            {this.props.content}
        </main>
        )
    }
});