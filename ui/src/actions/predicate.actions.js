import { ADD_PREDICATE, REMOVE_PREDICATE , QUERY_TABLE, UPDATE_PREDICATE} from "./predicate.types";

let API_ENDPOINT = 'http://localhost:3002';
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

export const queryTable = (items) => dispatch => {
    const postData = {
        predicates: items
    };
    fetch(`${API_ENDPOINT}/predicate`, {
        method: 'POST',
        body: JSON.stringify(postData),
        headers: {
            'content-type': 'application/json'
        },
        cache: 'no-cache'
    })
        .then(res => res.json())
        .then(res => dispatch({
            type: QUERY_TABLE,
            payload: res.sql
        }));
};