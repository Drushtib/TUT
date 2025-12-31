// components/LogoSlider.js
import React from "react";
import Image from "next/image";

import Logo8FigureFirm from "../../assest/8figurefirm_logo 6.jpg";
import LogoAlloyPersonalTraining from "../../assest/alloypersonaltraining_logo 4.jpg";
import LogoCubeSoftware from "../../assest/cube_software_logo.jpeg";
import LogoExePresence from "../../assest/exepresence_logo.jpeg";
import LogoMiyazaki from "../../assest/miyazaki_logo.jpeg";
import LogoNewWorldWind from "../../assest/newworldwind_logo.jpeg";
import LogoPickupUsa from "../../assest/pickup_usa_franchise_company_logo.jpeg";
import LogoTimePlast from "../../assest/timeplast_logo 3.jpg";

const LogoSlider = ({ title = "Our Partner Brands", showTitle = true, wrapperClassName = "" }) => {
  const images = [
    { src: Logo8FigureFirm, alt: "8 Figure Firm" },
    { src: LogoAlloyPersonalTraining, alt: "Alloy Personal Training" },
    { src: LogoCubeSoftware, alt: "Cube Software" },
    { src: LogoExePresence, alt: "Exe Presence" },
    { src: LogoMiyazaki, alt: "Miyazaki" },
    { src: LogoNewWorldWind, alt: "New World Wind" },
    { src: LogoPickupUsa, alt: "Pickup USA Franchise Company" },
    { src: LogoTimePlast, alt: "TimePlast" },
  ];

  return (
    <div className={`container my-5 ${wrapperClassName}`.trim()}>
      {showTitle ? <h2 className="text-center mb-4">{title}</h2> : null}
      <div className="row">
        <div className="col">
          <div className="logo-slider">
            <div className="logo-slide-track">
              {[...images, ...images].map((image, index) => (
                <div key={index} className="logo-slide">
                  <div className="logo-container">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={80}
                      height={80}
                      quality={100}
                      objectFit="contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .logo-slider {
          height: 100px;
          position: relative;
          overflow: hidden;
          padding: 10px 0;
        }
        .logo-slide-track {
          display: flex;
          animation: scroll 40s linear infinite;
          width: calc(190px * ${images.length * 2});
        }
        .logo-slide {
          height: 60px;
          width: 150px;
          margin: 0 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .logo-container {
          // background: #fff;
          // padding: 10px 15px;
          // border-radius: 6px;
          // box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
          // display: flex;
          // align-items: center;
          // justify-content: center;
          // height: 60px;
          // width: 150px;
          // border: 1px solid #e0e0e0;
        }
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-190px * ${images.length}));
          }
        }
      `}</style>
    </div>
  );
};

export default LogoSlider;