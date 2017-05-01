DialogModalPopUp = React.createClass({
    getInitialState: function(){
        return{
            dialogVisible: true
        }
    },
    show: function(){
        this.setState({dialogVisible: true});
    },
    submit: function(){
        this.props.buttonName.onClick();
        this.setState({dialogVisible: false});
    },
    close: function(){
        this.props.buttonName.close();
        this.setState({dialogVisible: false});
    },
    render: function(){
        return (
            <div>
                <div ref="modalRef" id="modal1" className={"modal popUp modelTest "+ (this.state.dialogVisible ? " block" : " none")}>
                    <div className="modal-content popUp">
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