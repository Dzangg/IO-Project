import React, { useState, useEffect } from "react";
import { Container, Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
export default function Login() {
  localStorage.removeItem("token");

  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const handleUserChange = (event) => {
    const { name, value } = event.target;
    setUser((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const validateInputs = () => {
    return user.email == "" || user.password == "";
  };

  const navigateToMainPage = (jsonData) => {
    navigate("/", { state: { jsonData } });
  };

  const [token, setToken] = useState();
  const loginUser = async () => {
    if (!validateInputs()) {
      try {
        const response = await fetch("http://localhost:3000/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });

        if (!response.ok) {
          throw new Error("Error fetching data: " + response.status);
        }
        const jsonData = await response.json();

        setToken(jsonData.token);
        navigateToMainPage(jsonData);
        localStorage.setItem("token", jsonData.token);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  return (
    <Container
      maxWidth="sm"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        style={{
          flexDirection: "column",
          width: "100%",
        }}
      >
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Logowanie
        </Typography>

        <TextField
          name="email"
          label="email"
          onChange={handleUserChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="password"
          label="password"
          onChange={handleUserChange}
          type="password"
          fullWidth
          margin="normal"
        />
        <Button variant="contained" type="submit" onClick={loginUser} fullWidth>
          Zaloguj
        </Button>
        <Button
          variant="contained"
          type="submit"
          fullWidth
          sx={{ mt: "10px" }}
          onClick={() => {
            navigate("/register");
          }}
        >
          Rejestracja
        </Button>
      </Box>
    </Container>
  );
}
