import { styled } from "styled-components";
import Boton from "../Button";

const ContenedorGeneral = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;
const FormularioRegistro = styled.form`
  display: flex;
  flex-direction: column;
  width: 35%;
  border-radius: 5px;
  border: 1px solid gray;
  padding: 2rem;
`;
const StyledCampoTexto = styled.input`
  border-radius: 5px;
  padding: 0.7rem 7rem;
  padding-left: 0.7rem;
  margin: 1rem 2rem 3rem 2rem;
  font-size: 18px;
`;
const Texto = styled.text`
  text-align: left;
  padding-left: 2rem;
  font-size: 18px;
`;
const StyledSelect = styled.select`
  font-size: 18px;
  padding: 0.7rem 7rem;
  padding-left: 0.7rem;
  margin: 1rem 2rem 3rem 2rem;
  border-radius: 5px;
`;
const Signin = () => {
  return (
    <ContenedorGeneral>
      <FormularioRegistro>
        <Texto>Nombre: </Texto>
        <StyledCampoTexto placeholder="Nombre" />
        <Texto>Usuario: </Texto>
        <StyledCampoTexto placeholder="Usuario" />
        <Texto>Correo: </Texto>
        <StyledCampoTexto placeholder="Correo" type="email" />
        <Texto>Rol: </Texto>
        <StyledSelect>
          <option disabled selected hidden>
            Rol
          </option>
          <option>Invitado</option>
          <option>Operador</option>
          <option>Admin</option>
        </StyledSelect>
        <Texto>Contraseña: </Texto>
        <StyledCampoTexto placeholder="Contraseña" type="password" />
        <Texto>Confirmar contraseña: </Texto>
        <StyledCampoTexto placeholder="Confirmar contraseña" type="password" />
        <Boton mensaje="Registrar" />
      </FormularioRegistro>
    </ContenedorGeneral>
  );
};
export default Signin;
