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
import Navbar from "./components/navbar";

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
}));

export default function AddUser() {
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
                            <Grid item xs={6}>
                                <Paper className={fixedHeightPaper}>
                                    {/* Fields here Fullname, Email, Password, Role, Sp1, Sp2, Sp3, Organisation */}
                                    <Grid container spacing={3}>
                                        <Grid item xs={12}>
                                            <Typography variant="h3">
                                                Example
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                id="fullnameeg"
                                                label="Fullname: Kaushal Patil"
                                                variant="filled"
                                                disabled
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                id="emaileg"
                                                label="email: kaushalpatil10@gmail.com"
                                                variant="filled"
                                                disabled
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                type="password"
                                                id="passwordeg"
                                                label="password"
                                                variant="filled"
                                                disabled
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                id="roleeg"
                                                label="role: Programmer"
                                                variant="filled"
                                                disabled
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField
                                                id="sp1"
                                                label="Specialisation 1: python"
                                                variant="filled"
                                                disabled
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField
                                                id="sp2"
                                                label="Specialisation 2: dl"
                                                variant="filled"
                                                disabled
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField
                                                id="sp3"
                                                label="Specialisation 3: javascript"
                                                variant="filled"
                                                disabled
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                id="org"
                                                label="Organisation: Ahmedabad University"
                                                variant="filled"
                                                disabled
                                                fullWidth
                                            />
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                            {/* Recent Deposits */}
                            <Grid item xs={6}>
                                <Paper className={fixedHeightPaper}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12}>
                                            <TextField
                                                id="fullnameeg"
                                                label="Fullname"
                                                variant="filled"
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                id="emaileg"
                                                label="Email"
                                                variant="filled"
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                type="password"
                                                id="passwordeg"
                                                label="Password"
                                                variant="filled"
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                id="roleeg"
                                                label="Role"
                                                variant="filled"
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField
                                                id="sp1"
                                                label="Specialisation 1"
                                                variant="filled"
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField
                                                id="sp2"
                                                label="Specialisation 2"
                                                variant="filled"
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField
                                                id="sp3"
                                                label="Specialisation 3"
                                                variant="filled"
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                id="org"
                                                label="Organisation"
                                                variant="filled"
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                            >
                                                Create User
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Paper>
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
