import './App.css';
import React, { useEffect,  useState } from 'react';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';

const App = () => {

  const [movieList, setMovieList] = useState([]);// CRIANDO USESTATE  PARA ARMAZENAR ESSA LIST.
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);


  useEffect(() =>  { // AO ATUALIZAR A TELA ELE IRÁ EXECUTAR O QUE EU COLOQUEI AQUI. Usando esse Hook, você diz ao React que o componente precisa fazer algo apenas depois da renderização. O React ira se lembrar da função que você passou (nos referiremos a ele como nosso “efeito”), e chamá-la depois que realizar as atualizações do DOM.
    const loadAll = async () => {
      //Pegando a lista Total
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      // Pegar filme em destaque/ Featured
      let originals = list.filter(i => i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      setFeaturedData(chosenInfo);
    
    }

    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener  =  () => {
      if(window.scrollY > 10) { //SCROLL VERTICAL
        setBlackHeader(true); 
      } else {
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  }, []);

  
  return (
    <div className='page'>

      <Header black = {blackHeader} />


      {featuredData &&    //SE O FEATUREDDATA EXISTIR AI SIM A GENTE PÕE NOSSO COMPONENTE.
        <FeaturedMovie item= {featuredData} />
      }

      <section className='lists'>
        {
        movieList.map((item, key) => ( //KEY UM ITEM NECESSARIO DE TODO MAP Q A GENTE FOR UTILIZAR.
          <MovieRow key={key} title= {item.title} items= {item.items}/>
        ))}
      </section>

      <footer>
        Feito com <span role= "img" aria-label='coração'>♥</span> pelo Caio Pedroso <br />
        Direitos de imagem para Netflix <br />
        Dados pegos do site Themovie.db.org 
      </footer>
    </div>
  );
}

export default App;
