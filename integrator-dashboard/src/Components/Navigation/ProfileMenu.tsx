import React, { useContext, useState } from "react";
import ProfileLogo from "../../Assets/ProfileLogo.svg";
import { IconButton, Menu, MenuItem, Typography } from "@material-ui/core";
import { Auth } from "aws-amplify";
import { AuthContext } from "../../Context/Auth";
import { RouteContext } from "../../Context/RouteContext";
import { useHistory } from "react-router-dom";
import { TransitionLeft, TransitionProps } from "../../Shared/Slides";
import { Alert } from "../../Shared/Interfaces";
import ModalComp from "../../Shared/ModalComp";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { ClassNameMap } from "@material-ui/styles";
import LoadingScreen from "../../Shared/LoadingScreen";
import Buttons from "../../Shared/Buttons";
import CopyAble from "../../Shared/CopyAble";
import AlertComp from "../../Shared/Alert";

//minor styling
const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      // flexDirection: "row",
      justifyContent: "center",
      alignContent: "center",
      marginTop: 20,
    },
  })
);

const ProfileMenu: React.FC = () => {
  const classes: ClassNameMap<"root"> = useStyles();

  const { logout } = useContext(AuthContext);
  const { resetRoute } = useContext(RouteContext);
  const { replace } = useHistory();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const signOut = async () => {
    handleClose();
    Auth.signOut().then((_) => {
      logout();
      resetRoute();
      replace("/");
    });
  };

  //Profile modal
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const handleModalClose = () => setModalOpen(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [profileInfo, setProfileInfo] = useState<{
    email: string;
    userId: string;
  }>({ email: "", userId: "" });

  const handleOpenModal = async () => {
    handleClose();
    setLoading(true);
    setModalOpen(true);
    try {
      const profInfo = await Auth.currentUserInfo();
      console.log(profInfo);
      setProfileInfo({
        email: profInfo.attributes.email,
        userId: profInfo.attributes["custom:user_id"]
          ? profInfo.attributes["custom:user_id"]
          : profInfo.attributes["custom:integrator_id"],
      });
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const [transition, setTransition] = React.useState<
    React.ComponentType<TransitionProps> | undefined
  >(undefined);
  const [alertDetails, setAlertDetails] = useState<Alert>({
    open: false,
    horizontal: "center",
    vertical: "bottom",
    message: "",
  });
  const handleOpen = (
    horizontal: "left" | "center" | "right",
    vertical: "top" | "bottom",
    message: string
  ) => {
    setTransition(() => TransitionLeft);
    setAlertDetails({
      open: true,
      horizontal,
      vertical,
      message,
    });
  };
  const handleAlertClose = () => {
    setAlertDetails({ ...alertDetails, open: false });
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <img src={ProfileLogo} alt="Profile Logo" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleOpenModal}>Profile</MenuItem>
        <MenuItem onClick={signOut}>Logout</MenuItem>
      </Menu>
      <ModalComp
        title="Profile"
        handleModalClose={handleModalClose}
        modalOpen={modalOpen}
        modalTop="10%"
        modalWidth="40%"
      >
        {loading ? (
          <div style={{ height: 30 }}>
            <LoadingScreen />
          </div>
        ) : (
          <>
            <div className={classes.root}>
              <Typography variant="h6">User ID: </Typography>&nbsp;&nbsp;
              <CopyAble
                handleOpen={() => handleOpen("right", "bottom", "Copied")}
                text={profileInfo.userId}
              />
            </div>
            <div className={classes.root}>
              <Typography variant="h6">Email: </Typography>&nbsp;&nbsp;
              <CopyAble
                handleOpen={() => handleOpen("right", "bottom", "Copied")}
                text={profileInfo.email}
              />
            </div>
            <div className={classes.root}>
              <Buttons
                variant="contained"
                type="primary"
                htmlType="button"
                onClick={signOut}
              >
                {" "}
                Logout{" "}
              </Buttons>
            </div>
          </>
        )}
      </ModalComp>
      <AlertComp
        open={alertDetails.open}
        vertical={alertDetails.vertical}
        horizontal={alertDetails.horizontal}
        transition={transition}
        message={alertDetails.message}
        handleClose={handleAlertClose}
      />
    </>
  );
};

export default ProfileMenu;
