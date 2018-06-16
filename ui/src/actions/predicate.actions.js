import { ADD_PREDICATE, REMOVE_PREDICATE , QUERY_TABLE, UPDATE_PREDICATE} from "./predicate.types";

let API_ENDPOINT = 'http://locahost:3000';
let predicateId = 1;

export function addPredicate() {
    return {
        type: ADD_PREDICATE,
        payload: {
            id: ++predicateId,
            predicateField: '',
            filterField: '',
            filterValue: '',
            rangeValue: ''
        }
    };
}

export function updatePredicate(id, predicate) {
    return {
        type: UPDATE_PREDICATE,
        payload: {
            id,
            predicate
        }
    }
}

export function removePredicate(id) {
    return {
        type: REMOVE_PREDICATE,
        payload: id
    };
}

export const queryTable = () => dispatch => {
    const postData = {};
    fetch(`${API_ENDPOINT}/predicate`, {
        method: 'POST',
        post: JSON.stringify(postData)
    })
        .then(res => res.json())
        .then(res => dispatch({
            type: QUERY_TABLE,
            payload: res.sql
        }));
};