import React,{useState} from "react";
//import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "react-query";
import { getPopularMovieStars } from "../api/tmdb-api";
//import { Popularstars } from "../types/interfaces";
import { Person } from "../types/interfaces";
import ActorCard from "../components/actorcard";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Spinner from "../components/spinner";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
const PopularActorsPage:React.FC=()=>{
    const [pageNumber, setNumberPage] = useState(1)
    const{data, isLoading, error, isError} = useQuery(["popularActors",pageNumber],()=>getPopularMovieStars(pageNumber))
    if (isLoading) return <Spinner />;
    if (isError) {
        const err = error as Error
        return <Typography color="error">{err.message}</Typography>;
    }

    const actors:Person[] = data.results;
    const totalPages = data.total_pages

    return(
         <>
            <Typography
                variant = "h4"
                align = "center"
                fontWeight = "bold"
                gutterBottom
                sx={{mt:2}}
            >
                Popular Actors
            </Typography>
            <Grid container justifyContent="center">
                {actors.slice(0,14)?.map((actor)=>(
                    <Grid item key={actor.id}>
                        <ActorCard actor={actor}/>
                    </Grid>
                ))}
            </Grid>
            <Stack spacing={2} alignItems="center" sx={{my:4}}>
                <Pagination
                    count={Math.min(totalPages,20)}
                    page={pageNumber}                
                    onChange={(_,value)=>setNumberPage(value)}
                    color="primary"
                />
            </Stack>
         </>   
    )
}

export default PopularActorsPage