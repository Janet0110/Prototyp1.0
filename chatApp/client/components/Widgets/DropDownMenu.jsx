Dropdown = React.createClass({
   getInitialState: function(){
       return{
           listVisible: false
       }
   },
    select: function(item){
        this.props.selected = item;
    },

    show: function(){
        this.setState({listVisible: true});
        document.addEventListener('click', this.hide);
    },

    hide: function(){
        this.setState({listVisible: false});
        document.removeEventListener('click', this.hide);
    },

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



