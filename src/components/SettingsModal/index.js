import { Modal, Input, Radio, Switch } from 'antd';
import React from 'react';

import { defaultUserName } from '../../constants';

import './style.css';

const SettingsModal = ({ open, onChangeInput, onOk, onCancel, savedInfo }) => {
  const capitalize = (word) =>
    word[0].toUpperCase() + word.slice(1, word.length);
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
        placeholder={capitalize(defaultUserName)}
        value={savedInfo.userName}
        onChange={(e) => onChangeInput('userName', e.target.value)}
        className="input"
      />

      <Radio.Group
        value={savedInfo.timeFormat}
        onChange={(e) => onChangeInput('timeFormat', e.target.value)}
        className="input"
      >
        <Radio.Button value="12">12 hours time format</Radio.Button>
        <Radio.Button value="24">24 hours time format</Radio.Button>
      </Radio.Group>

      <Switch
        checkedChildren="Show bookmarks"
        unCheckedChildren="Hide bookmarks"
        checked={savedInfo.showBookmarks === 'true'}
        onChange={(value) => onChangeInput('showBookmarks', value.toString())}
      />
    </Modal>
  );
};

export default SettingsModal;
