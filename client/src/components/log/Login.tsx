import { Button } from "@material-ui/core";
import { auth, db, googleProvider } from "../../firebase";
import "./login.css";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { signInType } from "../../redux/actionTypes";

export default function Login() {
  const dispatch = useDispatch();

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
            console.log(info.user);
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

  return (
    <div className="login">
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
