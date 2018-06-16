import React from 'react';
import C from '../constants/predicate.constants';
import Predicate from './Predicate';
import {Button,FormControl,IconButton,Icon} from '@material-ui/core';
import '../styles/predicates.scss';

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
        this.setState({predicateItems: this.state.predicateItems.concat({})})
    }

    render() {
        const items = this.state.predicateItems.map((item, idx) => {
            return (
                <div key={idx} className="predicate-container">
                    <FormControl>
                        <IconButton aria-label="Delete" color="secondary">
                            <Icon>delete</Icon>
                        </IconButton>
                    </FormControl>
                    <Predicate item={item}/>
                </div>
            );
        });

        return (
            <React.Fragment>
                {items}
                <Button variant="contained" onClick={this.buttonClickHandler} color="primary">And</Button>
            </React.Fragment>
        );
    }
}