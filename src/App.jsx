import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import Home from './pages/Home';
import ScrumPoints from './pages/ScrumPoints'
import { home, person, time } from 'ionicons/icons';
import {
  IonIcon,
  IonLabel,
  IonPage,
  IonTabBar,
  IonTabButton,
  IonTabs
} from '@ionic/react';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
// import './theme/variables.css';


class App extends React.Component {
  render() {
    return (
      <IonApp>
        <IonReactRouter>
          <IonTabs >
            <IonRouterOutlet>
              <Route path="/home/:username" component={Home} exact={true} />
              <Route path="/scrumpoints" component={ScrumPoints} exact={true} />
              <Route exact path="/" render={() => <Redirect to="/home/:username" />} />
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton tab="schedule" href="/home">
                <IonIcon icon={home} />
                <IonLabel>Home</IonLabel>
              </IonTabButton>
              <IonTabButton tab="scrumpoints" href="/scrumpoints">
                <IonIcon icon={time} />
                <IonLabel>Scrum Points</IonLabel>
              </IonTabButton>
              <IonTabButton tab="profile" href="/">
                <IonIcon icon={person} />
                <IonLabel>Profile</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
      </IonApp>

    )
  }
}

export default App;
