import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CognitoUserPool, CognitoUser } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "eu-west-1_MJBqxzhDx", // Replace with your User Pool ID
  ClientId: "37593f7gir509vcsro2hhon7f", // Replace with your App Client ID
};

const userPool = new CognitoUserPool(poolData);
const ConfirmSignUpForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const userData = {
      Username: username,
      Pool: userPool,
    };
    const cognitoUser = new CognitoUser(userData);
    cognitoUser.confirmRegistration(code, true, (err, result) => {
      if (err) {
        console.error(err);
        setError(err.message || "Confirmation failed.");
        return;
      }

      console.log("Confirmation result:", result);
      alert("Signup confirmed! Please sign in.");
      navigate("/authPage");
    });
  //   try {
  //     const response = await fetch("https://j5m40k2ww1.execute-api.eu-west-1.amazonaws.com/prod/auth/confirm_signup", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ username, code }),
  //     });

  //     if (!response.ok) throw new Error("Confirmation failed");

  //     alert("Signup confirmed! Please sign in.");
  //     navigate("/authPage");
  //   } catch (error) {
  //     console.error(error);
  //     alert("Error confirming sign up");
  //   }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 400, mx: "auto", mt: 10 }}>
      <Typography variant="h5" align="center">Confirm Your Signup</Typography>
      <TextField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} fullWidth />
      <TextField label="Confirmation Code" value={code} onChange={(e) => setCode(e.target.value)} fullWidth />
      {error && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}  
      <Button variant="contained" color="primary" onClick={handleConfirm}>
        Confirm
      </Button>
    </Box>
  );
};

export default ConfirmSignUpForm;
