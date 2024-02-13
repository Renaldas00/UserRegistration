import { useState, useRef } from "react";
import { useSnackbarMessage } from "./useSnackBarMessage";
import useData from "./useData";

export default function useSubmit({ setFileName, fetchImage, fetchUserData, fetchUserLocation, setShowClearButton, setFileInputKey }) {
    const { getProfile } = useData();
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [selectedCity, setSelectedCity] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState([]);
    const [selectedDateTime, setSelectedDateTime] = useState(null);

    const city = useRef();
    const street = useRef();
    const country = useRef();
    const lastName = useRef();
    const firstName = useRef();
    const phoneNumber = useRef();
    const houseNumber = useRef();
    const fileInputRef = useRef();
    const emailAddress = useRef();
    const apartmentNumber = useRef();
    const socialSecurityCode = useRef();

    const { sendMessage } = useSnackbarMessage();
    const uuid = localStorage.getItem("token");

    async function handleActions(event, data, selectedFile, resetHandler) {
        event.preventDefault();
        event.stopPropagation();
        setLoading(true);

        const userData = {
            firstName: firstName.current?.value,
            lastName: lastName.current?.value,
            socialSecurityCode: socialSecurityCode.current?.value,
            emailAddres: emailAddress.current?.value,
            phoneNumber: phoneNumber.current?.value,
        };

        const formData = new FormData();
        formData.append("ImageName", selectedFile?.name);
        formData.append("Image", selectedFile);

        const successMessage = "Item added";
        const errorMessage = "Item not added";

        try {
            let response = null;
            let responseId = null;
            let response2 = null;
            let response3 = null;
            if (!data?.id) {
                response = await fetchUserData(userData, uuid);
                responseId = await response.json();
            }
            if (!data?.imageListId && data?.id) {
                response3 = await fetchImage(data?.id, uuid, formData);
            } else if (!data?.imageListId && !data?.id) {
                response3 = await fetchImage(responseId.id, uuid, formData);
            }
            if (!data?.locationListId && data?.id) {
                response2 = await fetchUserLocation(data?.id, uuid, selectedCountry, selectedCity, street, houseNumber, apartmentNumber);
            } else if (!data?.locationListId && !data?.id) {
                response3 = await fetchUserLocation(responseId.id, uuid, selectedCountry, selectedCity, street, houseNumber, apartmentNumber);
            }

            if (response?.ok) {
                setTimeout(() => {
                    setLoading(false);
                    getProfile();
                    sendMessage(successMessage, "success");
                }, 500);
            } else if (response2?.ok) {
                setTimeout(() => {
                    setLoading(false);
                    getProfile();
                    sendMessage(successMessage, "success");
                }, 500);
            } else if (response3?.ok) {
                setTimeout(() => {
                    setLoading(false);
                    getProfile();
                    sendMessage(successMessage, "success");
                    setFileName("");
                    setShowClearButton(false);
                    setFileInputKey((prevKey) => prevKey + 1);
                }, 500);
            } else if (response?.ok && response2?.ok && response3?.ok) {
                setTimeout(() => {
                    setLoading(false);
                    getProfile();
                    sendMessage(successMessage, "success");
                    resetHandler();
                }, 1000);
            } else {
                setLoading(false);
                sendMessage(errorMessage, "error");
            }
        } catch (error) {
            setLoading(false);
            sendMessage(error, "error");
            throw error;
        }
    }

    const updateField = async (e, id, field, value, resetHandler, type) => {
        e.preventDefault();
        e.stopPropagation();

        setLoading(true);
        const url =
            type === "location"
                ? `https://localhost:7201/api/Location/${field}/${id}`
                : type === "image"
                ? `https://localhost:7201/api/Image/${id}`
                : `https://localhost:7201/api/UserData/${field}/${id}`;
        const formData = type === "image" ? new FormData() : null;
        if (type === "image" && !value.selectedFile) {
            setLoading(false);
            sendMessage("Selected file is missing.", "error");
        }
        if (type === "image") {
            formData.append("ImageName", value.selectedFile.name);
            formData.append("Image", value.selectedFile);
        }
        try {
            const headers = {
                "Access-Control-Allow-Origin": "*",
                Authorization: `Bearer ${uuid}`,
            };

            if (type !== "image") {
                headers["Content-type"] = "application/json";
            }
            const response = await fetch(url, {
                method: "PUT",
                headers: headers,
                body: type === "image" ? formData : JSON.stringify({ [field]: value.current.value }),
            });
            if (response.ok) {
                setTimeout(() => {
                    setLoading(false);
                    getProfile();
                    resetHandler();
                    sendMessage(`${field.charAt(0).toUpperCase() + field.slice(1)} Updated`, "success");
                }, 1000);
            } else {
                sendMessage(`${field.charAt(0).toUpperCase() + field.slice(1)} not updated`, "error");
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
        }
    };

    const handleDelete = async (e, url, resetHandler, successMessage) => {
        e.preventDefault();
        e.stopPropagation();

        setLoading(true);
        try {
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    Authorization: `Bearer ${uuid}`,
                },
            });
            if (response.status === 204) {
                setTimeout(() => {
                    setLoading(false);
                    getProfile();
                    resetHandler();
                    sendMessage(successMessage, "success");
                }, 1000);
            } else {
                setLoading(false);
                sendMessage(`${successMessage} not deleted`, "error");
            }
        } catch (error) {
            setLoading(false);
            sendMessage("Request Error", "error");
        }
    };

    const refs = {
        firstName,
        lastName,
        socialSecurityCode,
        emailAddress,
        phoneNumber,
        country,
        fileInputRef,
        city,
        street,
        houseNumber,
        apartmentNumber,
    };

    const states = {
        content,
        selectedCountry,
        loading,
        selectedCity,
        expanded,
        selectedDateTime,
    };

    const sets = {
        setExpanded,
        setSelectedCountry,
        setSelectedCity,
        setSelectedDateTime,
        setContent,
    };

    return {
        refs,
        states,
        sets,
        handleActions,
        updateField,
        handleDelete,
    };
}
