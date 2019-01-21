import React from 'react';
import { Container } from 'styled-container-component';
import { Button } from 'styled-button-component';
import { Navbar, NavbarLink } from 'styled-navbar-component';
import { Nav } from 'styled-nav-component';

class NavbarLight extends React.Component {
  constructor(props) {
    super();
    this.state = {
      hidden: true,
    };
  }

  handleOpenCloseNav() {
    this.setState({
      hidden: !this.state.hidden,
    });
  }

  render() {
    const { hidden } = this.state;
    return (
      <Container fluid>
        <Container fluid>
          <Navbar expandSm light>
            <Nav start>
              <NavbarLink light brand href="/">RENTAL STORAGE</NavbarLink>
              <Button
                light
                outline
                toggleCollapse
                expandSm
                onClick={() => this.handleOpenCloseNav()}
              >
                <span>&#9776;</span>
              </Button>
            </Nav>
            <Nav start collapse expandSm hidden={hidden}>
              <NavbarLink light href="/" pullRight>Home</NavbarLink>
              <NavbarLink light disabled href="/logout">Logout</NavbarLink>
            </Nav>
          </Navbar>
        </Container>
      </Container>
    );
  }
};

export default NavbarLight;