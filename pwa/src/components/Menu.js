import React from "react";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Button
} from "shards-react";
import { logout } from "../utils/auth";

export default class Menu extends React.Component {
    
  constructor(props) {
    super(props);

    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.toggleNavbar = this.toggleNavbar.bind(this);

    this.state = {
      dropdownOpen: false,
      collapseOpen: false
    };
  }

  toggleDropdown() {
    this.setState({
      ...this.state,
      ...{
        dropdownOpen: !this.state.dropdownOpen
      }
    });
  }

  toggleNavbar() {
    this.setState({
      ...this.state,
      ...{
        collapseOpen: !this.state.collapseOpen
      }
    });
  }
  sair = () => {
      logout()
      this.props.goLogin()
  }

  render() {
    return (
      <Navbar type="dark" expand="md" style={{backgroundColor: "#ffffff"}}>
        <NavbarBrand href="#">
            <img src="/images/logo.jpg" width="65" style={{borderRadius: 10}} />
        </NavbarBrand>
      </Navbar>
    );
  }
}