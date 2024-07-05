import { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import PropTypes from "prop-types";

const NewSmartphone = ({ onSmartphoneDataSaved }) => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredBrand, setEnteredBrand] = useState("");
  const [enteredImageUrl, setEnteredImageUrl] = useState("");

  const handleChangeName = (e) => {
    setEnteredName(e.target.value);
  };

  const handleChangeBrand = (event) => {
    setEnteredBrand(event.target.value);
  };

  const handleChangeImageUrl = (event) => {
    setEnteredImageUrl(event.target.value);
  };

 

  const submitSmartphoneHandler = (event) => {
    event.preventDefault();
    const SmartphoneData = {
     smartphoneName: enteredName,
      smartphoneBrand: enteredBrand,  
      imageUrl: enteredImageUrl,
    };

    onSmartphoneDataSaved(SmartphoneData);
    setEnteredName("");
    setEnteredBrand("");
    setEnteredImageUrl("");

  }
}

  return (
    <Card className="m-4 w-50" bg="success">
      <Card.Body>
        <Form className="text-white" onSubmit={submitSmartphoneHandler}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="smartphoneTitle">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresar Nombre"
                  onChange={handleChangeName}
                  value={enteredTitle}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3" controlId="smartphoneBrand">
                <Form.Label>Brand</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresar autor"
                  onChange={changeAuthorHandler}
                  value={enteredAuthor}
                />
              </Form.Group>
            </Col>
          </Row>
          
          <Row className="justify-content-between">
            <Form.Group className="mb-3" controlId="bookImageUrl">
              <Form.Label>URL de imagen</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresar url de imagen"
                onChange={changeImageUrlHandler}
                value={enteredImageUrl}
              />
            </Form.Group>
          </Row>

          <Row className="justify-content-end">
            <Col md={3} className="d-flex justify-content-end">
              <Button variant="primary" type="submit">
                Agregar Smartphone
              </Button>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};


NewSmartphone.propTypes = {
  onBookDataSaved: PropTypes.func.isRequired,
};

export default NewSmartphone;