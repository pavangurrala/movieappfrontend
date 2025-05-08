import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import SignInForm from "../components/authentication/SignInForm";
import SignUpForm from "../components/authentication/SignUpForm";

const AuthenticationPage: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 10 }}>
      <Typography variant="h4" align="center" gutterBottom>
        {isSignUp ? "Create an Account" : "Welcome Back"}
      </Typography>
      {isSignUp ? <SignUpForm /> : <SignInForm />}
      <Box textAlign="center" mt={2}>
        <Button onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp
            ? "Already have an account? Sign In"
            : "Don't have an account? Sign Up"}
        </Button>
      </Box>
    </Box>
  );
};

export default AuthenticationPage;
