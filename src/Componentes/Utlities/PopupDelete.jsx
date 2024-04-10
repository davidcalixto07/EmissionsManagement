import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React from "react";

function PopupDelete({ show, setShow, confirmDelete, noDelete, ds }) {
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
        Do you wish to delete el datasource con ip {ds?.ip || ""}
        <strong> Node/Tag: </strong>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => confirmDelete(ds)}>
          Yes
        </Button>
        <Button variant="primary" onClick={() => noDelete(ds)}>
          No
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PopupDelete;
