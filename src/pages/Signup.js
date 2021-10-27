import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import AppIcon from "../images/icon-above-font.png";
import axios from "axios";
import { Link } from "react-router-dom";

// MUI Stuff
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

// Redux stuff
import { connect } from "react-redux";
import { signupUser } from "../redux/actions/userActions";

const styles = (theme) => ({
  ...theme.spreadThis,
});

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      handle: "",
      errors: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) this.setState({ errors: nextProps.UI.errors });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
    });
    const newUserData = {
      mail: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      handle: this.state.handle,
    };

    this.props.signupUser(newUserData, this.props.history);
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
            S'inscrire
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
            <TextField
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="Confirmez le mot de passe"
              className={classes.textField}
              helperText={errors.confirmPassword}
              error={errors.confirmPassword ? true : false}
              value={this.state.confirmPassword}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id="handle"
              name="handle"
              type="text"
              label="Pseudo"
              className={classes.textField}
              helperText={errors.handle}
              error={errors.handle ? true : false}
              value={this.state.handle}
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
              S'inscrire
              {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
            <br />
            <small>
              Vous avez déjà un compte ? Identifiez-vous{" "}
              <Link to="/login"> ici </Link>
            </small>
          </form>
        </Grid>
      </Grid>
    );
  }
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

export default connect(mapStateToProps, { signupUser })(
  withStyles(styles)(Signup)
);
