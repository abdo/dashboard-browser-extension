import React from 'react';
import { Modal, Input } from 'antd';

const SettingsModal = ({
  open,
  onChangeNameTextInput,
  onOk,
  onCancel,
  savedInfo
}) => {
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
        onChange={onChangeNameTextInput}
      />
    </Modal>
  );
};

export default SettingsModal;
