import React from 'react';
import { Input, Icon } from 'antd';
import styles from './index.less';

const map = {
  UserName: {
    component: Input,
    props: {
      size: 'large',
      prefix: <Icon type="user" className={styles.prefixIcon} />,
      placeholder: 'admin',
    },
    rules: [{
      required: true, message: 'Please enter username！',
    }],
  },
  Password: {
    component: Input,
    props: {
      size: 'large',
      prefix: <Icon type="lock" className={styles.prefixIcon} />,
      type: 'password',
      placeholder: '888888',
    },
    rules: [{
      required: true, message: 'Please enter Password！',
    }],
  },
  Mobile: {
    component: Input,
    props: {
      size: 'large',
      prefix: <Icon type="mobile" className={styles.prefixIcon} />,
      placeholder: 'Phone Number',
    },
    rules: [{
      required: true, message: 'Please enter Phone Number！',
    }, {
      pattern: /^1\d{10}$/, message: 'Incorrect Phone Number！',
    }],
  },
  Captcha: {
    component: Input,
    props: {
      size: 'large',
      prefix: <Icon type="mail" className={styles.prefixIcon} />,
      placeholder: 'Verification Code',
    },
    rules: [{
      required: true, message: 'Please Enter Verification Code！',
    }],
  },
};

export default map;
