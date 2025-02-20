import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // ✅ 스타일 파일 추가
import { ReactComponent as CalendarIcon } from "../../assets/Calendar.svg";
import * as S from "./DatePickerStyled";

const DatePickerComponent = ({ setSelectedDate }) => {
  const [isOpen, setIsOpen] = useState(false); // ✅ 달력 열림 상태
  const [selectedDate, setLocalSelectedDate] = useState(new Date());

  // ✅ 날짜를 YYYY-MM-DD 형식으로 변환하는 함수 (한국 시간 기준)
  const formatDate = (date) => {
    const adjustedDate = new Date(date);
    adjustedDate.setHours(9, 0, 0, 0); // ✅ UTC+9로 변환
    return adjustedDate.toISOString().split("T")[0];
  };

  // ✅ 오늘 날짜 이후 선택 불가 설정
  // const getTodayDate = () => new Date();

  return (
    <>
      <S.DatePickerWrapper>
        <S.DateBadge onClick={() => setIsOpen(!isOpen)}>
          플로깅 일자 {formatDate(selectedDate)}
          <CalendarIcon width="12.5" height="12.5" />
        </S.DateBadge>
      </S.DatePickerWrapper>
      {isOpen && (
        <S.DatePickerPopup>
          <DatePicker
            selected={selectedDate} // ✅ 내부 상태 사용
            onChange={(date) => {
              setLocalSelectedDate(date); // ✅ 내부 상태 업데이트
              setSelectedDate(date); // ✅ 부모 컴포넌트(Verification.jsx)로 날짜 전달
              setIsOpen(false); // ✅ 날짜 선택 후 달력 닫기
            }}
            inline // ✅ 달력을 작은 창으로 표시
            // maxDate={getTodayDate()} // ✅ 오늘 이후 날짜 선택 불가
          />
        </S.DatePickerPopup>
      )}
    </>
  );
};

export default DatePickerComponent;
