import React, { useEffect } from "react";
import { Box, Accordion, AccordionSummary, AccordionDetails, Typography, TextField, List, Divider } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Dropdown from "../../Components/Inputs/Dropdown";
import DeleteIcon from "@mui/icons-material/Delete";
import { EditOutlined, RefreshOutlined, SendOutlined, Add, ExpandMore } from "@mui/icons-material";
import ToDoSkeleton from "../../Components/Skeletons/ToDoSkeleton";
import useData from "../../Hooks/useData";
import useSubmit from "../../Hooks/useSubmit";
import { useSelector } from "react-redux";
import { PreviewEditText } from "../../Components/EditFields/PersonalDataEdit";
import PreviewGroup from "../../Components/EditFields/PersonalDataView";
import FileUpload from "../../Components/FileUpload/FileUpload";
import useForm from "../../Hooks/useForm";

export default function Main({ resetHandler }) {
    const { edit, setEdit, countries, cities, handleFileInputChange, handleExpand, handleUploadButtonClick, setFileInputKey, setShowClearButton, selectedFile, setFileName } = useForm();
    const { getProfile, fetchImage, fetchUserData, fetchUserLocation, getImage, downloadImage, imageUrl } = useData();

    const { refs, states, sets, handleDelete, handleActions, updateField } = useSubmit({
        fetchImage,
        fetchUserData,
        fetchUserLocation,
        setFileName,
        setShowClearButton,
        setFileInputKey,
    });

    useEffect(() => {
        getProfile();
    }, []);

    const personalData = useSelector((state) => state.main.items);
    const loadingData = useSelector((state) => state.main.loadingData);

    return (
        <Box>
            {personalData[0]?.id && personalData[0].imageListId && personalData[0].locationListId ? null : (
                <Accordion sx={{ boxShadow: 3 }}>
                    <AccordionSummary expandIcon={<Add />} onClick={handleExpand}>
                        <Typography variant="h4" sx={{ fontWeight: "bold", color: "text.secondary" }}>
                            Create Your Profile
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box component="form" onSubmit={(e) => handleActions(e, personalData[0], selectedFile, resetHandler)} sx={{ width: "100%" }}>
                            {personalData[0]?.id ? null : (
                                <Accordion sx={{ width: "100%", boxShadow: "none", mb: 2 }}>
                                    <AccordionSummary expandIcon={<Add />} onClick={handleExpand}>
                                        <Typography variant="h5" sx={{ fontWeight: "bold", color: "text.secondary" }}>
                                            Profile
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Box display={"inline-flex"} m={1} gap={1} width={"100%"}>
                                            <TextField required type="text" inputRef={refs.firstName} label="First Name" sx={{ width: "49%", mb: 2 }} />
                                            <TextField required type="text" inputRef={refs.lastName} label="Last Name" sx={{ width: "49%", mb: 2 }} />
                                        </Box>
                                        <Box display={"inline-flex"} m={1} gap={1} width={"100%"}>
                                            <TextField required type="text" inputRef={refs.socialSecurityCode} label="Social Security Code" sx={{ width: "49%", mb: 2 }} />
                                            <TextField required type="text" inputRef={refs.emailAddress} label="Email Address" sx={{ width: "49%", mb: 2 }} />
                                        </Box>
                                        <Box display={"inline-flex"} m={1} gap={1} width={"100%"}>
                                            <TextField required type="text" inputRef={refs.phoneNumber} label="Phone Number" sx={{ width: "49%", mb: 2 }} />
                                        </Box>
                                    </AccordionDetails>
                                </Accordion>
                            )}
                            {personalData[0]?.imageListId ? null : (
                                <Accordion sx={{ width: "100%", boxShadow: "none", mb: 2 }}>
                                    <AccordionSummary expandIcon={<Add />} onClick={handleExpand}>
                                        <Typography variant="h5" sx={{ fontWeight: "bold", color: "text.secondary" }}>
                                            Profile Picture
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Box display={"inline-flex"} m={1} gap={1} width={"100%"}>
                                            <FileUpload
                                                sx={{ width: "80%" }}
                                                compRef={refs.fileInputRef}
                                                label="Select A File"
                                                handleFileInputChange={handleFileInputChange}
                                                setFileName={edit.setFileName}
                                                showClearButton={edit.showClearButton}
                                                handleUploadButtonClick={handleUploadButtonClick}
                                                fileName={edit.fileName ? edit.fileName : ""}
                                                key={edit.fileInputKey}
                                            />
                                        </Box>
                                    </AccordionDetails>
                                </Accordion>
                            )}
                            {personalData[0]?.locationListId ? null : (
                                <Accordion sx={{ width: "100%", boxShadow: "none", mb: 2 }}>
                                    <AccordionSummary expandIcon={<Add />} onClick={handleExpand}>
                                        <Typography variant="h5" sx={{ fontWeight: "bold", color: "text.secondary" }}>
                                            Location
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Box display={"inline-flex"} m={1} gap={1} width={"100%"}>
                                            <Dropdown
                                                required
                                                callback={sets.setSelectedCountry}
                                                data={countries?.map((item) => ({ id: item.id, textEn: item.textEn }))}
                                                sx={{ mb: 2, width: "49%" }}
                                                label="Country"
                                                id="country"
                                                compRef={refs.country}
                                            />
                                            <Dropdown
                                                required
                                                callback={sets.setSelectedCity}
                                                data={cities?.map((item) => ({ id: item.id, textEn: item.textEn }))}
                                                sx={{ mb: 2, width: "49%" }}
                                                label="City"
                                                id="city"
                                                compRef={refs.city}
                                            />
                                        </Box>
                                        <Box display={"inline-flex"} m={1} gap={1} width={"100%"}>
                                            <TextField required type="text" inputRef={refs.street} label="Street" sx={{ width: "49%", mb: 2 }} />
                                            <TextField type="text" inputRef={refs.houseNumber} label="House Number" sx={{ width: "49%", mb: 2 }} />
                                        </Box>
                                        <Box display={"inline-flex"} m={1} gap={1} width={"100%"}>
                                            <TextField type="text" inputRef={refs.apartmentNumber} label="Apartment Number" sx={{ width: "49%", mb: 2 }} />
                                        </Box>
                                    </AccordionDetails>
                                </Accordion>
                            )}
                            <Box sx={{ display: "flex", justifyContent: "right", marginTop: 2 }}>
                                <LoadingButton sx={{ width: "5%" }} loading={loadingData || states.loading} variant="contained" type="submit">
                                    <Add />
                                </LoadingButton>
                            </Box>
                        </Box>
                    </AccordionDetails>
                </Accordion>
            )}
            <Box sx={{ display: "flex", width: "100%", padding: 2, boxShadow: 3, marginTop: 2 }}>
                <Box sx={{ width: "100%", textAlign: "center" }}>
                    <Typography variant="h4" fontWeight="bold" color="text.secondary">
                        Your Profile Information
                    </Typography>
                </Box>
                <LoadingButton sx={{ ml: 2, width: "5%" }} loading={loadingData || states.loading} variant="contained" onClick={getProfile}>
                    <RefreshOutlined />
                </LoadingButton>
            </Box>
            <Box display={"flex"} justifyContent={"right"}></Box>
            {!loadingData && personalData?.length === 0 && (
                <Box
                    sx={{
                        mt: 5,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100%",
                    }}
                >
                    <Typography variant="h2" sx={{ fontWeight: "bold", mb: 2, textAlign: "center", color: "text.secondary" }}>
                        You don't have a profile
                    </Typography>
                    <Typography variant="body1" sx={{ textAlign: "center", color: "text.secondary" }}>
                        Start by adding creating a profile by adding your personal Information.
                    </Typography>
                </Box>
            )}
            {loadingData ? (
                <ToDoSkeleton />
            ) : (
                <List>
                    {personalData[0]?.id ? (
                        <Accordion key={personalData[0].id}>
                            <AccordionSummary expandIcon={<ExpandMore />}>
                                <Typography color={"text.secondary"} fontWeight={"bold"}>
                                    {`Personal Data Of ${personalData[0].firstName} ${personalData[0].lastName}`}
                                </Typography>
                                <Box sx={{ marginLeft: "auto" }}>
                                    <LoadingButton
                                        sx={{ p: 1, m: 0 }}
                                        loading={states.loading || loadingData}
                                        onClick={(e) => handleDelete(e, `https://localhost:7201/api/UserData/${personalData[0].id}`, resetHandler, "Item Deleted")}
                                        edge="end"
                                        aria-label="delete"
                                    >
                                        <DeleteIcon />
                                    </LoadingButton>
                                </Box>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Box sx={{ m: 1 }}>
                                    {edit.isEditingFirstName ? (
                                        <PreviewEditText
                                            updateFunction={(e) => updateField(e, personalData[0].id, "firstName", refs.firstName, resetHandler, "personalData")}
                                            field="firstName"
                                            required
                                            resetHandler={resetHandler}
                                            id={personalData[0].id}
                                            label="First Name :"
                                            loading={loadingData || states.loading}
                                            defaultValue={personalData[0].firstName}
                                            compRef={refs.firstName}
                                            editing={setEdit.setIsEditingFirstName}
                                        />
                                    ) : (
                                        <PreviewGroup
                                            loading={loadingData || states.loading}
                                            setEditing={setEdit.setIsEditingFirstName}
                                            label="First Name :"
                                            value={personalData[0].firstName || "First Name"}
                                        />
                                    )}
                                    {edit.isEditingLastName ? (
                                        <PreviewEditText
                                            updateFunction={(e) => updateField(e, personalData[0].id, "lastName", refs.lastName, resetHandler, "personalData")}
                                            field="lastName"
                                            required
                                            loading={loadingData || states.loading}
                                            id={personalData[0].id}
                                            resetHandler={resetHandler}
                                            label="Last Name :"
                                            defaultValue={personalData[0].lastName}
                                            compRef={refs.lastName}
                                            editing={setEdit.setIsEditingLastName}
                                        />
                                    ) : (
                                        <PreviewGroup
                                            loading={loadingData || states.loading}
                                            setEditing={setEdit.setIsEditingLastName}
                                            label="Last Name :"
                                            value={personalData[0].lastName || "Last Name"}
                                        />
                                    )}
                                    {edit.isEditingEmailAddress ? (
                                        <PreviewEditText
                                            updateFunction={(e) => updateField(e, personalData[0].id, "emailAdress", refs.emailAddress, resetHandler, "personalData")}
                                            field="emailAdress"
                                            required
                                            loading={loadingData || states.loading}
                                            id={personalData[0].id}
                                            resetHandler={resetHandler}
                                            label="Email :"
                                            defaultValue={personalData[0].emailAddres}
                                            compRef={refs.emailAddress}
                                            editing={setEdit.setIsEditingEmailAddress}
                                        />
                                    ) : (
                                        <PreviewGroup
                                            loading={loadingData || states.loading}
                                            setEditing={setEdit.setIsEditingEmailAddress}
                                            label="Email :"
                                            value={personalData[0].emailAddres || "Email"}
                                        />
                                    )}
                                    {edit.isEditingSocialSecurityCode ? (
                                        <PreviewEditText
                                            updateFunction={(e) => updateField(e, personalData[0].id, "socialSecurityCode", refs.socialSecurityCode, resetHandler, "personalData")}
                                            field="socialSecurityCode"
                                            id={personalData[0].id}
                                            resetHandler={resetHandler}
                                            required
                                            loading={loadingData || states.loading}
                                            label="Social Security Code :"
                                            defaultValue={personalData[0].socialSecurityCode}
                                            compRef={refs.socialSecurityCode}
                                            editing={setEdit.setIsEditingSocialSecurityCode}
                                        />
                                    ) : (
                                        <PreviewGroup
                                            loading={loadingData || states.loading}
                                            setEditing={setEdit.setIsEditingSocialSecurityCode}
                                            label="Social Security Code :"
                                            value={personalData[0].socialSecurityCode || "Social Security Code"}
                                        />
                                    )}
                                    {edit.isEditingPhoneNumber ? (
                                        <PreviewEditText
                                            updateFunction={(e) => updateField(e, personalData[0].id, "phoneNumber", refs.phoneNumber, resetHandler, "personalData")}
                                            field="phoneNumber"
                                            loading={loadingData || states.loading}
                                            id={personalData[0].id}
                                            resetHandler={resetHandler}
                                            required
                                            label="Phone Number :"
                                            defaultValue={personalData[0].phoneNumber}
                                            compRef={refs.phoneNumber}
                                            editing={setEdit.setIsEditingPhoneNumber}
                                        />
                                    ) : (
                                        <PreviewGroup
                                            loading={loadingData || states.loading}
                                            setEditing={setEdit.setIsEditingPhoneNumber}
                                            label="Phone Number :"
                                            value={personalData[0].phoneNumber || "Phone Number"}
                                        />
                                    )}
                                    <PreviewGroup label="Created At :" value={new Date(personalData[0].createdAt).toLocaleString("lt-LT").split(" ")[0]} />
                                </Box>
                                <Divider />
                            </AccordionDetails>
                        </Accordion>
                    ) : null}
                    {personalData[0]?.imageListId ? (
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMore />}>
                                <Typography color={"text.secondary"} fontWeight={"bold"}>
                                    {`Profile Picture Of ${personalData[0].firstName} ${personalData[0].lastName}`}
                                </Typography>
                                <Box sx={{ marginLeft: "auto" }}>
                                    <LoadingButton
                                        sx={{ p: 1, m: 0 }}
                                        loading={states.loading || loadingData}
                                        onClick={(e) => [e.stopPropagation(), setEdit.setIsEditingImage(!edit.isEditingImage)]}
                                        edge="end"
                                        aria-label="edit"
                                    >
                                        <EditOutlined />
                                    </LoadingButton>
                                    <LoadingButton
                                        sx={{ p: 1, m: 0 }}
                                        loading={states.loading || loadingData}
                                        onClick={(e) => handleDelete(e, `https://localhost:7201/api/Image/${personalData[0].imageListId}`, resetHandler, "Item Deleted")}
                                        edge="end"
                                        aria-label="delete"
                                    >
                                        <DeleteIcon />
                                    </LoadingButton>
                                </Box>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Box sx={{ m: 1 }}>
                                    {edit.isEditingImage ? (
                                        <FileUpload
                                            sx={{ width: "100%" }}
                                            compRef={refs.fileInputRef}
                                            label="Select A File"
                                            handleFileInputChange={handleFileInputChange}
                                            setFileName={edit.setFileName}
                                            showClearButton={edit.showClearButton}
                                            handleUploadButtonClick={handleUploadButtonClick}
                                            fileName={edit.fileName ? edit.fileName : ""}
                                            key={edit.fileInputKey}
                                        />
                                    ) : (
                                        <>
                                            <PreviewGroup
                                                loading={loadingData || states.loading}
                                                setEditing={setEdit.setIsEditingImageName}
                                                label="Image Name :"
                                                value={personalData[0].imageName || "Image Name"}
                                            />
                                        </>
                                    )}
                                    <PreviewGroup
                                        loading={loadingData || states.loading}
                                        label="Uploaded At :"
                                        value={new Date(personalData[0].createdAt).toLocaleString("lt-LT").split(" ")[0]}
                                    />
                                    <LoadingButton loading={loadingData || states.loading} sx={{ mr: 1 }} variant="contained" onClick={(e) => getImage(e, personalData[0].imageListId)}>
                                        Show Image
                                    </LoadingButton>
                                    <LoadingButton loading={loadingData || states.loading} sx={{ mr: 1 }} variant="contained" onClick={(e) => downloadImage(e, personalData[0].imageListId)}>
                                        Download Image
                                    </LoadingButton>
                                    <LoadingButton
                                        sx={{ mr: 1 }}
                                        loading={loadingData || states.loading}
                                        variant="contained"
                                        onClick={(e) => updateField(e, personalData[0].imageListId, "Image", { selectedFile: selectedFile }, resetHandler, "image")}
                                    >
                                        <SendOutlined />
                                    </LoadingButton>
                                    {imageUrl ? <img src={imageUrl} alt="Image" /> : null}
                                </Box>
                                <Divider />
                            </AccordionDetails>
                        </Accordion>
                    ) : null}
                    {personalData[0]?.locationListId ? (
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMore />}>
                                <Typography color={"text.secondary"} fontWeight={"bold"}>
                                    {`Location Of ${personalData[0].firstName} ${personalData[0].lastName}`}
                                </Typography>
                                <Box sx={{ marginLeft: "auto" }}>
                                    <LoadingButton
                                        sx={{ p: 1, m: 0 }}
                                        loading={states.loading || loadingData}
                                        onClick={(e) => handleDelete(e, `https://localhost:7201/api/Location/${personalData[0].locationListId}`, resetHandler, "Item Deleted")}
                                        edge="end"
                                        aria-label="delete"
                                    >
                                        <DeleteIcon />
                                    </LoadingButton>
                                </Box>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Box sx={{ m: 1 }}>
                                    {edit.isEditingCountry ? (
                                        <PreviewEditText
                                            updateFunction={updateField}
                                            field="country"
                                            id={personalData[0].locationListId}
                                            editing={setEdit.setIsEditingCountry}
                                            loading={loadingData || states.loading}
                                            resetHandler={resetHandler}
                                            required
                                            label="Country"
                                            defaultValue={personalData[0].country}
                                            urlString={"location"}
                                            compRef={refs.country}
                                        />
                                    ) : (
                                        <PreviewGroup
                                            loading={loadingData || states.loading}
                                            setEditing={setEdit.setIsEditingCountry}
                                            label="Country :"
                                            value={personalData[0].country || "Country"}
                                        />
                                    )}

                                    {edit.isEditingCity ? (
                                        <PreviewEditText
                                            loading={loadingData || states.loading}
                                            updateFunction={updateField}
                                            urlString={"location"}
                                            field="city"
                                            id={personalData[0].locationListId}
                                            editing={setEdit.setIsEditingCity}
                                            resetHandler={resetHandler}
                                            required
                                            label="City :"
                                            defaultValue={personalData[0].city}
                                            compRef={refs.city}
                                        />
                                    ) : (
                                        <PreviewGroup loading={loadingData || states.loading} setEditing={setEdit.setIsEditingCity} label="City :" value={personalData[0].city || "City"} />
                                    )}
                                    {edit.isEditingStreet ? (
                                        <PreviewEditText
                                            updateFunction={updateField}
                                            urlString={"location"}
                                            loading={loadingData || states.loading}
                                            field="street"
                                            id={personalData[0].locationListId}
                                            editing={setEdit.setIsEditingStreet}
                                            resetHandler={resetHandler}
                                            required
                                            label="Street :"
                                            defaultValue={personalData[0].street}
                                            compRef={refs.street}
                                        />
                                    ) : (
                                        <PreviewGroup
                                            loading={loadingData || states.loading}
                                            setEditing={setEdit.setIsEditingStreet}
                                            label="Street :"
                                            value={personalData[0].street || "Street"}
                                        />
                                    )}

                                    {edit.isEditingHouseNumber ? (
                                        <PreviewEditText
                                            updateFunction={updateField}
                                            loading={loadingData || states.loading}
                                            field="houseNumber"
                                            urlString={"location"}
                                            id={personalData[0].locationListId}
                                            editing={setEdit.setIsEditingHouseNumber}
                                            resetHandler={resetHandler}
                                            required
                                            label="House Number :"
                                            defaultValue={personalData[0].houseNumber}
                                            compRef={refs.houseNumber}
                                        />
                                    ) : null}
                                    {personalData[0].houseNumber && !edit.isEditingHouseNumber ? (
                                        <PreviewGroup
                                            loading={loadingData || states.loading}
                                            setEditing={setEdit.setIsEditingHouseNumber}
                                            label="House Number :"
                                            value={personalData[0].houseNumber || "House Number"}
                                        />
                                    ) : null}
                                    {edit.isEditingApartmentNumber ? (
                                        <PreviewEditText
                                            editing={setEdit.setIsEditingApartmentNumber}
                                            loading={loadingData || states.loading}
                                            resetHandler={resetHandler}
                                            required
                                            updateFunction={updateLocationFields}
                                            field="apartmentNumber"
                                            id={personalData[0].locationListId}
                                            label="Apartment Number:"
                                            defaultValue={personalData[0].apartmentNumber}
                                            compRef={refs.apartmentNumber}
                                        />
                                    ) : null}
                                    {personalData[0].apartmentNumber && !edit.isEditingApartmentNumber ? (
                                        <PreviewGroup
                                            loading={loadingData || states.loading}
                                            setEditing={setEdit.setIsEditingApartmentNumber}
                                            label="Apartment Number :"
                                            value={personalData[0].apartmentNumber || "Apartment Number"}
                                        />
                                    ) : null}
                                    <PreviewGroup label="Created At :" value={new Date(personalData[0].createdAt).toLocaleString("lt-LT").split(" ")[0]} />
                                </Box>
                                <Divider />
                            </AccordionDetails>
                        </Accordion>
                    ) : null}
                </List>
            )}
        </Box>
    );
}
