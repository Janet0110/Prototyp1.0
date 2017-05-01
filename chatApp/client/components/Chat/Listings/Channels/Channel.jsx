Channel = React.createClass({
    getInitialState: function(){
        return{
            private: this.props.doc.private
        }
    },
    render(){
        return(
            <li className="channel">
                <a className="channel_name" href={this.props.doc.name}>
                    <span>{this.props.doc.name}</span>
                </a>
                <div className={"channel " + (this.props.doc.private ? "private" : "")}></div>
            </li>
        )
    }
});