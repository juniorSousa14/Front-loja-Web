import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getProdutoPorId } from "../backend";

export default function DetalheProduto({onExcluir}) {
  let {id} = useParams();
  const navigate = useNavigate();

  const [produto, setProduto] = useState({
    nome: '',
    valor: '',
    foto: ''
  });

  useEffect(() => {
    getProdutoPorId(id).then(p => setProduto(p));
  }, [id]); 

  const excluir = () => {
    onExcluir(id).then(navigate('/')); 
  };

  return (
    <div>
      <img src={produto.foto} alt="Foto do produto"/>
      <h1>{produto.nome}</h1>
      <h3>R$ {produto.valor ? produto.valor.toFixed(2) : '-'}</h3>
      <button className='btn btn-danger' onClick={() => excluir()}>Excluir</button>
      <Link className='btn btn-success' to="/">Voltar</Link>
    </div>
  )
}