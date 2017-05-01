DropDownMenuChild = React.createClass({

    handleClick: function(nameProp){
        this.props.onClick(nameProp);
    },

    render: function(){
        return (
            <a className="popup-button" onClick={this.handleClick.bind(this, this.props.onClick)}>
                <span>{this.props.nameButton}</span>
            </a>
        )
    }
});



