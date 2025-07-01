import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  ProfileWrapper,
  LeftBox,
  RightBox,
  LeftContent,
  ModifyLeftWrapper,
  ModifyRightWrapper,
  RightContent,
  FavoriteWrapper,
  Box,
  FavoriteName,
  Item,
  Comment,
  Author,
  Date,
  SectionTitle,
  ProfileImageWrapper,
  ModalOverlay,
  ModalBox,
  ModalTitle,
  ModalContent,
  ButtonGroup,
  ConfirmButton,
  CancelButton,
  Input,
} from "./Mypage.styls";

const Mypage = () => {
  const navi = useNavigate();
  const [nickNameModal, setNickNameModal] = useState(false);
  const [profileModal, setProfileModal] = useState(false);

  return (
    <>
      {nickNameModal && (
        <ModalOverlay>
          <ModalBox>
            <ModalTitle>닉네임 변경</ModalTitle>
            <ModalContent>
              <Input placeholder="새 닉네임을 입력하세요" />
              <ButtonGroup>
                <ConfirmButton>변경</ConfirmButton>
                <CancelButton onClick={() => setNickNameModal(false)}>
                  취소
                </CancelButton>
              </ButtonGroup>
            </ModalContent>
          </ModalBox>
        </ModalOverlay>
      )}

      <Container>
        <div>
          <SectionTitle>마이페이지</SectionTitle>
        </div>
        <ProfileWrapper>
          <LeftBox>
            <LeftContent>
              <ProfileImageWrapper>사진들어가요</ProfileImageWrapper>
              <p>닉네임</p>
              <ModifyLeftWrapper>
                <button
                  type="button"
                  onClick={() => {
                    setNickNameModal(true);
                  }}
                >
                  닉네임 변경
                </button>
                <button>프로필 변경</button>
              </ModifyLeftWrapper>
            </LeftContent>
          </LeftBox>
          <RightBox>
            <RightContent>
              <button
                type="button"
                onClick={() => {
                  navi("/mypage/password");
                }}
              >
                비밀번호 변경
              </button>
              <button
                type="button"
                onClick={() => {
                  navi("/mypage/delete");
                }}
              >
                회원탈퇴
              </button>
            </RightContent>

            <ModifyRightWrapper>
              <p>📧 ehdrnjs9022@naver.com</p>
              <p>👤 김철수</p>
            </ModifyRightWrapper>
          </RightBox>
        </ProfileWrapper>
        <div>
          <SectionTitle>즐겨찾기</SectionTitle>

          <FavoriteWrapper>
            <Item>
              <Box>사진1</Box>
              <FavoriteName>일산호수공원1</FavoriteName>
            </Item>
            <Item>
              <Box>사진2</Box>
              <FavoriteName>일산호수공원2</FavoriteName>
            </Item>
            <Item>
              <Box>사진3</Box>
              <FavoriteName>일산호수공원3</FavoriteName>
            </Item>
            <Item>
              <Box>사진4</Box>
              <FavoriteName>일산호수공원4</FavoriteName>
            </Item>
          </FavoriteWrapper>
        </div>

        <div>
          <SectionTitle>여행톡</SectionTitle>

          <FavoriteWrapper>
            <Item>
              <Box>사진1</Box>
              <FavoriteName>일산호수공원1</FavoriteName>
              <Comment>댓글: 가봤는데 좋더라구요</Comment>
              <Author>작성자: 김철수</Author>
              <Date>2025-06-30</Date>
            </Item>
            <Item>
              <Box>사진2</Box>
              <FavoriteName>일산호수공원2</FavoriteName>
              <Comment>댓글: 가봤는데 좋더라구요</Comment>
              <Author>작성자: 김철수</Author>
              <Date>2025-06-30</Date>
            </Item>
            <Item>
              <Box>사진3</Box>
              <FavoriteName>일산호수공원3</FavoriteName>
              <Comment>댓글: 가봤는데 좋더라구요</Comment>
              <Author>작성자: 김철수</Author>
              <Date>2025-06-30</Date>
            </Item>
            <Item>
              <Box>사진4</Box>
              <FavoriteName>일산호수공원4</FavoriteName>
              <Comment>댓글: 가봤는데 좋더라구요</Comment>
              <Author>작성자: 김철수</Author>
              <Date>2025-06-30</Date>
            </Item>
          </FavoriteWrapper>
        </div>
      </Container>
    </>
  );
};
export default Mypage;
