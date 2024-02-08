import React, { useState, useEffect, useRef } from 'react';
import { Button, Icon, MenuContainer, Form, Label, Input, SubmitButton, StyledTitle, Container  } from './NavMenuStyled.js';
import axios from 'axios';

const NavMenu = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [youtubeLink, setYoutubeLink] = useState('');
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  const handleInputChange = (event) => {
    setYoutubeLink(event.target.value);
  };

  const handleMenuSubmit = async (event) => {
    event.preventDefault();
    const youtubeId = extractYoutubeId(youtubeLink);
    try {
      await axios.post('http://localhost:3010/api/audio', {
        youtube_id: youtubeId
      });
      console.log('Audio añadido correctamente.', youtubeId);
    } catch (error) {
      console.error('Error al añadir audio:', error);
    }
  };

  const extractYoutubeId = (url) => {
    const videoIdMatch = url.match(/(?:\/|%3D|v=|vi=)([0-9A-Za-z-_]{11})(?:[^\w-]|$)/);
    return videoIdMatch ? videoIdMatch[1] : null;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
    <Container>
      <div></div>
      <StyledTitle>EL AUDIO DE LOS VIERNES!</StyledTitle>
      <Button ref={buttonRef} onClick={handleMenuToggle}>
        <Icon />
      </Button>
      </Container>
      {showMenu && (
        <MenuContainer ref={menuRef}>
          <Form onSubmit={handleMenuSubmit}>
            <p>Desea añadir un nuevo audio de los viernes?</p>
            <Label>Introduzca el link del video de YouTube con el audio:</Label>
            <Input type="text" value={youtubeLink} onChange={handleInputChange} />
            <SubmitButton type="submit">Añadir</SubmitButton>
          </Form>
        </MenuContainer>
      )}
    </>
  );
};

export default NavMenu;