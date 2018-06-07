import * as actionTypes from './actionTypes';

export default function handelComment(comments = {comment: {}, reply: {}}, action) {
	switch (action.type) {
		case actionTypes.COMMENT:
			const newData = processComment(comments, action);
			return {
				...comments,
				comment: {
					...comments.comment = newData.comment
				},
				reply: {
					...comments.reply = newData.reply
				}
			}
		case actionTypes.REPLY:
			return {
				...comments,
				reply: {
					...comments.reply,
					[action.videoId]: {
						...comments.reply[action.videoId],
						[action.commentId]: [ ...comments.reply[action.videoId][action.commentId], action.value ]
					}
				}
			}
		default: return comments;
	}
}

function processComment(comments, action) {
	let commentsUpdate = comments.comment;
	let commentId = 1;
	if (commentsUpdate[action.videoId]) {
		commentId = commentsUpdate[action.videoId].length + 1;
	} else {
		commentsUpdate[action.videoId] = [];
	}
	action.value['id'] = commentId;
	commentsUpdate[action.videoId].push(action.value);
	comments['comment'] = commentsUpdate;
	let createReplies = comments.reply;
	if (!createReplies[action.videoId]) createReplies[action.videoId] = {};
	createReplies[action.videoId][commentId] = [];
	comments['reply'] = createReplies;
	return comments;
}