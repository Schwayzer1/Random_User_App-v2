import Footer from "./components/footer/Footer";
import "./App.css";
import User from "./components/user/User";
import "bootstrap/dist/css/bootstrap.min.css";
import schwayzer from "./assets/schwayzer.png";

function App() {
  return (
    <>
      <div className="nav container-fluid d-flex justify-content-center">
        <img
          src={schwayzer}
          width="250px"
          height="180px"
          alt=""
          className="schwayzer"
        />
      </div>
      <User />
      <Footer />
    </>
  );
}

export default App;
