import React, { useState, MouseEvent } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useAuth } from "../../contexts/authContext";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
const styles = {
  title: {
    flexGrow: 1,
  },
};

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const SiteHeader: React.FC = () => {
  const navigate = useNavigate();
  const [anchorElPopular, setAnchorElPopular] = useState<null | HTMLElement>(null);
  const [anchorElFavourite, setanchorElFavourite] = useState<null | HTMLElement>(null);
  const [anchorElMobile, setAnchorElMobile] = useState<HTMLButtonElement | null>(null);
  const openPopular = Boolean(anchorElPopular);
  const openMobile = Boolean(anchorElMobile);
  const openFavourite = Boolean(anchorElFavourite);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const { username, setUsername, setEmailId, logout } = useAuth();
  const isLoggedIn = !!username;

  const handleLogout = () => {
    setUsername(null);
    setEmailId(null);
    logout();
    navigate("/authPage");
  };

  const handleMenuSelect = (pageURL: string) => {
    navigate(pageURL);
    setAnchorElPopular(null);
    setAnchorElMobile(null);
    setanchorElFavourite(null);
  };

  const handleMobileMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorElMobile(event.currentTarget);
  };

  const handlePopularMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorElPopular(event.currentTarget);
  };
  const handleFavouriteMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setanchorElFavourite(event.currentTarget);
  };

  return (
    <>
      <AppBar position="fixed" elevation={0} color="primary">
        <Toolbar>
          <Typography variant="h4" sx={styles.title}>
            MoviesNow
          </Typography>
          <Typography variant="h6" sx={styles.title}>
            All you ever wanted to know about Movies!
          </Typography>

          {isMobile ? (
            <>
              <IconButton
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMobileMenu}
                color="inherit"
                size="large"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElMobile}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={openMobile}
                onClose={() => setAnchorElMobile(null)}
              >
                <MenuItem onClick={() => handleMenuSelect("/")}>Home</MenuItem>
                <MenuItem onClick={() => handleMenuSelect("/movies/upcoming")}>Upcoming</MenuItem>
                <MenuItem onClick={() => handleMenuSelect("/movies/popular")}>Popular Movies</MenuItem>
                <MenuItem onClick={() => handleMenuSelect("/tv/popular")}>Popular Tv Shows</MenuItem>
                <MenuItem onClick={() => handleMenuSelect("/person/popular")}>Popular Actors</MenuItem>
                <MenuItem onClick={() => handleMenuSelect("/movies/favourites")}>Favourites</MenuItem>
                {isLoggedIn ? (
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                ) : (
                  <MenuItem onClick={() => navigate("/authPage")}>Sign In</MenuItem>
                )}
              </Menu>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => handleMenuSelect("/")}>
                Home
              </Button>
              <Button color="inherit" onClick={() => handleMenuSelect("/movies/upcoming")}>
                Upcoming
              </Button>

              {/* Popular Dropdown */}
              <Button color="inherit" 
              aria-haspopup="true"
              aria-controls="popular-menu"
              endIcon={<ArrowDropDownIcon />}
              onClick={handlePopularMenu}>
                Popular
              </Button>
              <Menu
                anchorEl={anchorElPopular}
                open={openPopular}
                onClose={() => setAnchorElPopular(null)}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
              >
                <MenuItem onClick={() => handleMenuSelect("/movies/popular")}>
                  Popular Movies
                </MenuItem>
                <MenuItem onClick={() => handleMenuSelect("/tv/popular")}>
                  Popular TV Shows
                </MenuItem>
                <MenuItem onClick={() => handleMenuSelect("/person/popular")}>
                  Popular Actors
                </MenuItem>
              </Menu>

              {/* Favourites as direct button */}
              {/* <Button color="inherit" onClick={() => handleMenuSelect("/movies/favourites")}>
                Favourites
              </Button> */}
              <Button color="inherit"
              aria-haspopup="true"
              aria-controls="popular-menu"
              endIcon={<ArrowDropDownIcon />}
              onClick={handleFavouriteMenu}
              >
                Favourites
              </Button>
              <Menu
              anchorEl={anchorElFavourite}
              open={openFavourite}
              onClose={()=>setanchorElFavourite(null)}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              >
                <MenuItem onClick={() => handleMenuSelect("/movies/favourites")}>
                  Favourite Movies
                </MenuItem>
                <MenuItem onClick={() => handleMenuSelect("/tv/favourites")}>
                  Favourite TV Shows
                </MenuItem>
              </Menu>

              {isLoggedIn ? (
                <>
                  <Typography variant="subtitle1" sx={{ mx: 2 }}>
                    <AccountCircleIcon sx={{ verticalAlign: "middle", mr: 1 }} />
                    {username}
                  </Typography>
                  <Button color="inherit" onClick={handleLogout}>
                    Logout
                  </Button>
                </>
              ) : (
                <Button color="inherit" onClick={() => navigate("/authPage")}>
                  Sign In
                </Button>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
};

export default SiteHeader;
