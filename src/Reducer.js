import { createStore, combineReducers } from 'redux';
import videoData from './components/video/reducer';
import handelComment from './components/comments/reducer';
import users from './components/users/reducer';
import usersData from './components/users/usersData.json';

const store = createStore(combineReducers({
	videoData,
	handelComment,
	users
}), {
	videoData: {
		videos: [],
		video: { id: 'Embed URL...', embed: false },
	},
	handelComment: {
		comment: {},
		reply: {}
	},
	users: usersData
});

export default store;
