import { Box, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import EditIcon from "@mui/icons-material/Edit";

export default function PreviewGroup({ label, value, column, setEditing, loading }) {
    return (
        <Box sx={{ display: "flex", flexDirection: column ? "column" : "row", alignItems: !column ? "center" : "unset", justifyContent: "space-between" }}>
            <Typography variant="body1" component="p" gutterBottom>
                {label}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                    sx={{
                        mr: label !== "Created At :" ? 0 : 8,
                        fontWeight: "600",
                    }}
                    variant="body1"
                    component="span"
                    gutterBottom
                >
                    {value}
                </Typography>
                {label !== "Created At :" && label !== "Uploaded At :" && label !== "Image Name :" ? (
                    <LoadingButton loading={loading} onClick={(e) => [e.stopPropagation(), setEditing(true)]} aria-label="edit">
                        <EditIcon />
                    </LoadingButton>
                ) : null}
            </Box>
        </Box>
    );
}
