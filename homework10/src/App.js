import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ClassesList from './components/ClassesList';
import ClassDetails from './components/ClassesDetails';
import PlayCharacter from './components/PlayCharacter';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <div className="App bodyBackground">
    
        <Layout>
          <Routes>
            <Route path="/" exact element={<ClassesList/>} />
            <Route path="/class/:index" element={<ClassDetails/>} />
            <Route path="/play-character" element={<PlayCharacter/>} />
          </Routes>
        </Layout>
      </div>
    </Router>
    
  );
}

export default App;
