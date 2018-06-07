import * as actionTypes from './actionTypes';

export default function users(oldState = {}, action) {
	switch (action.type) {
		case actionTypes.SWITCH:
			return oldState = action.value;
		case actionTypes.UPDATE:
			return oldState = action.value;
		default: return oldState;
	}
}
