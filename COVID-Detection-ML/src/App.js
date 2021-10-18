import "./App.css";
import Footer from "./Footer";
import Main from "./Main";
import { Activity } from "./Activity";
function App() {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <div style={{ width: "100%" }}>
        <Main />
      </div>
      <div style={{ width: "100%" }}>
      <Activity />
      </div>
      
      <div
        style={{ width: "100%", z: "10" }}
        className="footer"
      >
        <Footer />
      </div>
    </div>
  );
}

export default App;
