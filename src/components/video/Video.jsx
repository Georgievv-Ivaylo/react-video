import React from 'react';
import { Redirect } from 'react-router';
import {  } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './actions';
import * as commentActions from '../comments/actions';
import Form from './Form';
import Comments from '../comments/Comments';
import CommentForm from '../comments/CommentForm';
import YouTubeVideo from '../youtube/youtube';
import VideoOptions from './VideoOptions';

class Video extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      value: 0,
      status: false,
      modal: true,
      redirect: false,
      video: this.props.video,
      comments: this.props.comments,
      comment: ''
    };
  }

  render() {
    let thisVideo = '';
    if (this.props.location && this.props.location.pathname !== '/' && !this.state.status) {
      thisVideo = this.props.location.pathname + this.props.location.search;
      this.startVideo(thisVideo);
    }
    if (this.state.redirect) {
      return <Redirect to='/videos' />;
    }
    return (
      this.state.modal &&
        <div className="modal-grid">
          <div className="modal-container">
            <div className="close-btn" onClick={this.setThisModal}>x</div>
            <div id="video">
              {!this.props.video.embed &&
                <Form
                  url={thisVideo}
                  inputHandler={this.onKeyUp} />
              }
              {this.props.video.error &&
                <p className="error-msg">{this.props.video.error}</p>
              }
              {this.props.video.url && !this.props.video.error &&
                <YouTubeVideo video={this.props.video} validateVideo={this.isValid} />
              }
              {this.props.video.embed &&
                <div>
                  <VideoOptions />
                  <CommentForm comment={this.state.comment} inputHandler={this.updateVideoComments} />
                </div>
              }
              {this.state.status && !this.props.video.embed && !this.props.video.error &&
                <p className="info-msg">{this.state.status}</p>
              }
            </div>
            {this.state.comments &&
              <Comments commentsData={this.state.comments} videoId={this.state.video.id} />
            }
          </div>
        </div>
    );
  }

  onKeyUp = (e) => {
    if (e.keyCode === 13) {
      this.startVideo(e.target.value);
    }
  }

  startVideo = (video) => {
    const videoURL = video;
    this.setState({
      error: false,
      status: 'Checking video...',
      value: {url: videoURL, vlid: this.props.vlid}
    }, function () {
      this.props.actions.validateURL(this.state.value);
    });
  }

  updateVideoComments = (commentText) => {
    const video = this.props.video;
    
    const commentData = {
      type: 'comment',
      parent: video.id,
      text: commentText,
      date: new Date().toString(),
      user: getRandomInt(1, 3)
    };
    
    this.props.commentActions.comment(commentData);
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }

  isValid = (data) => {
    this.setState({error: false});
    if (data.error === 'error') this.setState({ videoURL: this.state.value });
    this.setState({ video: data.video }, function () {
      this.props.actions.validateURL(data);
    });
  }
 
  setThisModal = () =>  {
    this.props.actions.clearVideo();
    if (this.props.closeModal) {
      this.props.closeModal();
    } else {
      this.setState({
        modal: !this.state.modal,
        // redirect: !this.state.redirect
      });
    }
  }
}

function mapStateToProps (state) {
  return {
    video: state.videoData.video,
    comments: state.handelComment,
    error: false
  };
}

function mapDispatchToProps (dispatch) {
  return {
      actions: bindActionCreators(actions, dispatch),
      commentActions: bindActionCreators(commentActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Video);