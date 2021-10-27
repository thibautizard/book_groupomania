import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import AppIcon from "../images/icon-above-font.png";
import { Link } from "react-router-dom";

// MUI Stuff
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

// Redux stuff
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userActions";

const styles = (theme) => ({
  ...theme.spreadThis,
});

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) this.setState({ errors: nextProps.UI.errors });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const userData = {
      mail: this.state.email,
      password: this.state.password,
    };

    this.props.loginUser(userData, this.props.history);
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const {
      classes,
      UI: { loading },
    } = this.props;
    const { errors } = this.state;

    const html = document.querySelector("html");
    html.style.background = `url("https://projet7-oc-api.herokuapp.com/public/images/abstract-blur-hotel-interior-compressed.jpg")`;
    html.style.backgroundPosition = "center";
    html.style.backgroundSize = "cover";

    const body = document.querySelector("body");
    body.style.background = "transparent";

    return (
      <Grid container justify="center" className={classes.form}>
        <Grid sm="5" item className={classes.formpart}>
          <img src={AppIcon} alt="groupomania" className={classes.image} />
          <Typography variant="h2" className={classes.pageTitle}>
            S'identifier
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="email"
              name="email"
              type="email"
              label="Mail"
              className={classes.textField}
              helperText={errors.email}
              error={errors.email ? true : false}
              value={this.state.email}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id="password"
              name="password"
              type="password"
              label="Mot de passe"
              className={classes.textField}
              helperText={errors.password}
              error={errors.password ? true : false}
              value={this.state.password}
              onChange={this.handleChange}
              fullWidth
            />

            {errors.general && (
              <Typography variant="body2" className={classes.customError}>
                {errors.general}
              </Typography>
            )}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="button"
              disabled={loading}
            >
              S'identifier
              {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
            <br />
            <small>
              Pas de compte encore ? Inscrivez-vous{" "}
              <Link to="/signup"> ici </Link>
            </small>
          </form>
        </Grid>
      </Grid>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionsToProps = {
  loginUser,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Login));
