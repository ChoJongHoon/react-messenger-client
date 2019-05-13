import React, { useState } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Icon from "@material-ui/core/Icon";
import { IconButton } from "@material-ui/core";
import styles from "./MenuButton.module.scss";

const MenuButton = ({ setRedirectToReferrer }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onClickLogout = () => {
    window.sessionStorage.clear();
    setRedirectToReferrer(true);
  };

  return (
    <div className={styles.menuButton}>
      <IconButton
        aria-label="More"
        aria-owns={open ? "menu" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Icon className={styles.menuIcon}>more_vert</Icon>
      </IconButton>
      <Menu
        id="menu"
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            width: 200
          }
        }}
      >
        <MenuItem onClick={onClickLogout}>Logout</MenuItem>
        <MenuItem onClick={handleClose}>Todo List</MenuItem>
      </Menu>
    </div>
  );
};

export default MenuButton;
