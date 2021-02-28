import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import PeopleIcon from "@material-ui/icons/People";
import ListItemIcon from "@material-ui/core/ListItemIcon";

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
        height: 650,
    },
}));

export default function Teams2(props) {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const [wusers, setWusers] = useState([]);
    const [toggle, setToggle] = useState(0);
    const [roles, setRoles] = useState([]);
    const [sp1, setSp1] = useState("");
    const [sp2, setSp2] = useState("");
    const [sp3, setSp3] = useState("");
    const [org, setOrgs] = useState("");
    const [ids, setIds] = useState("");

    useEffect(() => {
        let emptylist = [];
        for (let i = 0; i < props.numberofmember; i++) {
            emptylist.push("a");
        }
        console.log(emptylist);
        setIds(emptylist);
    }, [props.numberofmember]);

    useEffect(() => {
        var requestOptions = {
            method: "GET",
            redirect: "follow",
        };

        fetch("http://localhost:8000/wishuser", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                setWusers(result.data[0]);
            })
            .catch((error) => console.log("error", error));
    }, [toggle]);

    let rows = [];
    for (var i = 0; i < props.numberofmember; i++) {
        // note: we are adding a key prop here to allow react to uniquely identify each
        // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
        let index = i;
        rows.push(
            <>
                <Grid item xs={4}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                id={i}
                                label={"Id of wish user " + (i + 1)}
                                variant="filled"
                                fullWidth
                                onChange={(e) => {
                                    let newlist = [...ids];
                                    newlist[index] = e.target.value;
                                    setIds(newlist);
                                }}
                            />
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
                            <Grid item xs={12}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <Typography variant="h3">
                                            Add A Custom Wish User
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        {/* role */}
                                        <TextField
                                            id={i}
                                            label="Role of wished user"
                                            variant="filled"
                                            fullWidth
                                            onChange={(e) => {
                                                setRoles(e.target.value);
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        {/* sp1 */}
                                        <TextField
                                            id={i}
                                            label="Speciality 1 of wished user"
                                            variant="filled"
                                            fullWidth
                                            onChange={(e) => {
                                                setSp1(e.target.value);
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        {/* sp2 */}
                                        <TextField
                                            id={i}
                                            label="Speciality 2 of wished user"
                                            variant="filled"
                                            fullWidth
                                            onChange={(e) => {
                                                setSp2(e.target.value);
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        {/* sp3 */}
                                        <TextField
                                            id={i}
                                            label="Speciality 3 of wished user"
                                            variant="filled"
                                            fullWidth
                                            onChange={(e) => {
                                                setSp3(e.target.value);
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        {/* role */}
                                        <TextField
                                            id={i}
                                            label="Org of wished user"
                                            variant="filled"
                                            fullWidth
                                            onChange={(e) => {
                                                setOrgs(e.target.value);
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        {/* button to create */}
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
                                                    role: roles,
                                                    specialities: [
                                                        sp1,
                                                        sp2,
                                                        sp3,
                                                    ],
                                                    organisation: org,
                                                });

                                                var requestOptions = {
                                                    method: "POST",
                                                    headers: myHeaders,
                                                    body: raw,
                                                    redirect: "follow",
                                                };

                                                fetch(
                                                    "http://localhost:8000/wishuser",
                                                    requestOptions
                                                )
                                                    .then((response) =>
                                                        response.text()
                                                    )
                                                    .then((result) => {
                                                        console.log(result);
                                                        alert(
                                                            result +
                                                                "\n Use this ID!"
                                                        );
                                                        setToggle(toggle + 1);
                                                    })
                                                    .catch((error) => {
                                                        console.log(
                                                            "error",
                                                            error
                                                        );
                                                        alert(error.toString());
                                                    });
                                            }}
                                        >
                                            Create Wished User
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h3">
                                    Base Your Team On
                                </Typography>
                            </Grid>
                            {rows}
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={fixedHeightPaper}>
                        <Typography variant="h3">
                            Existing Wish Users
                        </Typography>
                        <Grid container spacing={3}>
                            {wusers.map((elem) => {
                                return (
                                    <Grid item xs={12}>
                                        <List className={classes.root2}>
                                            <ListItem
                                                fullwidth
                                                className={classes.root2}
                                            >
                                                <ListItemIcon>
                                                    <PeopleIcon />
                                                </ListItemIcon>
                                                <ListItemText
                                                    id="updateds"
                                                    primary={elem.id}
                                                    secondary={elem.org}
                                                />
                                            </ListItem>
                                            <Typography
                                                variant="body1"
                                                justifyContent="left"
                                            >
                                                {"Role: " + elem.role}
                                                <br />
                                                {"Specialities: " +
                                                    elem.specialities.toString()}
                                            </Typography>
                                        </List>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                            props.teamscallback(ids);
                        }}
                        fullWidth
                    >
                        Make My Teams!
                    </Button>
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
