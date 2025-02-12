import React from "react";
import AdminItem from "./AdminItem";
import * as L from "./AdminListStyled";

const AdminList = ({ verificationData }) => {
  //   useEffect(() => {
  //   console.log("🔍 AdminList - verificationData:", verificationData);
  // }, [verificationData]);
  return (
    <L.List>
      {verificationData.map((data, index) => (
        <AdminItem key={index} data={data} index={index} />
      ))}
    </L.List>
  );
};

export default AdminList;
