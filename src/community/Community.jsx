import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as C from "../community/styledCommunity";
import * as H from "../home/styledHome";
import * as J from "../user/styledJoin";

const Community = () => {
    const navigate = useNavigate();

    const menuItems = [
        { Icon: H.HomeIcon, path: "/home" },
        { Icon: H.CommuIcon, path: "/community" },
        { Icon: H.FlagIcon, path: "/plogging" },
        { Icon: H.MyPageIcon, path: "/mypage" },
    ];

    return (
        <>
            <C.Container>
                <C.JoinHeader>
                    <Link to="/home">
                        <J.BackIcon src="/images/BackIcon.svg" />
                    </Link>
                    <J.JoinTitle>커뮤니티</J.JoinTitle>
                </C.JoinHeader>

                <Link to="/write">
                    <C.WriteIcon src="/images/WriteIcon.svg" />
                </Link>
            </C.Container>

            <H.Footer>
                {menuItems.map((item, index) => (
                <H.NavItem key={index} onClick={() => navigate(item.path)}>
                    <item.Icon />
                </H.NavItem>
                ))}
            </H.Footer>
        </>
    );
}

export default Community;