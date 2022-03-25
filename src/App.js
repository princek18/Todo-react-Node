import { Footer } from "./Components/Footer/Footer";
import { Header } from "./Components/Header/Header";
import { MainComponent } from "./Components/MainComponents/MainComponent";
import 'antd/dist/antd.css';

function App() {
  return (
    <div className="App">
    <Header/>
    <MainComponent/>
    <Footer/>
    </div>
  );
}

export default App;
