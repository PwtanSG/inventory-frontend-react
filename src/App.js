import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
// import 'bootstrap/dist/css/bootstrap.min.css';
import ProductList from "./Pages/ProductList";
import ProductView from "./Pages/ProductView";
import ProductCreate from "./Pages/ProductCreate";
import ProductEdit from "./Pages/ProductEdit";
import NotFoundScreen from "./Pages/NotFoundScreen";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

function App() {
  return (
    <>
      <Router>
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductView />} />
            <Route path="/product/create" element={<ProductCreate />} />
            <Route path="/product/edit/:id" element={<ProductEdit />} />
            <Route path="*" element={<NotFoundScreen />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </>
  );
}

export default App;
