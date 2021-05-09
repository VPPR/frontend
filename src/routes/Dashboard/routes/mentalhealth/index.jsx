import React from 'react';
import {Grid, Paper, Typography, Card, CardContent, CardHeader} from '@material-ui/core';
import {CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { fetchScore } from "redux/phq/action";
import { connect } from 'react-redux';

class MentalHealth extends React.Component 
{
  constructor(props)
  {
    super(props);
    this.state={
    };
  }

  componentDidMount(){
    this.props.fetchScore();
  }

  render() {
    const percentage=69;
      return (
          <>
          <Paper component={Grid} container alignContent="center" style={{height:"12%", padding:"10px"}}>
              <Typography variant="h5">Health Report</Typography>
              <Typography>PHQScore:{this.props.PHQScore?.score}</Typography>
              <Typography></Typography>
          </Paper>
          <Grid container>
              <Grid item sm={4} style={{paddingTop:"10px"}}>
              <Card variant="elevation">
                  <CardHeader title="PHQ Score"></CardHeader>
                  <CardContent>
                  <div style={{width:150, height:150}}>
                  <CircularProgressbar maxValue={27} value={this.props.PHQScore?.score} text={`${this.props.PHQScore?.score}/27`}></CircularProgressbar>
                  </div>
                  </CardContent>
              </Card>
              </Grid>
              <Grid item sm={4} style={{padding:"10px"}}>
              <Card variant="elevation">
              <CardHeader title="Sleep Statistics"></CardHeader>
              <CardContent>
                <div style={{width:150, height:150}}>
                  <CircularProgressbar value={percentage} text={`${percentage}%`}></CircularProgressbar>
                  </div>
                </CardContent> 
                </Card>
              </Grid>
                  <Grid item sm={4} style={{paddingTop:"10px"}}>
                  <Card variant="elevation">
                      <CardHeader title="Calories"></CardHeader>
                      <CardContent>
                      <div style={{width:150, height:150}}>
                      <CircularProgressbar value={percentage} text={`${percentage}%`}></CircularProgressbar>
                      </div>
                      </CardContent>
                  </Card>
              </Grid>
          </Grid>
          </>
      );
  }
}

const mapStateToProps = (state) => ({
  PHQScore:state.phq.score,
});

export default connect(mapStateToProps,{fetchScore})(MentalHealth);