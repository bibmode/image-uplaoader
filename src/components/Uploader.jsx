import React, { useEffect, useContext } from "react";

import {
  Box,
  Button,
  Container,
  LinearProgress,
  linearProgressClasses,
  Paper,
  Typography,
} from "@mui/material";

import { styled } from "@mui/system";
import { client } from "../client";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
// import { client } from "../client";

//styling

const PageContainer = styled(Container)({
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const Wrapper = styled(Paper)(({ theme }) => ({
  width: "min(100%, 402px)",
  paddingBlock: "3.5rem",
  paddingInline: "2.5rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyItems: "center",
  borderRadius: "1rem",
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
}));

const UploadBox = styled(Box)(({ theme }) => ({
  backgroundColor: "#F6F8FB",
  width: "100%",
  paddingInline: theme.spacing(8),
  borderRadius: 12,
  backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='12' ry='12' stroke='%2397BEF4FF' stroke-width='3' stroke-dasharray='12' stroke-dashoffset='0' stroke-linecap='butt'/%3e%3c/svg%3e")`,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  paddingBlock: "3.5rem",
}));

const Image = styled("img")({
  marginBottom: "3rem",
});

const UploadBtn = styled(Button)({
  textTransform: "none",
  borderRadius: 8,
  boxShadow: "none",
  fontSize: "1.2rem",
});

const Text = styled(Typography)({
  fontWeight: 500,
});

const LoadingMessage = styled(Typography)(({ theme }) => ({
  fontSize: 18,
  fontWeight: 500,
  marginBottom: theme.spacing(3),
}));

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 6,
  borderRadius: 8,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 8,
    backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
  },
}));

//component
const Uploader = () => {
  const { imageAsset, setImageAsset, loader, setLoader } =
    useContext(AppContext);
  const navigate = useNavigate();

  const fileUpload = (e, method) => {
    e.preventDefault();
    e.stopPropagation();
    setLoader(true);

    const file = method ? e.dataTransfer.files[0] : e.target.files[0];

    const { name, type } = file;

    if (
      type === "image/png" ||
      type === "image/svg" ||
      type === "image/jpeg" ||
      type === "image/gif" ||
      type === "image/tiff"
    ) {
      client.assets
        .upload("image", file, {
          contentType: type,
          filename: name,
        })
        .then((document) => {
          setImageAsset(document);
        })
        .catch((error) => {
          console.log(`image upload error: ${error}`);
        });
    } else {
      console.log("wrongfile");
    }
  };

  const saveImage = () => {
    const doc = {
      _type: "picture",
      image: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: imageAsset?._id,
        },
      },
    };
    client.create(doc).then(() => setLoader(false));
  };

  useEffect(() => {
    if (imageAsset) {
      saveImage();
      navigate(`/result/${imageAsset._id}`, { replace: true });
    }
  }, [imageAsset]);

  const openDialog = () => {
    document.getElementById("fileid").click();
  };

  const hovering = (e) => {
    e.preventDefault();
    console.log("hovering");
  };

  return (
    <PageContainer>
      {!loader ? (
        <Wrapper>
          <Text variant="h6" fontSize="1.8rem">
            Upload your image
          </Text>
          <Text
            variant="body2"
            color="text.secondary"
            fontSize="1rem"
            mt={2}
            mb={3}
          >
            File should be Jpeg, Png,...
          </Text>
          <UploadBox onDragOver={hovering} onDrop={(e) => fileUpload(e, true)}>
            <Image src="/images/image.svg" alt="upload" />
            <Text variant="body1" color="text.disabled" fontSize="1.2rem">
              Drag & Drop your image here
            </Text>
          </UploadBox>
          <Text variant="body1" color="text.disabled" fontSize="1.2rem" my={2}>
            Or
          </Text>
          <UploadBtn variant="contained" onClick={openDialog}>
            Choose a file
          </UploadBtn>
          <input
            id="fileid"
            type="file"
            accept="image/*"
            onChange={(e) => fileUpload(e, false)}
            hidden
          />
        </Wrapper>
      ) : (
        <Wrapper sx={{ alignItems: "flex-start" }}>
          <LoadingMessage>Uploading...</LoadingMessage>
          <Box sx={{ width: "100%" }}>
            <BorderLinearProgress />
          </Box>
        </Wrapper>
      )}
    </PageContainer>
  );
};

export default Uploader;
