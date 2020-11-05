import React, { useState } from 'react';
import './Home.css';
import {  message,Modal, Button, Input } from 'antd';

class AddAssociate extends React.Component {
    state = {
        loading: false,
        visible: false,
        associate:''
      };

    handleOk = () => {
        this.setState({ loading: true });
        setTimeout(() => {
          this.setState({ loading: false, visible: false });
        }, 500);
        message.success('Associate Added successfully!'); 
      };
      handleCancel = () => {
        this.setState({ visible: false });
      };
      showModal = () => {
        this.setState({
          visible: true,
        });
      };

    render() {
        const { Search } = Input;
        const onSearch = value =>this.setState({associate:value});
        const { visible, loading } = this.state;
        var AddAssociate;
        AddAssociate = <p><Button type="text" onClick={this.showModal} style={{width:"250px",height:"40px"}} >
  Add Associate
 </Button>
  <Modal
  visible={visible}
  title="SEARCH"
  onOk={this.handleOk}
  onCancel={this.handleCancel} 
  footer={[
    <Button key="back" onClick={this.handleCancel}>
      Cancel
    </Button>,
    <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
      OK
    </Button>,
  ]}>
      <p>
      <Search
      placeholder="input search text"
      allowClear
      onSearch={onSearch}
      style={{ width: 200, margin: '0 10px' }}
    />
      </p>
      </Modal></p>
        return (
            <div>{AddAssociate}</div>
            );
        }
    }
    export default AddAssociate