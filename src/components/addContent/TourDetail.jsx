import React from "react";
import {
  FormGrid,
  Label,
  Textarea,
  Input,
  Select,
} from "../../pages/content/ContentAdd.styles";

const TourDetail = ({ data, onChange }) => {
  const update = (k, v) => onChange({ ...data, [k]: v });
  return (
    <FormGrid>
      <Label>관광지 설명 </Label>
      <Textarea
        rows={4}
        value={data.tourExp || ""}
        onChange={(e) => update("tourExp", e.target.value)}
      />
      <Label>이용 시간</Label>
      <Input
        type="text"
        placeholder="예:09:00-17:00"
        value={data.usetimeTour || ""}
        onChange={(e) => update("usetimeTour", e.target.value)}
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
export default TourDetail;
