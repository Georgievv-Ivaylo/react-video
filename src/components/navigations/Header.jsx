import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {

  render() {
    const headerNavigation = this.props.headerData;
    let thisList = {};
    if (headerNavigation && headerNavigation.length >= 1) {
      thisList = headerNavigation.map((thisEl, id) => 
        <Link key={id} to={thisEl.link} className="href">{thisEl.title}</Link>
      );
    }
    return (
      <section className="navigation-grid">
        {headerNavigation && headerNavigation.length >= 1 && thisList}
      </section>
    );
  }
}

export default Header;