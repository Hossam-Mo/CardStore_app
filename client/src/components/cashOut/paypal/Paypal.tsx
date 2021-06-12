import React from "react";
import ReactDOM from "react-dom";
import { useSelector } from "react-redux";
import { db } from "../../../firebase";

declare const window: any;
const PayPalButton = window.paypal?.Buttons.driver("react", {
  React,
  ReactDOM,
});

interface props {
  amount: string | undefined;
}
export default function Paypal({ amount }: props) {
  const userInfo = useSelector((state: any) => state.userInfo);
  const user = useSelector((state: any) => state.user);

  const createOrder = (data: any, actions: any) => {
    if (amount) {
      return actions.order.create({
        purchase_units: [
          {
            description: "Add cash for the app",
            amount: {
              value: amount,
            },
          },
        ],
      });
    } else {
      alert("Please chose an amount");
    }
  };

  const onApprove = (data: any, actions: any) => {
    actions.order
      .capture()
      .then((r: any) => {
        const value = Number(r.purchase_units[0].amount.value);
        const oldBalance = Number(userInfo?.balance);
        const newBalance = value + oldBalance;

        alert("The transaction completed");
        db.collection("users").doc(user?.uid).update({ balance: newBalance });
        db.collection("users")
          .doc(user?.uid)
          .collection("CashAdd")
          .add({ time: r.create_time, amount: value });
      })
      .catch((err: any) => {
        console.log(err);
        alert("Something went wrong. Please try again later");
      });
  };
  return (
    <div>
      <PayPalButton
        createOrder={(data: any, actions: any) => createOrder(data, actions)}
        onApprove={(data: any, actions: any) => onApprove(data, actions)}
      />
    </div>
  );
}
