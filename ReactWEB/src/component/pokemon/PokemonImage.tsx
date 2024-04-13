import react, { useEffect, useState } from 'react';

export default function PokemonImage({ name, isSprite }: { name: string, isSprite: boolean}) {

  const [imageUrl, setImageUrl] = useState("https://fakeimg.pl/200x200?text=Loading");
  
  useEffect(() => {
    if (isSprite) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`)
        .then((response) => response.json())
        .then((data) => {
          setImageUrl(data.sprites.front_default);
        });
    } else {
      fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`)
        .then((response) => response.json())
        .then((data) => {
          const img = data.sprites.other["official-artwork"].front_default;
          const shiny = data.sprites.other["official-artwork"].front_shiny;
          const rnd = Math.floor(Math.random() * 20);
          if (rnd == 1 && shiny) {
            setImageUrl(shiny);
          } else {
            setImageUrl(img);
          }
        });
    }
  }, [name, isSprite]);

  return (
    <>
      {isSprite ? <img src={imageUrl} alt={`Sprite for ${name}`} style={{ width: '48px', height: '48px' }} /> : <img
        src={imageUrl}
        alt={name}
        style={{ height: "200px", width: "auto" }}
      />}
    </>
  );
}