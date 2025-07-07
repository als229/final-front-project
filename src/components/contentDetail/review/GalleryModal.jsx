import {
  ModalOverlay,
  ModalBox,
  Grid,
  GridImage,
  CloseBtn,
} from "src/styles/ContentDetail.styles";

const GalleryModal = ({ images, onClose }) => {
  return (
    <ModalOverlay onClick={onClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <CloseBtn onClick={onClose}>×</CloseBtn>
        <h2>갤러리</h2>
        <Grid>
          {images.map((img, i) => (
            <GridImage key={i} src={img} alt={`전체이미지${i}`} />
          ))}
        </Grid>
      </ModalBox>
    </ModalOverlay>
  );
};

export default GalleryModal;
