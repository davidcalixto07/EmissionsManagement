import React, { useState } from "react";
import Boton from "../Button";
import { styled } from "styled-components";

const Contenedor = styled.div`
    margin: 2rem;
`
const StyledInput = styled.input`
    text-align: center;
    border-radius: 3px;
    padding: 0.5rem 1rem 0.5rem 1rem;
    border: 1px solid black;
    color: white;
    background: gray;
    cursor: pointer;
    font-size: 18px;
`

const UploadAndDisplayImage = () => {

    const [selectedImage, setSelectedImage] = useState(null);
  
    return (
      <Contenedor>
  
        {selectedImage && (
          <div>
            <img
              alt="not found"
              width={"250px"}
              src={URL.createObjectURL(selectedImage)}
            />
            <br />
            <Boton onClick={() => setSelectedImage(null)} mensaje="Eliminar"></Boton>
          </div>
        )}
  
        <br />
        <br />
        
        <StyledInput
          type="file"
          name="myImage"
          onChange={(event) => {
            console.log(event.target.files[0]);
            setSelectedImage(event.target.files[0]);
          }}
        />
      </Contenedor>
    );
  };
  
  export default UploadAndDisplayImage;