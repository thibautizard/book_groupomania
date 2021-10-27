import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/fr";
import DeleteComment from "./DeleteComment";

// MUI STUFF
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

// Redux
import { connect } from "react-redux";

const styles = (theme) => ({
  ...theme.spreadThis,
  commentImage: {
    maxWidth: "100%",
    width: 70,
    height: 70,
    objectFit: "cover",
    borderRadius: "50%",
  },
  commentData: {
    marginLeft: 20,
    position: "relative",
  },
});

class Comments extends Component {
  render() {
    dayjs.extend(relativeTime);
    dayjs.locale("fr");
    const {
      comments,
      classes,
      user: {
        authenticated,
        credentials: { privilege, pseudo },
      },
    } = this.props;

    return (
      <Grid container>
        {comments.map((comment, index) => {
          const { body, createdAt, imageUrl, userPseudo, commentId } = comment;

          const deleteButton =
            authenticated && (userPseudo === pseudo || privilege) ? (
              <DeleteComment commentId={commentId} />
            ) : null;

          return (
            <Fragment key={createdAt}>
              <Grid item sm={12}>
                <Grid container>
                  <Grid item sm={2}>
                    <img
                      src={imageUrl}
                      alt="comment"
                      className={classes.commentImage}
                    />
                  </Grid>
                  <Grid item sm={9}>
                    <div className={classes.commentData}>
                      <Typography
                        variant="h5"
                        component={Link}
                        to={`/users/${userPseudo}`}
                        color="primary"
                      >
                        {userPseudo}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).format("DD MMMM YYYY, H:mm")}
                      </Typography>
                      {deleteButton}
                      <hr className={classes.invisibleSeparator} />
                      <Typography variant="body1">{body}</Typography>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              {index !== comments.length - 1 && (
                <hr className={classes.visibleSeparator} />
              )}
            </Fragment>
          );
        })}
      </Grid>
    );
  }
}

Comments.propTypes = {
  comments: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.data.post,
  user: state.user,
  comments: state.data.post.comments,
});

export default connect(mapStateToProps)(withStyles(styles)(Comments));
