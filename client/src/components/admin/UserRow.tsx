import { Button } from "@material-ui/core";
import { useState } from "react";
import { db } from "../../firebase";
import "./userRow.css";

interface props {
  id: string;
  admin: boolean;
  balance: number;
  username: string;
  email: string;
  imgUrl: string;
}

export default function UserRow({
  id,
  admin,
  balance,
  username,
  email,
  imgUrl,
}: props) {
  const [charge, setCharge] = useState(false);
  const [newBalance, setNewBalance] = useState<string>(balance.toString());

  const handlecharge = () => {
    setCharge(false);

    db.collection("users")
      .doc(id)
      .update({
        balance: Number(newBalance),
      });
  };
  return (
    <div className="userRow">
      <div className="useRow_left">
        <img src={imgUrl} alt={username}></img>
        <div>
          <h3>{username}</h3>
          <h5>
            balance:{" "}
            {charge ? (
              <input
                className="row_input"
                type="number"
                value={newBalance}
                placeholder={balance.toString()}
                onChange={(e) => {
                  setNewBalance(e.target.value);
                }}
              ></input>
            ) : (
              balance
            )}{" "}
            JD
          </h5>
          <h5>{email}</h5>
          <p>{admin && "Admin"}</p>
        </div>
      </div>
      <div className="useRow_right">
        {charge ? (
          <Button onClick={handlecharge}>Done</Button>
        ) : (
          <Button
            onClick={() => {
              setCharge(true);
            }}
          >
            Charge
          </Button>
        )}
      </div>
    </div>
  );
}
