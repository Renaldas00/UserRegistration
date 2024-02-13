import { useState } from "react";

export default function useForm() {
    const countries = [{ id: 1, textEn: "Lithuania" }];
    const cities = [
        { id: 1, textEn: "Vilnius" },
        { id: 2, textEn: "Kaunas" },
        { id: 3, textEn: "Šiauliai" },
        { id: 4, textEn: "Klaipėda" },
    ];

    const [fileName, setFileName] = useState("");
    const [expanded, setExpanded] = useState(false);
    const [fileInputKey, setFileInputKey] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isEditingCity, setIsEditingCity] = useState(false);
    const [isEditingImage, setIsEditingImage] = useState(false);
    const [isEditingStreet, setIsEditingStreet] = useState(false);
    const [showClearButton, setShowClearButton] = useState(false);
    const [isEditingCountry, setIsEditingCountry] = useState(false);
    const [isEditingLastName, setIsEditingLastName] = useState(false);
    const [isEditingFirstName, setIsEditingFirstName] = useState(false);

    const [isEditingImageName, setIsEditingImageName] = useState(false);
    const [isEditingPhoneNumber, setIsEditingPhoneNumber] = useState(false);
    const [isEditingHouseNumber, setIsEditingHouseNumber] = useState(false);
    const [isEditingEmailAddress, setIsEditingEmailAddress] = useState(false);
    const [isEditingApartmentNumber, setIsEditingApartmentNumber] = useState(false);
    const [isEditingSocialSecurityCode, setIsEditingSocialSecurityCode] = useState(false);

    function handleFileInputChange(file) {
        if (file) {
            const allowedExtensions = [".png"];
            const fileExtension = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();
            setSelectedFile(file);
            if (allowedExtensions.includes(fileExtension)) {
                setFileName(file.name);
                setSelectedFile(file);
                setShowClearButton(true);
            } else {
                alert("Please select a valid file format. Accepted formats: .png");
                setFileName("");
            }
        }
    }

    const handleExpand = () => {
        setExpanded(!expanded);
    };

    function handleUploadButtonClick() {
        if (showClearButton) {
            setFileName("");
            setShowClearButton(false);
            setFileInputKey((prevKey) => prevKey + 1);
        } else {
            if (fileInputRef.current) {
                fileInputRef.current.click();
            } else {
                console.error("File input ref is not available.");
            }
        }
    }

    const edit = {
        isEditingFirstName,
        isEditingLastName,
        isEditingSocialSecurityCode,
        isEditingEmailAddress,
        isEditingPhoneNumber,
        isEditingCountry,
        isEditingCity,
        isEditingStreet,
        isEditingHouseNumber,
        isEditingApartmentNumber,
        isEditingImageName,
        isEditingImage,
        expanded,
        fileName,
        showClearButton,
        fileInputKey,
    };

    const setEdit = {
        setIsEditingFirstName,
        setIsEditingLastName,
        setIsEditingSocialSecurityCode,
        setIsEditingEmailAddress,
        setIsEditingPhoneNumber,
        setIsEditingCountry,
        setIsEditingCity,
        setIsEditingStreet,
        setIsEditingHouseNumber,
        setIsEditingApartmentNumber,
        setIsEditingImageName,
        setIsEditingImage,
        setExpanded,
    };

    return {
        edit,
        setEdit,
        countries,
        cities,
        setShowClearButton,
        setFileInputKey,
        handleFileInputChange,
        handleExpand,
        handleUploadButtonClick,
        selectedFile,
        setFileName,
    };
}
