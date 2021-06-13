import React from "react";
import { useState } from "react";
import "./addInfo.css";
import { Button, TextField } from "@material-ui/core";
import { IoCallSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { db } from "../../firebase";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function AddInfo() {
  const [update, setUpdate] = useState(false);
  const [number, setNumber] = useState<string | null | undefined>(null);
  const [email, setEmail] = useState<string | null | undefined>(null);
  const userInfo = useSelector((state: any) => state.userInfo);

  const updateInfo = () => {
    if (number && email)
      db.collection("info").doc("CallInfo").set({ number, email });
  };

  useEffect(() => {
    db.collection("info")
      .doc("CallInfo")
      .get()
      .then((r) => {
        setNumber(r.data()?.number);
        setEmail(r.data()?.email);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="addInfo">
      {update ? (
        <div className="addInfo_main">
          <div className="addInfo_contant">
            <IoCallSharp className="addInfo_icons"></IoCallSharp>
            <TextField
              placeholder="Entar a number"
              type="number"
              value={number}
              onChange={(e) => {
                setNumber(e.target.value);
              }}
            ></TextField>
          </div>
          <div className="addInfo_contant">
            <MdEmail className="addInfo_icons"></MdEmail>
            <TextField
              placeholder="Entar an Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
            ></TextField>
          </div>
          <Button
            onClick={() => {
              setUpdate(false);
              updateInfo();
            }}
          >
            Done
          </Button>
        </div>
      ) : (
        <div className="addInfo_main">
          <div className="addInfo_contant">
            <IoCallSharp className="addInfo_icons"></IoCallSharp>
            <p>{number}</p>
          </div>
          <div className="addInfo_contant">
            <MdEmail className="addInfo_icons"></MdEmail>
            <p>{email}</p>
          </div>
          {userInfo?.admin && (
            <Button
              onClick={() => {
                setUpdate(true);
              }}
              className="addInfo_update"
            >
              Update
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
