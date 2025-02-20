import logo from './logo.svg';
import './App.css';

import React, { Component } from 'react'
import Navbar from './component/Navbar';
import News from './component/News';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


export default class App extends Component {
  render() {
    return (
      <div>
        <Navbar/>
        <News pageSize={5} country ="us" category='sports'/>

      </div>
    )
  }
}

