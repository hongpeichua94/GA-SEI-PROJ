import React from "react";

import { Card } from "antd";

const ExpenseSummaryCard = (props) => {
  const orderMap = {
    APPROVED: 1,
    PENDING: 2,
    REJECTED: 3,
  };

  return (
    <Card
      style={{
        margin: "10px 16px",
        width: 300,
        height: 200,
        display: "flex",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        color: "#8C8C8C",
        order: orderMap[props.status] || 0,
      }}
    >
      <p style={{ fontWeight: 400, fontSize: 16 }}>{props.status} CLAIMS</p>
      <p style={{ fontWeight: 400, fontSize: 40 }}>${props.amount}</p>
    </Card>
  );
};

export default ExpenseSummaryCard;
