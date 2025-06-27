import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function OurCollaboration() {
  const collaborators = [
    { id: 1, name: "NCC", image: "/ncc.png" },
    { id: 2, name: "NSS", image: "/nss.png" },
    { id: 3, name: "YMCA", image: "/ymca.png" },
    { id: 4, name: "Red Cross", image: "/redcross.png" },
    { id: 5, name: "Lions Club", image: "/lionsclub.png" },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-white via-red-50 to-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-12 text-center text-red-700">
          Our Collaborators
        </h2>

        <Swiper
          spaceBetween={30}
          slidesPerView={3}
          pagination={{ clickable: true }}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          loop={true}
          modules={[Pagination, Autoplay]}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-12"
        >
          {collaborators.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-2xl transition duration-300 flex flex-col items-center justify-center p-8 h-64">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-28 h-28 object-contain mb-4"
                />
                <p className="text-xl font-semibold text-gray-800">
                  {item.name}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
