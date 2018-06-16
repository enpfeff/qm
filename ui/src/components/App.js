import React from 'react';
import {CssBaseline, Typography, Divider, Grid, Paper} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import Predicates from './Predicates';
import PropTypes from 'prop-types';
import '../styles/app.scss';

const styles = () => ({
    root: {
        flexGrow: 1,
        flexDirection: 'column',
        paddingTop: 5
    },
    inner: {
        padding: 8,
        flexGrow: 1,
        flexDirection: 'column'
    }
});

class App extends React.Component {

    render() {
        const {classes} = this.props;

        return (
            <React.Fragment>
                <CssBaseline/>
                <div className={classes.root}>
                    <Grid container className={classes.root} spacing={16}>
                        <Grid item>
                            <Paper>
                                <Grid container className={classes.inner} spacing={16}>
                                    <Grid item>
                                        <Typography variant="headline" component="h3">
                                            Search for Sessions
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Divider/>
                                    </Grid>
                                    <Grid item>
                                        <Predicates/>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            </React.Fragment>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);