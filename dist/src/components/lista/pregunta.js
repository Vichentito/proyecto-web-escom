import React from "react";
import { useDispatch } from "react-redux";
import "./lista.css";
import "./pregunta.css";
import { startDelete, startActual } from "../../actions/crud";
import { useHistory } from "react-router-dom";

export const Pregunta = ({ id, valores }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const handleClickEliminar = (e) => {
    e.preventDefault();
    dispatch(startDelete(id));
  };
  const handleClickEditar = (e) => {
    e.preventDefault();
    dispatch(startActual(id, valores));
    history.replace("/");
  };
  const handleClickRegresar = (e) =>{
    e.preventDefault();
    history.replace("/");
  };

  return (
    
    <tr>
      <td className="color-white">
        <p>{id}</p>
      </td>
      <td>
        <button className="M-6" onClick={handleClickEditar}>
          Ver pregunta
        </button>
        <button className="M-6" onClick={handleClickEditar}>
          Editar pregunta
        </button>
        <button className="M-6" onClick={handleClickEliminar}>
          Eliminar pregunta
        </button>
        <button className= "M-6" onClick={handleClickRegresar}>
      Regresar
    </button>
      </td>
    </tr>
  );
};
