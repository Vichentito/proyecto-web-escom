import React from 'react';
import Board from './components/Board';
import {useCounter1, useCounter2,useCounter3,useCounter4, useCounter5} from './components/useCounter';
import {useCounter6, useCounter7, useCounter8, useCounter9} from './components/useCounter';
import './index.css';
import Card from './components/Card';

function App() {

  const {state1,increment1,decrement1} = useCounter1();
  const {state2,increment2,decrement2} = useCounter2();
  const {state3,increment3,decrement3} = useCounter3();
  const {state4,increment4,decrement4} = useCounter4();
  const {state5,increment5,decrement5} = useCounter5();
  const {state6,increment6,decrement6} = useCounter6();
  const {state7,increment7,decrement7} = useCounter7();
  const {state8,increment8,decrement8} = useCounter8();
  const {state9,increment9,decrement9} = useCounter9();
  var total = state1 + state2 + state3;
  var total2 = state6 + state7 + state8 + state9;


  return (
    <div className="App">
      <div className="container">
        <div className="sidebar-left">
          <p>Valores posibles para X</p>
          <div className="flexbox">
          <Board id="board-2" className="boardx">
            <Card id="card-1" className="cardy">
              <p>{state6}</p>
            </Card>
            <div>
            <button onClick={() =>decrement6()} className='btn'>-</button>
            <button onClick={() =>increment6()} className='btn'>+</button>
            </div>
          <Card id="card-2" className ="cardy">
          <p>{state7}</p>
          </Card>
          <div>
            <button onClick={() =>decrement7()} className='btn'>-</button>
            <button onClick={() =>increment7()} className='btn'>+</button>
            </div>
          <Card id="card-3" className ="cardy">
          <p>{state8}</p>
          </Card>
          <div>
            <button onClick={() =>decrement8()} className='btn'>-</button>
            <button onClick={() =>increment8()} className='btn'>+</button>
            </div>
          <Card id="card-4" className ="cardy">
          <p>{state9}</p>
          </Card>
          <div>
            <button onClick={() =>decrement8()} className='btn'>-</button>
            <button onClick={() =>increment8()} className='btn'>+</button>
            </div>
          </Board>
  </div>
  </div>

        <Board id="board-2" className="board">
          <div className="content">
            <p> Y = ({total2}x + {total})  * {state4} / {state5}</p>
          </div>
        </Board>

        <div className="sidebar-right">
          <p>Resultados</p>
          <p>{(total+ total2) * state4 / state5}</p>
        </div>

        <div className="content2">
          <p>Valores para Y</p>
            <button onClick={() =>decrement1()} className='btn1'>-</button>
            <Card id="card-12" className="cardy">
              <p>{state1}</p>
            </Card>
            <div>
                  <button onClick={() =>increment1()} className='btn1'>+</button>
            </div>
            <br>
            </br>
            <button onClick={() =>decrement2()} className='btn1'>-</button>
            <Card id="card-13" className="cardy">
              <p>{state2}</p>
            </Card>
            <div>
                  <button onClick={() =>increment2()} className='btn1'>+</button>
            </div>
            <br>
            </br>
            <button onClick={() =>decrement3()} className='btn1'>-</button>
            <Card id="card-14" className="cardy">
              <p>{state3}</p>
            </Card>
            <div>
                  <button onClick={() =>increment3()} className='btn1'>+</button>
            </div>
            <br>
            </br>
            <button onClick={() =>decrement4()} className='btn1'>-</button>
            <Card id="card-15" className="cardy">
              <p>*{state4}</p>
            </Card>
            <div>
                  <button onClick={() =>increment4()} className='btn1'>+</button>
            </div>
            <br>
            </br>
            <button onClick={() =>decrement5()} className='btn1'>-</button>
            <Card id="card-16" className="cardy">
              <p>/{state5}</p>
            </Card>
            <div>
            <button onClick={() =>increment5()} className='btn1'>+</button>
            </div>
        </div>

        <button className="home" href="index.html">INICIO</button>
      </div>
</div>
  );
}

export default App;