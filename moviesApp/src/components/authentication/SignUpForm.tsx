import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
//import axios from "axios";
import { CognitoUserPool, CognitoUserAttribute  } from "amazon-cognito-identity-js";
import {useAuth} from "../../contexts/authContext";
const poolData = {
    UserPoolId: "eu-west-1_MJBqxzhDx", // 🔁 Replace with your Cognito User Pool ID
    ClientId: "37593f7gir509vcsro2hhon7f",      // 🔁 Replace with your App Client ID
  };
  const userPool = new CognitoUserPool(poolData);

  
const SignUpPage = () => {
  const {setUsername, setEmailId} = useAuth();  
  const [email, setEmailInput] = useState("");
  const [username, setUsernameInput] = useState(""); // NEW
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const attributeList = [
    new CognitoUserAttribute({
      Name: "email",
      Value: email,
    }),
  ];
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    userPool.signUp(
        username,
        password,
        attributeList,
        [],
        (err, result) => {
          if (err) {
            setError(err.message || "Sign-up failed.");
            return;
          }
  
          // Save user info to context
          setUsername(username);
          setEmailId(email);
  
          console.log("Sign-up success:", result);
          navigate("/confirm-signup"); // Go to confirmation page
        }
      );
    
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
