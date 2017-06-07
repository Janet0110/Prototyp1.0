DropDownMenuChild = React.createClass({
    /*bindet das Click-Event an Element*/
    handleClick: function(nameProp){
        this.props.onClick(nameProp);
    },

    /*rendert Menüpunkt im Dropdown-Menü*/
    render: function(){
        return (
            <a className="popup-button" onClick={this.handleClick.bind(this, this.props.onClick)}>
                <span>{this.props.nameButton}</span>
            </a>
        )
    }
});



