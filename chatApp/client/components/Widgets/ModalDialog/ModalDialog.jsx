DialogModal = React.createClass({
    propTypes: {
        name: React.PropTypes.string.isRequired
    },
    getInitialState: function(){
        return{
            dialogVisible: false,
            active: false
        }
    },
    componentDidMount: function() {
        var modelDialog = this.refs.modalRef;
    },

    show: function(){
        this.setState({dialogVisible: true});
    },
    submit: function(){
        this.props.buttonName.onClick();
        this.setState({dialogVisible: false});
    },
    close: function(){
        this.setState({dialogVisible: false});
    },
    render: function(){
        if(this.props.active === "visible"){
            this.setState({
                active: true
            })
        }
        return (
            <div>
                <div onClick={this.show}> {this.props.buttonType}</div>
                <div ref="modalRef" id="modal1" className={"modal modelTest "+ (this.state.dialogVisible ? " block" : " none")}>
                    <div className="modal-content">
                        <h4>{this.props.header}</h4>
                        <p>{this.props.content}</p>
                    </div>
                    <div className="modal-footer">
                        <a href="" className=" modal-action modal-close waves-effect waves-green btn-flat" onClick={this.submit}>{this.props.buttonName.name}</a>
                        <a href="" className=" modal-action modal-close waves-effect waves-green btn-flat" onClick={this.close}>Cancel</a>
                    </div>
                </div>
            </div>
        )
    }
});