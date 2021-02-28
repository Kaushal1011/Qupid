import React from "react";
// import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import Box from "@material-ui/core/Box";

import Typography from "@material-ui/core/Typography";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import Navbar from "./components/navbar";
import HomeImg from "./img/home.png";

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

// const drawerWidth = 240;

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
        height: 1500,
    },
}));

export default function Home() {
    const classes = useStyles();

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
                            <Grid item xs={12}>
                                <Paper className={classes.paper}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12}>
                                            <Typography
                                                variant="h1"
                                                align="left"
                                            >
                                                Welcome to Qupid!
                                            </Typography>
                                            <Typography
                                                variant="h3"
                                                align="left"
                                            >
                                                The teams matchmaker!
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography
                                                variant="h5"
                                                align="left"
                                            >
                                                Qupid is a matchmaking service
                                                that is responsible for creating
                                                efficient teams for workplaces
                                                and classes. It is based on a
                                                custom made content based
                                                recommendation algorithm that
                                                uses a self trained word2vec
                                                model at its core. This model is
                                                trained from scrapping tweet
                                                data that has terms related to
                                                team users profiles.
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <img
                                                src={HomeImg}
                                                alt={"Pipeline flow"}
                                            />
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                            {/* Recent Deposits */}
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
