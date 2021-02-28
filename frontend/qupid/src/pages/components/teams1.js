import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
// import CssBaseline from "@material-ui/core/CssBaseline";

import Typography from "@material-ui/core/Typography";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TeamCreate from "../img/teams1.png";

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
        height: 1000,
    },
}));

export default function Teams1(props) {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const [state, setState] = React.useState({
        checkedA: true,
    });
    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
        props.setBal(event.target.checked);
    };
    return (
        <>
            <Grid container spacing={3}>
                {/* Chart */}
                <Grid item xs={6}>
                    <Paper className={fixedHeightPaper}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Typography variant="h3">
                                    How Team Creation Works.
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <img src={TeamCreate} alt="How teams work" />
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={fixedHeightPaper}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Typography variant="h3">
                                    Team Settings
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="standard-numberofmem"
                                    label="Number of members in a team"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    fullWidth
                                    defaultValue={2}
                                    onChange={(e) => {
                                        props.setNomt(parseInt(e.target.value));
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="standard-numberofteam"
                                    label="Number of Teams"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    fullWidth
                                    defaultValue={2}
                                    onChange={(e) => {
                                        props.setNot(parseInt(e.target.value));
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={state.checkedA}
                                            onChange={handleChange}
                                            name="checkedA"
                                        />
                                    }
                                    label="Balance Teams"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => {
                                        props.begincallback();
                                    }}
                                >
                                    Begin Process
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
}
