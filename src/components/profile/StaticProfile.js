import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import MyButton from "../../util/MyButton";
import Loader from "../../util/loader";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

// MUI Stuff
import Button from "@material-ui/core/Button";
import MuiLink from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import EditDetails from "./EditDetails";

// Redux
import { connect } from "react-redux";
import {
  logoutUser,
  deleteOtherUser,
  uploadImage,
} from "../../redux/actions/userActions";

// Icons
import IconTeam from "@material-ui/icons/PeopleAlt";
import WorkIcon from "@material-ui/icons/Work";
import CalendarToday from "@material-ui/icons/CalendarToday";
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";
import AdminIcon from "@material-ui/icons/VerifiedUser";
import PhotoCamera from "@material-ui/icons/PhotoCamera";

const styles = (theme) => ({
  paper: {
    padding: 10,
    marginBottom: "20px",
  },

  suppression: {
    display: "flex",
    justifyContent: "center",
  },

  profile: {
    margin: "0 10px",

    "& .image-wrapper": {
      position: "relative",
      width: "15vw",
      height: "15vw",
      minWidth: "100px",
      minHeight: "100px",
      borderRadius: "50%",
      margin: "auto",

      "& svg": {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        fontSize: "3rem",
        color: "white !important",
        cursor: "pointer",
        visibility: "hidden",
      },

      "&:hover .profile-image": {
        opacity: 0.7,
      },

      "&:hover svg": {
        opacity: 0.7,
        visibility: "visible",
      },
    },

    "& .profile-image": {
      objectFit: "cover",
      margin: "auto",
      maxWidth: "100%",
      width: "15vw",
      height: "15vw",
      borderRadius: "50%",
      minWidth: "100px",
      minHeight: "100px",
      transition: "all .2s linear",
      cursor: "pointer",
    },
    "& .profile-details": {
      textAlign: "center",
      "& span , svg": {
        verticalAlign: "middle",
      },
      "& a ": {
        color: theme.palette.primary.main,
      },
    },
    "& hr": {
      border: "none",
      margin: "0 0 10px 0",
    },
    "& svg.button": {
      "&:hover": {
        cursor: "pointer",
      },
    },
    buttons: {
      textAlign: "center",
      "& a": {
        margin: "20px 10px",
      },
    },

    "& .adminicon": {
      margin: "0 5px",
    },
  },
});

class Profile extends Component {
  state = {
    openConfirmation: false,
  };

  handleOpenConfirmation = () => {
    this.setState({ openConfirmation: true });
  };

  handleCloseConfirmation = () => {
    this.setState({ openConfirmation: false });
  };

  handleDelete = (event) => {
    const pseudo = event.currentTarget.getAttribute("pseudo");
    this.props.deleteOtherUser(pseudo);
    window.location.assign("/");
  };

  handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image, "profil");
    formData.append("pathToSave", "public/images/users/");

    this.props.uploadImage(formData);
  };

  handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  handleLogout = () => {
    this.props.logoutUser();
  };

  render() {
    const {
      classes,
      user: { loading, credentials },
      profile: { pseudo, privilege, createdAt, team, job, bio, imageUrl },
    } = this.props;

    let profileMarkup = !loading ? (
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <div
            className="image-wrapper"
            onClick={
              pseudo === credentials.pseudo ? this.handleEditPicture : ""
            }
          >
            <img src={imageUrl} alt="profile" className="profile-image" />
            {pseudo === credentials.pseudo && (
              <Fragment>
                <PhotoCamera className="button" />
                <input
                  type="file"
                  id="imageInput"
                  onChange={this.handleImageChange}
                  hidden="hidden"
                />
              </Fragment>
            )}
          </div>
          <hr />
          <div className="profile-details">
            <MuiLink
              component={Link}
              to={`/users/${pseudo}`}
              color="primary"
              variant="h5"
            >
              @{pseudo}
            </MuiLink>
            {privilege ? (
              <AdminIcon color="primary" className="adminicon" />
            ) : (
              ""
            )}
            <hr />
            {bio && <Typography variant="body2">{bio}</Typography>}
            <hr />
            {job && (
              <Fragment>
                <WorkIcon color="primary" /> <span> {job} </span>
                <hr />
              </Fragment>
            )}
            {team && (
              <Fragment>
                <IconTeam color="primary" /> <span> {team} </span>
                <hr />
              </Fragment>
            )}
            <CalendarToday color="primary" />{" "}
            <span>
              Inscrit depuis le {dayjs(createdAt).format("DD/MM/YYYY")}
            </span>
          </div>
          {pseudo === credentials.pseudo ? (
            <Fragment>
              <MyButton
                tip="Se déconnecter"
                onClick={this.handleLogout}
                btnClassName="button"
              >
                <KeyboardReturn color="primary" />
              </MyButton>
              <EditDetails />
            </Fragment>
          ) : (
            credentials.privilege === 1 && (
              <Fragment>
                <div className={classes.suppression}>
                  <Button
                    onClick={this.handleOpenConfirmation}
                    color="secondary"
                  >
                    Supprimer ce profil
                  </Button>
                </div>

                <Dialog open={this.state.openConfirmation}>
                  <DialogTitle>
                    {" "}
                    Souhaitez-vous vraiment supprimer ce profil ?{" "}
                  </DialogTitle>
                  <DialogActions>
                    <Button


                                            onClick={this.handleDelete}


                       color="secondary"


                       pseudo={pseudo}


                    >
                      Oui
                    </Button>
                    <Button
                      onClick={this.handleCloseConfirmation}
                      color="primary"
                    >
                      Non
                    </Button>
                  </DialogActions>
                </Dialog>
              </Fragment>
            )
          )}
        </div>
      </Paper>
    ) : (
      <Loader />
    );

    return profileMarkup;
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = { logoutUser, uploadImage };

Profile.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

// export default connect(
//   mapStateToProps,
//   mapActionsToProps
// )(withStyles(styles)(Profile));

export default connect(mapStateToProps, {
  logoutUser,
  deleteOtherUser,
})(withStyles(styles)(Profile));
