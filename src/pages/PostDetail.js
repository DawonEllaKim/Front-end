import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { Viewer } from "@toast-ui/react-editor";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { actionCreators as postActions } from "../redux/modules/post";
import { useParams } from "react-router-dom";
import { history } from "../redux/configureStore";
import CommentWrite from "../components/CommentWrite";
import { apis } from "../utils/apis";

import { IoIosArrowDropleftCircle } from "react-icons/io";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { RiBookmarkFill } from "react-icons/ri";

const Detail = (props) => {
  const dispatch = useDispatch();
  const currentpostId = props.match.params.postId;
  const postList = useSelector((state) => state.post.list);
  const post = postList.filter(
    (post) => post.postId === Number(currentpostId)
  )[0];

  // const post_idx = postList.findIndex(
  //   (post) => post.postId === Number(currentpostId)
  // );

  const title = post.title;
  const content = post.content;

  const rawUserId = post.user.email;
  const userId = rawUserId.split("@")[0];
  const nickname = post.user.nickname;
  const rawLoginUser = localStorage.getItem("nickname");
  const loginUser = rawLoginUser.split('"')[1];

  const modDate = post.regDate.split("T")[0];
  const yearMonthDay = modDate.split("-", 3);
  const year = yearMonthDay[0];
  const month = yearMonthDay[1];
  const day = yearMonthDay[2];
  const writtenDate = year + "년 " + month + "월 " + day + "일";

  const deletePost = () => {
    dispatch(postActions.deletePostMD(currentpostId));
  };

  React.useEffect(() => {
    dispatch(postActions.getPostMD());
  }, []);

  return (
    <React.Fragment>
      <DetailBox>
        <h1>{title}</h1>
        <Info>
          <div>
            <UserName>{userId}</UserName>
            <Separator>·</Separator>
            <Time>{writtenDate}</Time>
          </div>
          {nickname === loginUser ? (
            <div>
              <button>수정</button>
              <button onClick={deletePost}>삭제</button>
            </div>
          ) : null}
        </Info>
        <Content>
          <Box>
            <div style={{ backgroundColor: "transparent", color: "#495057" }}>
              {userId + " 님의 게시물 입니다."}
            </div>
            <RiBookmarkFill
              style={{
                width: "35px",
                height: "40px",
                color: " rgb(18, 184, 134)",
                position: "absolute",
                top: "-8",
                right: "20",
                backgroundColor: "transparent",
              }}
            />
            <BoxFooter>
              <div style={{ backgroundColor: "transparent", color: "#495057" }}>
                <select
                  style={{
                    border: "none",
                    marginRight: "5px",
                    backgroundColor: "transparent",
                    color: "#adb5bd",
                  }}
                ></select>
                목록 보기
              </div>
              <BoxFooterRight style={{ backgroundColor: "transparent" }}>
                <div
                  style={{
                    backgroundColor: "transparent",
                    // marginBottom: "70px",
                    paddingBottom: "90px",
                  }}
                >
                  1/1
                </div>
                <div
                  style={{
                    color: "#adb5bd",
                    backgroundColor: "transparent",
                    marginLeft: "10px",
                    fontSize: "20px",
                  }}
                >
                  <IoIosArrowDropleftCircle />
                </div>
                <div
                  style={{
                    color: "#adb5bd",
                    backgroundColor: "transparent",
                    marginLeft: "3px",
                    fontSize: "20px",
                  }}
                >
                  <IoIosArrowDroprightCircle />
                </div>
              </BoxFooterRight>
            </BoxFooter>
          </Box>
          <div>
            <Viewer initialValue={content} height="1000px" />
            {/* <div dangerouslySetInnerHTML={{ __html: content }}></div> */}
          </div>
          <Writer>
            <Image src={"/img/profile.png"} />
            {/* <div>{nickname}</div> */}
          </Writer>
        </Content>
        <Hr></Hr>
      </DetailBox>
      <CommentWrite />
    </React.Fragment>
  );
};

const Box = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 688.007px;
  height: 100.861px;
  margin: 40px 0;
  padding: 32px 24px 10px 24px;
  background: rgb(248, 249, 250);
  box-shadow: rgb(0 0 0 / 6%) 0px 0px 4px 0px;
  color: rgb(73, 80, 87);
  font-size: 24px;
  font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue",
    "Apple SD Gothic Neo", "Malgun Gothic", "맑은 고딕", 나눔고딕,
    "Nanum Gothic", "Noto Sans KR", "Noto Sans CJK KR", arial, 돋움, Dotum,
    Tahoma, Geneva, sans-serif;
  font-weight: bold;
`;

const BoxFooter = styled.div`
  font-weight: normal;
  font-size: 16px;
  height: 23.99px;
  background-color: transparent;
  display: flex;
  justify-content: space-between;
`;

const BoxFooterRight = styled.div`
  color: #adb5bd;
  display: flex;
  font-size: 14px;
  background-color: transparent;
`;

const DetailBox = styled.div`
  box-sizing: border-box;
  max-width: 768px;
  min-width: 452px;
  width: 100%;
  margin: auto;
  h1 {
    text-align: left;
    font-size: 3rem;
    line-height: 1.5;
    letter-spacing: -0.004em;
    margin-top: 0px;
    font-weight: 800;
    color: rgb(52, 58, 64);
    margin-bottom: 2rem;
    word-break: keep-all;
  }
`;
const Info = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;
  button {
    padding: 0px;
    border: none;
    outline: none;
    background: none;
    cursor: pointer;
    font-size: 0.875rem;
    margin-left: 0.5rem;
    color: rgb(134, 142, 150);
    :hover {
      color: black;
    }
  }
`;
const UserName = styled.span`
  font-size: 0.875rem;
  color: rgb(52, 58, 64);
  font-weight: bold;
  cursor: pointer;
  :hover {
    color: #495057;
    text-decoration: underline;
  }
`;
const Separator = styled.span`
  margin-left: 0.5rem;
  margin-right: 0.5rem;
`;
const Time = styled.span`
  font-size: 0.875rem;
  color: #495057;
`;
const Content = styled.div`
  /* div {
    display: flex;
    font-size: 1.5rem;
    line-height: 1.5;
    font-weight: bold;
    color: rgb(33, 37, 41);
    p {
      font-size: 1.125rem;
      color: rgb(34, 36, 38);
      font-weight: 400;
    }
  } */
`;
const Writer = styled.div`
  margin: 32px 0px;
  display: flex;
  align-items: center;
`;
const Image = styled.img`
  border-radius: 50%;
  margin-right: 1rem;
`;
const Hr = styled.div`
  background: rgb(233, 236, 239);
  width: 100%;
  height: 1px;
  margin-top: 2rem;
  margin-bottom: 1.5rem;
`;
export default Detail;
