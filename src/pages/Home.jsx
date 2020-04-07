import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonButton } from '@ionic/react';
import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import store from '../store/store.js'
import * as getUserActions from '../actions/getUserActions';
import IndivisualGraph from '../pages/IndivisualGraph.jsx';
import './Home.css';

class Home extends React.Component {
  componentDidMount() {
    this.props.getUserActions.fetchLoggedInUser("KK035231");
  }
  render() {
    // console.log(this.props.match.params.username);

    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Home page</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonCard>
            <IonCardHeader>
              {/* <IonCardSubtitle>Card Subtitle</IonCardSubtitle> */}
              <IonCardTitle>My Graph</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
              <IndivisualGraph username={this.props.match.params.username} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Home)