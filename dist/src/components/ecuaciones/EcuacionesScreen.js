import React from "react";
import Board from "../extras/Board";
import {
  useCounter1,
  useCounter2,
  useCounter3,
  useCounter4,
  useCounter5,
} from "../extras/useCounter";
import {
  useCounter6,
  useCounter7,
  useCounter8,
  useCounter9,
} from "../extras/useCounter";
import "./ecuaciones.css";
import Card from "../extras/Card";
import { Navbar } from "../ui/Navbar";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { startCreate, startActual, startActualizar,startActualizarImg } from "../../actions/crud";

export const EcuacionesScreen = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { actual } = useSelector((state) => state.lista);
  const { name,userImg } = useSelector((state) => state.auth);

  let { state1, increment1, decrement1 } = useCounter1(
    actual.id !== "0" ? parseInt(actual.valores.split("|")[0]) : 0
  );
  let { state2, increment2, decrement2 } = useCounter2(
    actual.id !== "0" ? parseInt(actual.valores.split("|")[1]) : 0
  );
  let { state3, increment3, decrement3 } = useCounter3(
    actual.id !== "0" ? parseInt(actual.valores.split("|")[2]) : 0
  );
  let { state4, increment4, decrement4 } = useCounter4(
    actual.id !== "0" ? parseInt(actual.valores.split("|")[3]) : 1
  );
  let { state5, increment5, decrement5 } = useCounter5(
    actual.id !== "0" ? parseInt(actual.valores.split("|")[4]) : 1
  );
  let { state6, increment6, decrement6 } = useCounter6(
    actual.id !== "0" ? parseInt(actual.valores.split("|")[5]) : 0
  );
  let { state7, increment7, decrement7 } = useCounter7(
    actual.id !== "0" ? parseInt(actual.valores.split("|")[6]) : 0
  );
  let { state8, increment8, decrement8 } = useCounter8(
    actual.id !== "0" ? parseInt(actual.valores.split("|")[7]) : 0
  );
  let { state9 } = useCounter9(
    actual.id !== "0" ? parseInt(actual.valores.split("|")[8]) : 0
  );
  var total = state1 + state2 + state3;
  var total2 = state6 + state7 + state8 + state9;
  var resultFinal = ((total + total2) * state4) / state5;
  let valores = `${state1}|${state2}|${state3}|${state4}|${state5}|${state6}|${state7}|${state8}|${state9}|${total}|${total2}|${
    ((total + total2) * state4) / state5
  }`;
  //console.log(resultFinal,((total + total2) * state4) / state5,parseInt(actual.valores.split("|")[11]));
  const handleClickNew = (e) => {
    e.preventDefault();
    if (actual.id !== "0") {
      dispatch(startActualizar(actual.id, valores));
    } else {
      dispatch(startCreate(resultFinal, valores));
    }
  };

  let fileNameUploaded = "";
  console.log(name,userImg);
  const handleClickImg = (e) => {
    e.preventDefault();
    if (fileNameUploaded !== "") {
      fileNameUploaded = fileNameUploaded.split('.')[0]
      dispatch(startActualizarImg(name, fileNameUploaded));
    } else {
      alert("primero sube un archivo");
    }
  };

  const handleFileChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    fileNameUploaded = file.name;
    if (file) {
      console.log(file);
      const formData = new FormData();
      formData.append("file", file);
      try {
        fetch("http://localhost:8080/ServletXX1/uploadFiles", {
          method: "POST",
          body: formData,
        })
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleClickNuevo = (e) => {
    e.preventDefault();
    dispatch(startActual("0", ""));
    history.replace("/");
  };
  return (
    <div className="calendar-screen">
      <Navbar />
      <div>
        <div className="sidebar-left">
          <p>Valores posibles para X</p>
          <div className="flexbox">
            <Board id="board-2" className="boardx">
              <Card id="card-1" className="cardy">
                <p>{state6}</p>
              </Card>
              <div>
                <button onClick={() => decrement6()} className="btn">
                  -
                </button>
                <button onClick={() => increment6()} className="btn">
                  +
                </button>
              </div>
              <Card id="card-2" className="cardy">
                <p>{state7}</p>
              </Card>
              <div>
                <button onClick={() => decrement7()} className="btn">
                  -
                </button>
                <button onClick={() => increment7()} className="btn">
                  +
                </button>
              </div>
              <Card id="card-3" className="cardy">
                <p>{state8}</p>
              </Card>
              <div>
                <button onClick={() => decrement8()} className="btn">
                  -
                </button>
                <button onClick={() => increment8()} className="btn">
                  +
                </button>
              </div>
            </Board>
          </div>
        </div>

        <Board id="board-2" className="board">
          <div className="content">
            <p>
              {" "}
              Y = ({total2} + {total}) * {state4} / {state5}
            </p>
          </div>
        </Board>

        <div className="sidebar-right">
          <p>Resultados</p>
          <p>{resultFinal}</p>
          <table>
            <tr>
              <th>Y</th>
              <th>X</th>
            </tr>
            <tr>
              <td>{resultFinal}</td>
              <td>{total2}</td>
            </tr>
          </table>
          <p>Imagen de perfil</p>
          {(userImg !== 'null' && userImg !== '') && (
            <img
              src={"http://localhost:8080/ServletXX1/GetImages?name=" + userImg}
              width="200px" height="200px"
            />
          )}
          <input
            type="file"
            className="form-control"
            id="fileSelector"
            onChange={handleFileChange}
          />
          <button className="home" onClick={handleClickImg}>
            Cambiar imagen
          </button>
        </div>

        <div className="content2">
          <p>Valores para Y</p>
          <button onClick={() => decrement1()} className="btn1">
            -
          </button>
          <Card id="card-12" className="cardy">
            <p>{state1}</p>
          </Card>
          <div>
            <button onClick={() => increment1()} className="btn1">
              +
            </button>
          </div>
          <br></br>
          <button onClick={() => decrement2()} className="btn1">
            -
          </button>
          <Card id="card-13" className="cardy">
            <p>{state2}</p>
          </Card>
          <div>
            <button onClick={() => increment2()} className="btn1">
              +
            </button>
          </div>
          <br></br>
          <button onClick={() => decrement3()} className="btn1">
            -
          </button>
          <Card id="card-14" className="cardy">
            <p>{state3}</p>
          </Card>
          <div>
            <button onClick={() => increment3()} className="btn1">
              +
            </button>
          </div>
          <br></br>
          <button onClick={() => decrement4()} className="btn1">
            -
          </button>
          <Card id="card-15" className="cardy">
            <p>*{state4}</p>
          </Card>
          <div>
            <button onClick={() => increment4()} className="btn1">
              +
            </button>
          </div>
          <br></br>
          <button onClick={() => decrement5()} className="btn1">
            -
          </button>
          <Card id="card-16" className="cardy">
            <p>/{state5}</p>
          </Card>
          <div>
            <button onClick={() => increment5()} className="btn1">
              +
            </button>
          </div>
        </div>
      </div>
      <div className="crud">
        <button className="home" onClick={handleClickNuevo}>
          Nuevo
        </button>
        <button className="home" onClick={handleClickNew}>
          Guardar
        </button>
        <Link to="/lista" className="home">
          Ver guardados
        </Link>
      </div>
    </div>
  );
};
