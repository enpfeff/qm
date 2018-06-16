import {Paper, Typography} from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';

const style = {
    padding: 20,
};

const Result = ({sql}) => (
    <Paper style={style}>
        <Typography variant="body1" gutterBottom>
            {sql ? sql : 'No Result'}
        </Typography>
    </Paper>
);

Result.propTypes = {
    sql: PropTypes.string
};

export default Result;