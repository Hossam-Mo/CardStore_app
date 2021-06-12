import React from "react";
import ReactDOM from "react-dom";

declare const window: any;
const PayPalButton = window.paypal?.Buttons.driver("react", {
  React,
  ReactDOM,
});

interface props {
  amount: string | undefined;
}
export default function Paypal({ amount }: props) {
  const createOrder = (data: any, actions: any) => {
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
    <div>
      <PayPalButton
        createOrder={(data: any, actions: any) => createOrder(data, actions)}
        onApprove={(data: any, actions: any) => onApprove(data, actions)}
      />
    </div>
  );
}
