import "./nav.css";
import { BsArrowRightShort } from "react-icons/bs";
import { IconButton } from "@material-ui/core";
import { Link, useParams, useHistory } from "react-router-dom";
import logoSvg from "../../img/logoSvg.svg";

//   background-color: #818B95;
//  background-color: #061B2D;
interface ParamTypes {
  typeId: string;
}
function Nav() {
  const history = useHistory();
  const { typeId } = useParams<ParamTypes>();

  const goBack = () => {
    history.goBack();
  };
  return (
    <div className="nav">
      <div className="nav_head">
        {typeId ? <h1>{typeId?.toLocaleUpperCase()}</h1> : <h1>Home</h1>}

        <Link to="/">
          <img className="nav_img" src={logoSvg}></img>
        </Link>

        <IconButton onClick={goBack}>
          <BsArrowRightShort className="nav_icon"></BsArrowRightShort>
        </IconButton>
      </div>
    </div>
  );
}

export default Nav;
