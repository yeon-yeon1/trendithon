import React from "react";
import * as I from "./AdminItemStyled";
import { useNavigate } from "react-router-dom";
import { ReactComponent as DnE } from "../../assets/DnE.svg";

const AdminItem = ({ data, index }) => {
  const navigate = useNavigate();

  return (
    <I.ListItem>
      <DnE width="83" height="72" />
      <I.CourseName>{data.courseName}</I.CourseName>
      <I.MoreButton onClick={() => navigate(`/admin/detail/${data.verificationId}`)}>더보기 →</I.MoreButton>
    </I.ListItem>
  );
};

export default AdminItem;
