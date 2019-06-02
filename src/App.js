/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core'
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Index from "./routes/Index";
import { ZonkyContext } from "./zonkyService";
import Detail from './routes/Detail';

function App() {
  const [loans, setLoans] = useState({ loans: [] });

  useEffect(() => {
    const fetchData = async () => {
      const apiUri = '/loans/marketplace';
      await fetch(apiUri)
        .then((response) => {
          return response.json();
        })
        .then((loans) => {
          setLoans(loans);
        }).catch((error) => {
          console.error(`error fetching data from ${apiUri}`, error);
        });
    }
    fetchData();
    setInterval(fetchData , 1000 * 60 * 5)
  }, []);

  return (
    <ZonkyContext.Provider value={loans} >
      <Router>
        <Route path="/" exact component={Index} />
        <Route path="/loan/:id" component={Detail} />
      </Router>
    </ZonkyContext.Provider>
  );
}

export default App;
