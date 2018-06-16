import React from 'react';
import Predicate from './Predicate';
import {Button, IconButton, Icon} from '@material-ui/core';
import { connect } from 'react-redux';
import { addPredicate, removePredicate, queryTable } from "../actions/predicate.actions";
import PropTypes from 'prop-types';
import '../styles/predicates.scss';

class Predicates extends React.Component {
    constructor() {
        super();
        this.removePredicate = this.removePredicate.bind(this);
        this.addPredicate = this.addPredicate.bind(this);
        this.searchHandler = this.searchHandler.bind(this);
    }

    removePredicate(id) {
        const that = this;
        return function() {
            that.props.removePredicate(id);
        };
    }

    searchHandler() {
        this.props.queryTable(this.props.predicate.items);
    }

    addPredicate() {
        this.props.addPredicate();
    }

    render() {
        const andButton = (
            <IconButton variant="contained" onClick={this.addPredicate} color="primary">
                <Icon>add</Icon>
            </IconButton>
        );
        const items = this.props.predicate.items.map((item, idx, array) => {
            return (
                <div key={item.id} className="predicate-container">

                    <IconButton aria-label="Delete" color="secondary" onClick={this.removePredicate(item.id)}>
                        <Icon>delete</Icon>
                    </IconButton>
                    {idx === array.length - 1 && andButton}
                    <Predicate item={item}/>
                </div>
            );
        });

        return (
            <div className="predicates-container">
                {items}
                <Button variant="contained" onClick={this.searchHandler} color="primary">Search</Button>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    predicate: state.predicate
});

Predicates.propTypes = {
    predicate: PropTypes.object.isRequired,
    addPredicate: PropTypes.func.isRequired,
    removePredicate: PropTypes.func.isRequired,
    queryTable: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { addPredicate, removePredicate, queryTable })(Predicates)