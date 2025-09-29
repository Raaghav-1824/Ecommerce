import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { Link } from "react-router-dom";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Profile from "./Profile";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";





export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const items = [
    {
      text: "Profile",
      icon: <Profile sx={{ fontSize: "30px", padding: "0px" }} />,
      link: null, // No link for Profile
    },
    {
      text: "Wishlist",
      icon: <FavoriteBorderOutlinedIcon sx={{ fontSize: "24px" }} />,
      link: "/wishlist",
    },
    {
      text: "Cart",
      icon: <ShoppingCartOutlinedIcon sx={{ fontSize: "24px" }} />,
      link: "/cart",
    },
  ];

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {items.map(({ text, icon, link }) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              component={link ? Link : "div"}
              to={link || undefined}
            >
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>
        {open ? <MenuOpenIcon /> : <MenuIcon />}
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
