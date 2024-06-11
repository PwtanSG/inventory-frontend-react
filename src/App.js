import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
// import 'bootstrap/dist/css/bootstrap.min.css';
import ProductList from "./Pages/ProductList";
import ProductView from "./Pages/ProductView";
import ProductCreate from "./Pages/ProductCreate";
import ProductEdit from "./Pages/ProductEdit";
import NotFoundScreen from "./Pages/NotFoundScreen";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import CognitoUserLogin from "./Pages/CognitoUserLogin";
import ProtectedRoute from "./Components/ProtectedRoute";
import { AuthProvider } from "./Context/Auth/AuthProvider";
import Scanner from "./Pages/Scanner";
// import About from "./Pages/About";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Header />
          <div className="container">
            <Routes>
              <Route path="/login" element={<CognitoUserLogin />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<ProductList />} />
                <Route path="/scanner" element={<Scanner />} />
                <Route path="/product/:id" element={<ProductView />} />
                <Route path="/product/create" element={<ProductCreate />} />
                <Route path="/product/edit/:id" element={<ProductEdit />} />
              </Route>
              <Route path="*" element={<NotFoundScreen />} />
            </Routes>
          </div>
          <Footer />
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
