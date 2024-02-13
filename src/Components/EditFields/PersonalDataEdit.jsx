import { Box, Typography, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import SendOutlined from "@mui/icons-material/SendOutlined";
import { CloseOutlined } from "@mui/icons-material";

export function PreviewEditText({ label, defaultValue, column, compRef, required, field, updateFunction, id, editing, resetHandler, loading, urlString }) {
    return (
        <Box sx={{ display: "flex", flexDirection: column ? "column" : "row", alignItems: !column ? "center" : "unset", justifyContent: "space-between" }}>
            <Typography variant="body1" component="p" gutterBottom>
                {label}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <TextField
                    required={required}
                    sx={{ mb: 1 }}
                    size="small"
                    defaultValue={defaultValue}
                    inputRef={compRef}
                    onBlur={(e) => {
                        compRef.current.value = e.target.value;
                    }}
                />
                <LoadingButton sx={{ mb: 1 }} loading={loading} onClick={() => editing(false)} aria-label="edit">
                    <CloseOutlined />
                </LoadingButton>
                <LoadingButton sx={{ mb: 1 }} loading={loading} onClick={(e) => updateFunction(e, id, field, compRef, resetHandler, urlString)} aria-label="edit">
                    <SendOutlined />
                </LoadingButton>
            </Box>
        </Box>
    );
}
