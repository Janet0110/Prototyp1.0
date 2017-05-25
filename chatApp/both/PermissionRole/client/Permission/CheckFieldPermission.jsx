CheckFieldPermission = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData(){
        var perm = Permissions.findOne({$and: [{_id: this.props.permission}, {"roles": this.props.role}]});
        var checked = "";
        if(perm){
            checked ="checked";
        }else{
            checked = "";
        }
        return {
            checked: checked
        }
    },
    render() {
        return (
            <input id={this.props.permission} type="checkbox" checked = {this.data.checked} onClick={this.handleChange.bind(this, this.props.permission, this.props.role)} name={this.props.role}><label checked= {this.data.checked} id={this.props.role}></label></input>
        )
    },
    handleChange: function(permission, role, e){
        var change;
        if(this.data.checked === "checked"){
                change="pull"
            }else{
                change="push"
            }
        Meteor.call('updatePermission', permission, role, change);
    }
});