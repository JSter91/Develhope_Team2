import React, { useEffect, useState } from "react";
import "./TestimonialBox.css"
const TestimonialBox = () => {
  const [testimonials, setTestimonials] = useState([
    {
        name: 'Miyah Myles',
        photo:
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=707b9c33066bf8808c934c8ab394dff6',
        text:
          "I recently had the incredible opportunity to travel to Mars with Nebula Space Travel. It was an experience of a lifetime! The professionalism and attention to detail displayed by the Nebula team were unparalleled. I highly recommend Nebula Space Travel to anyone looking for an unforgettable interplanetary adventure!",
      },
      {
        name: 'June Cha',
        photo: 'https://randomuser.me/api/portraits/women/44.jpg',
        text:
          "Embarking on a journey to Jupiter with Nebula Space Travel was nothing short of extraordinary. The seamless integration of advanced technology and exceptional service made for a truly remarkable experience. I applaud Nebula for their commitment to pushing the boundaries of space exploration and look forward to future adventures with them!",
      },
      {
        name: 'Renee Sims',
        photo: 'https://randomuser.me/api/portraits/women/65.jpg',
        text:
          "As someone who has always dreamed of exploring the outer reaches of our solar system, traveling with Nebula Space Travel to Saturn was a dream come true. The journey was not only smooth and comfortable but also filled with awe-inspiring sights and experiences. From witnessing the majestic rings of Saturn to floating weightlessly in space, every moment was surreal.",
      }  ]);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const updateTestimonial = () => {
      setIdx((prevIdx) => (prevIdx + 1) % testimonials.length);
    };

    const interval = setInterval(updateTestimonial, 10000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="testimonial-container">
      <div className="progress-bar"></div>
      <div className="fas fa-quote-right fa-quote"></div>
      <div className="fas fa-quote-left fa-quote"></div>
      <p className="testimonial">{testimonials[idx].text}</p>
      <div className="user">
        <img
          src={testimonials[idx].photo}
          alt="user"
          className="user-image"
        />
        <div className="user-details">
          <h4 className="username">{testimonials[idx].name}</h4>
          <p className="role">{testimonials[idx].position}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialBox;
