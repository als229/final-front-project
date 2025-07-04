import {
  ContentInfoWrapper,
  ContentImage,
  ContentTitle,
  ContentLocation,
} from "src/styles/ContentDetail.styles";

const ContentInfo = ({ title, image, location }) => {
  return (
    <ContentInfoWrapper>
      <ContentImage src={image} alt={title} />
      <ContentTitle>{title}</ContentTitle>
      <ContentLocation>{location}</ContentLocation>
    </ContentInfoWrapper>
  );
};

export default ContentInfo;
