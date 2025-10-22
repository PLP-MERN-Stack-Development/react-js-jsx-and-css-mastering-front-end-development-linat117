import './App.css'
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Notes from './pages/Notes';
import API from './pages/API';
function App() {
 

  return (
    <>
      <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white transition-all duration-300">
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/notes"
            element={
              <Layout>
                <Notes />
              </Layout>
            }
          />
          <Route
            path="/api"
            element={
              <Layout>
                <API />
              </Layout>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App
