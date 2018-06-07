import * as actionTypes from './actionTypes';

export function add(value) {
  return {
      type: actionTypes.ADD,
      value
  };
}

export function importVideos(value) {
  return {
      type: actionTypes.IMPORT_VIDEOS,
      value
  };
}

export function validateURL(value) {
  return {
      type: actionTypes.VALIDATE_VIDEO,
      value
  };
}

export function clearVideo() {
  return {
      type: actionTypes.CLEAR_VIDEO
  };
}
