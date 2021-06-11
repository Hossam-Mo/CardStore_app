import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import "./Modal.css";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "none",
      boxShadow: theme.shadows[5],
      padding: 50,
      borderRadius: 75,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      outline: "none",
    },
  })
);

interface props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  action: (card: any) => void;
}
export default function TransitionsModal({ open, setOpen, action }: props) {
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h1 className="modal_title">
              Are you sure you want to buy this card{" "}
            </h1>
            <div className="modal_contant">
              <button className="modal_button" onClick={action}>
                Yes
              </button>
              <button className="modal_button" onClick={handleClose}>
                No
              </button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
