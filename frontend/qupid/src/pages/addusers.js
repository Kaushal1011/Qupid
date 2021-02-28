import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import Box from "@material-ui/core/Box";

import Typography from "@material-ui/core/Typography";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";

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
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [role, setRole] = useState("");
    const [sp1, setSp1] = useState("");
    const [sp2, setSp2] = useState("");
    const [sp3, setSp3] = useState("");
    const [org, setOrg] = useState("");
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
                                                onChange={(e) => {
                                                    setFullname(e.target.value);
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                id="emaileg"
                                                label="Email"
                                                variant="filled"
                                                fullWidth
                                                onChange={(e) => {
                                                    setEmail(e.target.value);
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                type="password"
                                                id="passwordeg"
                                                label="Password"
                                                variant="filled"
                                                fullWidth
                                                onChange={(e) => {
                                                    setPass(e.target.value);
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                id="roleeg"
                                                label="Role"
                                                variant="filled"
                                                fullWidth
                                                onChange={(e) => {
                                                    setRole(e.target.value);
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField
                                                id="sp1"
                                                label="Specialisation 1"
                                                variant="filled"
                                                fullWidth
                                                onChange={(e) => {
                                                    setSp1(e.target.value);
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField
                                                id="sp2"
                                                label="Specialisation 2"
                                                variant="filled"
                                                fullWidth
                                                onChange={(e) => {
                                                    setSp2(e.target.value);
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField
                                                id="sp3"
                                                label="Specialisation 3"
                                                variant="filled"
                                                fullWidth
                                                onChange={(e) => {
                                                    setSp3(e.target.value);
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                id="org"
                                                label="Organisation"
                                                variant="filled"
                                                fullWidth
                                                onChange={(e) => {
                                                    setOrg(e.target.value);
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                onClick={() => {
                                                    var myHeaders = new Headers();
                                                    myHeaders.append(
                                                        "Content-Type",
                                                        "application/json"
                                                    );

                                                    var raw = JSON.stringify({
                                                        fullname: fullname,
                                                        email: email,
                                                        password: pass,
                                                        role: role,
                                                        specialities: [
                                                            sp1,
                                                            sp2,
                                                            sp3,
                                                        ],
                                                        organisation: org,
                                                        pipelined: 0,
                                                    });

                                                    var requestOptions = {
                                                        method: "POST",
                                                        headers: myHeaders,
                                                        body: raw,
                                                        redirect: "follow",
                                                    };

                                                    fetch(
                                                        "http://localhost:8000/user/",
                                                        requestOptions
                                                    )
                                                        .then((response) =>
                                                            response.text()
                                                        )
                                                        .then((result) => {
                                                            console.log(result);
                                                            alert(
                                                                "Created New User"
                                                            );
                                                        })
                                                        .catch((error) => {
                                                            console.log(
                                                                "error",
                                                                error
                                                            );
                                                            alert(
                                                                "error occured"
                                                            );
                                                        });
                                                }}
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
