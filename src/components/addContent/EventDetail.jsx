import React from "react";
import {
  FormGrid,
  Label,
  Textarea,
  Input,
} from "../../pages/content/ContentAdd.styles";

const EventDetail = ({ data, onChange }) => {
  const update = (k, v) => onChange({ ...data, [k]: v });
  return (
    <FormGrid>
      <Label>프로그램</Label>
      <Textarea
        rows={4}
        value={data.program || ""}
        onChange={(e) => update("program", e.target.value)}
      />
      <Label>행사 설명 </Label>
      <Textarea
        rows={4}
        value={data.eventExp || ""}
        onChange={(e) => update("eventExp", e.target.value)}
      />
      <Label>스폰서 </Label>
      <Input
        type="text"
        value={data.sponsor || ""}
        onChange={(e) => update("sponsor", e.target.value)}
      />
      <Label>사용 시간 </Label>
      <Input
        type="text"
        placeholder="예: 10:00 - 18:00"
        value={data.usetimeFestival || ""}
        onChange={(e) => update("usetimeFestival", e.target.value)}
      />
      <Label>시작 일자</Label>
      <Input
        type="date"
        value={data.eventStartDate || ""}
        onChange={(e) => update("eventStartDate", e.target.value)}
      />
      <Label>마감 일자</Label>
      <Input
        type="date"
        value={data.eventEndDate || ""}
        onChange={(e) => update("eventEndDate", e.target.value)}
      />
    </FormGrid>
  );
};
export default EventDetail;
