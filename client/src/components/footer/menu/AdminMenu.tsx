import "./adminmenu.css";
import { BiTransfer } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { IoCallSharp } from "react-icons/io5";
import { RiLogoutBoxFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { auth } from "../../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { signOutType } from "../../../redux/actionTypes";

export default function AdminMenu() {
  const userInfo = useSelector((state: any) => state.userInfo);

  const dispatch = useDispatch();
  const logOut = () => {
    auth
      .signOut()
      .then(() => {
        dispatch({
          type: signOutType.type,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="adminMenu">
      <div className="adminMenu_header">
        <img src={userInfo?.imgUrl} alt={userInfo?.username}></img>
        <h1>{userInfo?.username}</h1>
        <p>Balance: {userInfo?.balance} JD</p>
      </div>

      {userInfo?.admin ? (
        <div className="adminMenu_contant">
          <Link className="menu_links" to="/Transactions">
            <BiTransfer></BiTransfer>
            <h4>Transactions</h4>
          </Link>
          <Link className="menu_links" to="/users/admin">
            <FaUsers></FaUsers>
            <h4>Users</h4>
          </Link>
          <Link className="menu_links" to="/info">
            <IoCallSharp></IoCallSharp>
            <h4>Call us information</h4>
          </Link>
          <Link to="/" className="menu_links" onClick={logOut}>
            <RiLogoutBoxFill></RiLogoutBoxFill>
            <h4>Log out</h4>
          </Link>
        </div>
      ) : (
        <div className="adminMenu_contant">
          <Link className="menu_links" to="/Transactions">
            <BiTransfer></BiTransfer>
            <h4>Transactions</h4>
          </Link>
          <Link className="menu_links" to="/info">
            <IoCallSharp></IoCallSharp>
            <h4>Call us</h4>
          </Link>
          <Link to="/" className="menu_links" onClick={logOut}>
            <RiLogoutBoxFill></RiLogoutBoxFill>
            <h4>Log out</h4>
          </Link>
        </div>
      )}
    </div>
  );
}
