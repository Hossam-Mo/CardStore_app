import { Button } from "@material-ui/core";
import { auth, db, googleProvider } from "../../firebase";
import "./login.css";
import { FcGoogle } from "react-icons/fc";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { signInType } from "../../redux/actionTypes";
import { useState } from "react";
import { useEffect } from "react";
import AlertModal from "../alertModal/AlertModal";

export default function Login() {
  const dispatch = useDispatch();
  const [background, SetBackground] = useState("");
  const [install, setInstall] = useState<any>();
  const [open, setOpen] = useState(false);

  const download = () => {
    if (install) {
      install.prompt();
      install.userChoice
        .then((res: any) => {
          console.log(res);
        })
        .catch((err: any) => {
          console.log(err);
        });
    } else {
      setOpen(true);
    }
  };
  const signIn = () => {
    auth
      .signInWithPopup(googleProvider)
      .then((info) => {
        dispatch({
          type: signInType.type,
          user: info.user,
        });
        // check if this is the first signIn
        db.collection("users")
          .doc(info.user?.uid)
          .get()
          .then((s) => {
            if (!s.exists) {
              db.collection("users").doc(info.user?.uid).set({
                username: info.user?.displayName,
                email: info.user?.email,
                imgUrl: info.user?.photoURL,
                balance: 0,
                admin: false,
              });
            }
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (window.innerWidth <= 650) {
      SetBackground("Login.png");
    } else {
      SetBackground("loginPC.png");
    }
  }, []);

  useEffect(() => {
    console.log(install);
    if (!install) {
      const event = (e: any) => {
        e.preventDefault();
        setInstall(e);

        console.log(`'beforeinstallprompt' event was fired.`);
      };

      window.addEventListener("beforeinstallprompt", event);
    }
  }, [install]);
  /*  useEffect(() => {
    window.addEventListener("appinstalled", (evt) => {
      console.log("a2hs installed");
    });
  }, []); */

  return (
    <div className="login">
      <AlertModal
        open={open}
        setOpen={setOpen}
        contant={"The App is already installed"}
      ></AlertModal>
      <img className="login_background" src={background} alt="img"></img>
      <h1>Card App</h1>
      <div className="login_box">
        <div className="box_div">
          <FcGoogle></FcGoogle>
          <Button className="box_button" onClick={signIn}>
            Sign in with google
          </Button>
        </div>
        <h2>OR</h2>
        <div className="box_div">
          <FaCloudDownloadAlt></FaCloudDownloadAlt>
          <Button onClick={download} className="box_button">
            DownLoad
          </Button>
        </div>
      </div>
    </div>
  );
}
