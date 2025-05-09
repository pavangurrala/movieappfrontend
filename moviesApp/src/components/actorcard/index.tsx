import React from "react";
import Card from "@mui/material/Card";
//import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
//import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
//import { Popularstars } from "../../types/interfaces";
import { Person } from "../../types/interfaces";
import { Link } from "react-router-dom";
interface ActorCardProps {
    actor: Person
}

const ActorCard: React.FC<ActorCardProps> = ({actor}) => {
    return(
        <Card sx ={{maxWidth: 200, margin:2}}>
            <Link to={`/actor/${actor.id}`} style={{ textDecoration: "none" }}>
            <CardMedia 
                component ="img" 
                height = "300"
                image = {
                    actor.profile_path?`https://image.tmdb.org/t/p/w300${actor.profile_path}`:"/placeholder.jpg"
                } 
                alt = {actor.name}
                style={{cursor:"pointer"}}
            />
            
            </Link>
            
            <CardContent>
                <Typography variant="h6" align="center" noWrap>
                    {actor.name}
                </Typography>
                <Typography variant="body2" align="center" color="text.secondary">
                    Popularity: {actor.popularity.toFixed(1)}
                </Typography>
            </CardContent>
        </Card>
    )
}


export default ActorCard