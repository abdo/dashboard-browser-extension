import { Modal, Input, Radio } from 'antd';
import React from 'react';

import './style.css';

const SettingsModal = ({ open, onChangeInput, onOk, onCancel, savedInfo }) => {
  return (
    <Modal
      title="Settings"
      visible={open}
      onOk={onOk}
      onCancel={onCancel}
      closable={false}
    >
      <Input
        addonBefore="Your Name"
        placeholder="Friend"
        value={savedInfo.userName}
        onChange={(e) => onChangeInput('userName', e.target.value)}
        className="input"
      />

      <Radio.Group
        value={savedInfo.timeFormat}
        onChange={(e) => onChangeInput('timeFormat', e.target.value)}
      >
        <Radio.Button value="12">12 hours time format</Radio.Button>
        <Radio.Button value="24">24 hours time format</Radio.Button>
      </Radio.Group>
    </Modal>
  );
};

export default SettingsModal;
