import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { Carousel } from 'antd';
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import store from '../store/store.js'
import * as ScrumPointActions from '../actions/ScrumPointsActions'
import * as TeamsActions from '../actions/TeamsActions'
import { List, Typography,Empty } from 'antd';
import moment from 'moment'
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
         teamScrumPoints:''
      }
    }
   componentDidMount() {
    var loggedInTeam=store.getState().loggedInUser[0].team.id;
    this.setState({
      loggedInUserTeam: loggedInTeam
  }, async() => {
    await this.props.TeamsActions.getLogInUserTeam(this.state.loggedInUserTeam);
   this.getScrumPoints(this.props.team);

  });
    
  }
  getScrumPoints=(teams)=>{
    var scrumPoint=[];
    teams.forEach(async (oneTeam) => {
      var eachAssociate = {
        points: null,
        name: null,
        id: null,
    };
    eachAssociate.name =oneTeam.name;
    eachAssociate.id = oneTeam.id;
      await this.props.ScrumPointActions.getScrumPoints(oneTeam.id);
      var scrumPoints=this.props.scrumPoints;
      var memberPoints = 0;
         for (var eachPoint = 0; eachPoint < scrumPoints.length; eachPoint++) {
                 var today = scrumPoints[eachPoint].created_at;
                 if (moment().format("MM") === moment(today).format("MM"))
                 memberPoints += parseInt(scrumPoints[eachPoint].point);
         }
         eachAssociate.points = memberPoints;
         scrumPoint.push(eachAssociate);
         this.setState({teamScrumPoints:scrumPoint})
      })

  }
  render() {
    // console.log(this.state.teamScrumPoints);
   return (
     <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Scrum points</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      {(this.state.teamScrumPoints != '' && this.state.teamScrumPoints.length !=0)
      ? 
      <List
      size="large">
      {this.state.teamScrumPoints.map(scrumPoints=>{
        return(
           <List.Item key={scrumPoints.id}>
            <Typography.Text>{scrumPoints.name}</Typography.Text>
            <Typography.Text>{scrumPoints.points}</Typography.Text>
          </List.Item>
          
        )
      }
        
      )
      }
    </List>:<Empty/>
    }
    
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
    TeamsActions:bindActionCreators(TeamsActions, dispatch)

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScrumPoints)