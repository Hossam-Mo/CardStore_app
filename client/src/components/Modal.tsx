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
      padding: 35,
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
  contant: number;
}
export default function TransitionsModal({ open, setOpen, contant }: props) {
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
            <h1 className="modal_title">Thank you for buying from us </h1>
            <div className="modal_contant">
              <h2>Card number </h2> : <h2></h2> <h2> {contant}</h2>
            </div>

            <p className="modal_footer">
              you can see it in the Transaction page
            </p>
            <button onClick={handleClose} className="modal_button">
              Back
            </button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
