import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { Carousel } from 'antd';
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import store from '../store/store.js'
import * as ScrumPointActions from '../actions/ScrumPointsActions'
import { List, Typography } from 'antd';
// import MyTypes from 'MyTypes';
import './Home.css';
import {
  Form
} from 'antd';

class ScrumPoints extends React.Component {
  constructor(props){
    super(props);
      this.state={
         loggedInUserTeam:0,
      }
    }
  onChange = () => {

  }
  componentDidMount() {
    var loggedInTeam=store.getState().loggedInUser[0].team.id;
    this.setState({
      loggedInUserTeam: loggedInTeam
  }, () => {
    this.props.ScrumPointActions.getLogInUserTeam(this.state.loggedInUserTeam);
    this.props.ScrumPointActions.getScrumPoints();
  });
    
  }
  render() {
    console.log(this.props);
   return (
     <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Scrum points</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      <List
      size="large">
      {this.props.scrumPoints.map(scrumPoints=>
        (
          <List.Item key={scrumPoints.id}>
          <Typography.Text>{scrumPoints.associate.name}</Typography.Text>
          <Typography.Text>{scrumPoints.point}</Typography.Text>
        </List.Item>
        )
      )
      }
    </List>
    
      </IonContent>
    </IonPage>
    );
  }
}
// Home.propTypes = {
//   userList: PropTypes.array,
// }
function mapStateToProps(state) {
  return {
    scrumPoints: state.scrumPoints,
    team:state.team
  }
}
function mapDispatchToProps(dispatch) {
  return {
    ScrumPointActions: bindActionCreators(ScrumPointActions, dispatch),

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScrumPoints)