import * as getUserAcions from '../actions/getUserActions';
import React, { useState } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ScrumPointsActions from '../actions/ScrumPointsActions';
import './Home.css';
import { IonPopover, IonButton,IonList,IonContent,IonItem,IonLabel } from '@ionic/react';
import { Modal, Button } from 'antd';
import { Popconfirm, message } from 'antd';
import { updateParameter } from 'typescript';



class GeneratePin extends React.Component {
    state = {
        loading: false,
        visible: false,
        master: [],
        isMaster: false,
        Teams: [],
        url : "https://kiranscrumapp.herokuapp.com",
        pinvisible: false,
        teamId: ''

      };

     
      showModal = () => {
        this.setState({
          visible: true,
        });
      };
    
      Ok = e => {
        console.log(e);
        this.setState({
            pinvisible: false,
        });
      };
    
      Cancel = e => {
        console.log(e);
        this.setState({
            pinvisible: false,
        });
      };
      info = (newPin) => {
        Modal.info({
          title: 'SCRUM PIN',
          content: (
            <div>
              <p>{newPin}</p>
            </div>
          ),
          onOk() {},
        });
      }
    confirm = (e) => {
      this.componentDidMount();
        console.log("e",e);
        if(e.pin === -1)
        {
            var newPin = Math.floor(Math.random()*90000) + 10000;
            this.props.newpin.pin(newPin);
            this.props.ScrumPointsActions.putMasterPin(newPin,e.id);
        this.info(newPin);
        }
        else{
          this.props.newpin.pin('');
          this.props.ScrumPointsActions.putMasterPin('-1',e.id);
        }
       // message.success('Click on Yes');       
      }

      handleOk = () => {
        this.setState({ loading: true });
        setTimeout(() => {
          this.setState({ loading: false, visible: false });
        }, 500);
      };
    
      handleCancel = () => {
        this.setState({ visible: false });
      };
      async componentDidMount() {
        let response = await fetch(this.state.url+"/Masters");
        let master = await response.json()
        this.setState({ master: master})
        for (const [id, name] of this.state.master.entries()) {
          console.log("logedin user",this.props.username.username);
          if(name.associateId === this.props.username.username)
          {
            this.setState({ isMaster: true });
          
          }
        }
          let Teamsresponse = await fetch(this.state.url+"/Teams");
        let Teams = await Teamsresponse.json()
        this.setState({ Teams: Teams})
      }
    render() {
        
        const { visible, loading } = this.state;
        var GeneratePinOptions;
        GeneratePinOptions =<p><Button type="text" onClick={this.showModal} style={{width:"250px",height:"40px"}} >
  Generate Pin
 </Button>
 <Modal
   visible={visible}
   title="Generate Pin"
   onOk={this.handleOk}
   onCancel={this.handleCancel} 
   footer={[
     <Button key="back" onClick={this.handleCancel}>
       Cancel
     </Button>,
     <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
       OK
     </Button>,
   ]}
 >
   
   <p>{
   this.state.Teams.map((Teams, index) => {
       return (
        this.props.username.username ===Teams.master.associateId?
         <div className="teams-list" key={Teams.id}>
             <Popconfirm
    title="ARE YOU SURE?"
    onConfirm={() => this.confirm(Teams)}
    onCancel={cancel}
    okText="Yes"
    cancelText="No" 
  >
  <Button style={{backgroundColor:"lightgray" , height:"40px"}} ><pre style={{fontSize:"25px"}} >{Teams.name}                 {Teams.pin}</pre></Button>  </Popconfirm>
         </div>:<div></div>
       );
     })}</p>
 </Modal>
 <Modal
            title="SCRUM PIN"
            visible={this.state.pinvisible}
            onOk={this.Ok}
          >
          </Modal>
         </p> ;
        return (
            <div> {GeneratePinOptions}
          </div>
          
        );
    }
}


  function cancel(e) {
    console.log(e);
    message.error('Click on No');
  }

function mapStateToProps(state) {
    return {
      userList: state.userList,
    }
  }
  function mapDispatchToProps(dispatch) {
    return {
      ScrumPointsActions: bindActionCreators(ScrumPointsActions, dispatch),
      getUserAcions: bindActionCreators(getUserAcions, dispatch)
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(GeneratePin)