import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/userRedux";

const mobile = (styles) => `
  @media only screen and (max-width: 990px) {
    ${styles}
  }
`;

const MenuBurger = styled.div`
  width: 50px;
  height: 40px;
  position: fixed;
  top: 50px;
  right :50px;
  display : flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  z-index: 99999;
  transition: all 0.3s ease;
  
  ${mobile(`
    width: 35px;
    height: 25px;
    top: 20px;
    left: 20px;
  `)}
`;

const BurgerLine = styled.div`
  width: 100%;
  height: 2px;
  background-color: ${props => props.isOpen ? '#fff' : '#1a1a1a'};
  transition: all 0.3s ease;
  transform-origin: center;
  
  ${props => props.isOpen && props.position === 'top' && `
    transform: translateY(13.5px) rotate(45deg);
  `}
  
  ${props => props.isOpen && props.position === 'middle' && `
    opacity: 0;
    transform: translateX(-20px);
  `}
  
  ${props => props.isOpen && props.position === 'bottom' && `
    transform: translateY(-13.5px) rotate(-45deg);
  `}
  
  ${mobile(`
    height: 2.5px;
    
    ${props => props.isOpen && props.position === 'top' && `
      transform: translateY(11px) rotate(45deg);
    `}
    
    ${props => props.isOpen && props.position === 'bottom' && `
      transform: translateY(-11px) rotate(-45deg);
    `}
  `)}
`;

const MenuOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  display: flex;
  pointer-events: ${props => props.isOpen ? 'auto' : 'none'};
`;

const Curtain = styled.div`
  position: relative;
  width: 20%;
  height: 100%;
  background-color: #000000;
  transform: ${props => props.isOpen ? 'translateY(0)' : 'translateY(-100%)'};
  transition: transform 0.8s cubic-bezier(0.77, 0, 0.175, 1);
  transition-delay: ${props => props.isOpen ? props.index * 0.09 : (4 - props.index) * 0.09}s;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  
  &:last-child {
    border-right: none;
  }
  
  ${mobile(`
    width: 100%;
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  `)}
`;

const BrandName = styled.div`
  position: absolute;
  top: 25px;
  left: 50%;
  transform: translateX(-50%);
  color: #fff;
  font-size: 42px;
  font-weight: 400;
  z-index: 10;
  opacity: ${props => props.isOpen ? '1' : '0'};
  transition: opacity 0.5s ease 0.5s;
  letter-spacing: 3px;

  
  ${mobile(`
    font-size: 24px;
    top: 15px;
  `)}
`;

const CurtainContent = styled.div`
  opacity: ${props => props.isOpen ? '1' : '0'};
  transform: ${props => props.isOpen ? 'translateY(0)' : 'translateY(30px)'};
  transition: all 0.5s ease;
  transition-delay: ${props => props.isOpen ? (0.5 + props.index * 0.09) : 0}s;
  text-align: center;
`;

const MenuItem = styled.a`
  color: #fff;
  font-size: 25px;
  font-weight: 300;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 3px;
  transition: all 0.3s ease;
  cursor: pointer;
  display: block;
  
  &:hover {
    color: #999;
    letter-spacing: 6px;
  }
  
  ${mobile(`
    font-size: 28px;
    letter-spacing: 2px;
    
    &:hover {
      letter-spacing: 4px;
    }
  `)}
`;

const IconsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  padding: 20px;
  
  ${mobile(`
    gap: 20px;
  `)}
`;

const IconLink = styled.a`
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  
  &:hover {
    color: #999;
    transform: translateY(-5px);
    border-color: rgba(255, 255, 255, 0.4);
    background: rgba(255, 255, 255, 0.05);
  }
  
  span {
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  
  ${mobile(`
    padding: 15px;
    gap: 8px;
  `)}
`;

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  const handleNavigation = (path) => {
    // console.log(`Navigate to: ${path}`);
    navigate(path);
    setIsMenuOpen(false);
    document.body.style.overflow = 'auto';
  };

  const handleLogoutAndNavigate = (path) => {
    if (user) {
      dispatch(logout());
    }
    navigate(path);
    setIsMenuOpen(false);
    document.body.style.overflow = 'auto';
  };

  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/products' },
    { label: 'Cart', path: '/cart' },
    { label: 'Wishlist', path: '/wishlist' }
  ];

  return (
    <>
      <MenuBurger onClick={toggleMenu}>
        <BurgerLine isOpen={isMenuOpen} position="top" />
        <BurgerLine isOpen={isMenuOpen} position="middle" />
        <BurgerLine isOpen={isMenuOpen} position="bottom" />
      </MenuBurger>

      <MenuOverlay isOpen={isMenuOpen}>
        
        {/* First 4 curtains with menu items */}
        {menuItems.map((item, index) => (
          <Curtain key={index} index={index} isOpen={isMenuOpen}>
            <CurtainContent isOpen={isMenuOpen} index={index}>
              <MenuItem onClick={() => handleNavigation(item.path)}>
                {item.label}
              </MenuItem>
            </CurtainContent>
          </Curtain>
        ))}
        
        {/* 5th curtain with icons */}
        <Curtain index={4} isOpen={isMenuOpen}>
          <CurtainContent isOpen={isMenuOpen} index={4}>
            <IconsGrid>
              <IconLink onClick={() => handleLogoutAndNavigate('/login')}>
                <PersonOutlineOutlinedIcon sx={{ fontSize: 32 }} />
                <span>{user ? 'Logout & Login' : 'Login'}</span>
              </IconLink>
              
              <IconLink onClick={() => handleLogoutAndNavigate('/register')}>
                <PersonOutlineOutlinedIcon sx={{ fontSize: 32 }} />
                <span>{user ? 'Logout & Register' : 'Register'}</span>
              </IconLink>
              
              <IconLink onClick={() => handleNavigation('/wishlist')}>
                <FavoriteBorderOutlinedIcon sx={{ fontSize: 32 }} />
                <span>Wishlist</span>
              </IconLink>
              
              <IconLink onClick={() => handleNavigation('/cart')}>
                <ShoppingCartOutlinedIcon sx={{ fontSize: 32 }} />
                <span>Cart</span>
              </IconLink>
            </IconsGrid>
          </CurtainContent>
        </Curtain>
      </MenuOverlay>
    </>
  );
};

export default Navbar;