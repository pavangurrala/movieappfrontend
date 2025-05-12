import React, { useState } from "react";
import FilterCard from "../FilterTVCard";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import { BaseTvProps } from "../../types/interfaces";

export const titleFilter = (tvshow: BaseTvProps, value: string): boolean => {
    return tvshow.name.toLowerCase().search(value.toLowerCase()) !== -1;
};

export const genreFilter = (tvshow: BaseTvProps, value: string) => {
    const genreId = Number(value);
    const genreIds = tvshow.genre_ids;
    return genreId > 0 && genreIds ? genreIds.includes(genreId) : true;
};
export const sortOrder = (tvshows: BaseTvProps[], sortOrder: string) => {
    return [...tvshows].sort((a, b) => {
        if (sortOrder === "asc") return a.popularity - b.popularity;
        if (sortOrder === "desc") return b.popularity - a.popularity;
        return 0;
    });
};

const styles = {
    root: {
        backgroundColor: "#bfbfbf",
    },
    fab: {
        marginTop: 8,
        position: "fixed",
        top: 20,
        right: 2,
    },
};

interface TvFilterUIProps {
    onFilterValuesChange: (f: string, s: string) => void;
    titleFilter: string;
    genreFilter: string;
    sortOrder:string;
    
}


const TvFilterUI: React.FC<TvFilterUIProps> = ({ onFilterValuesChange, titleFilter, genreFilter, sortOrder }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <>
            <Fab
                color="secondary"
                variant="extended"
                onClick={() => setDrawerOpen(true)}
                sx={styles.fab}
            >
                Filter
            </Fab>
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            >
                <FilterCard
                    onUserInput={onFilterValuesChange}
                    titleFilter={titleFilter}
                    genreFilter={genreFilter}
                    sortOrder = {sortOrder}
                />
            </Drawer>
        </>
    );
};

export default TvFilterUI;
