import { FETCH_EXAMPLE } from '../actions/index';

export default function(state = [], action) {

    switch (action.type) {
        case FETCH_EXAMPLE:
            return action.payload;
    }

    return state;
}
