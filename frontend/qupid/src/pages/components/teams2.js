import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import Box from "@material-ui/core/Box";

import Typography from "@material-ui/core/Typography";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    title: {
        flexGrow: 1,
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: "100vh",
        overflow: "auto",
    },
    container: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        maxWidth: "90%",
    },
    paper: {
        padding: theme.spacing(3),
        display: "flex",
        overflow: "auto",
        flexDirection: "column",
    },
    fixedHeight: {
        height: 700,
    },
}));

export default function Teams2(props) {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    let rows = [];
    for (var i = 0; i < props.numberofmember; i++) {
        // note: we are adding a key prop here to allow react to uniquely identify each
        // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
        rows.push(
            <>
                <Grid item xs={4}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                id={i}
                                label="Id of wish user"
                                variant="filled"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="secondary">
                                Confirm Id
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={8}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            {/* role */}
                            <TextField
                                id={i}
                                label="Role of wished user"
                                variant="filled"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={4}>
                            {/* sp1 */}
                            <TextField
                                id={i}
                                label="Speciality 1 of wished user"
                                variant="filled"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={4}>
                            {/* sp2 */}
                            <TextField
                                id={i}
                                label="Speciality 2 of wished user"
                                variant="filled"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={4}>
                            {/* sp3 */}
                            <TextField
                                id={i}
                                label="Speciality 3 of wished user"
                                variant="filled"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            {/* button to create */}
                            <Button variant="contained" color="secondary">
                                Create Wished User
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </>
        );
    }
    return (
        <>
            <Grid container spacing={3}>
                {/* Chart */}
                <Grid item xs={8}>
                    <Paper className={fixedHeightPaper}>
                        <Grid container spacing={3}>
                            {rows}
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>
                        <Typography variant="h3">
                            Existing Artificial Users
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
}

Teams2.defaultProps = {
    numberofmember: 4,
    numberofteams: 1,
    balance: false,
};
