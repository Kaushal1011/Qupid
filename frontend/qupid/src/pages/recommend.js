import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import Box from "@material-ui/core/Box";

import Typography from "@material-ui/core/Typography";

import Container from "@material-ui/core/Container";

import Link from "@material-ui/core/Link";

import Navbar from "./components/navbar";
import Teams1 from "./components/teams1";
import Teams2 from "./components/teams2";
import Teams3 from "./components/teams3";
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
        padding: theme.spacing(2),
        display: "flex",
        overflow: "auto",
        flexDirection: "column",
    },
    fixedHeight: {
        height: 600,
    },
}));

export default function Recommend() {
    const classes = useStyles();
    const [page, setPage] = useState(1);
    // number of members in a team
    const [nomt, setNomt] = useState(2);
    // number of teams
    const [not, setNot] = useState(2);
    const [bal, setBal] = useState(true);
    const [teamsmade, setTeams] = useState({});
    function begincallback() {
        setPage(2);
        return;
    }
    function recommendcallback(wuserids) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            numberofmem: nomt,
            numberofteams: not,
            balance: bal,
            wishuserids: wuserids,
        });

        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        fetch("http://localhost:8000/data/recommend", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                alert("your team recommendations are ready");
                setTeams(result["data"]);
                setPage(3);
            })
            .catch((error) => console.log("error", error));
    }
    let midjsx;
    if (page === 1) {
        midjsx = (
            <Teams1
                setNot={setNot}
                setNomt={setNomt}
                setBal={setBal}
                begincallback={begincallback}
            />
        );
    } else if (page === 2) {
        midjsx = (
            <Teams2
                numberofmember={nomt}
                numberofteam={not}
                balance={bal}
                teamscallback={recommendcallback}
            />
        );
    } else {
        midjsx = (
            <Teams3
                numberofmember={nomt}
                numberofteam={not}
                teams={teamsmade}
            />
        );
    }

    return (
        <>
            <Navbar></Navbar>
            <div className={classes.root}>
                <CssBaseline />

                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />

                    <Container className={classes.container}>
                        {midjsx}
                        <Box pt={4}>
                            <Copyright />
                        </Box>
                    </Container>
                </main>
            </div>
        </>
    );
}
