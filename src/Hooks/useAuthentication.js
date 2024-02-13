import { useState, useRef } from "react";
import { useSnackbarMessage } from "../Hooks/useSnackBarMessage";
import { useNavigate } from "react-router-dom";

export function useAuthentication() {
    const [formKey, setFormKey] = useState(0);
    const [loading, setLoading] = useState(false);
    const [isRegister, setIsRegister] = useState(false);

    const userName = useRef();
    const password = useRef();
    const email = useRef();
    const navigate = useNavigate();
    const { sendMessage } = useSnackbarMessage();

    async function handleAuthentification(event) {
        event.preventDefault();
        setLoading(true);
        const credentials = { userName: userName.current.value, password: password.current.value };

        const url = isRegister ? "https://localhost:7201/api/Accounts/signup" : `https://localhost:7201/api/Accounts/signin`;

        const successMessage = isRegister ? "Registration successful" : "Login successful";
        const errorMessage = isRegister ? "Registration failed" : "User doesnt exist";

        let response;
        try {
            response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify(credentials),
            });
        } catch (error) {
            setLoading(false);
            sendMessage(error, "error");
            throw error;
        } finally {
            if (response?.status === 201 || response?.status === 200) {
                const jwt = response ? await response.text() : null;
                localStorage.setItem("token", jwt);
                localStorage.setItem("userName", userName.current.value);
                setTimeout(() => {
                    setLoading(false);
                    sendMessage(successMessage, "success");
                    navigate("/");
                    handleReset();
                }, 2000);
            } else {
                setTimeout(() => {
                    setLoading(false);
                    sendMessage(errorMessage, "error");
                }, 2000);
            }
        }
    }

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    const handleToggleForm = () => {
        setIsRegister(!isRegister);
    };

    const handleReset = () => {
        setFormKey((prev) => prev + 1);
        setIsRegister(false);
        setLoading(false);
        if (userName.current) userName.current.value = "";
        if (password.current) password.current.value = "";
        if (email.current) email.current.value = "";
    };

    const refs = {
        userName,
        password,
        email,
    };

    const states = {
        formKey,
        loading,
        isRegister,
    };

    return {
        refs,
        states,
        handleToggleForm,
        handleAuthentification,
        handleLogout,
    };
}
