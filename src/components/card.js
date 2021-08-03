import { useEffect } from "react";

const Card=(props)=>{

    useEffect(()=>{
        document.addEventListener('click',props.suffleCardsOnClick)
        return () => {
            document.removeEventListener("click", props.suffleCardsOnClick)
          }
    })
    return(
        <div>
            <img 
            src={props.pokemon.image}
            alt="pokemon"
            />
            <label>{props.pokemon.name}</label>
            
        </div>
    )

}

export default Card;