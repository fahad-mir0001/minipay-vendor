import React from 'react';
import { Link, Redirect, Switch, Route } from 'dva/router';
import DocumentTitle from 'react-document-title';
import { Icon } from 'antd';
import GlobalFooter from '../components/GlobalFooter';
import styles from './UserLayout.less';
import logo from '../assets/logo.svg';
import { getRoutes } from '../utils/utils';

const links = [{
  key: 'help',
  title: 'Help',
  href: '',
}, {
  key: 'privacy',
  title: 'Privacy',
  href: '',
}, {
  key: 'terms',
  title: 'Terms',
  href: '',
}];

const copyright = <div>Copyright <Icon type="copyright" /> 2018 Minipay service (Silkroad Network Technology).</div>;

class UserLayout extends React.PureComponent {
  getPageTitle() {
    const { routerData, location } = this.props;
    const { pathname } = location;
    let title = 'Minipay Merchant';
    if (routerData[pathname] && routerData[pathname].name) {
      title = `${routerData[pathname].name} - Minipay Merchant`;
    }
    return title;
  }
  render() {
    const { routerData, match } = this.props;
    return (
      <DocumentTitle title={this.getPageTitle()}>
        <div className={styles.container}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <img alt="logo" className={styles.logo} src={logo} />
                <span className={styles.title}>Minipay Design</span>
              </Link>
            </div>
            <div className={styles.desc}>Minipay Login</div>
          </div>
          <Switch>
            {getRoutes(match.path, routerData).map(item =>
              (
                <Route
                  key={item.key}
                  path={item.path}
                  component={item.component}
                  exact={item.exact}
                />
              )
            )}
            <Redirect exact from="/user" to="/user/login" />
          </Switch>
          <GlobalFooter className={styles.footer} links={links} copyright={copyright} />
        </div>
      </DocumentTitle>
    );
  }
}

export default UserLayout;
