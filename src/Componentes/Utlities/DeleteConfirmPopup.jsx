import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React from "react";

function DeleteConfirmPopup({ title, label, result, show, setShow, handleResponse }) {
  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      backdrop="static"
      keyboard={true}
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {label}
        <p><strong>{result}</strong></p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => handleResponse(true)}>
          Yes
        </Button>
        <Button variant="primary" onClick={() => handleResponse(false)}>
          No
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteConfirmPopup;
