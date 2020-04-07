import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonButton } from '@ionic/react';
import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import * as getUserAcions from '../actions/getUserActions';
import IndivisualGraph from '../pages/IndivisualGraph.jsx';
import './Home.css';

class Home extends React.Component {
  componentDidMount() {
    this.props.getUserAcions.fetchActiveOrganization();
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
    userList: state.userList,
  }
}
function mapDispatchToProps(dispatch) {
  return {
    getUserAcions: bindActionCreators(getUserAcions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)