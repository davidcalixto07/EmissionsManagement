import { styled } from "styled-components";
import * as React from "react";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
`;
const StyledIcono = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 40px;
  padding: 2rem;
  margin-right: 2rem;
  border: 2px solid #646464;
  box-shadow: 5px 5px #c9c9c9;
  align-self: top;
`;
const StyledTitulo = styled.h3`
  padding: 2rem;
  margin-right: 2rem;
  text-align: center;
  width: 15rem;
`;

const TarjetaSeccion = (props) => {
  return (
    <Container onMouseEnter={()=> props.handleMouseEnter(props.description)} 
    onMouseLeave={props.handleMouseLeave}>
      <Link to={props.link}>
        <StyledIcono src={props.linkImagen} alt="imagen" />
      </Link>
      <StyledTitulo>{props.nombre}</StyledTitulo>
    </Container>
  );
};
export default TarjetaSeccion;
