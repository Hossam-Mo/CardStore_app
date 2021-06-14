import { Button } from "@material-ui/core";
import { auth, db, googleProvider } from "../../firebase";
import "./login.css";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { signInType } from "../../redux/actionTypes";
import { useState } from "react";
import { useEffect } from "react";

export default function Login() {
  const dispatch = useDispatch();
  const [background, SetBackground] = useState("");
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
      SetBackground("loginPc.png");
    }
  }, []);

  return (
    <div className="login">
      <img className="login_background" src={background} alt="img"></img>
      <h1>Card App</h1>
      <div className="login_box">
        <div className="box_div">
          <FcGoogle></FcGoogle>
          <Button className="box_button" onClick={signIn}>
            Sign in with google
          </Button>
        </div>
      </div>
    </div>
  );
}
