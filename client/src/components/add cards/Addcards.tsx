import { Button, InputAdornment, MenuItem, TextField } from "@material-ui/core";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import AlertModal from "../alertModal/AlertModal";
import CompleteModal from "../CompleteModal";
import ImageUpload from "../imgUploader/ImgUploder";
import "./addcards.css";
interface props {
  params: boolean;
}

interface select {
  name: string;
  imgUrl: string;
  id: string;
}

export default function Addcards({ params }: props) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [number, setNumber] = useState("");
  const [type, setType] = useState("");
  const [typeImg, setTypeImg] = useState<select>();
  const [selectType, setSelectType] = useState<select[]>();
  const [open, setOpen] = useState(false);
  const [alertContant, setAplertContant] = useState("");

  useEffect(() => {
    db.collection("cards").onSnapshot((s) => {
      setSelectType(
        s.docs.map((card) => {
          return {
            name: card.data().name,
            imgUrl: card.data().imgUrl,
            id: card.id,
          };
        })
      );
    });
  }, []);

  const add = () => {
    if (
      typeImg === undefined ||
      name === "" ||
      category === "" ||
      price === "" ||
      number === "" ||
      type === ""
    ) {
      setOpen(true);
      setAplertContant("Please fill all the fields");
    } else {
      db.collection("cards")
        .doc(type)
        .collection("category")
        .doc(category)
        .set({
          number: category,
          type,
          imgUrl: typeImg?.imgUrl,
          price,
        });

      db.collection("cards")
        .doc(type)
        .collection("category")
        .doc(category)
        .collection("cards")
        .add({
          name,
          category,
          price,
          cardNumber: number,
          type,
          imgUrl: typeImg?.imgUrl,
        });

      setName("");
      setCategory("");
      setPrice("");
      setNumber("");
      setType("");

      setOpen(true);
      setAplertContant("The card has been added");
    }
  };

  return (
    <div className="add">
      <AlertModal
        contant={alertContant}
        open={open}
        setOpen={setOpen}
      ></AlertModal>
      <h1>Add a New Card</h1>
      {params ? (
        <form className="add_box">
          <h2>Enter Details :</h2>
          <TextField
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            label="Name"
            variant="outlined"
          />
          <TextField
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            label="Category"
            variant="outlined"
          />
          <TextField
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            type="Number"
            label="Price"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <h1 className="price_jd">JD</h1>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            value={number}
            onChange={(e) => {
              setNumber(e.target.value);
            }}
            type="Number"
            label="Number"
            variant="outlined"
          />
          <TextField
            value={type}
            onChange={(e) => {
              setType(e.target.value);
            }}
            select
            label="Select the type"
            variant="outlined"
          >
            {selectType?.map((type) => {
              return (
                <MenuItem
                  key={type.id}
                  value={type.name}
                  onClick={() => {
                    setTypeImg(type);
                  }}
                >
                  {type.name}
                </MenuItem>
              );
            })}
          </TextField>

          <Button onClick={add} className="box_button">
            Add
          </Button>
        </form>
      ) : (
        <ImageUpload></ImageUpload>
      )}
    </div>
  );
}
