import {Paper, Typography} from '@material-ui/core';
import React from 'react';

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

export default Result;