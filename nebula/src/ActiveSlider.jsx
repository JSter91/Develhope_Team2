// import { Swiper, SwiperSlide } from "swiper/react";
// // import SwiperCore, { Navigation, Pagination } from 'swiper/core';
// import 'swiper/swiper-bundle.css';
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/free-mode";
// import { FreeMode, Pagination, Navigation } from "swiper/modules";
// import { ServiceData } from "./constants";
// import './ActiveSlider.css'; 
// // npm install swiper react-icons


// const ActiveSlider = ({id}) => {
//   return (
//     <div id={id} className="flex-container">
//       <Swiper
//         breakpoints={{

//           360: {
//             slidesPerView: 1,
//             spaceBetween: 200,
//           },
//           661: {
//             slidesPerView: 2,
//             spaceBetween: 10,
//           },

//           980: {
//             slidesPerView: 3,
//             spaceBetween: 30,
//           },
//           1200: {
//             slidesPerView: 4,
//             spaceBetween: 3,
// /* ---------------------------------------------------------- */
//           }
//         }}
//         freeMode={true}
//         navigation={true}
//         pagination={{
//           clickable: true,
//         }}
//         modules={[FreeMode, Pagination, Navigation]}
//         className="swiper-container"
//       >
//         {ServiceData.map((item) => (
//           <SwiperSlide key={item.title} style={{ width: '180px' }}>
//             <div className="slide-container">
//               <div className="slide-content" style={{ backgroundImage: `url(${item.backgroundImage})` }}>
//                 <div className="flex items-center justify-between mb-3">
//                   <h1 className="text-xl lg:text-2xl">{item.title}</h1>

//                 </div>
//                 <p className="lg:text-[18px]">{item.content}</p>
//                 <div className="mini-card">
//                   <h2>Flight Price</h2>
//                   <p>{item.price}</p>
//                 </div>
//                 <button className="book-now-button">Book Now</button>
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// };

// export default ActiveSlider;

