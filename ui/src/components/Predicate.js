import React from 'react';
import {IconButton, Icon, InputLabel, Select, MenuItem, FormControl, TextField} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import C from '../constants/predicate.constants';
import '../styles/predicate.scss';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'baseline',
        paddingBottom: 10
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 150,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 150,
    },
});

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
    constructor(props) {
        super(props);
        this.state = {
            predicateField: '',
            filterField: '',
            type: undefined,
            filterValue: '',
            control: {
                disableAction: true
            },
            rangeValue: ''
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
            type,
            control: {
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
        if(this.state.type) {
            const fields = this.state.type === C.STRING ? filterFieldString : filterFieldNumber;
            filterFieldItems = fields.map(filter => <MenuItem key={filter.key} value={filter.key}>{filter.pretty}</MenuItem>);
        }

        const { classes } = this.props;

        return (
            <form className={classes.root}>
                <FormControl className={classes.formControl}>
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

                {(this.state.type === C.NUMBER) ? <div className="is-box">is</div> : ''}

                <FormControl disabled={this.state.control.disableAction} className={classes.formControl}>
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
                    className={classes.textField}
                    disabled={this.state.control.disableAction}
                    value={this.state.filterValue}
                    onChange={this.filterValueHandler('filterValue')}
                    margin="normal"
                />
                {(this.state.filterField === 'range') ? (
                    <React.Fragment>
                        <div className="is-box">and</div>
                        <TextField
                            label="Value"
                            className={classes.textField}
                            value={this.state.rangeValue}
                            onChange={this.filterValueHandler('rangeValue')}
                            margin="normal"
                        />
                    </React.Fragment>
                ) : ''}
            </form>
        );
    }
}

export default withStyles(styles)(Predicate);