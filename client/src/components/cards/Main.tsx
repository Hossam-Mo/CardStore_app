import { IconButton, TextField } from "@material-ui/core";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import "./main.css";
import { RiDeleteBin5Line } from "react-icons/ri";
import { BsPencil } from "react-icons/bs";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import Modal from "../Modal";
import { useSelector } from "react-redux";
import CompleteModal from "../CompleteModal";

interface arr {
  cardNumber?: string;
  id?: string;
  name: string;
  price: string;
  type: string;
  category: string;
  imgUrl: string;
}

interface props {
  update: boolean;
}
interface ParamTypes {
  typeId: string;
  catagId: string;
}

export default function Main({ update }: props) {
  const [cards, setCards] = useState<arr[]>();
  const [updating, setUpdating] = useState<string>();
  const [name, setName] = useState<string>();
  const [price, setPrice] = useState<string>();
  const [number, setNumber] = useState<string>();
  const [open, setOpen] = useState(false);
  const [warning, setWarning] = useState(false);
  const [cardNumber, setCardNumber] = useState(0);
  const [crrentCard, setCrrentCard] = useState<arr>();

  const { typeId } = useParams<ParamTypes>();
  const { catagId } = useParams<ParamTypes>();

  const user = useSelector((state: any) => state.user);
  const userInfo = useSelector((state: any) => state.userInfo);

  useEffect(() => {
    if (!update) {
      db.collection("cards")
        .doc(typeId)
        .collection("category")
        .orderBy("number", "desc")
        .onSnapshot((s) => {
          // for delete the empty category
          s.docs.forEach((doc) => {
            db.collection("cards")
              .doc(typeId)
              .collection("category")
              .doc(doc.id)
              .collection("cards")
              .onSnapshot((s) => {
                if (s.empty) {
                  db.collection("cards")
                    .doc(typeId)
                    .collection("category")
                    .doc(doc.id)
                    .delete();
                }
              });
          });
          // for seting the category cards
          setCards(
            s.docs.map((doc) => {
              return {
                name: doc.data().type,
                id: doc.id,
                price: doc.data().price,
                type: doc.data().type,
                category: doc.id,
                imgUrl: doc.data().imgUrl,
              };
            })
          );
        });
    } else {
      db.collection("cards")
        .doc(typeId)
        .collection("category")
        .doc(catagId)
        .collection("cards")
        .onSnapshot((s) => {
          setCards(
            s.docs.map((doc) => {
              return {
                name: doc.data().name,
                id: doc.id,
                price: doc.data().price,
                type: doc.data().type,
                category: doc.data().category,
                imgUrl: doc.data().imgUrl,
                cardNumber: doc.data().cardNumber,
              };
            })
          );
        });
    }
  }, [update]);

  const updateCard = (id?: string, type?: string, category?: string) => {
    // updateing a card for admin
    db.collection("cards")
      .doc(type)
      .collection("category")
      .doc(category)
      .collection("cards")
      .doc(id)
      .update({
        price,
        name,
        cardNumber: number,
      });
    setUpdating(undefined);
    setPrice(undefined);
    setName(undefined);
    setNumber(undefined);
  };

  const deleteCard = (type?: string, category?: string, id?: string) => {
    // deleting a card for admin
    db.collection("cards")
      .doc(type)
      .collection("category")
      .doc(category)
      .collection("cards")
      .doc(id)
      .delete();
  };
  const buy = (card?: arr) => {
    // for buing a card
    const price = Number(card?.price);

    if (userInfo.balance >= price) {
      db.collection("users")
        .doc(user.uid)
        .update({
          balance: userInfo.balance - price,
        });

      if (card) {
        db.collection("cards")
          .doc(card.type)
          .collection("category")
          .doc(card.id)
          .collection("cards")
          .limit(1)
          .get()
          .then((s) => {
            db.collection("cards")
              .doc(s.docs[0].data().type)
              .collection("category")
              .doc(s.docs[0].data().category)
              .collection("cards")
              .doc(s.docs[0].id)
              .delete()
              .then(() => {
                setCardNumber(s.docs[0].data().cardNumber);
                setOpen(true);
                setWarning(false);
              })
              .catch((err) => {
                console.log(err);
              });
            console.log(s.docs[0].data());
            console.log(card);
            console.log(user);
            // users transactions
            db.collection("users")
              .doc(user.uid)
              .collection("transactions")
              .add({
                cardNumber: s.docs[0].data().cardNumber,
                category: s.docs[0].data().category,
                imgUrl: s.docs[0].data().imgUrl,
                price: s.docs[0].data().price,
                type: s.docs[0].data().type,
              });
            // admin transactions
            db.collection("adminTransactions").add({
              username: user.displayName.toLowerCase(),
              email: user.email,
              cardNumber: s.docs[0].data().cardNumber,
              category: s.docs[0].data().category,
              imgUrl: s.docs[0].data().imgUrl,
              price: s.docs[0].data().price,
              type: s.docs[0].data().type,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      alert("Sorry you don't have enough balance");
    }
  };
  const addCard = () => {
    console.log(cards);
  };
  return (
    <div>
      {!userInfo?.admin ? (
        <div className="main">
          <div className="main_money">
            <h1>Balance : {userInfo?.balance} JD</h1>
          </div>
          {cards?.length === 0 ? (
            <div className="main_noCards">
              <h1>Sorry We have no more {typeId} cards</h1>
              <h3>you can contact us on 07923122331 for more info</h3>
              <Link to="/">
                <button>Back</button>
              </Link>
            </div>
          ) : (
            cards?.map((card) => {
              return (
                <div key={card.id} className="main_card">
                  <div className="card_buy">
                    <IconButton
                      onClick={() => {
                        setCrrentCard(card);
                        setWarning(true);
                      }}
                    >
                      Buy Now
                    </IconButton>
                    <h3>{card.price} JD</h3>
                  </div>
                  <div className="card_img">
                    <div className="img_desc">
                      <h4>{card.name.toLocaleUpperCase()}</h4>
                      <h4>{card.category} JD</h4>
                    </div>
                    <img
                      className="img_photo"
                      src={card.imgUrl}
                      alt={card.name}
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>
      ) : (
        <div className="main">
          <Link to="/cards/add/add_card">
            <IconButton onClick={addCard} className="main_admin">
              Add a Card
            </IconButton>
          </Link>
          <Link to="/cards/add/add_card/type">
            <IconButton onClick={addCard} className="main_admin">
              Add a Type
            </IconButton>
          </Link>

          {cards?.length !== 0 ? (
            cards?.map((card) => {
              return (
                <div key={card.id} className="main_card">
                  <div className={`card_buy ${update && "card_delete"}`}>
                    {!update ? (
                      <Link to={`/cards/${card.type}/${card.category}/update`}>
                        <IconButton>Update</IconButton>
                      </Link>
                    ) : updating === card.id ? (
                      <IconButton
                        onClick={() => {
                          updateCard(card.id, card.type, card.category);
                        }}
                      >
                        <IoCheckmarkDoneOutline></IoCheckmarkDoneOutline>
                      </IconButton>
                    ) : (
                      <IconButton
                        onClick={() => {
                          setUpdating(card.id);
                          setPrice(card.price);
                          setName(card.name);
                          setNumber(card.cardNumber);
                        }}
                      >
                        <BsPencil></BsPencil>
                      </IconButton>
                    )}

                    {update && (
                      <IconButton
                        onClick={() => {
                          deleteCard(card.type, card.category, card.id);
                        }}
                      >
                        <RiDeleteBin5Line></RiDeleteBin5Line>
                      </IconButton>
                    )}

                    {updating === card.id ? (
                      <TextField
                        className="card_updateInput"
                        value={price}
                        type="number"
                        onChange={(e) => {
                          setPrice(e.target.value);
                        }}
                      ></TextField>
                    ) : (
                      <h3>{card.price} JD</h3>
                    )}
                  </div>
                  <div className="card_img">
                    {updating === card.id ? (
                      <div className="img_desc">
                        <TextField
                          className="img_updateInput"
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                        ></TextField>

                        <TextField
                          className="img_updateInput"
                          value={number}
                          type="number"
                          onChange={(e) => {
                            setNumber(e.target.value);
                          }}
                        ></TextField>
                      </div>
                    ) : (
                      <div className="img_desc">
                        <h4>{card.name.toLocaleUpperCase()}</h4>
                        <h4>{card.category} JD</h4>
                        {update && <h4>{card.cardNumber}</h4>}
                      </div>
                    )}

                    <img
                      className="img_photo"
                      src={card.imgUrl}
                      alt={card.name}
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="main_noCards">
              <h1>There no more {typeId} cards in the Stock</h1>
              <Link to="/">
                <button>Back</button>
              </Link>
            </div>
          )}
        </div>
      )}
      <Modal open={open} setOpen={setOpen} contant={cardNumber}></Modal>
      <CompleteModal
        open={warning}
        setOpen={setWarning}
        action={() => {
          buy(crrentCard);
        }}
      ></CompleteModal>
    </div>
  );
}
