import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as W from "../community/styledWrite";
// import * as H from "../home/styledHome";
import * as C from "../community/styledCommunity";
import * as J from "../user/styledJoin";
import Footer from "../components/Footer";
import axios from "axios";
// import { useAuth } from "../context/AuthContext";

const Write = () => {
    const navigate = useNavigate();
    const today = new Date();
    const image_preview = useRef();
    const image_input = useRef();
    const [text, setText] = useState("");
    const imageInputRef = useRef(null); // input 요소를 직접 참조
    // const { user } = useAuth();

    // const menuItems = [
    //     { Icon: H.HomeIcon, path: "/home" },
    //     { Icon: H.CommuIcon, path: "/community" },
    //     { Icon: H.FlagIcon, path: "/plogging" },
    //     { Icon: H.MyPageIcon, path: "/mypage" },
    // ];

    const formattedDate = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;

    const handleChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const imgURL = URL.createObjectURL(e.target.files[0]);
            
            image_input.current.style.display = "none";
            image_preview.current.style.display = "flex";
    
            // <img> 요소에 src 적용
            const imgTag = image_preview.current.querySelector("img");
            imgTag.src = imgURL;
        }
    };

    const textCount = (e) => {
        setText(e.target.value);
    };

    const uploadPost = async () => {
        if (!text.trim()) {
            alert("내용을 입력해주세요.");
            return;
        }

        const formData = new FormData();
        formData.append("post", new Blob([JSON.stringify({ content: text, location: "서울" })], { type: "application/json" }));

        // const file = image_input.current?.files?.[0];
        const file = imageInputRef.current?.files?.[0]; // input 요소에서 직접 파일 참조
        if(file) {
            formData.append("file", file);
        }

        try {
            await axios.post("http://3.34.183.9:8080/api/posts", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            alert("게시글이 등록되었습니다.");
            navigate('/community');
        } catch (error) {
            console.error("게시글 업로드 실패:", error);
            alert("게시글 업로드 중 오류 발생");
        }
    };

    return (
        <>
            <C.Container>
                <C.JoinHeader>
                    <Link to="/community">
                        <J.BackIcon src="/images/BackIcon.svg" />
                    </Link>
                    <W.WriteTitle>커뮤니티 작성</W.WriteTitle>
                </C.JoinHeader>

                <W.DateBox>
                    <W.WriteDate>작성 일자</W.WriteDate>
                    <W.WriteDate weight="500">{formattedDate}</W.WriteDate>
                    <W.CalendarIcon src="/images/CalendarIcon.svg" />
                </W.DateBox>

                <W.PositionBox placeholder="위치를 소개해 주세요" />
                
                <label htmlFor="input_file">
                    <W.ImageFile ref={image_input}>
                        <W.CameraIcon src="/images/CameraIcon.svg" />
                        <W.ImageUploadPlz>사진을 업로드 해 주세요</W.ImageUploadPlz>
                    </W.ImageFile>
                    <W.ImageFilePre ref={image_preview}>
                        <img src="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </W.ImageFilePre>
                </label>
                <input ref={imageInputRef} type="file" accept="image/*" id="input_file" onChange={handleChange} style={{ display: "none" }}/>

                <W.TextBox maxLength={200} value={text} onChange={textCount} />
                <W.TextLength>({text.length}/200)</W.TextLength>

                <W.UploadButton onClick={uploadPost}>업로드 하기</W.UploadButton>
            </C.Container>

            {/* <H.Footer>
                {menuItems.map((item, index) => (
                <H.NavItem key={index} onClick={() => navigate(item.path)}>
                    <item.Icon />
                </H.NavItem>
                ))}
            </H.Footer> */}
            <Footer />
        </>
    );
}

export default Write;