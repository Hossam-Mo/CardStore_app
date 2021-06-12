import React from "react";
import ReactDOM from "react-dom";
import "./cashOut.css";
import Radio from "@material-ui/core/Radio";
import { GiReceiveMoney } from "react-icons/gi";
import { GiMoneyStack } from "react-icons/gi";
import { GiTakeMyMoney } from "react-icons/gi";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

declare const window: any;

const PayPalButton = window.paypal?.Buttons.driver("react", {
  React,
  ReactDOM,
});

export default function CashOut() {
  const [charge, setCharge] = useState<string | undefined>(undefined);
  const userInfo = useSelector((state: any) => state.userInfo);

  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCharge(event.target.value);
  };

  const createOrder = (data: any, actions: any) => {
    console.log(data);
    return actions.order.create({
      purchase_units: [
        {
          description: "Add for the app",
          amount: {
            value: "100",
          },
        },
      ],
    });
  };

  const onApprove = (data: any, actions: any) => {
    console.log(data);
    actions.order
      .capture()
      .then((r: any) => {
        console.log(r);
      })
      .catch((err: any) => {
        console.log(err);
        alert(err);
      });
  };
  return (
    <div className="cashOut">
      <div className="cashOut_balance">
        Your Balance: {userInfo?.balance} JD
      </div>
      <div className="cashOut_main">
        <div className="cashOut_card">
          <div className="cashOut_icons">
            <GiReceiveMoney></GiReceiveMoney>
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
        <PayPalButton
          createOrder={(data: any, actions: any) => createOrder(data, actions)}
          onApprove={(data: any, actions: any) => onApprove(data, actions)}
        />
      </div>
    </div>
  );
}
