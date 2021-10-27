import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../../util/MyButton";

// Redux
import { connect } from "react-redux";
import {
  editUserDetails,
  logoutUser,
  deleteUser,
} from "../../redux/actions/userActions";

// MUI
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

// Icons
import EditIcon from "@material-ui/icons/Edit";

const styles = (theme) => ({
  ...theme.spreadThis,
  button: {
    float: "right",
  },
});

class EditDetails extends Component {
  state = {
    bio: "",
    job: "",
    team: "",
    openEdit: false,
    openConfirmation: false,
  };

  mapUserDetailsToState = (credentials) => {
    this.setState({
      bio: credentials.bio ? credentials.bio : "",
      job: credentials.job ? credentials.job : "",
      team: credentials.team ? credentials.team : "",
    });
  };

  handleOpenEdit = () => {
    this.setState({ openEdit: true });
    this.mapUserDetailsToState(this.props.credentials);
  };

  handleOpenConfirmation = () => {
    this.setState({ openConfirmation: true });
    this.mapUserDetailsToState(this.props.credentials);
  };

  handleCloseEdit = () => {
    this.setState({ openEdit: false });
  };

  handleCloseConfirmation = () => {
    this.setState({ openConfirmation: false });
  };

  componentDidMount = () => {
    const { credentials } = this.props;
    this.mapUserDetailsToState(credentials);
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = () => {
    const userDetails = {
      bio: this.state.bio,
      job: this.state.job,
      team: this.state.team,
    };

    this.props.editUserDetails(userDetails);
    this.handleCloseEdit();
  };

  handleDelete = () => {
    this.props.deleteUser();
    this.props.logoutUser();
  };

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <MyButton
          tip="Modifier les informations"
          onClick={this.handleOpenEdit}
          btnClassName={classes.button}
        >
          <EditIcon color="primary" />
        </MyButton>
        <Dialog
          open={this.state.openEdit}
          onClose={this.handleCloseEdit}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle> Modifier vos informations </DialogTitle>
          <DialogContent>
            <form>
              <TextField
                name="bio"
                type="text"
                label="Bio"
                multiline
                rows="3"
                placeholder="Une courte présentation de vous-même 🙂"
                className={classes.textField}
                value={this.state.bio}
                onChange={this.handleChange}
                fullWidth
              >
                {" "}
              </TextField>

              <TextField
                name="job"
                type="text"
                label="Job"
                placeholder="Votre emploi au sein de Groupomania 👨‍💻"
                className={classes.textField}
                value={this.state.job}
                onChange={this.handleChange}
                fullWidth
              >
                {" "}
              </TextField>

              <TextField
                name="team"
                type="text"
                label="Team"
                placeholder="Votre équipe 🏗"
                className={classes.textField}
                value={this.state.team}
                onChange={this.handleChange}
                fullWidth
              >
                {" "}
              </TextField>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleOpenConfirmation} color="secondary">
              Supprimer ce profil
            </Button>
            <Button onClick={this.handleCloseEdit} color="primary">
              Annuler
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Enregistrer
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={this.state.openConfirmation}>
          <DialogTitle>
            {" "}
            Souhaitez-vous vraiment supprimer votre profil ?{" "}
          </DialogTitle>
          <DialogActions>
            <Button onClick={this.handleDelete} color="secondary">
              Oui
            </Button>
            <Button onClick={this.handleCloseConfirmation} color="primary">
              Non
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

EditDetails.propTypes = {
  editUserDetails: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  credentials: state.user.credentials,
});

export default connect(mapStateToProps, {
  editUserDetails,
  logoutUser,
  deleteUser,
})(withStyles(styles)(EditDetails));
