/*erstellt ein Dialogfenster*/
DialogModal = React.createClass({
    propTypes: {
        name: React.PropTypes.string.isRequired
    },
    /*Zustand für das Anzeigen des Fensters*/
    getInitialState: function(){
        return{
            dialogVisible: false,
            active: false
        }
    },
    /*Nach der Erstellung der komponenten wird Dialogfenster initialisiert*/
    componentDidMount: function() {
        var modelDialog = this.refs.modalRef;
    },

    /*Funktion für Öffnen des Dialogfensters*/
    show: function(){
        this.setState({dialogVisible: true});
    },

    /*Funktion für Submit innerhalb des Dialogfensters*/
    submit: function(){
        this.props.buttonName.onClick();
        this.setState({dialogVisible: false});
    },

    /*Schließt das Dialogfenster*/
    close: function(){
        this.setState({dialogVisible: false});
    },
    /*rendert die Darstellung und überprüft, ob Dialogfenster angezeigt werden soll*/
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