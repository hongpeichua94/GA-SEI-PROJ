import React, { useContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";

// ANT DESIGN
import { Divider, List, Typography, Avatar } from "antd";

// const data = [
//   "Racing car sprays burning fuel into crowd.",
//   "Japanese princess to wed commoner.",
//   "Australian walks 100km after outback crash.",
//   "Man charged over missing wedding girl.",
//   "Los Angeles battles huge wildfires.",
// ];

// SCRIPTS
import { getLeaveRequest } from "../scripts/api";

const UpcomingLeave = () => {
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);

  const [data, setData] = useState();

  const fetchLeaveRequest = async (accountId, accessToken) => {
    const leaveRequest = await getLeaveRequest(accountId, accessToken);
    console.log(leaveRequest);
    setData(leaveRequest);
  };

  useEffect(() => {
    if (userCtx.accountId) {
      fetchLeaveRequest(userCtx.accountId, userCtx.accessToken);
    }
  }, [userCtx.accountId, userCtx.accessToken]);

  return (
    <>
      <Divider orientation="center">Upcoming Time-Off</Divider>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item actions={[<a key="delete">delete</a>]}>
            <List.Item.Meta
              //   avatar={
              //     <Avatar
              //       src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
              //     />
              //   }
              title={`[${item.status}] ${item.leave_type} LEAVE (${item.duration} DAYS)`}
              description={`From ${item.start_date.split("T")[0]} to ${
                item.end_date.split("T")[0]
              }`}
            />
          </List.Item>
        )}
      />
    </>
  );
};
export default UpcomingLeave;
