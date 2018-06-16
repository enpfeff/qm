import React from 'react';
import {CssBaseline, Typography, Divider, Grid, Paper} from '@material-ui/core';
import Predicates from './Predicates';
import PropTypes from 'prop-types';
import '../styles/app.scss';
import Result from './Result';
import {connect} from 'react-redux';

const styles = {
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
};

class App extends React.Component {

    render() {
        return (
            <React.Fragment>
                <CssBaseline/>
                <div style={styles.root}>
                    <Grid container style={styles.root} spacing={16}>
                        <Grid item>
                            <Paper>
                                <Grid container style={styles.inner} spacing={16}>
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
                        <Grid item>
                            <Result sql={this.props.predicate.sql} />
                        </Grid>
                    </Grid>
                </div>
            </React.Fragment>
        );
    }
}

App.propTypes = {
    predicate: PropTypes.object.isRequired
};


const mapProps = state => ({
    predicate: state.predicate
});

export default connect(mapProps)(App);