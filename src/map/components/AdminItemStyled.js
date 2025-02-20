import styled from "styled-components";

export const ListItem = styled.li`
  display: flex;
  align-items: center;
  text-align: center;
  background: linear-gradient(103deg, #7adcdb 0.12%, #d1ffd8 99.88%);
  border-radius: 5px;
  padding-left: 10px;
  padding-right: 15px;
  margin: 15px;
`;

export const CourseName = styled.span`
  flex-grow: 1;
  // color: #ffffff;
  font-size: 18px;
  font-weight: 600;
`;

export const MoreButton = styled.button`
  width: 64px;
  height: 18px;
  color: #6ad0cf;
  font-size: 11px;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.31) 67.67%, rgba(122, 220, 219, 0.31) 100%);
`;
