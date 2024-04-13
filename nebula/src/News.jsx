import "./NewsCard.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Spaceximg from "./assets/starship-flight3-hires.webp";
import Stazione from "./assets/stazione.jpg";
import Kepler from "./assets/Kepler22b.jpg";
import Satellite from "./assets/satellite.jpg";
import {GlobalContext} from "./GlobalContext";

// ////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////
import { useState, useEffect, useContext } from "react";
function News({ id }) {

  const { setIsVisible4, isVisible4 } = useContext(GlobalContext);


  useEffect(() => {
    const handleScroll = () => {
      // Ottieni l'elemento
      const element = document.getElementById("section4");
  
      // Verifica se l'elemento esiste
      if (element) {
        // Calcola la posizione dell'elemento rispetto al top della finestra
        const elementTop = element.getBoundingClientRect().top;
  
        // Calcola l'altezza dell'elemento
        const elementHeight = element.offsetHeight;
  
        // Calcola l'altezza del 60% dell'elemento
        const fiftyPercentElementHeight = elementHeight * 0.5;
  
        // Calcola l'altezza del 60% della viewport
        const fiftyPercentViewportHeight = window.innerHeight * 0.5;
  
        // Verifica se almeno il 60% dell'altezza dell'elemento è visibile nella viewport
        const isFiftyPercentVisible = elementTop < fiftyPercentViewportHeight && elementTop + fiftyPercentElementHeight > 0;
  
        // Imposta isVisible a true solo se almeno il 60% dell'altezza dell'elemento è visibile
        setIsVisible4(isFiftyPercentVisible);
      }
    };
  
    // Aggiungi l'event listener per lo scroll
    window.addEventListener("scroll", handleScroll);
  
    // Rimuovi l'event listener quando il componente viene smontato
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
      
  const Cards = [
    {
      id: 0,
      text: "The International Space Station (ISS) is a large space station assembled and maintained in low Earth orbit by a collaboration of five space agencies: NASA (United States), Roscosmos (Russia), JAXA (Japan), ESA (Europe), CSA (Canada), and their contractors. ISS is the largest space station ever built.Its primary purpose is performing microgravity and space environment experiments.",
      img: Stazione,
      title: "International Space Station (ISS)",
    },
    {
      id: 1,
      text: "WASHINGTON — SpaceX hopes to conduct the next launch of its Starship vehicle as soon as early May, a schedule that will depend on how quickly it can get an amended launch license. Speaking at the Satellite 2024 conference March 19, Gwynne Shotwell, president and chief operating officer of SpaceX, said the company was still reviewing the data from the vehicle's third integrated launch March 14 but expected to be ready to fly again soon.",
      img: Spaceximg,
      title: "SpaceX planning next Starship flight",
    },
    {
      id: 2,
      text: "Kepler-22b is a super-Earth that could be covered in a super ocean. The jury is still out on Kepler-22b's true nature; at 2.4 times Earth's radius, it might even be gaseous. But theoretically an ocean world tipped on its side – a bit like our solar system’s ice giant, Uranus – turns out to be comfortably habitable ",
      img: Kepler,
      title: "Kepler-22b:The super-Earth",
    },
    {
      id: 3,
      text: "Small satellites typically have been deployed in low Earth orbit but are now being offered as a more flexible alternative for geostationary applications. They typically weigh in the range of  400 to 1,700 kg compared to tons for traditional GEO satellites.Commercial and military operators are exploring the use of small geosynchronous satellites to enhance communications networks. ",
      img: Satellite,
      title: "Satellites for geostationary orbit",
    },
  ];

  return (
    <div className="news-container-over" id={id}>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <div className="news-card-body">
          {Cards.map((slide) => (
            <SwiperSlide key={slide.img}>
              <div className="news-container">
                <div className="news-card">
                  <img
                    className="news-img"
                    src={slide.img}
                    id={slide.id}
                    alt=""
                  ></img>
                  <div className="intro">
                    <p className="news-title">{slide.title}</p>
                    <p className="news-p">{slide.text}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </div>
  );
}

export default News;
