import React from "react";
import {
  FormGrid,
  Label,
  Textarea,
  Input,
  Select,
} from "../../pages/content/ContentAdd.styles";

const FoodDetail = ({ data, onChange }) => {
  const update = (k, v) => onChange({ ...data, [k]: v });
  return (
    <FormGrid>
      <Label>맛집 설명 </Label>
      <Textarea
        rows={4}
        value={data.foodExp || ""}
        onChange={(e) => update("foodExp", e.target.value)}
      />
      <Label>대표 메뉴 </Label>
      <Input
        type="text"
        value={data.mainMenu || ""}
        onChange={(e) => update("mainMenu", e.target.value)}
      />
      <Label>주차 여부 </Label>
      <Select
        value={data.parking || ""}
        onChange={(e) => update("parking", e.target.value)}
      >
        <option value="">선택</option>
        <option value="Y">Y</option>
        <option value="N">N</option>
      </Select>
    </FormGrid>
  );
};
export default FoodDetail;
