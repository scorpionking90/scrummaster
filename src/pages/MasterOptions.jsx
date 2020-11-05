import React, { useState } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as getUserActions from '../actions/getUserActions';
import './Home.css';
import { IonPopover, IonButton,IonList,IonContent,IonItem,IonLabel } from '@ionic/react';
import GeneratePin from './GeneratePin';
import AddAssociate from './AddAssociate';
import { Redirect, Route } from 'react-router-dom';
import { List, Avatar } from 'antd';
import { Button, Menu, Dropdown } from 'antd';


class MasterOptions extends React.Component {
    state = {
      showPopover:false,
       setShowPopover:false,
       pin:''
    }
    pin (newPin){
this.setState({pin:newPin})
    }
    render() {
      console.log("this.state.pin",this.state.pin)
      this.props.newpin.pin(this.state.pin);
      const menu1 = (
        <Menu>
          <Menu.Item>
            <a target="_blank"  >
            <GeneratePin username={this.props} newpin ={{pin : this.pin.bind(this)}}/>
            </a>
          </Menu.Item>
          <Menu.Item>
            <a target="_blank"  >
            <AddAssociate />
            </a>
          </Menu.Item>
        </Menu>
      );

      var MasterOptions;
      MasterOptions  =   <div style={{float:"right"}}>
    <Dropdown overlay={menu1} placement="bottomRight"  >
      <Button>...</Button>
    </Dropdown>
   </div>;
        return (
       <div>
{MasterOptions}
       </div>
       );
    }
}
function handleMenuClick(e) {
  console.log('click', e);
}
  export default MasterOptions