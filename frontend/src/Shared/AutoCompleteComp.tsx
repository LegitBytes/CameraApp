import React from "react";
import { Chip, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { Delete } from "@material-ui/icons";
interface AutoCompleteCompProps {
  data: any[];
  usedData: any[];
  labelKey: string;
  returnKey: string;
  changeKey: string;
  handleChange: (newVal: any, changeKey: string, returnKey: string) => void;
  placeholder: string;
}

const AutoCompleteComp: React.FC<AutoCompleteCompProps> = ({
  data,
  usedData,
  handleChange,
  placeholder,
  changeKey,
  labelKey,
  returnKey,
}) => {
  return (
    <Autocomplete
      multiple
      options={data}
      getOptionLabel={(option) => option[labelKey]}
      value={usedData.map((item) => item)}
      onChange={(_, newVal) => handleChange(newVal, changeKey, returnKey)}
      renderInput={(params) => (
        <TextField {...params} variant="outlined" placeholder={placeholder} />
      )}
      renderTags={(value, getTagProps) =>
        value.map((option, index: number) => (
          <Chip
            variant="outlined"
            label={option[labelKey]}
            {...getTagProps({ index })}
            style={{
              color: "#007BFF",
              border: "1px solid #007BFF",
              margin: 5,
            }}
            deleteIcon={<Delete style={{ color: "#007BFF" }} />}
          />
        ))
      }
    />
  );
};

export default AutoCompleteComp;
