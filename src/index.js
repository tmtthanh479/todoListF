const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider  store={store}>
    <BrowserRouter>
    <ToastContainer />
  
      <App />
    </BrowserRouter>
  </Provider>
);


