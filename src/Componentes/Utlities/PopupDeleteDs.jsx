import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React from "react";

function PopupDeleteDs({ show, setShow, confirmDelete, noDelete, ds }) {
  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      backdrop="static"
      keyboard={true}
    >
      <Modal.Header closeButton>
        <Modal.Title>Add a datapoint</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Do you wish to delete datasource with ip {ds?.ip || ""}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => confirmDelete()}>
          Yes
        </Button>
        <Button variant="primary" onClick={() => noDelete()}>
          No
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PopupDeleteDs;
