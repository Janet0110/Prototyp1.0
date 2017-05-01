DropdownMenuParent = React.createClass({
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



