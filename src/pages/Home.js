import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import Loader from "../util/loader";
import CreatePost2 from "../components/post/CreatePost2";
import InfiniteScroll from "react-infinite-scroll-component";

import Post from "../components/post/Post";
import Profile from "../components/profile/Profile";

import { connect } from "react-redux";
import { getPosts, getMorePosts } from "../redux/actions/dataActions";

class Home extends Component {
  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    const { posts, loading } = this.props.data;

    const html = document.querySelector("html");
    html.style.background = "";

    const body = document.querySelector("body");
    body.style.background = "transparent";

    let recentPosts = posts.map((post) => (
      <Post key={post.postId} post={post} />
    ));

    return (
      <Grid container spacing={16}>
        <Grid item sm={3} xs={12}>
          <Profile />
        </Grid>
        <Grid item sm={9} xs={12}>
          <CreatePost2 />
          <InfiniteScroll
            dataLength={posts.length}
            next={() => this.props.getMorePosts(this.props.data.posts.length)}
            hasMore={true}
            scrollThreshold="100px"
          >
            {recentPosts}
          </InfiniteScroll>
          {loading && <Loader />}
        </Grid>
      </Grid>
    );
  }
}

Home.propTypes = {
  getPosts: PropTypes.func.isRequired,
  getMorePosts: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getPosts, getMorePosts })(Home);
