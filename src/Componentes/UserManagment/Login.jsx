import { styled } from "styled-components";
import Boton from "../Button";

const Contenedor = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StyledBody = styled.body`
  display: grid;
  flex-direction: column;
  align-self: center;
  align-items: center;
  width: 30rem;
  border-radius: 5px;
  border: 1px solid gray;
  margin: 5rem;
  padding: 2rem;
`;

const StyledTextField = styled.input`
  text-align: left;
  border-radius: 5px;
  padding: 0.7rem 7rem;
  padding-left: 0.7rem;
  margin: 1rem 2rem;
  font-size: 18px;
`;

const Login = () => {
  return (
    <Contenedor>
      <StyledBody>
        <StyledTextField placeholder="Usuario"/>
        <StyledTextField placeholder="Contraseña" type="password" />
        <Boton background="white" mensaje={"Iniciar sesión"}></Boton>
      </StyledBody>
    </Contenedor>
  );
};

export default Login;
