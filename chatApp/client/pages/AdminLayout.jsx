AdminLayout = React.createClass({
    render() {
        return(
        <main>
            {this.props.header}
            {this.props.content}
        </main>
        )
    }
});