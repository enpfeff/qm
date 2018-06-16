import React from 'react';
import C from '../constants/predicate.constants';
import Predicate from './Predicate';
import {Button} from '@material-ui/core';

export default class Predicates extends React.Component {
    constructor() {
        super();
        this.state = {
            // always want at least one default it to a string type
            predicateItems: [{
                type: C.STRING
            }]
        };

        this.buttonClickHandler = this.buttonClickHandler.bind(this);
    }

    buttonClickHandler(e) {
        console.log(e)
    }

    render() {
        const items = this.state.predicateItems.map((item, idx) => {
            return (
                <div key={idx}>
                    <Predicate item={item}/>
                </div>
            );
        });

        return (
            <React.Fragment>
                <div className="predicate-container">{items}</div>
                <Button variant="contained" onClick={this.buttonClickHandler} color="primary">And</Button>
            </React.Fragment>
        );
    }
}