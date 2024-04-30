import React from "react";

import { Card } from "antd";

const LeaveBalanceCard = (props) => {
  const orderMap = {
    ANNUAL: 1,
    SICK: 2,
    CHILDCARE: 3,
    MATERNITY: 4,
    PATERNITY: 5,
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
        order: orderMap[props.leaveType] || 0,
      }}
    >
      <p style={{ fontWeight: 400, fontSize: 16 }}>{props.leaveType}</p>
      <p style={{ fontWeight: 400, fontSize: 40 }}>{props.balance}</p>
      <p style={{ fontWeight: 200, fontSize: 14 }}>DAYS AVAILABLE</p>
    </Card>
  );
};

export default LeaveBalanceCard;
