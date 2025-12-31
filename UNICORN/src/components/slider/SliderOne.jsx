"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Slider from "react-slick";
import { slugify } from "../../utils";
import { useQuery } from "@tanstack/react-query";
import { client } from "../../client";
import ErrorPage from "../../pages/404";
import Loader from "../common/Loader";
import SocialLink from "../../data/social/SocialLink.json";

const SliderOne = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["slider-magazine"],
    queryFn: async () => {
      // Fetch magazines instead of featured posts
      const query = `*[_type == "magazine"] {
        title,
        slug,
        altText,
        publishedAt,
        'featureImg': mainImage.asset->url,
        description
      } | order(publishedAt desc) [0...5]`;

      const response = await client.fetch(query);
      
      // Ensure Magnolia Yace is included and positioned first
      if (response && response.length > 0) {
        const reorderedData = [...response];
        
        // Find Magnolia Yace - check both title and slug
        const magnoliaItem = reorderedData.find(item => {
          const title = (item.title || '').toLowerCase();
          const slug = (item.slug?.current || '').toLowerCase();
          return title.includes('magnolia') || title.includes('yace') ||
                 slug.includes('magnolia') || slug.includes('yace');
        });
        
        // Remove Magnolia Yace from its original position
        if (magnoliaItem) {
          const index = reorderedData.indexOf(magnoliaItem);
          if (index > -1) reorderedData.splice(index, 1);
        }
        
        // Insert Magnolia Yace first
        if (magnoliaItem) {
          reorderedData.unshift(magnoliaItem);
        }
        
        // Debug logging
        console.log('Magazine slider data:', {
          magnoliaFound: !!magnoliaItem,
          firstItem: reorderedData[0]?.title,
          totalItems: reorderedData.length
        });
        
        return reorderedData;
      }
      
      return response;
    },
  });

  function SlickNextArrow(props) {
    const { className, onClick } = props;
    return (
      <button className={className} onClick={onClick}>
        <i className="feather icon-chevron-right"></i>
      </button>
    );
  }

  function SlickPrevArrow(props) {
    const { className, onClick } = props;
    return (
      <button className={className} onClick={onClick}>
        <i className="feather icon-chevron-left"></i>
      </button>
    );
  }

  const slideSettingsContent = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
  };

  const slideSettingsImage = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
  };

  const slideSettingsShare = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    vertical: true,
  };

  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();
  const [nav3, setNav3] = useState();

  // Social Share Toggle
  const ShareToggler = (e) => {
    const targeElm = e.target.nextElementSibling;
    targeElm.classList.toggle("show-shares");
  };

  return (
    <div className="banner banner__home-with-slider banner__home-with-slider-one section-gap-bottom" style={{
      background: '#000000',
      position: 'relative',
      overflow: 'hidden',
      borderTop: 'none',
      border: 'none'
    }}>
      {/* Enhanced Background with Gradient Overlay */}
      <div
        className="banner__home-with-slider-overlay"
        style={{ 
          background: 'linear-gradient(135deg, rgba(174, 134, 37, 0.1) 0%, rgba(0, 0, 0, 0.8) 50%, rgba(174, 134, 37, 0.05) 100%)',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1
        }}
      ></div>
      
      {/* Animated Background Elements */}
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '10%',
        width: '200px',
        height: '200px',
        background: 'radial-gradient(circle, rgba(174, 134, 37, 0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'float 6s ease-in-out infinite',
        zIndex: 1
      }}></div>
      
      <div style={{
        position: 'absolute',
        bottom: '30%',
        left: '5%',
        width: '150px',
        height: '150px',
        background: 'radial-gradient(circle, rgba(174, 134, 37, 0.08) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'float 8s ease-in-out infinite reverse',
        zIndex: 1
      }}></div>

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="row align-items-center min-vh-75">
          <div className="col-xl-6 col-lg-7">
            <div className="banner-slider-container" style={{ padding: '2rem 0' }}>
              {isLoading && <Loader />}
              {error && <ErrorPage />}
              {data && (
                <Slider
                  asNavFor={nav2}
                  ref={(slider1) => setNav1(slider1)}
                  {...slideSettingsContent}
                  className="slick-slider-for slick-synced"
                >
                  {data.slice(0, 3).map((data, index) => (
                    <div className="item" key={data.slug?.current || data.slug || index} style={{ padding: '1rem 0' }}>
                      {/* Enhanced Category Badge */}
                      <div style={{
                        display: 'inline-block',
                        background: 'linear-gradient(45deg, #ae8625, #f4d03f)',
                        color: '#000',
                        padding: '0.5rem 1.5rem',
                        borderRadius: '25px',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        marginBottom: '1.5rem',
                        boxShadow: '0 4px 15px rgba(174, 134, 37, 0.3)'
                      }}>
                        Featured Magazine
                      </div>
                      
                      {/* Enhanced Title */}
                      <h1 className="page-title m-b-xs-40 hover-line" style={{
                        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                        fontWeight: '800',
                        lineHeight: '1.2',
                        color: '#ffffff',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                        marginBottom: '2rem'
                      }}>
                        <Link href={`/magazine/${data.slug?.current || data.slug}`} style={{ 
                          color: 'inherit',
                          textDecoration: 'none',
                          transition: 'all 0.3s ease'
                        }}>
                          {data.title}
                        </Link>
                      </h1>
                      
                      {/* Enhanced Button Group */}
                      <div className="btn-group" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <Link
                          className="btn btn-primary m-r-xs-30"
                          href={`/magazine/${data.slug?.current || data.slug}`}
                          style={{
                            background: 'linear-gradient(45deg, #ae8625, #f4d03f)',
                            border: 'none',
                            padding: '1rem 2rem',
                            borderRadius: '50px',
                            fontWeight: '600',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            boxShadow: '0 8px 25px rgba(174, 134, 37, 0.4)',
                            transition: 'all 0.3s ease',
                            textDecoration: 'none'
                          }}
                        >
                          View Magazine
                        </Link>
                        <Link
                          className="btn btn-outline-light"
                          href="/magazines"
                          style={{
                            border: '2px solid #ae8625',
                            color: '#ae8625',
                            padding: '1rem 2rem',
                            borderRadius: '50px',
                            fontWeight: '600',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            transition: 'all 0.3s ease',
                            textDecoration: 'none'
                          }}
                        >
                          <i className="fas fa-book" style={{ marginRight: '0.5rem' }}></i>
                          View Magazines
                        </Link>
                      </div>
                    </div>
                  ))}
                </Slider>
              )}
            </div>
          </div>
          
          {/* Enhanced Image Section */}
          <div className="col-xl-6 col-lg-5">
            <div style={{ position: 'relative' }}>
              <div style={{
                background: 'linear-gradient(45deg, rgba(174, 134, 37, 0.1), rgba(174, 134, 37, 0.05))',
                borderRadius: '20px',
                padding: '1rem',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(174, 134, 37, 0.2)'
              }}>
                <div className="banner-slider-container-synced">
                  
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="banner-slider-container-synced">
          <Slider
            asNavFor={nav3}
            ref={(slider2) => setNav2(slider2)}
            {...slideSettingsImage}
            className="slick-slider-nav slick-synced"
          >
            {data?.slice(0, 3).map((data, index) => (
              <div className="item" key={data.slug?.current || data.slug || index}>
                <Image
                  src={data.featureImg}
                  alt={data?.altText || data.title}
                  width={2000}
                  height={2000}
                  style={{ objectFit: "contain" }}
                />
                {/* Social Media Icons */}
                <div style={{
                  display: 'flex',
                  gap: '0.5rem',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                  marginTop: '1rem'
                }}>
                  <a 
                    href={SocialLink.fb.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: 'linear-gradient(45deg, #ae8625, #f4d03f)',
                      color: '#000',
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                      boxShadow: 'none'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#1877f2';
                      e.currentTarget.style.color = '#ffffff';
                      e.currentTarget.style.transform = 'scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(45deg, #ae8625, #f4d03f)';
                      e.currentTarget.style.color = '#000';
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    <i className={SocialLink.fb.icon} />
                  </a>
                  <a 
                    href={SocialLink.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: 'linear-gradient(45deg, #ae8625, #f4d03f)',
                      color: '#000',
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                      boxShadow: 'none'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)';
                      e.currentTarget.style.color = '#ffffff';
                      e.currentTarget.style.transform = 'scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(45deg, #ae8625, #f4d03f)';
                      e.currentTarget.style.color = '#000';
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    <i className={SocialLink.instagram.icon} />
                  </a>
                  <a 
                    href={SocialLink.linked.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: 'linear-gradient(45deg, #ae8625, #f4d03f)',
                      color: '#000',
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                      boxShadow: 'none'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#0077b5';
                      e.currentTarget.style.color = '#ffffff';
                      e.currentTarget.style.transform = 'scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(45deg, #ae8625, #f4d03f)';
                      e.currentTarget.style.color = '#000';
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    <i className={SocialLink.linked.icon} />
                  </a>
                  <a 
                    href={SocialLink.yt.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: 'linear-gradient(45deg, #ae8625, #f4d03f)',
                      color: '#000',
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                      boxShadow: 'none'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#FF0000';
                      e.currentTarget.style.color = '#ffffff';
                      e.currentTarget.style.transform = 'scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(45deg, #ae8625, #f4d03f)';
                      e.currentTarget.style.color = '#000';
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    <i className={SocialLink.yt.icon} />
                  </a>
                </div>
              </div>
            ))}
          </Slider>

        </div>
      </div>
    </div>
  );
};

export default SliderOne;
