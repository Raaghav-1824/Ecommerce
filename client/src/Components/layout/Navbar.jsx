import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import styled from "styled-components";

const mobile = (styles) => `
  @media only screen and (max-width: 990px) {
    ${styles}
  }
`;

const MenuBurger = styled.div`
  width: 40px;
  height: 30px;
  position: fixed;
  top: 25px;
  left: 30px;
  display: flex;
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
  height: 3px;
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
  background-color: #000000;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transform: ${props => props.isOpen ? 'translateY(0)' : 'translateY(-100%)'};
  transition: transform 0.5s cubic-bezier(0.77, 0, 0.175, 1);
  opacity: ${props => props.isOpen ? '1' : '0'};
`;

const BrandName = styled.div`
  position: absolute;
  top: 25px;
  left: 50%;
  transform: translateX(-50%);
  color: #fff;
  font-size: 32px;
  font-family: 'Sacramento', cursive;
  font-weight: 400;
  z-index: 10000;
  opacity: ${props => props.isOpen ? '1' : '0'};
  transition: opacity 0.3s ease 0.3s;
  
  ${mobile(`
    font-size: 28px;
    top: 20px;
  `)}
`;

const MenuContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  padding: 20px;
  
  ${mobile(`
    gap: 30px;
  `)}
`;

const MenuItem = styled.a`
  color: #fff;
  font-size: 48px;
  font-weight: 300;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 3px;
  transition: all 0.3s ease;
  opacity: ${props => props.isOpen ? '1' : '0'};
  transform: ${props => props.isOpen ? 'translateY(0)' : 'translateY(30px)'};
  transition-delay: ${props => props.delay}s;
  cursor: pointer;
  
  &:hover {
    color: #999;
    letter-spacing: 6px;
  }
  
  ${mobile(`
    font-size: 32px;
    letter-spacing: 2px;
    
    &:hover {
      letter-spacing: 4px;
    }
  `)}
`;

const MenuIcons = styled.div`
  display: flex;
  gap: 40px;
  margin-top: 40px;
  opacity: ${props => props.isOpen ? '1' : '0'};
  transform: ${props => props.isOpen ? 'translateY(0)' : 'translateY(30px)'};
  transition: all 0.3s ease;
  transition-delay: 0.6s;
  
  ${mobile(`
    gap: 30px;
    margin-top: 30px;
  `)}
`;

const IconLink = styled.a`
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    color: #999;
    transform: translateY(-5px);
  }
  
  span {
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
`;

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Prevent body scroll when menu is open
    if (!isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  const handleNavigation = (path) => {
    console.log(`Navigate to: ${path}`);
    setIsMenuOpen(false);
    document.body.style.overflow = 'auto';
    // In your actual implementation, use: window.location.href = path;
  };

  return (
    <>
      <MenuBurger onClick={toggleMenu}>
        <BurgerLine isOpen={isMenuOpen} position="top" />
        <BurgerLine isOpen={isMenuOpen} position="middle" />
        <BurgerLine isOpen={isMenuOpen} position="bottom" />
      </MenuBurger>

      <MenuOverlay isOpen={isMenuOpen}>
        <BrandName isOpen={isMenuOpen}>Mart E-commerce</BrandName>
        
        <MenuContent>
          <MenuItem 
            onClick={() => handleNavigation('/')}
            isOpen={isMenuOpen}
            delay={0.1}
          >
            Home
          </MenuItem>
          
          <MenuItem 
            onClick={() => handleNavigation('/products')}
            isOpen={isMenuOpen}
            delay={0.2}
          >
            Products
          </MenuItem>
          
          <MenuItem 
            onClick={() => handleNavigation('/about')}
            isOpen={isMenuOpen}
            delay={0.3}
          >
            About
          </MenuItem>
          
          <MenuItem 
            onClick={() => handleNavigation('/contact')}
            isOpen={isMenuOpen}
            delay={0.4}
          >
            Contact
          </MenuItem>
        </MenuContent>

        <MenuIcons isOpen={isMenuOpen}>
          <IconLink onClick={() => handleNavigation('/profile')}>
            <PersonOutlineOutlinedIcon sx={{ fontSize: 28 }} />
            <span>Profile</span>
          </IconLink>
          
          <IconLink onClick={() => handleNavigation('/wishlist')}>
            <FavoriteBorderOutlinedIcon sx={{ fontSize: 28 }} />
            <span>Wishlist</span>
          </IconLink>
          
          <IconLink onClick={() => handleNavigation('/search')}>
            <SearchIcon sx={{ fontSize: 28 }} />
            <span>Search</span>
          </IconLink>
          
          <IconLink onClick={() => handleNavigation('/cart')}>
            <ShoppingCartOutlinedIcon sx={{ fontSize: 28 }} />
            <span>Cart</span>
          </IconLink>
        </MenuIcons>
      </MenuOverlay>
    </>
  );
};

export default Navbar;