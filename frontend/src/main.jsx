import React from "react";
import ReactDOM from "react-dom/client";
import toast, { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import UserContextProvider from './context/UserContextProvider';

import App from "./App.jsx";
import "./index.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <UserContextProvider>
        <Toaster />
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
    </UserContextProvider>
  </BrowserRouter>
);


// <React.StrictMode>
// <App />
// </React.StrictMode>
