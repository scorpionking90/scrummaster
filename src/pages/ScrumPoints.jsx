import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { Carousel } from 'antd';
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import store from '../store/store.js'
import * as getUserAcions from '../actions/getUserActions';
// import MyTypes from 'MyTypes';
import './Home.css';
import {
  Form
} from 'antd';

class ScrumPoints extends React.Component {
  onChange = () => {

  }
  componentDidMount() {
    this.props.getUserAcions.fetchActiveOrganization();
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
       <h1>
           Scrum points page
       </h1>
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

export default connect(mapStateToProps, mapDispatchToProps)(ScrumPoints)