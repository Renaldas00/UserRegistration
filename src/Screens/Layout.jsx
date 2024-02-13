import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Box, List, ListItem, Container } from "@mui/material";
import Navigation from "../Components/UI/Navigation/navigation";
import AuthForm from "./Authentification/Authentication";
import Screen from "./Main/Screen";

export default function Layout() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
        }
    }, [navigate]);

    return (
        <Box>
            <List>
                <ListItem button key="Navigation">
                    <Navigation />
                </ListItem>
            </List>
            <Container sx={{ mt: 10 }}>
                <Routes>
                    <Route path="/login" element={<AuthForm />} />
                    <Route path="/" element={<Screen />} />
                </Routes>
            </Container>
        </Box>
    );
}
