import React, { useState } from "react";
import rightArrow from "../assets/icons/rightPickleball.png";
import leftArrow from "../assets/icons/leftPickleball.png";

// Fallback images for categories with missing or broken image URLs
const fallbackImages = [
  "https://media.istockphoto.com/id/1458093871/photo/focus-on-foreground-with-multiracial-couple-active-retirees-playing-pickleball-outdoors.jpg?s=1024x1024&w=is&k=20&c=W7k9xPCt7AtY72k9PapVLuzhlkuJoYpJB3WKndfk_-s=",
  "https://media.istockphoto.com/id/1458877296/photo/pickleball-pedestal.jpg?s=1024x1024&w=is&k=20&c=dFCmhk_ox2GBEmfvLts3c5GBILf7E7HwIbni43F0yBY=",
  "https://media.istockphoto.com/id/1089296964/photo/smiling-sportswoman-with-racket-for-squash.jpg?s=612x612&w=0&k=20&c=I2O6wbdwzSz2VedwtA4ssvfJg36brufAjdffLNKi8os=",
  "https://media.istockphoto.com/id/1251373918/photo/the-balls-are-in-a-basket-on-the-hardcourt-and-picking-up-the-ball.jpg?s=612x612&w=0&k=20&c=oaMzq8sqtUm-u2oVB_CFSs0EiwAn5X8mnnZwzxcYEtM=",
  "https://media.istockphoto.com/id/2200641666/photo/athletic-male-pickleball-player-is-on-return-on-hardcourt-horizontal-pickleball-still.jpg?s=612x612&w=0&k=20&c=xxX442a2VBYCGP6TlXR8vZkxpC5YlbQFly4RAyZPGiQ=",
  "https://media.istockphoto.com/id/1462212999/photo/pickleball-are-many-sports-balls-top-view-closeup-3d-rendering.jpg?s=612x612&w=0&k=20&c=iDF_bho0vt85Ombjn4rk7VQm7UHV0xeeWYuF2w7XVE8=",
  "https://media.istockphoto.com/id/959987076/photo/pickleballs-in-basket.jpg?s=612x612&w=0&k=20&c=c6e4_Fa4S28i8AgbPmvxYccTZhlnGKidZ7vDI0aHKB0=",
  "https://media.istockphoto.com/id/1371557308/vector/industrial-energy-and-power-logo-design-concept-battery-and-gear-icon-vector-logo-design.jpg?s=612x612&w=0&k=20&c=GXqNvCL8ynOH8FOmvpB8Ps0EB87jZKsAmkpU7A-KE3g=",
  "https://media.istockphoto.com/id/2169465588/photo/woman-laying-on-court-after-playing-pickleball.jpg?s=612x612&w=0&k=20&c=OpbKXN305Z7CtwnasD7D4ut4Dt444cHyIFv4bPxlhQw=",
  "https://media.istockphoto.com/id/667439248/vector/isolated-electric-scooter-one-and-two-wheeled-mobility-vehicle-vector-illustration-eco.jpg?s=612x612&w=0&k=20&c=RcHZSlnJiGFZinGdUW1fxREmR9gHEqD36NkP02sEbOU=",
  "https://media.istockphoto.com/id/1345238514/photo/people-test-out-a-vbx-vibration-wellness-exercise-equipment-at-the-minnesota-state-fair.jpg?s=612x612&w=0&k=20&c=giWApT9svYgx13kFEQUB2YdK-pq3gchG29ZvRoR7s0w=",
  "https://media.istockphoto.com/id/2196723262/vector/pickleball-cards-set3.jpg?s=612x612&w=0&k=20&c=3e9TDAfLHkOCmKa-72aBtrEoikInlIJHEuIOBLqdP0s=",
  "https://media.istockphoto.com/id/1448546591/photo/colombian-american-hispanic-couple-playing-pickle-ball-on-sunny-autumn-day-photo-series.jpg?s=612x612&w=0&k=20&c=kNfUYSUAM2kOKwA9ywvxuypNMAEh1WylC3OjN7DO3hs=",
  "https://www.etsy.com/listing/1544172489/pickleball-girl-nail-art-decal-sticker?gpla=1&gao=1&&utm_source=google&utm_medium=cpc&utm_campaign=shopping_us_e-bath_and_beauty&utm_custom1=_k_Cj0KCQiAoJC-BhCSARIsAPhdfShf2Xfq0NS3yzqd2ta3KhOo6g6S2rmXYBnJ_G6V_0NXBiN8iGMKVGYaAuHOEALw_wcB_k_&utm_content=go_21792091386_169018404935_716715246389_pla-314548487700_m__1544172489_561441696&utm_custom2=21792091386&gad_source=1&gbraid=0AAAAADtcfRK66tWj9E7ZnBjuDMrpgo8OB&gclid=Cj0KCQiAoJC-BhCSARIsAPhdfShf2Xfq0NS3yzqd2ta3KhOo6g6S2rmXYBnJ_G6V_0NXBiN8iGMKVGYaAuHOEALw_wcB&load_webview=1&bid=jzcVFvXTGIRNU0USJ70CtHOPzt9y",
  "https://fb.watch/x_RYDavz5-/",
  "https://www.healifeco.com/products/ftsap",
  "https://fb.watch/y7kNgRwqVR/",
  "https://visionbody.com/blogs/news/my-journey-back-to-peak-fitness-with-visionbody-ultimate-powersuit?fbclid=IwZXh0bgNhZW0BMABhZGlkAasaG_IGe-EBHS_FQJ4yVDHXOvy-paOhkZiE86FikOlX1jI0eHTT16xKoMKUez8klR87WA_aem_tcvZ6cJXe4YyrdUpMgwzBQ&utm_source=facebook&utm_medium=paid&campaign_id=120214466147150481&ad_id=120218474426700481",
  "https://magnetsforless.com",
  "https://resona.health/?ap_id=dominickdecarlo",
  "https://fb.watch/y6UkdDYNAH/?",
  "https://sleepcream.com",
  "https://mindlycalm.com",
  "https://davincimedicalusa.com",
  "https://kardia.com",
  "https://Norelie-RedRevive-US-AppLovin-AB",
  "https://uponide.top/products/bloodpro",
  "https://fb.watch/y1RQditfLx/",
  "https://norelie.co/products/redrevive-cold-laser-therapy-wand",
  "https://pulsetto.tech/",
  "https://mistefy.shop/products/umbrella-diffuser?twclid=2-1144qfpukr3crvjj588azdbza",
  "https://fb.watch/y7aKVGULnB/",
  "https://www.kewlioo.com/collections/sauna-vests-suits/products/mens-heat-trapping-sauna-jacket/?utm_source=applovin&utm_campaign=ROAS&utm_medium=paid&alart=40cba1b8-4868-4753-b247-7fbf0cda45e4&aleid=d049e802ba2bc47f63dc30a13bbc2022363c0034",
  "https://fb.watch/x_RYDavz5-/?",
  "https://www.alterme.com/shop/swab-kit?utm_source=facebook&utm_medium=paid&utm_campaign=%5BT%5D25/03/01-AP-Cold-CBO-HV-7DC1DV-Broad-DNA%20Report&utm_term=%5BT%5D25/03/01-Broad-Exclusions-PUR-US-18+-M%26W-Autoplacements-7DC1DV-HV-Post%20ID-DNA%20Report-CBS%201&utm_content=%5BT%5D25/03/01-Post%20ID-DNA%20Report-%7CCBS%201%7C-V2-IMG&tw_source=fb&tw_adid=120216203517140328&promocode=ALTER70&fbclid=IwZXh0bgNhZW0BMABhZGlkAasYABU91FgBHTiUWQZ-MdmEMI4781hnUXgb2iGsTNh9mpqQ4G_izkArB7fALkCddyilDA_aem_HiD-RAwm9okvyiEm75e3rA&campaign_id=120216199304820328&ad_id=120216203517140328&utm_id=120216199304820328",
];

const getFallbackImage = () =>
  fallbackImages[Math.floor(Math.random() * fallbackImages.length)];

const getImageUrl = (item) =>
  item?.image_url?.trim()
    ? item.image_url
    : item?.image?.imageUrl?.trim()
    ? item.image.imageUrl
    : getFallbackImage();

const Coverflow = ({ categories = [], onItemClick }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollInterval, setScrollInterval] = useState(null);
  const [speed, setSpeed] = useState(500);

  const prev = () =>
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + categories.length) % categories.length
    );

  const next = () =>
    setActiveIndex((prevIndex) => (prevIndex + 1) % categories.length);

  const startScrolling = (direction) => {
    if (scrollInterval) return;
    let currentSpeed = speed;

    const scroll = () => {
      direction === "left" ? prev() : next();
      currentSpeed = Math.max(50, currentSpeed - 50);
      const interval = setTimeout(scroll, currentSpeed);
      setScrollInterval(interval);
    };

    scroll();
  };

  const stopScrolling = () => {
    if (scrollInterval) {
      clearTimeout(scrollInterval);
      setScrollInterval(null);
      setSpeed(500);
    }
  };

  return (
    <div className="relative w-full flex flex-col items-center mt-5 overflow-hidden">
      {/* Navigation Arrows */}
      <div className="absolute top-[40%] left-2 z-50">
        <button
          onMouseDown={() => startScrolling("left")}
          onMouseUp={stopScrolling}
          onMouseLeave={stopScrolling}
          className="w-10 h-10 md:w-12 md:h-12 cursor-pointer active:scale-90 transition-transform"
        >
          <img src={leftArrow} alt="Prev" className="w-full h-full" />
        </button>
      </div>

      <div className="absolute top-[40%] right-2 z-50">
        <button
          onMouseDown={() => startScrolling("right")}
          onMouseUp={stopScrolling}
          onMouseLeave={stopScrolling}
          className="w-10 h-10 md:w-12 md:h-12 cursor-pointer active:scale-90 transition-transform"
        >
          <img src={rightArrow} alt="Next" className="w-full h-full" />
        </button>
      </div>

      {/* Coverflow Cards */}
      <div className="relative flex items-center justify-center w-full max-w-7xl h-[400px] perspective-[1200px] z-10 overflow-visible">
        {categories.map((item, index) => {
          const offset = index - activeIndex;
          if (Math.abs(offset) > 4) return null;

          const isActive = offset === 0;

          const scale =
            offset === 0
              ? 1.25
              : Math.abs(offset) === 1
              ? 1.0
              : Math.abs(offset) === 2
              ? 0.9
              : Math.abs(offset) === 3
              ? 0.8
              : 0.7;

          const translateX =
            offset === -4
              ? -620
              : offset === -3
              ? -480
              : offset === -2
              ? -330
              : offset === -1
              ? -190
              : offset === 1
              ? 190
              : offset === 2
              ? 330
              : offset === 3
              ? 480
              : offset === 4
              ? 620
              : 0;
          const rotateY = offset === 0 ? 0 : offset < 0 ? 60 : -60;
          const translateZ = offset === 0 ? 0 : -Math.abs(offset) * 80;

          return (
            <div
              key={index}
              className={`absolute transition-all duration-500 cursor-pointer rounded-xl overflow-hidden active:scale-95 hover:scale-[1.03] ${
                isActive
                  ? "border-4 border-[#B9E018] shadow-[0_0_20px_#B9E018]"
                  : "border-2 border-white/30 shadow-[0_0_10px_rgba(255,255,255,0.2)]"
              }`}
              onClick={() => {
                setActiveIndex(index);
                onItemClick?.(item);
              }}
              style={{
                transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                zIndex: isActive ? 999 : 100 - Math.abs(offset),
                backfaceVisibility: "hidden",
                transformStyle: "preserve-3d",
                willChange: "transform",
              }}
            >
              <div className="relative w-[180px] h-[180px] md:w-[200px] md:h-[200px]">
                <img
                  src={getImageUrl(item)}
                  alt={item?.name || "category"}
                  className="w-full h-full object-cover"
                  onError={(e) => (e.target.src = getFallbackImage())}
                  style={{
                    filter: isActive
                      ? "brightness(90%)"
                      : Math.abs(offset) === 1
                      ? "brightness(75%)"
                      : "brightness(50%)",
                  }}
                />
                <div
                  className={`absolute inset-0 flex items-center justify-center ${
                    isActive ? "bg-black/30" : "bg-black/50"
                  }`}
                >
                  <span
                    className={`text-white text-center drop-shadow-md px-4 ${
                      isActive
                        ? "text-xl md:text-2xl font-extrabold"
                        : Math.abs(offset) === 1
                        ? "text-base md:text-lg font-bold"
                        : "text-xs md:text-sm font-semibold"
                    }`}
                  >
                    {item.name}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* A-Z Strip */}
      <div
        className="mt-10 w-full max-w-5xl mx-auto z-50 py-4 px-4 rounded-full overflow-x-auto whitespace-nowrap text-center scrollbar-thin scrollbar-thumb-yellow-400 scrollbar-track-gray-800"
        style={{
          background: `radial-gradient(circle at left center, #b8e01873 0.25%, transparent 40%),
                      radial-gradient(circle at right center, #b8e01873 0.25%, transparent 40%),
                      #000000fb`,
        }}
      >
        {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
          <button
            key={letter}
            onClick={() => {
              const index = categories.findIndex((cat) =>
                cat.name?.toUpperCase().startsWith(letter)
              );
              if (index !== -1) setActiveIndex(index);
            }}
            className="inline-block text-[#B9E018] cursor-pointer font-bold mx-2 sm:mx-3 text-base sm:text-lg hover:scale-110 transition"
          >
            {letter}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Coverflow;
