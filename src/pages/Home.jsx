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
import MasterOption from './MasterOptions';

class Home extends React.Component {
  state = {
    master: [],
    isMaster: false,
    isAssociate: true,
    Teams: [],
    url : "https://kiranscrumapp.herokuapp.com",
    pin:'',
    userId:'',
    teamName:''
  };
  pin (newPin){
    if(newPin!=this.state.pin)
    this.setState({pin:newPin})
    }
    async componentDidMount() {
         await this.props.getUserActions.fetchLoggedInUser(this.props.match.params.username);
         if(this.props.loggedInUser.length === 0){
           this.setState({isMaster:true,isAssociate:false})
           await this.props.getUserActions.fetchLoggedInMaster(this.props.match.params.username)
           this.props.getUserActions.storeLoggedInUser(this.state.isMaster);
           this.setState({teamName:this.props.loggedInUser[0].teams[0].name});
         }else{
          this.props.getUserActions.storeLoggedInUser(this.state.isMaster);
          this.setState({teamName:this.props.loggedInUser[0].team.name,userId:this.props.loggedInUser[0].id});
         }

  }
  render() {
    var loggedInUserDetails=this.props.loggedInUser;
    var MasterOptions;
    var ShowMasterPin;
    var showIndivisualGraph;
    if (this.state.userId!='') {
      showIndivisualGraph =           <IonCard>
      <IonCardHeader>
        <IonCardTitle>My Graph</IonCardTitle>
      </IonCardHeader>

      <IonCardContent>
        <IndivisualGraph userId={this.state.userId} />
        </IonCardContent>
          </IonCard>
    }
    if (this.state.isMaster) {
      MasterOptions =<MasterOption username={this.props.match.params.username} newpin ={{pin : this.pin.bind(this)}}/>}
    else 
    {
      MasterOptions = <div><IonButton slot = "secondary" onClick={() => setShowAlert(true)} expand="block">Scrum Pin</IonButton>
        <ion-alert-controller></ion-alert-controller></div>
    }
      if (this.state.isMaster) { ShowMasterPin = <div style={{border: "1px solid black", backgroundColor:"lightgray",textAlignLast:"center"}}>
      <h6 >PIN : {this.state.pin}</h6>
    </div>};

    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Home page <div style={{float:"right"}}>  {MasterOptions}</div></IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonCard>
            <IonCardHeader>
            <IonCardTitle>{this.state.teamName}'s Graph</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
              <TeamScrumGraph  />
            </IonCardContent>
          </IonCard>

            {showIndivisualGraph}


        </IonContent>
{ShowMasterPin}
      </IonPage>
    );
  }
}

function mapStateToProps(state) {
  return {
    loggedInUser: state.loggedInUser,
    loggedInUserFlag:state.loggedInUserFlag
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