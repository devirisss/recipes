import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import RecipePage from './recipe-page';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
        <Router>
                <Routes>
                        <Route path="/recipe/:id" element={<RecipePage />} />
                        <Route path="/" element={<App />} />
                </Routes>
        </Router>
);

