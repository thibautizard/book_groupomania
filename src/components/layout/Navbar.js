import React, { Component, Fragment } from "react";
import Link from "react-router-dom/Link";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import MyButton from "../../util/MyButton";
import CreatePost from "../post/CreatePost";
import Menu from "../../util/menu";
import GroupomaniaBrand from "../../images/groupomania-brand.png";

// MUI
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/ToolBar";
import Button from "@material-ui/core/Button";

// Icons
import HomeIcon from "@material-ui/icons/Home";
import Notifications from "@material-ui/icons/Notifications";

export class Navbar extends Component {
  render() {
    const { authenticated } = this.props;

    return (
      <AppBar position="fixed">
        <Link to="/">
          <img
            src={GroupomaniaBrand}
            alt="groupomania brand"
            style={{
              width: "200px",
              position: "absolute",
              left: "50vw",
              top: "14px",
              transform: "translate(-50%, 0)",
            }}
          />
        </Link>
        <ToolBar className="nav-container"></ToolBar>
      </AppBar>
    );
  }
}

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps)(Navbar);
