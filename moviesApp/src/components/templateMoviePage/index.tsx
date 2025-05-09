import React from "react";
import MovieHeader from "../headerMovie";
import Grid from "@mui/material/Grid";
// import ImageList from "@mui/material/ImageList";
// import ImageListItem from "@mui/material/ImageListItem";
import { getMovieImages } from "../../api/tmdb-api";
import { MovieImage, MovieDetailsProps } from "../../types/interfaces";
import { useQuery } from "react-query";
import Spinner from '../spinner';
import Slider from "react-slick"; // Carousel library
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// const styles = {
//     gridListRoot: {
//         display: "flex",
//         flexWrap: "wrap",
//         justifyContent: "space-around",
//     },
//     gridListTile: {
//         width: 450,
//         height: '100vh',
//     },
// };

interface TemplateMoviePageProps {
    movie: MovieDetailsProps;
    children: React.ReactElement;
}


const TemplateMoviePage: React.FC<TemplateMoviePageProps> = ({movie, children}) => {
    const { data, error, isLoading, isError } = useQuery<MovieImage[], Error>(
        ["images", movie.id],
        () => getMovieImages(movie.id)
    );

    if (isLoading) {
        return <Spinner />;
    }
    if (isError) {
        return <h1>{(error

        ).message}</h1>;
    }
    const images = data as MovieImage[];
    const CustomPrevArrow = (props: any) => (
        <div {...props} style={{ ...props.style, left: -20, zIndex: 2 }}>
          <ArrowBackIosIcon style={{ color: "black" }} />
        </div>
      );
      
      const CustomNextArrow = (props: any) => (
        <div {...props} style={{ ...props.style, right: -20, zIndex: 2 }}>
          <ArrowForwardIosIcon style={{ color: "black" }} />
        </div>
      );
      
    const sliderProps = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />
      };
    return (
        <>
            <MovieHeader {...movie} />

            <Grid container spacing={5} style={{ padding: "15px" }}>
                <Grid item xs={3}>
                    <div style={{ position: "relative", zIndex: 1 }}>
                    <Slider {...sliderProps}>
                        {images.slice(0,8).map((image: MovieImage)=>(
                            <div key = {image.file_path}>
                                <img 
                                src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                                alt={'Image alternative'}
                                style={{ width: "80%",         // reduce width
                                    height: "auto", 
                                    borderRadius: "8px", 
                                    margin: "40px auto",     // center the image
                                    display: "block"  }}
                                />
                            </div>
                        )
                        )}
                    </Slider>
                    </div>
                    
                    {/* <div>
                        <ImageList cols={1}>
                            {images.map((image: MovieImage) => (
                                <ImageListItem
                                    key={image.file_path}
                                    sx={styles.gridListTile}
                                    cols={1}
                                >
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                                        alt={'Image alternative'}
                                    />
                                </ImageListItem>
                            ))}
                        </ImageList>
                    </div> */}
                </Grid>

                <Grid item xs={9}>
                    {children}
                </Grid>
            </Grid>
        </>
    );
};

export default TemplateMoviePage;
