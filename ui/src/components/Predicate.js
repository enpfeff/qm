import React from 'react';
import {InputLabel, Select, MenuItem, FormControl, TextField} from '@material-ui/core';
import C from '../constants/predicate.constants';
import '../styles/predicate.scss';

const predicateFields = [
    { pretty: 'User email', key: 'userEmail', type: C.STRING},
    { pretty: 'screen width', key: 'screenWidth', type: C.NUMBER},
    { pretty: 'screen height', key: 'screenHeight', type: C.NUMBER},
    { pretty: '# of visits', key: 'numberOfVisits', type: C.NUMBER},
    { pretty: 'First Name', key: 'firstName', type: C.STRING},
    { pretty: 'Last Name', key: 'lastName', type: C.STRING},
    { pretty: 'Page Response time (ms)', key: 'pageResponseTime', type: C.NUMBER},
    { pretty: 'Domain', key: 'domain', type: C.STRING},
    { pretty: 'Page Path', key: 'pagePath', type: C.STRING}
];

const filterFieldString = [
    { pretty: 'starts with', key: 'startsWith' },
    { pretty: 'does not start with', key: 'doesntStartWith' },
    { pretty: 'equals', key: 'equals' },
    { pretty: 'does not equal', key: 'doesntEqual' },
    { pretty: 'contains', key: 'contains' },
    { pretty: 'in list', key: 'inList' },
    { pretty: 'not in list', key: 'notInList' },
    { pretty: 'contains all', key: 'containsAll' }
];
const filterFieldNumber = [
    { pretty: 'range', key: 'range' },
    { pretty: 'less than or equal', key: 'lessTHanOrEqual' },
    { pretty: 'equals', key: 'equals' },
    { pretty: 'does not equal', key: 'doesntEqual' },
    { pretty: 'greater than or equal', key: 'greaterThanOrEqual' }
];

class Predicate extends React.Component {
    constructor() {
        super();
        this.state = {
            predicateField: '',
            filterField: '',
            filterValue: '',
            rangeValue: '',
            control: {
                disableAction: true,
                type: undefined
            }
        };

        this.predicateFieldHandler = this.predicateFieldHandler.bind(this);
        this.filterFieldHandler = this.filterFieldHandler.bind(this);
        this.filterValueHandler = this.filterValueHandler.bind(this);
    }

    predicateFieldHandler(e) {
        const predicateField = e.target.value;
        const type = predicateFields.find(item => item.key === predicateField).type;

        this.setState({
            predicateField,
            filterField: '',
            filterValue: '',
            control: {
                type,
                disableAction: false
            }
        });
    }

    filterFieldHandler(e) {
        const filterField = e.target.value;
        this.setState({filterField});
    }

    filterValueHandler(key) {
        const that = this;
        return function(e) {
            that.setState({[key]: e.target.value});
        }
    }

    render() {
        let filterFieldItems = [];
        const predicateFieldItems = predicateFields.map(field => <MenuItem key={field.key} value={field.key}>{field.pretty}</MenuItem>);

        // determine what the filter fields should look like
        if(this.state.control.type) {
            const fields = this.state.control.type === C.STRING ? filterFieldString : filterFieldNumber;
            filterFieldItems = fields.map(filter => <MenuItem key={filter.key} value={filter.key}>{filter.pretty}</MenuItem>);
        }

        return (
            <div className="qm-root-element">
                <FormControl className="qm-form-control">
                    <InputLabel>Field</InputLabel>
                    <Select
                        value={this.state.predicateField}
                        onChange={this.predicateFieldHandler}
                        inputProps={{
                            name: 'predicateField',
                        }}
                    >
                        {predicateFieldItems}
                    </Select>
                </FormControl>

                {this.state.control.type === C.NUMBER && <div className="is-box">is</div>}

                <FormControl disabled={this.state.control.disableAction} className="qm-form-control">
                    <InputLabel>Filter</InputLabel>
                    <Select
                        value={this.state.filterField}
                        onChange={this.filterFieldHandler}
                        inputProps={{
                            name: 'filterField',
                        }}
                    >
                        {filterFieldItems}
                    </Select>
                </FormControl>

                <TextField
                    id="name"
                    label="Value"
                    disabled={this.state.control.disableAction}
                    value={this.state.filterValue}
                    onChange={this.filterValueHandler('filterValue')}
                    margin="normal"
                />
                {(this.state.filterField === 'range') && (
                    <React.Fragment>
                        <div className="is-box">and</div>
                        <TextField
                            label="Value"
                            value={this.state.rangeValue}
                            onChange={this.filterValueHandler('rangeValue')}
                            margin="normal"
                        />
                    </React.Fragment>
                )}
            </div>
        );
    }
}

export default Predicate;