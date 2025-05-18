import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './components/PrivateRoute';
import './App.css';
import MainLayout from './layout/MainLayout';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const theme = createTheme({
    palette: {
      primary: {
        main: '#1976d2',
      },
    },
  });
// const App: React.FC = () => {
//   return (
//     <MainLayout />
//   );
// };

const App: React.FC = () => {
    return (
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                    <MainLayout />
                </PrivateRoute>
              }
            >
                 {/*MainLayout 有子路由 */}
                {/* <Route path="chat" element={<Chat />} /> */}
               
            </Route>
            {/* 重定向未找到的路由到首頁 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    );
  };
  
  export default App;