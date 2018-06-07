import * as actionTypes from './actionTypes';

export function comment(value) {
  return {
      type: actionTypes.COMMENT,
      videoId: value.parent,
      value
  };
}

export function reply(value) {
  return {
      type: actionTypes.REPLY,
      videoId: value.videoId,
      commentId: value.parent,
      id: value.id,
      value
  };
}
