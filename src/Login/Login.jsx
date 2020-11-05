import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonRow,IonCol,IonIcon,IonItem,IonLabel,IonInput } from '@ionic/react';
import { home, person, personCircle } from 'ionicons/icons';
import { IonButton } from '@ionic/react';
import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import store from '../store/store.js'
import * as getUserActions from '../actions/getUserActions';
import IndivisualGraph from '../pages/IndivisualGraph.jsx';

class Login extends React.Component {
  componentDidMount() {
   // this.props.getUserActions.fetchLoggedInUser(this.props.match.params.username);
  }
  render() {
    return (
      <IonPage>
       <IonHeader>
  <IonToolbar>
    <IonTitle>Login</IonTitle>
  </IonToolbar>
</IonHeader>
<IonRow>
  <IonCol>
  
    <IonButton expand="block" onClick={()=>this.props.isUserLogIn}>
      Login
    </IonButton>
  </IonCol>
</IonRow>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login)