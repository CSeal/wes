import * as React from 'react';
import { Link } from 'react-router-dom';
export default class HeaderLogo extends React.Component<{}, any> {
  render() {
    return (
      <div>
          <Link to="/">
            <img src="/images/logo_white.svg" width="276" height="81" alt="WES" />
          </Link>
      </div>
    );
  }
}
