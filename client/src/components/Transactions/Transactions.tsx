import { TextField } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../../firebase";
import "./transactions.css";

interface transactions {
  cardNumber: Number;
  category: string;
  email?: string;
  imgUrl?: string;
  price: number;
  type: string;
  username?: string;
}

export default function Transactions() {
  const user = useSelector((state: any) => state.user);
  const userInfo = useSelector((state: any) => state.userInfo);
  const [transactions, setTransactions] = useState<transactions[]>();
  const [searchText, setSearchText] = useState<undefined | string>("");

  useEffect(() => {
    console.log(user);
    console.log(userInfo);
  }, []);
  useEffect(() => {
    if (userInfo?.admin) {
      db.collection("adminTransactions")
        .limit(10)
        .onSnapshot((s) => {
          setTransactions(
            s.docs.map((trans) => {
              return {
                cardNumber: trans.data().cardNumber,
                category: trans.data().category,
                email: trans.data().email,
                imgUrl: trans.data().imgUrl,
                price: trans.data().price,
                type: trans.data().type,
                username: trans.data().username,
              };
            })
          );
        });
    } else {
      db.collection("users")
        .doc(user?.uid)
        .collection("transactions")
        .onSnapshot((s) => {
          setTransactions(
            s.docs.map((trans) => {
              return {
                cardNumber: trans.data().cardNumber,
                category: trans.data().category,
                imgUrl: trans.data().imgUrl,
                price: trans.data().price,
                type: trans.data().type,
              };
            })
          );
        });
    }
  }, [userInfo]);

  const search = () => {
    if (searchText !== "")
      axios
        .put("http://localhost:5000/", {
          search: searchText?.toLowerCase(),
        })
        .then((r) => {
          console.log(r.data);
          setTransactions(r.data);
        })
        .catch((err) => {
          alert(err);
        });
  };

  return (
    <div>
      {userInfo?.admin ? (
        <div className="transactions">
          <div className="transactions_search">
            <TextField
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
              label="Search"
              variant="outlined"
            ></TextField>

            <button onClick={search}>Search</button>
          </div>

          {transactions?.map((card) => {
            return (
              <div key={`${card.cardNumber}`} className="transactions_card">
                <div className="card_user">
                  <h2>{card.username}</h2>
                  <h3>{card.email}</h3>
                </div>
                <div className="card_info">
                  <h2>
                    {card.type.toLocaleUpperCase()} {card.category}
                  </h2>

                  <h3>{card.cardNumber}</h3>
                  <h3>Price: {card.price}JD</h3>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="transactions">
          {transactions?.map((card) => {
            return (
              <div key={`${card.cardNumber}`} className="transactions_card">
                <div className="card_userCard">
                  <img
                    src={card.imgUrl}
                    alt={card.type.toLocaleUpperCase()}
                  ></img>

                  <div className="card_info">
                    <h2>
                      {card.type.toLocaleUpperCase()} {card.category}
                    </h2>

                    <h3>Card Number: {card.cardNumber}</h3>
                    <h3>Price: {card.price}JD</h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
