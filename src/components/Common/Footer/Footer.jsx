import { FooterWrap, Strong } from "@/common/footer/Footer.styles";

const Footer = () => {
  return (
    <>
      <FooterWrap>
        <p>놀러 Way 여행의 설렘이 시작되는 길 © 2025 놀러 Way</p>
        <p>회사소개 | 이용약관 | 개인정보처리방침 | 문의하기 | 사이트맵</p>

        <p>
          Follow us ➜ Instagram @nolloway / Facebook @nolloway / YouTube
          @놀러Way
        </p>

        <p>
          서울특별시 중구 다일문로 120 그레이츠 청계타워(다일빌딩), 2F <br />
          대표 : 따경이 | 사업자등록번호 : 123-45-67890
        </p>

        <p>
          관광정보는 현지 사정에 따라 예고 없이 변경될 수 있으니 방문 전 확인해
          주세요.
        </p>

        <Strong>Made by NolerWay</Strong>
      </FooterWrap>
    </>
  );
};

export default Footer;
