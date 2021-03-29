import React from 'react';
import {connect} from 'react-redux';

import {fetchUser} from 'redux/users/action'
class UserModal extends React.Component {
    constructor (props) {
        super(props);
        this.state={

        }
    }
    render (){
        return null;
    }


}

const mapStateToProps  = (state) => ({
    selectedUser: state.users.selecteduser,
    errorMessage: state.user.errorMessage
});

export default connect()(UserModal);