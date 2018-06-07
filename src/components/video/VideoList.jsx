import React from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import Video from './Video';
import VideoBox from './VideoBox';

class VideoList extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      modal: false,
      videos: this.props.videos,
      vlid: this.props.vlid || ''
    };
  }

  componentDidMount() {
    fetch('/data/get/videos?vlid='+ this.state.vlid)
    .then(res => res.json())
    .then(
      (result) => {
        let { dispatch } = this.props
        const action = actions.importVideos(result)
        dispatch(action);
      },
      (error) => {}
    )
  }
  
  componentWillReceiveProps(nextProps){
    const videos = this.state.videos;
    this.setState({...videos, videos: nextProps.videos})
  }

  render() {
    const videos = this.state.videos;
    let videoList = {};
    if (videos) {
      videoList = videos.map((video, id) => 
        <VideoBox
          key={id}
          elData={video}
        />
      );
    }
    
    if (videos.length <= 0 && !this.state.modal) {
      this.setState({ modal: true });
    }
    return (
      <section className="list-grid">
        {videos && videoList}
        <div className="box slow add-video" onClick={this.setModal}>
          <i className="fa fa-plus"></i>
        </div>
        {this.state.modal && <Video showModal={this.state.modal} closeModal={this.setModal} vlid={this.state.vlid} />}
      </section>
    );
  }
 
  setModal = () => {
    this.setState({ modal: !this.state.modal })
  }
}

function mapStateToProps (state) {
  return {
    videos: state.videoData.videos
  };
}

export default connect(mapStateToProps)(VideoList);