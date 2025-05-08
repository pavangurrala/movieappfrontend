import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {useAuth} from "../../contexts/authContext";
const SignUpPage = () => {
  const {setUsername, setEmailId} = useAuth();  
  const [email, setEmailInput] = useState("");
  const [username, setUsernameInput] = useState(""); // NEW
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "https://hrgy437sgg.execute-api.eu-west-1.amazonaws.com/prod/auth/signup",
        {
          email,
          username, // SEND username
          password,
        }
      );
      setUsername(username);
      setEmailId(email);
      console.log("Sign-up successful:", response.data);
      navigate("/confirm-signup"); // navigate to home on success
    } catch (err: any) {
      setError(err.response?.data?.message || "Sign-up failed.");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSignUp}
      sx={{ maxWidth: 400, margin: "auto", mt: 8 }}
    >
      <Typography variant="h5" gutterBottom>
        Sign Up
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
        label="Email"
        type="email"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmailInput(e.target.value)}
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
        Sign Up
      </Button>
    </Box>
  );
};

export default SignUpPage;
