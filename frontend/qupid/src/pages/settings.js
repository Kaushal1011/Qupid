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
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Navbar from "./components/navbar";
import PeopleIcon from "@material-ui/icons/People";
import RefreshIcon from "@material-ui/icons/Refresh";
import DnsIcon from "@material-ui/icons/Dns";
import SystemUpdateAltIcon from "@material-ui/icons/SystemUpdateAlt";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="/">
                Qupid
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const drawerWidth = 240;

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
        padding: theme.spacing(2),
        display: "flex",
        overflow: "auto",
        flexDirection: "column",
    },
    fixedHeight: {
        height: 600,
    },
    root2: {
        width: "100%",
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function Settings() {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const auth = window.localStorage.getItem("token") ? true : false;
    const token = window.localStorage.getItem("token");
    return (
        <>
            <Navbar></Navbar>
            <div className={classes.root}>
                <CssBaseline />

                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />

                    <Container className={classes.container}>
                        <Grid container spacing={3}>
                            {/* Chart */}
                            <Grid item xs={8}>
                                <Paper className={fixedHeightPaper}>
                                    <List className={classes.root2}>
                                        <ListItem fullwidth>
                                            <ListItemIcon>
                                                <PeopleIcon />
                                            </ListItemIcon>
                                            <ListItemText
                                                id="updateds"
                                                primary="Update users dataset in pipeline"
                                                secondary="More details."
                                            />
                                            <ListItemSecondaryAction>
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    onClick={() => {}}
                                                >
                                                    Update dataset
                                                </Button>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    </List>
                                    {/*  */}
                                    <List className={classes.root2}>
                                        <ListItem fullwidth>
                                            <ListItemIcon>
                                                <RefreshIcon />
                                            </ListItemIcon>
                                            <ListItemText
                                                id="refresh"
                                                primary="Refresh Dataset"
                                                secondary="More details."
                                            />
                                            <ListItemSecondaryAction>
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    onClick={() => {}}
                                                >
                                                    Refresh Dataset
                                                </Button>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    </List>
                                    {/*  */}
                                    <List className={classes.root2}>
                                        <ListItem fullwidth>
                                            <ListItemIcon>
                                                <DnsIcon />
                                            </ListItemIcon>
                                            <ListItemText
                                                id="retrain"
                                                primary="Retrain Core Word2Vec Model"
                                                secondary="More details."
                                            />
                                            <ListItemSecondaryAction>
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    onClick={() => {}}
                                                >
                                                    Retrain Model
                                                </Button>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    </List>
                                    {/*  */}
                                    <List className={classes.root2}>
                                        <ListItem fullwidth>
                                            <ListItemIcon>
                                                <SystemUpdateAltIcon />
                                            </ListItemIcon>
                                            <ListItemText
                                                id="maintain"
                                                primary="Perform Full Maintainence on Pipeline. Retrain + Refresh"
                                                secondary="More details."
                                            />
                                            <ListItemSecondaryAction>
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    onClick={() => {}}
                                                >
                                                    Maintain
                                                </Button>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    </List>
                                </Paper>
                            </Grid>
                            {/* Recent Deposits */}
                            <Grid item xs={4}>
                                <Paper className={fixedHeightPaper}></Paper>
                            </Grid>
                            {/* Recent Orders */}
                            <Grid item xs={12}>
                                <Paper className={classes.paper}>
                                    {/* <Orders /> */}
                                </Paper>
                            </Grid>
                        </Grid>
                        <Box pt={4}>
                            <Copyright />
                        </Box>
                    </Container>
                </main>
            </div>
        </>
    );
}
