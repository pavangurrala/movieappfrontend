import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {useAuth} from "../../contexts/authContext";

const SignInPage = () => {
  const {setUsername} = useAuth();  
  const [username, setUsernameInput] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "https://hrgy437sgg.execute-api.eu-west-1.amazonaws.com/prod/auth/signin",
        {
          username,
          password,
        }
      );
      setUsername(username);
      
        console.log("Sign-in successful:", response.data);
        localStorage.setItem("username", username);
        navigate("/"); // Navigate to home on successful login
      
      
    } catch (err: any) {
      setError(err.response?.data?.message || "Sign-in failed.");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSignIn}
      sx={{ maxWidth: 400, margin: "auto", mt: 8 }}
    >
      <Typography variant="h5" gutterBottom>
        Sign In
      </Typography>
      <TextField
        label="Username"
        fullWidth
        margin="normal"
        value={username}
        onChange={(e) => setUsernameInput(e.target.value)}
        required
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {error && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
      >
        Sign In
      </Button>
    </Box>
  );
};

export default SignInPage;
