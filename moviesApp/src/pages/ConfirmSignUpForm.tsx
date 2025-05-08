import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ConfirmSignUpForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const handleConfirm = async () => {
    try {
      const response = await fetch("https://j5m40k2ww1.execute-api.eu-west-1.amazonaws.com/prod/auth/confirm_signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, code }),
      });

      if (!response.ok) throw new Error("Confirmation failed");

      alert("Signup confirmed! Please sign in.");
      navigate("/authPage");
    } catch (error) {
      console.error(error);
      alert("Error confirming sign up");
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 400, mx: "auto", mt: 10 }}>
      <Typography variant="h5" align="center">Confirm Your Signup</Typography>
      <TextField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} fullWidth />
      <TextField label="Confirmation Code" value={code} onChange={(e) => setCode(e.target.value)} fullWidth />
      <Button variant="contained" color="primary" onClick={handleConfirm}>
        Confirm
      </Button>
    </Box>
  );
};

export default ConfirmSignUpForm;
