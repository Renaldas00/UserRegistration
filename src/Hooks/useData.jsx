import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { setItems, setLoadingData } from "../Redux/actions";

export default function useData() {
    const dispatch = useDispatch();
    const uuid = localStorage.getItem("token");
    const [imageUrl, setImageUrl] = useState("");

    const getProfile = useCallback(async () => {
        dispatch(setLoadingData(true));
        if (uuid) {
            try {
                const response = await fetch(import.meta.env.VITE_APP_GET_PROFILE, {
                    method: "GET",
                    headers: {
                        "Content-type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                        Authorization: `Bearer ${uuid}`,
                    },
                });
                if (response.status === 200) {
                    const data = await response.json();
                    dispatch(setItems(data));
                }
            } catch (error) {
                dispatch(setLoadingData(false));
                throw error;
            } finally {
                dispatch(setLoadingData(false));
            }
        }
    }, []);

    async function fetchUserData(userData, uuid) {
        return await fetch(import.meta.env.VITE_APP_GET_USER_DATA, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Access-Control-Allow-Origin": "*",
                Authorization: `Bearer ${uuid}`,
            },
            body: JSON.stringify(userData),
        });
    }

    async function fetchUserLocation(id, uuid, selectedCountry, selectedCity, street, houseNumber, apartmentNumber) {
        const userLocation = {
            country: selectedCountry,
            city: selectedCity,
            street: street.current.value,
            houseNumber: houseNumber.current.value,
            apartmentNumber: apartmentNumber.current.value,
        };
        return await fetch(`${import.meta.env.VITE_APP_GET_USER_LOCATION}/${id}`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Access-Control-Allow-Origin": "*",
                Authorization: `Bearer ${uuid}`,
            },
            body: JSON.stringify(userLocation),
        });
    }

    async function fetchImage(id, uuid, formData) {
        return await fetch(`${import.meta.env.VITE_APP_GET_USER_IMAGE}/${id}/Image`, {
            method: "POST",
            headers: {
                "Access-Control-Allow-Origin": "*",
                Authorization: `Bearer ${uuid}`,
            },
            body: formData,
        });
    }

    const getImage = async (e, id) => {
        e.preventDefault();
        setLoadingData(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_GET_IMAGE}/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${uuid}`,
                },
            });

            if (response.ok) {
                const blob = await response.blob();
                const imageUrl = URL.createObjectURL(blob);
                setImageUrl(imageUrl);
            }
        } catch (error) {
            console.error("Error fetching image:", error);
            dispatch(setLoadingData(false));
        } finally {
            dispatch(setLoadingData(false));
        }
    };

    const downloadImage = async (e, id) => {
        e.preventDefault();
        setLoadingData(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_DOWNLOAD_IMAGE}/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${uuid}`,
                },
            });
            if (response.ok) {
                const blob = await response.blob();
                const blobUrl = URL.createObjectURL(blob);

                const anchor = document.createElement("a");
                anchor.href = blobUrl;
                anchor.download = "image.jpg";
                anchor.style.display = "none";

                document.body.appendChild(anchor);
                anchor.click();
                document.body.removeChild(anchor);

                URL.revokeObjectURL(blobUrl);
            }
        } catch (error) {
            console.error("Error downloading image:", error);
            dispatch(setLoadingData(false));
        } finally {
            dispatch(setLoadingData(false));
        }
    };

    return {
        getImage,
        getProfile,
        fetchUserData,
        fetchUserLocation,
        fetchImage,
        downloadImage,
        imageUrl,
    };
}
