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
      this.props.getUserActions.fetchLoggedInUser(this.props.match.params.username);
      let response = await fetch(this.state.url+"/Masters");
      let master = await response.json()
      this.setState({ master: master})
      for (const [id, name] of this.state.master.entries()) {
        if(name.associateId === this.props.match.params.username)
        {
          console.log("master team name",name.teams[0].name);
          this.setState({ isMaster: true,teamName:name.teams[0].name });
        
        }
      }
        let Teamsresponse = await fetch(this.state.url+"/Teams");
      let Teams = await Teamsresponse.json()
      this.setState({ Teams: Teams})
      let associateresponse = await fetch(this.state.url+"/Associates");
      let associates = await associateresponse.json()
      console.log("associates",associates);
      for (const [id, name] of associates.entries()) {
        console.log("name.associateId",name.associate_id);
        console.log("this.props.match.params.username",this.props.match.params.username);
        if(name.associate_id === this.props.match.params.username)
        {
          //console.log("name.associateId",name.id);
          this.setState({ userId: name.id,teamName: name.team.name});
        
        }
        
      }
  }
  render() {
    var MasterOptions;
    var ShowMasterPin;
    var showIndivisualGraph;
    if (this.state.userId!='') {
      showIndivisualGraph =           <IonCard>
      <IonCardHeader>
        {/* <IonCardSubtitle>Card Subtitle</IonCardSubtitle> */}
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
    // console.log(this.props.match.params.username);
    // var teamName = "";
    // var userId=0;
    // if(store.getState().loggedInUser[0] !== undefined){
    //   teamName = store.getState().loggedInUser[0].team.name;
    //   // userId = this.props.loggedInUser[0].id;
    // }
    // if(this.props.loggedInUser[0] !== undefined){
    //   userId = this.props.loggedInUser[0].id;
    // }
    // if (userId === 0 || teamName === "") return null;

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