import React from "react";
import { Chip, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { Delete, NotInterested } from "@material-ui/icons";
interface AutoCompleteCompProps {
  data: any[];
  usedData: any[];
  labelKey: string;
  returnKey: string;
  changeKey: string;
  handleChange: (newVal: any, changeKey: string, returnKey: string) => void;
  handleDelete?: (option: any) => void;
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
  handleDelete
}) => {
  return (
    <Autocomplete
      multiple
      options={data}
      getOptionLabel={(option) => option[labelKey]}
      // value={usedData.map((item) => item)}
      value={usedData}
      onChange={(_, newVal) => handleChange(newVal, changeKey, returnKey)}
      renderInput={(params) => (
        <TextField {...params} variant="outlined" placeholder={placeholder} />
      )}
      getOptionDisabled={(option) =>
        option[labelKey] === "No sites available" ||
        option[labelKey] === "No cameras available" ||
        option[labelKey] === "No customers available" ||
        option.deleteDisabled ||
        usedData.find((item) => item[returnKey] === option[returnKey])
          ? true
          : false
      }
      disableClearable
      getOptionSelected={(option, value) =>
        option[returnKey] === value[returnKey]
      }
      renderTags={(value, getTagProps) =>
        value.map((option, index: number) => {
          // console.log(returnKey, " -> ", option.deleteDisabled);

          return (
            <Chip
              variant="outlined"
              label={option[labelKey]}
              {...getTagProps({ index })}
              style={!option.deleteDisabled ? {
                color: "#007BFF",
                border: "1px solid #007BFF",
                margin: 5,
              }: {
                color: "grey",
                border: "1px solid grey",
                margin: 5
              }}
              deleteIcon={option.deleteDisabled ? <NotInterested style={{color: "grey"}} /> :<Delete style={{ color: "#007BFF" }} />}
              disabled={option.deleteDisabled}
              onDelete={() => {
                handleDelete? handleDelete(option) : console.log(option);
              }}
            />
          );
        })
      }
    />
  );
};

export default AutoCompleteComp;
