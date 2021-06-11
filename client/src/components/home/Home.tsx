import { TextField } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebase";
import "./home.css";
import homelogo from "../../img/homeLogo2.svg";
interface types {
  id: string;
  imgUrl: string;
  name: string;
}

export default function Home() {
  const [cardTypes, setCardTypes] = useState<types[]>();
  const [randerCards, setRanderCards] = useState<types[]>();
  const [search, setSearch] = useState("");

  useEffect(() => {
    db.collection("cards").onSnapshot((s) => {
      setCardTypes(
        s.docs.map((doc) => {
          return {
            id: doc.id,
            name: doc.data().name.toLowerCase(),
            imgUrl: doc.data().imgUrl,
          };
        })
      );

      setRanderCards(
        s.docs.map((doc) => {
          return {
            id: doc.id,
            name: doc.data().name,
            imgUrl: doc.data().imgUrl,
          };
        })
      );
    });
  }, []);

  const searchFun = () => {
    if (cardTypes) {
      setRanderCards(
        cardTypes.filter((obj) => {
          if (obj.name.indexOf(search.toLowerCase().replace(/\s/g, "")) > -1) {
            return obj.name;
          }
        })
      );
    }
  };
  useEffect(() => {
    searchFun();
  }, [search]);
  return (
    <div className="home">
      <div className="home_head">
        <img className="head_background" src="/home.png" alt="head"></img>
        <img className="head_logo" src={homelogo}></img>
      </div>
      <TextField
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        label="Search"
        variant="outlined"
      ></TextField>

      <div className="home_grid">
        {randerCards?.map((it) => {
          return (
            <div key={it.id} className="grid_imgs">
              <Link to={`/cards/${it.id}`}>
                {" "}
                <img src={it.imgUrl}></img>
              </Link>

              <h5>{it.name.toLocaleUpperCase()}</h5>
            </div>
          );
        })}
      </div>
    </div>
  );
}
