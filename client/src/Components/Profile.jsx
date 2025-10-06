import React, { useState, useRef, useEffect } from "react";
import { Menu, MenuItem } from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { logout } from "../redux/userRedux";

function Profile() {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login")
  };

  const handleToggle = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (path) => {
    navigate(path);
    handleClose();
  };

  return (
    <>
      <AccountCircleOutlinedIcon  onClick={handleToggle} style={{ color: "black", fontSize: "24px" }} />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        keepMounted
      >
        <MenuItem onClick={handleClose}>My Account</MenuItem>
        {currentUser ? (
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        ) : (
          <MenuItem
            onClick={() => {
              handleNavigate("/login");
            }}
          >
            Sign In
          </MenuItem>
        )}

        <MenuItem
          onClick={() => {
            handleNavigate("/Register");
          }}
        >
          Register
        </MenuItem>
      </Menu>
    </>
  );
}

export default Profile;
