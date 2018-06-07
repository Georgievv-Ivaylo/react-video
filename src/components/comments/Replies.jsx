import React from 'react';
import Reply from './Reply';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './actions';
import Comment from './Comment';

class Replies extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reply: this.props.comment.reply,
      comment: this.props.comment
    }
  }
  
  render() {
    const reply = this.state.reply;
    let replies = this.props.replies[this.props.comment.parent] ? this.props.replies[this.props.comment.parent][this.props.comment.id] : [];
    let commentsList = {};
    if (replies) {
      commentsList = replies.map((comment, id) => 
        <Comment
          key={id}
          commentData={comment}
        />
      );
    }
    return (
      <section className="replies-grid">
        <Reply reply={reply} inputHandler={this.updateReplies} />
        {replies && commentsList}
      </section>
    );
  }

  updateReplies = (propName, propValue) => {
    let replies = this.state.replies;
    let elId = 1;
    if (replies) elId = replies.length + 1;
    let videoId = this.props.comment.parent;
    let parent = this.props.comment.id;
    if (this.props.comment.type === 'reply') {
      videoId = this.props.comment.videoId;
      parent = this.props.comment.parent;
    }
    
    const commentData = {
      id: elId,
      type: 'reply',
      videoId: videoId,
      parent: parent,
      text: propValue,
      date: new Date().toString(),
      user: getRandomInt(1, 3)
    };
    this.props.actions.reply(commentData);
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }
}

function mapStateToProps (state) {
  return {
    replies: state.handelComment.reply,
  };
}

function mapDispatchToProps (dispatch) {
  return {
      actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Replies);
