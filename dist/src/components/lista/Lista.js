import React, { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import {  Container, Table } from "react-bootstrap";
import { eventStartLoading } from "../../actions/crud";
import {Pregunta} from './pregunta'
import "./lista.css";

export const Lista = ({ history }) => {
  const dispatch = useDispatch();
  const { list } = useSelector( state => state.lista );
  useEffect(() => {
    dispatch(eventStartLoading());
  }, [dispatch]);
  return (
    <Container className="MarginContainer">
      <h1 className="AlignCenter"> BAJAS Y CAMBIOS </h1>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Pregunta</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {list.map((pregunta,i) => {
            return <Pregunta {...pregunta} key={i}/>;
          })}
        </tbody>
      </Table>
    </Container>
  );
};
