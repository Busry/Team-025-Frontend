import React, { useEffect, useState } from "react";
import { Card, Col, Row, Form, Button, Alert, Spinner } from 'react-bootstrap'
import { AppointmentHistory } from '../../components'
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { serverRequest } from "../../utils/serverRequest";
import { useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";
import ngStatesObject from "../../utils/ngStatesObject";
import "react-datepicker/dist/react-datepicker.css";

const BookAppointment = () => {

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();
  const [loadingHospitals, setLoadingHospitals] = useState(false);
  const [hospitals, setHospitals] = useState([]);

  const { register, handleSubmit, watch, setValue } = useForm();

  const { push } = useHistory();

  const { token } = useSelector(state => state.auth);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      const endpoint = `${process.env.REACT_APP_API}/appointments`;
      const response = await serverRequest(token).post(endpoint, data);
      if (response.data.status === "success") {
        setIsSubmitting(false);
        push('/appointments')
      }
    } catch (error) {
      setError(error.response.data.message || error.response.data.error);
      setIsSubmitting(false);
    }
  };

  const getHospitals = async (lg) => {
    try {
      const lg = watch('lg');
      setLoadingHospitals(true)
      const endpoint = `${process.env.REACT_APP_API}/hospitals/${lg}`;
      const response = await serverRequest(token).get(endpoint);
      if (response.data.status === "success") {
        setHospitals(response.data.data);
        setLoadingHospitals(false)
      }
    } catch (error) {
      setLoadingHospitals(false)
    }
  }

  return (
    <div>
      <h1 className="display-4 mb-4">Book Appointment</h1>
      <Row>
        <Col xs="12" md="6">
          <Card>
            <Card.Body>
              <h6>Book a new Appointment</h6>
              <p className="text-danger">
              Please complete this last step to get started with bloodnation
            </p>
            <Form onSubmit={handleSubmit(onSubmit)}>

              <Form.Group>
                <Form.Label>State</Form.Label>
                <Form.Control name="state" ref={register({ required: true })} as="select" style={{height: '50px'}} custom>
                  <option value="">- Pick a State -</option>
                  {ngStatesObject && Object.keys(ngStatesObject).map((state, index) => <option className="text-capitalize" key={index} value={state}>{state} State</option>)}
                </Form.Control>
              </Form.Group>

              {watch('state')?(
                <Form.Group>
                  <Form.Label>Local Government</Form.Label>
                  <Form.Control name="lg" ref={register({ required: true })} onChange={(e) => getHospitals(e.target.value)} as="select" style={{height: '50px'}} custom>
                    <option value="">- Pick a Local Government -</option>
                    {ngStatesObject && ngStatesObject[watch('state')].locals.map((lg, index) => <option key={index} value={lg.name}>{lg.name}</option>)}
                  </Form.Control>
                </Form.Group>
              ):null}

              <div className="mt-3 mb-3">{loadingHospitals?<Spinner/>:null}</div>

              {watch('state') && watch('lg') && hospitals?(
                <Form.Group>
                  <Form.Label>Hospitals in {watch('lg')} Local Gov of {watch('state')}</Form.Label>
                  <Form.Control name="hospital" ref={register({ required: true })} as="select" style={{height: '50px'}} custom>
                    <option value="">- Pick a Hospital -</option>
                    {hospitals && hospitals.map((hospital, index) => <option key={index} value={hospital._id}>{hospital.name}</option>)}
                  </Form.Control>
                </Form.Group>
              ):null}

              <Form.Group>
                <Form.Label>Appointment Date</Form.Label><br/>
                <DatePicker
                  // name="released_at"
                  selected={new Date()}
                  onChange={date => setValue('date', date)}
                  // dateFormat="MMMM d, yyyy h:mm aa"
                  showTimeSelect
                  className="p-1"
                />
              </Form.Group>

              <Form.Group>
                <Form.Control type="text" placeholder="comment" name="comment" ref={register({ required: true })} className="pt-4 pb-4" />
              </Form.Group>

              <Button variant="danger" type="submit" disabled={isSubmitting} className="mb-3 pt-2 pb-2" block>
                {isSubmitting ? "Loading..." : "Book Now"}
              </Button>
              {error ? (
                <Alert variant="warning" className="text-center">
                  {error}
                </Alert>
              ) : null}
            </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col xs="12" md="6">
          <AppointmentHistory/>
        </Col>
      </Row>
    </div>
  )
}

export default BookAppointment

