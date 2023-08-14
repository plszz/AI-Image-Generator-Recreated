import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

export default function ControlledCarousel({displayData}) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      {displayData}
    </Carousel>
  );
}