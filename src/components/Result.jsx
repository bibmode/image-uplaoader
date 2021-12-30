import {
  Alert,
  Button,
  Container,
  Paper,
  Snackbar,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import React, { useContext } from "react";
import { AppContext } from "../App";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";

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
  fontSize: 35,
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
}));

const Message = styled(Typography)(({ theme }) => ({
  fontSize: 18,
  fontWeight: 500,
  marginTop: theme.spacing(1),
}));

const Image = styled("img")(({ theme }) => ({
  width: "100%",
  borderRadius: 12,
  marginBlock: theme.spacing(2),
}));

const LinkWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  backgroundColor: "#F6F8FB",
  border: "1px solid #E0E0E0",
  padding: theme.spacing(0.3),
  borderRadius: theme.spacing(1),
  marginTop: theme.spacing(2),
  fontWeight: 500,
}));

const Link = styled(Typography)(({ theme }) => ({
  paddingInline: theme.spacing(1),
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  overflow: "hidden",
}));

const CopyBtn = styled(Button)(({ theme }) => ({
  borderRadius: theme.spacing(1),
  paddingBlock: theme.spacing(1.5),
  paddingInline: theme.spacing(4),
  textTransform: "capitalize",
  whiteSpace: "nowrap",
}));

const SuccessAlert = styled(Alert)({
  width: "100%",
  fontSize: 12,
});

const Result = () => {
  const {
    imageAsset: { url },
    copyAlert,
    setCopyAlert,
  } = useContext(AppContext);

  const handleClick = () => {
    navigator.clipboard.writeText(url);
    setCopyAlert(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setCopyAlert(false);
  };

  return (
    <PageContainer>
      {copyAlert && (
        <Snackbar
          open={copyAlert}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <SuccessAlert onClose={handleClose} severity="success">
            Url copied to clipboard!
          </SuccessAlert>
        </Snackbar>
      )}
      <Wrapper>
        <CheckCircleIcon fontSize="inherit" color="success" />
        <Message>Uploaded Successfully!</Message>
        <Image src={url} alt="result" />

        <LinkWrapper>
          <Link>{url}</Link>
          <CopyBtn onClick={handleClick} variant="contained" disableElevation>
            Copy Link
          </CopyBtn>
        </LinkWrapper>
      </Wrapper>
    </PageContainer>
  );
};

export default Result;
