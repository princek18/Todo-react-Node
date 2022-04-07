import { Footer } from "./Components/Footer/Footer";
import { Header } from "./Components/Header/Header";
import { MainComponent } from "./Components/MainComponents/MainComponent";
import "antd/dist/antd.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { LoginComponent } from "./Components/Login/LoginComponent";
import { SignUpComponent } from "./Components/SignUp/SignUpComponent";
import { Loader } from "./Components/Loader/Loader";

const AuthRoute = ({ children }) => {
  if (!localStorage.getItem("authToken")) {
    return <Navigate to="/login" />;
  }


  return children;
};

function App() {
  return (
    <div className="App">
      <Header />
      <Loader/>
      <BrowserRouter>
        <Routes>
          <Route
            path="*"
            element={
              <AuthRoute>
                <MainComponent />
              </AuthRoute>
            }
          />
          <Route
            path="/"
            element={
              <AuthRoute>
                <MainComponent />
              </AuthRoute>
            }
          />
          <Route
            path="/todo"
            element={
              <AuthRoute>
                <MainComponent />
              </AuthRoute>
            }
          />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/signup" element={<SignUpComponent />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
