import { useEffect,useState } from "react";
import { getAllPokemon,getPokemon } from "./utils/pokemon";
import Card from "./components/Card";
import "./App.css";
import Navbar from "./components/Navbar";

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  // 最初から取得を行っているからtrue
  //ローディング時の処理
  const [loding, setLoding] = useState(true);
  //ポケモンデータ部分
  const [pokemonData, setPokemonData] = useState([]);
  const [nextURL, setNextURL] = useState();
  const [prevURL, setPrevURL] = useState();

  useEffect(() => {
    // 非同期処理を定義
    const fetchPokemonData = async () => {
      // 全てのポケモンデータを取得
      let res = await getAllPokemon(initialURL);
      // 各ポケモンの詳細データを取得
      loadPokemon(res.results);
      console.log(res.previous);
      setPrevURL(res.previous);//null
      setNextURL(res.next);
      setLoding(false);
  };
    fetchPokemonData();
  }, []);

  const loadPokemon = async (data) => {

    let _pokemonData = await Promise.all(
      data.map(pokemon => {
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };

  const handlePrevPage = async () => {
    if(!prevURL) return;//nullの場合は何もしない
    setLoding(true);
    let data = await getAllPokemon(prevURL);
    await loadPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoding(false);
  };

  const handleNextPage = async () => {
    setLoding(true);
    let data = await getAllPokemon(nextURL);
    await loadPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoding(false);
  };

  return (
    <>
    <Navbar />
    <div className="App">
      {/* 三項演算子 */
      loding ? (
        <h1>Loading...</h1>
        ) : (
        <>
          <div className="pokemonCardContainer">
            {pokemonData.map((pokemon, i) => {
              return <Card key={i} pokemon={pokemon} />;
            })};
          </div>
          <div>
            <button onClick={handlePrevPage}>前へ</button>
            <button onClick={handleNextPage}>次へ</button>
          </div>
        </>
        )}
    </div>
    </>
  );
}

export default App;
