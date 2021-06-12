import React from "react";
import "./cashOut.css";
import Radio from "@material-ui/core/Radio";
import { GrMoney } from "react-icons/gr";
import { GiMoneyStack } from "react-icons/gi";
import { GiTakeMyMoney } from "react-icons/gi";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function CashOut() {
  const [charge, setCharge] = useState<string | undefined>(undefined);
  const userInfo = useSelector((state: any) => state.userInfo);

  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCharge(event.target.value);
  };
  return (
    <div className="cashOut">
      <div className="cashOut_balance">Your Balance: {userInfo.balance} JD</div>
      <div className="cashOut_main">
        <div className="cashOut_card">
          <div className="cashOut_icons">
            <GrMoney></GrMoney>
            <p>1 JD</p>
          </div>

          <Radio
            checked={charge === "1"}
            onChange={handleChange}
            value="1"
            name="chargeButton"
            color="primary"
          />
        </div>
        <div className="cashOut_card">
          <div className="cashOut_icons">
            <GiMoneyStack></GiMoneyStack>
            <p>10 JD</p>
          </div>

          <Radio
            checked={charge === "10"}
            onChange={handleChange}
            value="10"
            name="chargeButton"
            color="primary"
          />
        </div>
        <div className="cashOut_card">
          <div className="cashOut_icons">
            <GiTakeMyMoney></GiTakeMyMoney>
            <p>50 JD</p>
          </div>

          <Radio
            checked={charge === "50"}
            onChange={handleChange}
            value="50"
            name="chargeButton"
            color="primary"
          />
        </div>
      </div>
    </div>
  );
}
