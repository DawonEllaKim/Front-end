import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as commentAction } from "../redux/modules/comment";
import CommentList from "./CommentList";

const CommentWrite = (props) => {
  const dispatch = useDispatch();
  const postId = useSelector((state) => state.post);
  const [content, setContent] = React.useState("");
  console.log(postId);
  const onChange = (e) => {
    setContent(e.target.value);
  };
  console.log(content);

  // if (content === "") {
  //   window.alert("내용을 입력해주세요.");
  // }
  // if (user === null) {
  //   history.push("/");
  // }

  const setAddComment = () => {
    const comment = {
      postId: postId,
      content: content,
    };
    dispatch(commentAction.addCommentDB(comment));
  };

  return (
    <React.Fragment>
      <Count>2개의 댓글</Count>
      <Container>
        <Input placeholder="댓글을 작성하세요" onChange={onChange} />
        <Button
          onClick={() => {
            setAddComment();
          }}
        >
          댓글 작성
        </Button>
      </Container>
      <CommentList />
    </React.Fragment>
  );
};

const Container = styled.div`
  box-sizing: border-box;
  max-width: 768px;
  min-width: 452px;
  width: 100%;
  height: 200px;
  margin: 0 auto 3rem auto;
  display: flex;
  flex-direction: column;
  align-items: end;
`;
const Count = styled.h4`
  box-sizing: border-box;
  max-width: 768px;
  min-width: 452px;
  width: 100%;
  font-size: 1.125rem;
  line-height: 1.5;
  font-weight: 600;
  color: #343a40;
  display: block;
  text-align: left;
  margin: 0 auto 1rem auto;
`;

const Input = styled.input`
  padding: 1rem 1rem 1.5rem;
  outline: none;
  border: 1px solid rgb(233, 236, 239);
  margin-bottom: 1.5rem;
  width: 100%;
  box-sizing: inherit;
  border-radius: 4px;
  min-height: 6.125rem;
  font-size: 1rem;
  color: rgb(33, 37, 41);
  line-height: 1.75;
  word-break: break-all;
  ::placeholder {
    color: #adb5bd;
  }
`;
const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  cursor: pointer;
  border: none;
  background: rgb(18, 184, 134);
  color: white;
  border-radius: 4px;
  padding: 0.625rem 1.25rem;
  height: 2rem;
  font-size: 1rem;
  font-family: inherit;
  box-sizing: inherit;
  outline: none;
  width: 110px;
  &:hover {
    background-color: #45d1a7;
  }
`;

export default CommentWrite;
