import { ADD_PREDICATE, REMOVE_PREDICATE, QUERY_TABLE, UPDATE_PREDICATE } from '../actions/predicate.types';

const initialState = {
    sql: null,
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
            if(state.items.length === 1) return state;
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload)
            };
        case UPDATE_PREDICATE:
            const items = [...state.items];
            const idx = items.findIndex(item => item.id === action.payload.id);
            if(idx === -1) return state;

            const item = Object.assign({}, items[idx]);
            items[idx] = Object.assign(item, action.payload.predicate);

            return {
                ...state,
                items
            };
        case QUERY_TABLE:
            return {
                ...state,
                sql: action.payload
            };
        default:
            return state;
    }
}