import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import Sidebar from "./sidebar";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function Navbar() {
    const classes = useStyles();
    const auth = window.localStorage.getItem("token") ? true : false;

    const handleClick = () => {
        window.localStorage.removeItem("token");
        window.location.href = "/";
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Sidebar />
                    <Typography variant="h6" className={classes.title}>
                        Qupid: The teams matchmaker!
                    </Typography>
                    {auth && (
                        <div>
                            <IconButton
                                aria-label="logout button"
                                edge="start"
                                className={classes.menuButton}
                                onClick={handleClick}
                                color="inherit"
                            >
                                <ExitToAppIcon />
                            </IconButton>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
}
