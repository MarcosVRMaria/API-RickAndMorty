import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
import Personagem from './Personagem.jsx';
import './index.css'

import './App.css'

function App() {
  useEffect(() => {
    buscarPersonagens();
  }, [])

  const [nomePersonagem, setNomePersonagem] = useState('')
  const [personagens, setPersonagens] = useState([])
  const [status, setStatus] = useState('Alive')

  const buscarPersonagens = async () => {
    try {
      const response = await axios.get('https://rickandmortyapi.com/api/character');
      setPersonagens(response.data.results)
    } catch (erro) {
      console.log(erro)
    }
  }

  //TEM QUE TRATAR ERRO
  const buscarPersonagem = async () => {
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/character/?name=${nomePersonagem}&status=${status}`);
      setPersonagens(response.data.results)
    } catch (erro) {
      console.log('Erro')
      if (erro.message == 'Request failed with status code 404') {
        setPersonagens([])
      }
    }
  }
  return (
    <>
      <h1>Lista de Personagens</h1>
      <input
        type='text' value={nomePersonagem}
        onChange={(evento) => setNomePersonagem(evento.target.value)}
      />
      <input type="button" value='Pesquisar' onClick={buscarPersonagem}></input>

      <select name="select"
        onChange={(evento) => setStatus(evento.target.value)}>
        <option value="Alive">Alive</option>
        <option value="Unknown">Unknown</option>
        <option value="Dead">Dead</option>
      </select>
      {
        personagens.length == 0 && (
          <p>Nenhum personagem encontrado!</p>
        )
      }

      {
        personagens.length > 0 && (
          <ul>
            {personagens.map((item, index) =>
              <li key={index}>
                <Link to={`/Personagem/${item.id}`}>
                  <img src={item.image}></img>

                </Link>
                <p> {item.name}</p>
                <p> {item.status}</p>
              </li>

            )
            }
          </ul>
        )
      }
    </>
  )
}

export default App
