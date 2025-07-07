import styled from "styled-components";

export const PageContainer = styled.div`
  padding: 20px;
  font-family: Arial, sans-serif;
`;

export const Title = styled.h1`
  color: #333;
`;

export const Section = styled.section`
  margin-bottom: 40px;
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 8px;
  background-color: #fff;
`;

export const SectionTitle = styled.h2`
  color: #555;
  margin-top: 0;
`;

export const InputGroup = styled.div`
  margin-bottom: 15px;
  display: flex;
  align-items: center;
`;

export const Input = styled.input`
  padding: 8px;
  margin-right: 10px;
  width: 200px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

export const Select = styled.select`
  padding: 8px;
  margin-right: 10px;
  width: 200px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

export const Button = styled.button`
  padding: 8px 15px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }

  &:active {
    background-color: #3e8e41;
  }
`;

export const ListTitle = styled.h3`
  margin-top: 20px;
  color: #666;
`;

export const ItemList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

export const ListItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 5px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

export const ItemName = styled.span`
  flex-grow: 1;
  color: #333;
`;

export const EditInput = styled.input`
  flex-grow: 1;
  padding: 5px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

export const SaveButton = styled(Button)`
  background-color: #008CBA;
  margin-right: 5px;

  &:hover {
    background-color: #007bb5;
  }
`;

export const CancelButton = styled(Button)`
  background-color: #f44336;

  &:hover {
    background-color: #da190b;
  }
`;

export const EditButton = styled(Button)`
  background-color: #FFC107;
  color: white;
  margin-right: 5px;

  &:hover {
    background-color: #e0a800;
  }
`;

export const DeleteButton = styled(Button)`
  background-color: #f44336;

  &:hover {
    background-color: #da190b;
  }
`;

export const HorizontalRule = styled.hr`
  border: 0;
  height: 1px;
  background: #eee;
  margin: 40px 0;
`;

export const NoDataMessage = styled.p`
  color: #777;
  font-style: italic;
`;
