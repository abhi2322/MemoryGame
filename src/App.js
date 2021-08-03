import React,{useEffect, useState} from "react";
import Card from "./components/card";
const App=()=>{
  const [maxScore,setMaxScore]=useState(0);
  const [score,setScore]=useState(0);
  const [cards,setCards]=useState([]);
  const [selectedCards,setselectedCards]=useState([]);

  async function fetchPokemon(i){                         //This fucntion gives an api call for fetching all the pokemons
    const Url=`https://pokeapi.co/api/v2/pokemon/${i}`
    const response= await fetch(Url)
    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }
    const pokemon=await response.json()
    return pokemon;
  }

   function suffleCardsOnClick(){
    const changes=shuffle([...cards])
    setCards(changes)
  }
  
  /* Life cycle method*/
  useEffect(()=>{                        //function to call fethpokemon
    const getPokemon= async(amount)=>{
      const pokemons=[]
      for(let i=1;i<=amount;i++){
        const pokemon =await fetchPokemon(i)
        const id=pokemon.id;
        const name=pokemon.name;
        const image=pokemon.sprites.front_default;
        pokemons.push({id,name,image})
      }
      return pokemons;
    }
    const loadCards= async ()=>{           //function to call getpokemon and assign state
      try{
      let arr=await getPokemon(10);
      setCards(shuffle(arr));
      }
      catch{
        setCards([{image:"",name:"a",id:"adfs"},{image:"",name:"b",id:"dafs"},{image:"",name:"c",id:"adaf"},{image:"",name:"d",id:"aaf"}])
      }

    }
    loadCards()
  },[])
  return (
    <div className="App">
        {
          cards.map((pokemon)=>{
            return(
              <Card
              suffleCardsOnClick={suffleCardsOnClick}
              key={pokemon.id}
              pokemon={pokemon}
             />
            )
          })
        }
    </div>
  );
}

function shuffle(array) {
  var m = array.length, t, i;
  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}

export default App;
