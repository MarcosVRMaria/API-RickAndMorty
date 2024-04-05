import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

function Personagem() {
  let { id } = useParams()
  const [personagem, setPersonagem] = useState([])
  const [episodios, setEpisodios] = useState([])

  let personagemAux;

  useEffect(() => {
    buscarid().then(buscarEpisodios,);
  }, [])


  const buscarid = async () => {
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
      personagemAux = response.data;
      setPersonagem(personagemAux)
    } catch (erro) {
      console.log(erro)
    }

  }
  const buscarEpisodios = async () => {
    try {
      let listaEpisodios = []
      personagemAux.episode.map((element) => listaEpisodios.push(element.replace("https://rickandmortyapi.com/api/episode/", "")))

      let episodoisCortado = listaEpisodios.join(",");
      const response = await axios.get(`https://rickandmortyapi.com/api/episode/${episodoisCortado}`);
      let episodio = response.data;

      if (episodio.length == undefined) {
        setEpisodios([episodio])
      } else {
        setEpisodios(episodio)

      }
    } catch (erro) {
      console.log(erro)
    }
  }
  return (
    <>
      <h1>Detalhes do Personagens </h1>
      {episodios != '' ? <></> : <h1>Carregando</h1>}
      {
        personagem != null && (
          <>
            <img src={personagem.image}></img>
            <p>Nome: {personagem.name}</p>
            <p>Status: {personagem.status}</p>
            <p>Especie: {personagem.species}</p>
          </>

        )
      }
      <h3>Episódios:</h3>

      {episodios.map((item, index) =>
        <li key={index}>
          <p> Numero: {item.episode}</p>
          <p> Título: {item.name}</p>
        </li>
      )
      }
    </>
  )
}

export default Personagem