import { ADD_PREDICATE, REMOVE_PREDICATE, QUERY_TABLE } from '../actions/predicate.types';

const initialState = {
    items: [{
        id: 0,
        predicateField: '',
        filterField: '',
        filterValue: '',
        rangeValue: ''
    }]
};

export default function(state = initialState, action) {
    switch(action.type) {
        case ADD_PREDICATE:
            return {
                ...state,
                items: state.items.concat(action.payload)
            };
        case REMOVE_PREDICATE:
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload)
            };
        case QUERY_TABLE:
            break;
        default:
            return state;
    }
}