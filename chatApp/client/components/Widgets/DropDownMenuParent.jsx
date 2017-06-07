/*Andere Implementierung für das Dropdown-Menü (Eigenversuch)*/
DropdownMenuParent = React.createClass({
   /*Zustand für das Anzeigen des Dropdown-Menüs*/
    getInitialState: function(){
       return{
           listVisible: false
       }
   },
    /*Funktion, um einen Menü-Unterpunkt zu selektieren*/
    select: function(item){
        this.props.selected = item;
    },
    /*Funktion für das Aufzeigen des Dropdown-Menüs*/
    show: function(){
        this.setState({listVisible: true});
        document.addEventListener('click', this.hide);
    },
    /*Funktion für das Schließen des Dropdown-Menüs. Fügt EventListenen für den Klick außerhalb des Menüs, für das Schließen, hinzu*/
    hide: function(){
        this.setState({listVisible: false});
        document.removeEventListener('click', this.hide);
    },

    /*rendert Darstellung und führt ein Map auf die erstellten Children-Komponente innerhalb diser Parent-Komponente hinzu --> Verwendung in ListingsTools*/
    render: function(){
        const childrenWithProps = React.Children.map(this.props.children,
            (child) => React.cloneElement(child, {
                ...this.props
            })
        );

        return (
            <div id="dialog-buttons" className="dialog-buttons-dropdown-align dropdown-container" >
                <a className="popup-link-button" onClick={this.show}>
                    {this.props.name} ▾
                </a>
                <div className={"popup-dialog" + (this.state.listVisible ? " block" : " none")} >
                    {childrenWithProps}
                </div>
            </div>
        )
    }
});



