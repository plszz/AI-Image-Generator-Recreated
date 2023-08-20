import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

export default function CarouselDisplay({imageData}) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (     //CHANGE LATER!
    <Carousel key={"slide"} activeIndex={index} onSelect={handleSelect}>
      {imageData}
    </Carousel>
  );
}