import { HashRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import Home from "./Components/Home";
import { Notfound } from "./Components/Notfound";
import Countrie from "./Components/Countrie";
import { ContextProvider } from "./Context/Context";

const App = () => {
  return (
    <ContextProvider>
      <HashRouter>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:id" element={<Countrie />} />
            <Route path="/*" element={<Notfound />} />
          </Routes>
        </main>
      </HashRouter>
    </ContextProvider>
  );
};

export default App;
