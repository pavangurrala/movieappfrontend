import React ,{useState}from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
// import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import Typography from "@mui/material/Typography";
import { TvDetailsProps } from "../../types/interfaces";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import TVShowReviews from '../tvShowReviews'

const styles = {
    chipSet: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        listStyle: "none",
        padding: 1.5,
        margin: 0,
    },
    chipLabel: {
        margin: 0.5,
    },
    fab: {
        position: "fixed",
        top: 50,
        right: 2,
    },
};

const TvShowDetails: React.FC<TvDetailsProps> = (tvshow) => {

    const [drawerOpen, setDrawerOpen] = useState(false); // New

    return (
        <>
            <Typography variant="h5" component="h3">
                Overview
            </Typography>

            <Typography variant="h6" component="p">
                {tvshow.overview}
            </Typography>

            <Paper component="ul" sx={styles.chipSet}>
                <li>
                    <Chip label="Genres" sx={styles.chipLabel} color="primary" />
                </li>
                {tvshow.genres.map((g) => (
                    <li key={g.name}>
                        <Chip label={g.name} />
                    </li>
                ))}
            </Paper>
            <Paper component="ul" sx={styles.chipSet}>
                {/* <Chip icon={<AccessTimeIcon />} label={`${tvshow.runtime} min.`} /> */}
                <Chip
                    icon={<MonetizationIcon />}
                    label={`${tvshow.toLocaleString()}`}
                />
                <Chip
                    icon={<StarRate />}
                    label={`${tvshow.vote_average} (${tvshow.vote_count}`}
                />
                <Chip label={`Released: ${tvshow.first_air_date}`} />
            </Paper>
            <Fab
                color="secondary"
                variant="extended"
                onClick={() => setDrawerOpen(true)}
                sx={styles.fab}
            >
                <NavigationIcon />
                Reviews
            </Fab>
            <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <TVShowReviews {...tvshow} />
            </Drawer>
        </>
    );
};
export default TvShowDetails;
