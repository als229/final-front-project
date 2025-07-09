import React from "react";
import {
  FormGrid,
  Label,
  Textarea,
  Input,
  Select,
} from "../../pages/content/ContentAdd.styles";

const LodgingDetail = ({ data, onChange }) => {
  const update = (k, v) => onChange({ ...data, [k]: v });
  return (
    <FormGrid>
      <Label>숙소 설명 </Label>
      <Textarea
        rows={4}
        value={data.lodgingExp || ""}
        onChange={(e) => update("lodgingExp", e.target.value)}
      />
      <Label>체크인 </Label>
      <Input
        type="text"
        placeholder="예:15:00"
        value={data.checkIn || ""}
        onChange={(e) => update("checkIn", e.target.value)}
      />
      <Label>체크아웃 </Label>
      <Input
        type="text"
        placeholder="예:11:00"
        value={data.checkOut || ""}
        onChange={(e) => update("checkOut", e.target.value)}
      />
      <Label>주차 여부</Label>
      <Select
        value={data.parking || ""}
        onChange={(e) => update("parking", e.target.value)}
      >
        <option value="">선택</option>
        <option value="Y">Y</option>
        <option value="N">N</option>
      </Select>
      <Label>엘리베이터 </Label>
      <Select
        value={data.elevator || ""}
        onChange={(e) => update("elevator", e.target.value)}
      >
        <option value="">선택</option>
        <option value="Y">Y</option>
        <option value="N">N</option>
      </Select>
    </FormGrid>
  );
};
export default LodgingDetail;
