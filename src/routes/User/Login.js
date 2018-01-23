import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Checkbox, Alert, Icon } from 'antd';
import Login from '../../components/Login';
import styles from './Login.less';

const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login;

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))
export default class LoginPage extends Component {
  state = {
    type: 'account',
    autoLogin: true,
  }

  onTabChange = (type) => {
    this.setState({ type });
  }

  handleSubmit = (err, values) => {
    const { type } = this.state;
    if (!err) {
      this.props.dispatch({
        type: 'login/login',
        payload: {
          ...values,
          type,
        },
      });
    }
  }

  changeAutoLogin = (e) => {
    this.setState({
      autoLogin: e.target.checked,
    });
  }

  renderMessage = (content) => {
    return (
      <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
    );
  }

  render() {
    const { login, submitting } = this.props;
    const { type } = this.state;
    return (
      <div className={styles.main}>
        <Login
          defaultActiveKey={type}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
        >
          <Tab key="account" tab="Account Login">
            {
              login.status === 'error' &&
              login.type === 'account' &&
              !login.submitting &&
              this.renderMessage('Wrong Account or Password（admin/888888）')
            }
            <UserName name="userName" placeholder="admin/user" />
            <Password name="password" placeholder="888888/123456" />
          </Tab>
          <Tab key="mobile" tab="Phone Number Login">
            {
              login.status === 'error' &&
              login.type === 'mobile' &&
              !login.submitting &&
              this.renderMessage('Verification Code Error!')
            }
            <Mobile name="mobile" />
            <Captcha name="captcha" />
          </Tab>
          <div>
            <Checkbox checked={this.state.autoLogin} onChange={this.changeAutoLogin}>Auto</Checkbox>
            <a style={{ float: 'right' }} href="">Forget Password?</a>
          </div>
          <Submit loading={submitting}>Login</Submit>
          <div className={styles.other}>
            Other Login Method
            <Icon className={styles.icon} type="alipay-circle" />
            <Icon className={styles.icon} type="taobao-circle" />
            <Icon className={styles.icon} type="weibo-circle" />
            <Link className={styles.register} to="/user/register">Create Account</Link>
          </div>
        </Login>
      </div>
    );
  }
}
