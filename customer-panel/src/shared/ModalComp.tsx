import { FC } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Slide, Backdrop, Modal, Typography } from "@material-ui/core";

interface StyleProps {
  modalTop: number | string;
  modalWidth: number | string;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflowY: "auto",
      marginBottom: 20
    },
    paper: {
      position: "absolute",
      top: (props) => props.modalTop,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      borderRadius: 10,
      width: (props) => props.modalWidth,
      // overflowY: "scroll",
    },
    headerStyles: {
      background: "#007BFF",
      color: "#fff",
      margin: theme.spacing(-2, -4, -3),
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      padding: 10,
      marginBottom: 20,
    },
  })
);

interface ModalCompProps {
  modalOpen: boolean;
  handleModalClose: () => void;
  children: JSX.Element;
  modalTop: number | string;
  modalWidth: number | string;
  title: string;
}

const ModalComp: FC<ModalCompProps> = ({
  modalOpen,
  handleModalClose,
  children,
  modalTop,
  modalWidth,
  title,
}) => {
  const classes = useStyles({ modalTop, modalWidth });
  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={modalOpen}
        onClose={handleModalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Slide in={modalOpen}>
          <div className={classes.paper}>
            <div className={classes.headerStyles}>
              <Typography variant="h5" align="center">
                {title}
              </Typography>
            </div>
            {children}
          </div>
        </Slide>
      </Modal>
    </>
  );
};

export default ModalComp;
