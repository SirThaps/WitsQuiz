import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState } from "react";

export const Navbar = () => {
  const navigate = useNavigate();
  //This variable is used to confirm which user is logged in, or whether a user is logged in or not
  const [user] = useAuthState(auth);
  const [currentUser] = useAuthState(auth);
  const [photoURL, setPhotoURL] = useState("https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png");
  //signuserOut method is going to be used to signOut current logged in user
  const signUserOut = async () => {
    await signOut(auth);
    navigate("/");
    setOpen(false);
  };

  useEffect(() => {
    if (currentUser?.photoURL) {
        setPhotoURL(currentUser.photoURL);
    }}, [currentUser])

  const [selectedElement, setselectedElement] = React.useState(null);
  //variable gonna be used to check state of popup menu, whether open or closed
  const [open, setOpen] = React.useState(false);
  //method used to open a popup menu from user pro-pic/username
  function handleOpenMenu() {
    setOpen(true);
  }
  //method used to close a popup menu from user pro-pic/username
  function handleCloseMenu(event) {
    setOpen(false);
    setselectedElement(event.target);
  }
  const handleClick = () => {
    navigate("/account");
    setOpen(false);
    //handleCloseMenu();
    //this opens in a new tab (believe that is what the owner of the question wanted if not you can do window.location.href = "/insert/your/path/here". 
  }
  //navbar fuction returns layout of navigation bar on top of every html page in the app
  return (
    <div className="navbar">
    <div className="site-name">

        <p>
        <img src={"/logo1.jpg"} alt = "logo1.jpg" width="60" height="60" border="1px" />
        </p>
        
    </div>
      <div className="links">
        <Link to="/home"> Home </Link>
        {!user && (
        <>
        <Link to="/"> Home </Link>
        <Link to="/login"> Login </Link>
        <Link to="/signup"> SignUp </Link>
        <Link to="/leaderboard"> Leaderboard </Link>
        
        </>
        )}
      </div>

      <div className="user">
        {user && (
          <>
            <p onClick={() => handleOpenMenu()}> {user?.displayName} </p>
            <p>
            <img src={photoURL} onClick={() => handleOpenMenu()} alt = "logo.jpg" width="30" height="30" />
            </p> 
          </>
        )}
      </div>
      <Menu
        id="basic-menu"
        selectedElement={selectedElement}
        open={open}
        onClose={handleCloseMenu}
        >
          <MenuItem onClick={handleClick}> Account </MenuItem>
          <MenuItem onClick={handleCloseMenu}> Settings </MenuItem>
          <MenuItem onClick={signUserOut}> Log Out </MenuItem>
         </Menu>
    </div>
  );
};