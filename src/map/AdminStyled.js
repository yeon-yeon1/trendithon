import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  margin: 0 auto;
  width: 393px;
  height: 852px;
  background: #ffffff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  overflow: auto;
`;

export const Subtitle = styled.h2`
  font-size: 18px;
  padding-top: 105px;
  padding-left: 25px;
  padding-bottom: 0;
  margin-bottom: 5px;
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;
`;

export const ListItem = styled.li`
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #a8e6cf, #dcedc1);
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 10px;
`;

export const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
`;

export const CourseName = styled.span`
  flex-grow: 1;
  font-weight: bold;
`;

export const MoreButton = styled.button`
  background: #ffffff;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background: #f0f0f0;
  }
`;
