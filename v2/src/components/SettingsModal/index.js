import './style.css';

import { Input, Modal, Radio, Select, Switch } from 'antd';
import React, { useState } from 'react';

import capitalize from '../../helpers/capitalize';
import { defaultUserName } from '../../constants';

const SettingsModal = ({ open, onChangeInput, onOk, onCancel, savedInfo }) => {
  const [imgOption, setImgOption] = useState('');

  return (
    <Modal
      title='Settings'
      visible={open}
      onOk={onOk}
      onCancel={onCancel}
      closable={false}
    >
      <Input
        addonBefore='Your Name'
        placeholder={capitalize(defaultUserName)}
        value={savedInfo.userName}
        onChange={(e) => onChangeInput('userName', e.target.value)}
        className='input'
      />
      <Radio.Group
        value={savedInfo.timeFormat}
        onChange={(e) => onChangeInput('timeFormat', e.target.value)}
        className='input'
      >
        <Radio.Button value='12'>12 hours time format</Radio.Button>
        <Radio.Button value='24'>24 hours time format</Radio.Button>
      </Radio.Group>
      <Switch
        className='input'
        checkedChildren='Show bookmarks'
        unCheckedChildren='Hide bookmarks'
        checked={savedInfo.showBookmarks === 'true'}
        onChange={(value) => onChangeInput('showBookmarks', value.toString())}
      />
      <Switch
        className='input'
        checkedChildren='Show Search Input'
        unCheckedChildren='Hide Search Input'
        checked={savedInfo.showSearchInput === 'true'}
        onChange={(value) => onChangeInput('showSearchInput', value.toString())}
      />
      <Switch
        className='input'
        checkedChildren='Show Sticky Notes'
        unCheckedChildren='Hide Sticky Notes'
        checked={savedInfo.showNotes === 'true'}
        onChange={(value) => onChangeInput('showNotes', value.toString())}
      />
      <Switch
        className='input'
        checkedChildren='Show Quote'
        unCheckedChildren='Hide Quote'
        checked={savedInfo.showQuote === 'true'}
        onChange={(value) => onChangeInput('showQuote', value.toString())}
      />
      <p className='imgLabelsHeader'>
        <span role='img' aria-label='camera'>
          📷
        </span>{' '}
        I want to customize my background images to be about:
      </p>
      <Select
        addonBefore='Your Name'
        mode='multiple'
        style={{ width: '100%' }}
        placeholder='For example: Smile'
        value={savedInfo.imgThemes}
        dropdownMenuStyle={{ height: 0 }}
        onChange={(values) => {
          onChangeInput('imgThemes', values);
          setImgOption('');
        }}
        onSearch={(input) => {
          input.trim() && setImgOption(input);
        }}
      >
        {imgOption && (
          <Select.Option key={imgOption || 'imgOption'}>
            {imgOption}
          </Select.Option>
        )}
      </Select>
    </Modal>
  );
};

export default SettingsModal;
