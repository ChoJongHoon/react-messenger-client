import React, { useState } from "react";
import { useMutation } from "react-apollo-hooks";
import gql from "graphql-tag";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Icon from "@material-ui/core/Icon";
import { IconButton } from "@material-ui/core";
import styles from "./MenuButton.module.scss";

const userConnectChange = gql`
  mutation userConnectChange($_id: String!, $online: Boolean!) {
    userConnectChange(_id: $_id, online: $online) {
      _id
      name
      online
      imageUrl
    }
  }
`;

const MenuButton = ({ setRedirectToReferrer, setShowTodo }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onLeave = useMutation(userConnectChange, {
    variables: {
      _id: window.sessionStorage.getItem("id"),
      online: false
    }
  });

  const onClickLogout = () => {
    onLeave();
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
        <MenuItem
          onClick={() => {
            setShowTodo(true);
            handleClose();
          }}
        >
          Todo List
        </MenuItem>
      </Menu>
    </div>
  );
};

export default MenuButton;
