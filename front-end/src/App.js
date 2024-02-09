import React from 'react'
import './App.css';
import Login from './Login';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Main from './Main';
import Overview from './pages/Overview'
import Deposit from './pages/Deposit'
import Withdraw from './pages/Withdraw'
import Transfer from './pages/Transfer'
import ViewTransactions from './pages/Transactions'; 
import Accounts from './pages/Accounts';
import Refunds from './pages/refunds';
import { AnimatePresence } from "framer-motion";



function App() {

 

  return (
    <AnimatePresence>
    <BrowserRouter>
      <div>
     <Routes >
          <Route path="/" element={<Login />} />

          <Route path="/main" element={<Main />}>
            <Route path="" element={<Overview />} />
            <Route path="deposit" element={<Deposit />} />
            <Route path="transfer" element={<Transfer />} />
            <Route path="withdraw" element={<Withdraw />} />
            <Route path="transactions" element={<ViewTransactions />} />
            <Route path="accounts" element={<Accounts />} />
            <Route path="overview" element={<Overview />} />
            <Route path="refunds" element={<Refunds />} />
          </Route>


        </Routes>
      </div>
    </BrowserRouter>
    </AnimatePresence>
  );
}


export default App;
