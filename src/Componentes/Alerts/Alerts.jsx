import { Alert } from "react-bootstrap";

const Alerts = ({ status, show, setShowAlert }) => {
  return (
    <>
      <Alert
        show={show}
        key={status}
        variant={status}
        onClose={() => setShowAlert(false)}
        dismissible
      >
        The Datapoint was created successfully
      </Alert>
    </>
  );
};

export default Alerts;
