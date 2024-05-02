import React, { useContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";

// ANT DESIGN
import { Divider, List, message } from "antd";

// SCRIPTS
import { getLeaveRequest } from "../scripts/api";

const UpcomingLeave = () => {
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);

  const [data, setData] = useState();

  const fetchLeaveRequest = async (accountId, accessToken) => {
    const leaveRequest = await getLeaveRequest(accountId, accessToken);
    setData(leaveRequest);
  };

  const handleDelete = async (uuid) => {
    const res = await fetchData(
      "/api/leave/request",
      "DELETE",
      {
        uuid: uuid,
      },
      userCtx.accessToken
    );

    if (res.ok) {
      message.success("Leave request deleted successfully");
      // console.log(res.data);
      await fetchLeaveRequest(userCtx.accountId, userCtx.accessToken);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
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
        className="delete-request"
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item
            actions={[
              <a
                key="delete"
                onClick={() => handleDelete(item.uuid)}
                style={{ textDecoration: "none", color: "rgba(0, 0, 0, 0.45)" }}
              >
                Delete Request
              </a>,
            ]}
          >
            <List.Item.Meta
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
