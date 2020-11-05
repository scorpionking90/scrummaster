import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonButton } from '@ionic/react';
import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import store from '../store/store.js'
import * as getUserActions from '../actions/getUserActions';
import IndivisualGraph from '../pages/IndivisualGraph.jsx';
import TeamScrumGraph from '../pages/TeamScrumGraph.jsx';
import './Home.css';

class Home extends React.Component {
  componentDidMount() {
    this.props.getUserActions.fetchLoggedInUser(this.props.match.params.username);
  }
  render() {
    // console.log(this.props.match.params.username);
    var teamName = "";
    var userId=0;
    if(store.getState().loggedInUser[0] !== undefined){
      teamName = store.getState().loggedInUser[0].team.name;
      // userId = this.props.loggedInUser[0].id;
    }
    if(this.props.loggedInUser[0] !== undefined){
      userId = this.props.loggedInUser[0].id;
    }
    if (userId === 0 || teamName === "") return null;

    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Home page</IonTitle>
            <IonButton slot = "secondary" onClick={() => setShowAlert(true)} expand="block">Scrum Pin</IonButton>
            <ion-alert-controller></ion-alert-controller>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>{teamName}'s Graph</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
              <TeamScrumGraph  />
            </IonCardContent>
          </IonCard>
          <IonCard>
            <IonCardHeader>
              {/* <IonCardSubtitle>Card Subtitle</IonCardSubtitle> */}
              <IonCardTitle>My Graph</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
              <IndivisualGraph userId={userId} />
            </IonCardContent>
          </IonCard>

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
    loggedInUser: state.loggedInUser,
  }
}
function mapDispatchToProps(dispatch) {
  return {
    getUserActions: bindActionCreators(getUserActions, dispatch),
  }
}
function setShowAlert() {
  const alert = document.createElement('ion-alert');
  alert.cssClass = 'my-custom-class';
  alert.header = 'SCRUM PIN';
  alert.inputs = [
    {
      name: 'Pin',
      type: 'text',
      placeholder: 'Please enter the Scrum PIN'
    },
  ];
  alert.buttons = [
    {
      text: 'Cancel',
      role: 'cancel',
      cssClass: 'secondary',
      handler: () => {
        console.log('Confirm Cancel')
      }
    }, {
      text: 'Ok',
      handler: (alertData) => {
        console.log('Confirm Ok ' + alertData.Pin)
      }
    }
  ];

  document.body.appendChild(alert);
  return alert.present();
}


export default connect(mapStateToProps, mapDispatchToProps)(Home)