import React, {useContext} from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import Grid from "@mui/material/Grid";
//import IconButton from "@mui/material/IconButton";
import img from '../../images/film-poster-placeholder.png';
import { BaseTvProps } from "../../types/interfaces"; 
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { MoviesContext } from "../../contexts/moviesContext";
const styles = {
    card: { maxWidth: 345 },
    media: { height: 500 },
    avatar: {
      backgroundColor: "rgb(255, 0, 0)",
    },
  };
  interface TvCardProps  {
    tvshow: BaseTvProps;
    action: (t: BaseTvProps) => React.ReactNode;
  } // 
  debugger
  const TvCard: React.FC<TvCardProps> = ({tvshow, action}) => {
    const { favouritesTV} = useContext(MoviesContext);//NEW
    
    const isFavourite = favouritesTV.find((id) => id === tvshow.id)? true : false;//NEW
    console.log(isFavourite);
    // const handleAddToFavourite = (e: MouseEvent<HTMLButtonElement>) => {
    //   e.preventDefault();
    //   addToFavourites(movie);
    // };
    return (
        <Card sx={styles.card}>
            <CardHeader
        avatar={
          isFavourite ? (
            <Avatar sx={styles.avatar}>
              <FavoriteIcon />
            </Avatar>
          ) : null
        }
        title={
          <Typography variant="h5" component="p">
            {tvshow.name}{" "}
          </Typography>
        }
      />
            <CardMedia
        sx={styles.media}
        image={
            tvshow.poster_path
            ? `https://image.tmdb.org/t/p/w500/${tvshow.poster_path}`
            : img
        }
      />
      <CardContent>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <CalendarIcon fontSize="small" />
              {tvshow.first_air_date}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <StarRateIcon fontSize="small" />
              {"  "} {tvshow.vote_average }{" "}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
      {action(tvshow)}
        <Link to={`/tv/${tvshow.id}`}>
          <Button variant="outlined" size="medium" color="primary">
            More Info ...
          </Button>
        </Link>
      </CardActions>
        </Card>
    )
  }
  export default TvCard;