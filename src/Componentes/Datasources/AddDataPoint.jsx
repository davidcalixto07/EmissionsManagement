import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React from "react";
import { useState } from "react";


function ParseNodeName(ds) {
  if (ds?.type === 'logix')
    return 'Tag'
  else
    return 'NodeId'
}

function AddDatasource({ show, setShow, saveDataPoint, ds }) {
  const [tag, setTag] = useState("");

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
        <strong> {ParseNodeName(ds)}: </strong>
        <input
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          style={{ paddingLeft: '0.2rem', width: 'calc(100% - 4rem)' }}
        >

        </input>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShow(false)}>
          Cancel
        </Button>
        <Button variant="primary" onClick={() => saveDataPoint(tag, ds)}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddDatasource;
