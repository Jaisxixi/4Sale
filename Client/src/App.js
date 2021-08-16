import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './Navbar';
import Body from './Body';
import Footer from './Footer';

function App(props) {
  return (
    <Router >
      <div className="App">
        <Navbar />
        {/* <div>
          <BackgroundImage />
        </div> */}
        <div className="content">
          <Body />
        </div>
        <Footer className="footer-container" />
      </div>
    </Router> 
  );
}

export default App;
