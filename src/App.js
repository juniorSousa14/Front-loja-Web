import {
    BrowserRouter as Router,
    Routes,
    Route
  } from "react-router-dom";
  
  import { useEffect, useState } from "react";
  import Cabecalho from "./componentes/Cabecalho";
  import FormProduto from "./componentes/FormProduto";
  import ListaDeProdutos from "./componentes/ListaDeProdutos";
  import DetalheProduto from "./componentes/DetalheProduto";
  import PaginaNaoEncontrada from "./componentes/PaginaNaoEncontrada";
  import { getProdutos, salvarProduto, excluirProduto } from "./backend";
  
  function App() {
    const [produtos, setProdutos] = useState([]);
  
    const cadastrarProduto = async (form) => {
      await salvarProduto(form);
      setProdutos(await getProdutos());
    };
  
    const removerProduto = async (id) => {
      await excluirProduto(id);
      setProdutos(await getProdutos());
    };
  
    
    useEffect(() => {
      getProdutos().then(prods => setProdutos(prods));
    }, []);
  
    return (
      <div className="container py-3">
      <Router>
        <Cabecalho/>
        <Routes>
          <Route path="/" exact={true} element={<ListaDeProdutos produtos={produtos}/>}/>
          <Route path="/novo" exact={true} element={<FormProduto onCadastrar={cadastrarProduto}/>}/>
          <Route path="/detalhe/:id" exact={true} element={<DetalheProduto onExcluir={removerProduto}/>}/>
          <Route path="*" element={<PaginaNaoEncontrada/>}/>
        </Routes>      
      </Router>
      </div>
    );
  }
  
  export default App;