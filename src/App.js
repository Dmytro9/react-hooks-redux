import React, { useState } from 'react';
// import ReactDom from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider, useSelector, useDispatch } from 'react-redux';
import './App.css';

function counterReducer(state = { count: 0 }, action) {
  switch (action.type) {
    case 'INCREMENT_COUNT':
      return {
        ...state,
        count: state.count + action.payload
      };
      
    case 'DECREMENT_COUNT':
      return {
        ...state,
        count: state.count - 1
      };
  
    default:
      return state;
  }
}

function nameReducer(state = { name: '' }, action) {
  switch (action.type) {
    case 'UPDATE_NAME':
      return {
        ...state,
        name: action.payload
      };
      
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  counterReducer,
  nameReducer
});

const INITIAL_STATE = {
}

const store = createStore(rootReducer, INITIAL_STATE);

function App() {
  return (
    <Provider store={store}>
      <Counter />
      <Name />
    </Provider>
  );
}

const incAction = (r) => ({
  type: 'INCREMENT_COUNT',
  payload: r
});

function Counter() {
  const { count, name } = useSelector((state) => ({
    ...state.counterReducer,
    ...state.nameReducer  
  }));
  const dispatch = useDispatch();

  const incrementCount = () => {
    dispatch(incAction(1));
  }

  const decrementCount = () => {
    dispatch({
      type: 'DECREMENT_COUNT',
    });
  } 

  return (
    <>
      <h2>Counter: {count}</h2>
      <button onClick={incrementCount}>+</button>
      <button onClick={decrementCount}>-</button>
      <div>
        <h3>Your name is: {name}</h3>
      </div>
    </>
  )
}


function Name() {
  const dispatch = useDispatch();
  const name = useSelector((state) => state.name);

  const handleChange = event => {
    dispatch({
      type: 'UPDATE_NAME',
      payload: event.target.value
    })
  }

  return (
    <div>
      <input placeholder='Input your name' onChange={handleChange} value={name}/>
    </div>
  )
}

export default App;
