import Header from 'components/Header';
import React from 'react';
import {Grid, withStyles} from '@material-ui/core'
import { withRouter } from 'react-router-dom';
import {connect } from 'react-redux';

const style=theme=> ({
    fullScreen:{
        minHeight:"100vh",
        minWidth:"100vw"
      }
})

class Dashboard extends React.Component {
    constructor(props){
        super(props);
        this.state={

        }
    }

    render () {
        const {classes}=this.props
        return(
            <Grid item container className={classes.fullScreen}>
                <Header/>
            </Grid>
        )
    }

}

export default withRouter( withStyles(style)( connect()( Dashboard)))