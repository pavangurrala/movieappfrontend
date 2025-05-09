import React,{useState} from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getActorDetails, getActorCredits } from "../api/tmdb-api";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Spinner from "../components/spinner";
import CreditsMovieTemplate from "../components/templateMovieListPage";
import { BaseMovieProps } from "../types/interfaces";
import AddToFavouritesIcon from '../components/cardIcons/addToFavoutires'
import { Box, Pagination} from "@mui/material";
const movies_per_page = 6;
const ActorDetailsPage: React.FC=()=>{
    const {id} = useParams<{id:string}>();
    const [page, setPage] = useState(1);
    const {data: actor,isLoading: isLoadingActorDetails,isError: isErrorActorDetails,error: errorDetails,} = useQuery(["actorDetails", id], () => getActorDetails(Number(id)));
    const {data: credits,isLoading: isLoadingCredits,isError: isErrorCredits,error: errorCredits,} = useQuery<{ cast: BaseMovieProps[] }, Error>(
        ["credits",id],
        ()=>getActorCredits(Number(id))
    )
    console.log(credits)
    if (isLoadingActorDetails || isLoadingCredits) return <Spinner />;
    if (isErrorActorDetails) {
        const err = errorDetails as Error
        return <Typography color="error">{err.message}</Typography>;}
    if (isErrorCredits) {
        const err = errorCredits as Error
        return <Typography color="error">{err.message}</Typography>;}

    const castMovies = credits?.cast || [];
    const totalPages = Math.ceil(castMovies.length / movies_per_page);
    const paginatedMovies = castMovies.slice(
    (page - 1) * movies_per_page,
    page * movies_per_page
  );
    return(
        <Grid container spacing={4} padding={4}>
      <Grid item xs={12} sm={4}>
        <img
          src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
          alt={actor.name}
          style={{ width: "70%", borderRadius: "8px" }}
        />
      </Grid>
      <Grid item xs={12} sm={8}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>{actor.name}</Typography>
        <Typography variant="subtitle1" gutterBottom>{actor.known_for_department}</Typography>
        <Typography variant="body1" gutterBottom><strong>Born:</strong> {actor.birthday} in {actor.place_of_birth}</Typography>
        <Typography variant="body2" paragraph><strong>Biography:</strong><br />{actor.biography}</Typography>
      </Grid>
      <Grid item xs={12}>
      <Box sx={{padding:3}}>
        <CreditsMovieTemplate 
          title="Known For"
          movies = {paginatedMovies}
          action={(movie: BaseMovieProps) => {
            return <AddToFavouritesIcon {...movie} />
          }}/>
          {totalPages>1&&(
            <Box display="flex" justifyContent="center" mt={2}>
                <Pagination 
                count={totalPages}
                page={page}
                onChange={(e,value)=>setPage(value)}
                color="primary"/>
            </Box>
          )}
      </Box>
      </Grid>
      
    </Grid>
    )
}

export default ActorDetailsPage