export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;

  h2 {
    font-size: 24px;
    margin-bottom: 20px;
    color: #333;
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  font-size: 18px;
  color: #666;
`;

export const ErrorContainer = styled.div`
  background-color: #fff0f0;
  color: #d32f2f;
  padding: 15px;
  border-radius: 4px;
  border-left: 4px solid #d32f2f;
  margin: 20px 0;
`;
