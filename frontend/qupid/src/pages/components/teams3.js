import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

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

export default function Teams3(props) {
    const classes = useStyles();
    console.log(props);
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    let rows = [];
    for (var i = 0; i < props.numberofteam; i++) {
        rows.push(
            <>
                <Grid item xs={12}>
                    <Typography variant="h5">{"Team " + (i + 1)}</Typography>
                </Grid>
                <Grid item xs={12}>
                    {props.teams["team" + (i + 1)].map((elem, i) => {
                        return (
                            <Paper className={classes.paper}>
                                <Grid item xs={12}>
                                    <Typography variant="body1">
                                        {"Member " + (i + 1)}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body1">
                                        {"Fullname: " + elem.fullname}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body1">
                                        {"Email: " + elem.email}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body1">
                                        {"Role: " + elem.role}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body1">
                                        {"Specialities: " +
                                            elem.specialities.toString()}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body1">
                                        {"Org: " + elem.organisation}
                                    </Typography>
                                </Grid>
                            </Paper>
                        );
                    })}
                </Grid>
            </>
        );
    }
    return (
        <>
            <Grid container spacing={3}>
                {/* Chart */}
                <Grid item xs={12}>
                    <Paper className={fixedHeightPaper}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Typography variant="h4">
                                    Your created teams
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={3}>
                                    {rows}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
}

Teams3.defaultProps = {
    numberofmember: 4,
    numberofteam: 3,
    teams: {
        metadata: {
            numberofmem: 2,
            numberofteams: 2,
            balance: true,
            wishuserids: [
                "603953ab4f8181a538bf3088",
                "603aa29a635cc066c2f64844",
            ],
        },
        team1: [
            {
                _id: "603c03cba9426a62058cce75",
                fullname: "Kaushal Patil 2",
                email: "kaushalpatil10@gmail.com",
                role: "fullstack",
                specialities: [
                    "python",
                    "javascript",
                    "backend",
                    "frontend",
                    "deeplearning",
                ],
                organisation: "Ahmedabad University",
            },
            {
                _id: "603a517d4c279eb11e503156",
                fullname: "Kaushal Patil",
                email: "kaushalpatil1@gmail.com",
                role: "github",
                specialities: [
                    "python",
                    "javascript",
                    "backend",
                    "frontend",
                    "deeplearning",
                ],
                organisation: "Ahmedabad University",
            },
        ],
        team2: [
            {
                _id: "60354924a73028d50dc270c1",
                fullname: "Kaushal Patil",
                email: "kaushalpatil10@gmail.com",
                role: "fullstack",
                specialities: [
                    "python",
                    "javascript",
                    "backend",
                    "frontend",
                    "deeplearning",
                ],
                organisation: "Ahmedabad University",
            },
            {
                _id: "603aa2c6635cc066c2f64846",
                fullname: "Kaushal Patil",
                email: "kaushalpatil10@gmail.com",
                role: "frontend",
                specialities: [
                    "html",
                    "frontend",
                    "css",
                    "frontend",
                    "deeplearning",
                ],
                organisation: "Ahmedabad University",
            },
        ],
    },
};
