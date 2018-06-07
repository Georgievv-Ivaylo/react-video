import React from 'react';
import { Link } from 'react-router-dom';

class VideoBox extends React.Component {
  
  render() {
    const elData = this.props.elData;
    return (
      <div className="box">
        <Link to={'/video?v='+ elData.id}>
          <img src={elData.image} alt=" " className="image" />
        </Link>
      </div>
    );
  }
}

export default VideoBox;
