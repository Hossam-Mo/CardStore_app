import { IconButton } from "@material-ui/core";
import { lazy, useRef } from "react";
import { BsListTask, BsCreditCard } from "react-icons/bs";
import { IoHomeOutline, IoPersonOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
//import AdminMenu from "./menu/AdminMenu";
import "./footer.css";

const AdminMenu = lazy(() => import("./menu/AdminMenu"));

export default function Footer() {
  const menu = useRef<HTMLDivElement>(null);

  const openMenu = () => {
    if (menu.current) {
      menu.current.style.left = "0";
    }
  };
  const closeMenu = () => {
    if (menu.current) {
      menu.current.style.left = "-100vw";
    }
  };

  return (
    <div className="footer">
      <Link to="/cashout">
        <IconButton>
          <BsCreditCard></BsCreditCard>
        </IconButton>
      </Link>

      <Link className="footer_mid" to="/">
        <IconButton className="footer_home">
          <IoHomeOutline></IoHomeOutline>
        </IconButton>
      </Link>

      <IconButton onClick={openMenu}>
        <BsListTask></BsListTask>
      </IconButton>

      <div ref={menu} className="footer_menu">
        <div className="menu_contant">
          <AdminMenu></AdminMenu>
        </div>
        <div onClick={closeMenu} className="menu_opacity"></div>
      </div>
    </div>
  );
}
