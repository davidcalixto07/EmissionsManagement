import React, { useState } from "react";
import { styled } from "styled-components";
import Boton from "../Button";
import UploadAndDisplayImage from "../UploadImage";

const ContenedorGeneral = styled.div`
  display: flex;
  width: 100%;
`;
const ContenedorAssets = styled.div`
  width: 20%;
  border: 1px solid gray;
  display: flex;
  flex-direction: column;
  margin: 1rem 1rem;
  border-radius: 5px;
  padding-top: 4rem;
`;
const ContenedorFormulario = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  align-items: left;
  margin: 1rem 1rem;
  padding-top: 4rem;
  padding-bottom: 4rem;
  text-align: left;
  width: 75%;
  border-radius: 5px;
  border: 1px solid gray;
`;
const StyledCampoTexto = styled.input`
  text-align: left;
  border-radius: 5px;
  padding: 0.7rem 7rem;
  padding-left: 0.7rem;
  margin: 1rem 2rem 3rem 2rem;
  font-size: 18px;
  width: 50%;
`;
const Texto = styled.text`
  text-align: left;
  padding-left: 2rem;
  font-size: 18px;
`;
const StyledSelect = styled.select`
  width: 50%;
  font-size: 18px;
  padding: 0.7rem 7rem;
  padding-left: 0.7rem;
  margin: 1rem 2rem 3rem 2rem;
  border-radius: 5px;
`;
const StyledDescripcion = styled.textarea`
  text-align: left;
  border-radius: 5px;
  padding: 0.7rem 7rem;
  padding-left: 0.7rem;
  margin: 1rem 2rem 3rem 2rem;
  font-size: 18px;
  width: 50%;
`;
const Titulo = styled.h1`
  color: gray;
  padding: 0 0 2rem 2rem;
`;

const assets = [
  {
    tipo: "Compresor",
  },
  {
    tipo: "Rehervidor",
  },
  {
    tipo: "Tea",
  },
  {
    tipo: "Sistema de levantamiento artificial",
  },
];

const sistemasExtraccion = [
  {
    bomba: "Mecánica",
  },
  {
    bomba: "Electrosumergible",
  },
  {
    bomba: "PCP",
  },
];

const Formulario = (props) => {
  const [mostrarFormulario, actualizarMostrar] = useState(false);
  const [idTipo, setTipo] = useState(-1);

  const HandlerCargarAssets = (e) => {
    const opcion = e.target.value;
    console.log(opcion);
    setTipo(opcion);
  };

  const cambiarMostrar = () => {
    actualizarMostrar(!mostrarFormulario);
    console.log(assets);
  };
  return (
    <ContenedorGeneral>
      <ContenedorAssets>
        <Titulo>Assets</Titulo>
        <Texto>Asset 1</Texto>
        <Texto>Asset 2</Texto>
        <Texto>Asset 3</Texto>
        <Texto>Asset 4</Texto>
        <Boton
          background={"#646464"}
          color={"white"}
          mensaje={"Agregar"}
          onClick={cambiarMostrar}
        ></Boton>
      </ContenedorAssets>
      {mostrarFormulario && (
        <ContenedorFormulario>
          <Titulo>Agregar Asset</Titulo>
          <Texto>Icono:</Texto>
          <UploadAndDisplayImage />
          <Texto>Tipo de asset:</Texto>
          <StyledSelect
            name="tipo"
            id="selectTipo"
            onClick={HandlerCargarAssets}
          >
            <option value={-1} disabled selected hidden>
              Tipo de asset
            </option>
            {assets.map((item, i) => (
              <option key={"asset" + i} value={i}>
                {" "}
                {item.tipo}{" "}
              </option>
            ))}
          </StyledSelect>
          {idTipo === 3 && (
            <StyledSelect name="TipoBomba">
              <option disabled selected hidden>
                Tipo de sistema de levantamiento artificial
              </option>
              {sistemasExtraccion.map((item, i) => (
                <option key={"asset" + i} value={i}>
                  {item.bomba}
                </option>
              ))}
            </StyledSelect>
          )}
          <Texto>Nombre:</Texto>
          <StyledCampoTexto placeholder="Nombre" />
          <Texto>Descripción:</Texto>
          <StyledDescripcion
            rows={5}
            maxLength={255}
            placeholder="Descripción"
          ></StyledDescripcion>
          <Boton
            background={"#646464"}
            color={"white"}
            mensaje={"Crear"}
            width={"20%"}
          ></Boton>
        </ContenedorFormulario>
      )}
    </ContenedorGeneral>
  );
};
export default Formulario;
