import React from "react";
import { InputAdornment, TextField, Icon } from "@material-ui/core";
import styles from "./Form.module.scss";

const Form = () => {
  return (
    <div className={styles.form}>
      <TextField
        fullWidth={true}
        margin="normal"
        placeholder="Type your message."
        variant="outlined"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Icon className={styles.sendButton}>send</Icon>
            </InputAdornment>
          )
        }}
      />
    </div>
  );
};

export default Form;
