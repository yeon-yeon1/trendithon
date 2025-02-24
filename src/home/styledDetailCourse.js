import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  margin: 0 auto;
  width: 393px;
  background: #e9f3f3;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

export const Container2 = styled.div`
  display: flex;
  flex-direction: column;
  height: 800px;
  padding-top: 25px;
`;

export const Data = styled.div`
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  background: #f9f9f9;
  margin: 0 20px;
`;

export const DatePickerWrapper = styled.div`
  position: relative;
  display: flex;
  margin-left: 25px;
  padding: 5px 5px;
  border: 1px solid #7adcdb;
  border-radius: 10px;
  width: 160px;
  height: 15px;
  align-items: center;
  justify-content: center;
`;

export const DateBadge = styled.div`
  font-size: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 7px;
`;

export const courseName = styled.div`
  width: 85%;
  font-size: 15px;
  font-weight: bold;
  margin: 10px 20px 0 20px;
  padding: 10px;
  text-align: center;
  border: 1px solid #7adcdb;
  border-radius: 30px;
  background-color: #ffffff;
`;

export const MapContainer = styled.div`
  height: 500px;
  background: #ddd;
  text-align: center;
  line-height: 300px;
  border-radius: 5px;
  margin: 10px 25px 0 25px;
`;

export const AddressContainer = styled.div`
  display: flex;
  width: 335px;
  height: 33px;
  border-radius: 10px;
  background: #7adcdb;
  align-items: center;
  gap: 13px;
  padding-left: 10px;
  margin: 12px 25px 2px 25px;
  color: #fff;
  font-size: 12px;
`;
