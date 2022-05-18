import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/form";
import Button from "react-bootstrap/Button";

const FormElement = ({
  submithandler,
  cvvHandler,
  nameHandler,
  cardNoHandler,
  dateHandler,
  blurHandler,
  touched,
  state,
  isFormValid,
}) => {
  return (
    <div className="container-form mt-5">
      <Form onSubmit={submithandler}>
        <Row>
          <Form.Group className="mb-3" controlId="formBasictext">
            <Form.Label>Card Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Card Number"
              value={state.cardNo}
              onChange={cardNoHandler}
              onBlur={(e) => blurHandler(e, 0)}
              maxLength="19"
            />
            {!isFormValid.cardNo && touched.cardNo && (
              <span style={{ color: "red", marginTop: "0" }}>
                Please Enter 16 digits
              </span>
            )}
          </Form.Group>
        </Row>

        <Row>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              value={state.Name}
              placeholder="Enter Name as per your Card"
              onBlur={(e) => blurHandler(e, 1)}
              onChange={nameHandler}
            />
            {!isFormValid.name && touched.name && (
              <span style={{ color: "red", marginTop: "0" }}>
                Please Enter Name as Per in Card
              </span>
            )}
          </Form.Group>
        </Row>

        <Row xl="2">
          <Form.Group className="mb-3" controlId="formBasicCvv">
            <Form.Label>Expiry Date</Form.Label>
            <Form.Control
              type="month"
              placeholder="YYYY/MM"
              value={state.date}
              onBlur={(e) => blurHandler(e, 2)}
              onChange={dateHandler}
            />
            {!isFormValid.date && touched.date && (
              <span style={{ color: "red", marginTop: "0" }}>
                Please enter card's Expiry Date
              </span>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>CVV</Form.Label>
            <Form.Control
              type="Password"
              value={state.cvv}
              onBlur={(e) => blurHandler(e, 3)}
              placeholder="***"
              minLength="3"
              maxLength="3"
              onChange={cvvHandler}
            />
            {!isFormValid.cvv && touched.cvv && (
              <span style={{ color: "red", marginTop: "0" }}>
                Please Enter 3 digit cvv
              </span>
            )}
          </Form.Group>
        </Row>

        <Row className="d-flex justify-content-center" xl="4">
          <Button
            variant="dark"
            type="submit"
            disabled={
              isFormValid.cardNo &&
              isFormValid.name &&
              isFormValid.date &&
              isFormValid.cvv
                ? false
                : true
            }
          >
            Submit
          </Button>
        </Row>
      </Form>
    </div>
  );
};

export default FormElement;
