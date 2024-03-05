import './App.scss';
import Header from "./Components/Navigation/Header.js"
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppRoutes from './Components/Routes/AppRoutes.js';
import { Oval } from 'react-loader-spinner'
import { UserContext } from "./Context/UserContext.js";
import { useContext } from 'react';
function App() {
  const { user } = useContext(UserContext)
  return (
    <>
      <Router>
        {user && user.isLoading ?
          <Oval color="#00BFFF" height={80} width={80} />
          :
          <>
            <div className='app-header'>
              <Header></Header>
            </div>
            <div className='app-container'>
              <AppRoutes />
            </div >
          </>
        }

        {/* <div className='app-header'>
          <Header></Header>
        </div>
        <div className='app-container'>
          <AppRoutes />
        </div > */}
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" y
      />
      {/* Same as */}
    </>
  );
}

export default App;
