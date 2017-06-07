Dropdown = React.createClass({
   /*Zustand für die Sichtbarkeit des Dropdown-Menüs*/
    getInitialState: function(){
       return{
           listVisible: false
       }
   },
    /*Funktion für das Selektieren eines Menü-Unterpunktes*/
    select: function(item){
        this.props.selected = item;
    },
    /*Funktion für das Öffnen des Dropdown-Meüns. Fügt dem document einen Event-Listener für den Klick außerhalb des Menüs, um das Dropdown-Menü zu schließen, hinzu*/
    show: function(){
        this.setState({listVisible: true});
        document.addEventListener('click', this.hide);
    },

    /*Funktion für das Schließen des Dropdown-Menüs*/
    hide: function(){
        this.setState({listVisible: false});
        document.removeEventListener('click', this.hide);
    },

    /*rendert die Darstellung mit den Menü-Unterpunkten*/
    render: function(){
        return (
            <div id="dialog-buttons" className="dialog-buttons-dropdown-align dropdown-container" >
                <a className="popup-link-button" onClick={this.show}>
                    {this.props.name} ▾
                </a>
                <div className={"popup-dialog" + (this.state.listVisible ? " block" : " none")} >
                    {this.renderListItems()}
                </div>
            </div>
        )
    },

    /*iteriert Liste von Menüpunkten, für das Anzeigen dieser*/
    renderListItems: function(){
        var items = [];
        for(var i = 0; i < this.props.list.length; i++){
            var item = this.props.list[i];
            items.push(<a className="popup-button" onClick={item.onClick}>
            <span>{item.name}</span>
                </a>);
        }
        return items;
        }
});



