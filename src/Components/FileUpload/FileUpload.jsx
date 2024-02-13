import { useState } from "react";
import { Button, InputAdornment, TextField, Box } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ClearIcon from "@mui/icons-material/Clear";

export default function FileInput({ handleFileInputChange, fileName, showClearButton, label, handleUploadButtonClick, sx, compRef }) {
    const [dragging, setDragging] = useState(false);

    const preventDefaults = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDragEnter = (e) => {
        preventDefaults(e);
        setDragging(true);
    };

    const handleDragLeave = (e) => {
        preventDefaults(e);
        setDragging(false);
    };

    const handleDragOver = (e) => {
        preventDefaults(e);
        setDragging(true);
    };

    const handleDrop = (e) => {
        preventDefaults(e);
        setDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) {
            const input = compRef.current;
            input.files = e.dataTransfer.files;
            handleFileInputChange(file);
        }
    };

    const handleButtonClick = () => {
        if (showClearButton) {
            handleUploadButtonClick();
        } else {
            compRef.current.click();
        }
    };

    return (
        <Box
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            sx={{
                ...sx,
                border: dragging ? "2px dashed #aaa" : "2px dashed transparent",
                borderRadius: 4,
                transition: "border 0.3s ease-in-out",
            }}
        >
            <input
                type="file"
                ref={compRef}
                style={{ display: "none" }}
                onChange={(event) => {
                    const file = event.target.files[0];
                    if (file) {
                        handleFileInputChange(file);
                    }
                }}
                accept=".png"
                required
            />
            <TextField
                value={fileName}
                label={label}
                variant="outlined"
                fullWidth
                required
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <Button variant="contained" onClick={handleButtonClick} startIcon={showClearButton ? <ClearIcon /> : <CloudUploadIcon />}>
                                {showClearButton ? "Cancel" : "Select"}
                            </Button>
                        </InputAdornment>
                    ),
                }}
            />
        </Box>
    );
}
