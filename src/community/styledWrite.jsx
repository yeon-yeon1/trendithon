import styled from "styled-components";

export const WriteTitle = styled.p`
    color: #000;
    font-family: "Pretendard Variable";
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    margin-top: 31px;
    margin-left: 94px;
`;

export const DateBox = styled.div`
    width: 169px;
    height: 25px;
    border-radius: 10px;
    border: 1px solid #7ADCDB;
    margin-top: 41.98px;
    margin-left: 196px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
`;

export const WriteDate = styled.p`
    color: #000;
    font-family: "Pretendard Variable";
    font-size: 12px;
    font-style: normal;
    font-weight: ${(props) => props.weight ? props.weight : "600"};
    line-height: 160.5%; /* 19.26px */
`;

export const CalendarIcon = styled.img`
    width: 9px;
    height: 9.058px;
`;

export const PositionBox = styled.input`
    width: 338px;
    height: 41px;
    border-radius: 10px;
    border: 1px solid #7ADCDB;
    background: #FFF;
    display: flex;
    align-items: center;
    margin-top: 11px;
    margin-left: 17px;
    padding-left: 21px;
    color: #000;
    font-family: "Pretendard Variable";
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;

    &::placeholder {
        color: #E3E3E3;
        font-family: Inter;
        font-size: 12px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
    }

    &:focus {
        outline: none;
    }
`;

export const ImageFile = styled.div`
    width: 359px;
    height: 200px;
    border-radius: 5px;
    background: #FFF;
    margin-top: 12px;
    margin-left: 17px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

export const ImageFilePre = styled.div`
    width: 359px;  /* 업로드 영역과 동일한 너비 */
    height: 200px; /* 업로드 영역과 동일한 높이 */
    border-radius: 5px;
    background: #FFF;
    display: none;  /* 기본적으로 숨김 */
    align-items: center;
    justify-content: center;
    overflow: hidden;
    margin-top: 12px;
    margin-left: 17px;
`;

export const CameraIcon = styled.img`
    width: 45px;
    height: 41.25px;
`;

export const ImageUploadPlz = styled.p`
    color: #AAA;
    font-family: "Pretendard Variable";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.32px;
`;

export const TextBox = styled.textarea`
    width: 359px;
    height: 258px;
    border-radius: 5px;
    border: none;
    background: #FFF;
    margin-top: 16px;
    margin-left: 17px;
    resize: none;
    color: #000;
    font-family: "Pretendard Variable";
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 17px; /* 141.667% */

    &:focus {
        outline: none;
    }
`;

export const TextLength = styled.span`
    position: absolute;
    color: #000;
    text-align: center;
    font-family: "Pretendard Variable";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    top: 623px;
    left: 300px;
`;

export const UploadButton = styled.button`
    width: 154.154px;
    height: 48px;
    border-radius: 46.154px;
    border: none;
    background: linear-gradient(103deg, #D1FFD8 0.12%, #7ADCDB 99.88%);
    color: #FFF;
    font-family: "Pretendard Variable";
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    margin-top: 17px;
    margin-left: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
`;