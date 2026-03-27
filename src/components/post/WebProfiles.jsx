import SectionTitle from "../elements/SectionTitle";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { client } from "../../client";
import Loader from "../common/Loader";
import ErrorFallback from "../common/ErrorFallback";
import { QUERY_LIMITS } from "../../config/constants";
import { getColor } from "../../lib/utils/theme";
import PostVideoOne from "./layout/PostVideoOne";
import PostVideoTwo from "./layout/PostVideoTwo";
import { useWebProfiles } from "../../hooks/usePosts";

const WebProfiles = () => {
  const [selectedProfile, setSelectedProfile] = useState(0);
  const { data, isLoading, error } = useWebProfiles(QUERY_LIMITS.WEB_PROFILES);

  if (isLoading) return <Loader />;
  if (error) return <ErrorFallback error={error} />;

  if (!data || data.length === 0) return null;

  const reorderedData = [...data];

  const handleProfileClick = (index) => {
    setSelectedProfile(index);
  };

  return (
    <div style={{ background: '#ffffff', color: '#171717' }}>
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 800,
          color: '#171717',
          marginBottom: '1rem',
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}>
          {data[0]?.category.title || "Web Profiles"}
        </h2>
        <Link 
          href={`/category/${data[0]?.category?.slug}`}
          style={{
            color: 'var(--primary-color)',
            textDecoration: 'none',
            fontSize: '0.875rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            transition: 'opacity 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '0.8';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '1';
          }}
        >
          Read All Articles →
        </Link>
      </div>
      <div className="editorial-grid-65-35" style={{ gap: '3rem', marginTop: '2rem' }}>
        <div>
          <PostVideoOne data={reorderedData[selectedProfile]} />
        </div>
        <div>
          <div className="webprofile-names-list">
            <h4 className="names-list-title">Select Profile</h4>
            {reorderedData.map((post, index) => (
              <div
                key={index}
                className={`name-item ${selectedProfile === index ? 'active' : ''}`}
                onClick={() => handleProfileClick(index)}
              >
                <div className="name-content">
                  <div className="name-image">
                    <Image 
                      src={post.featureImg} 
                      alt={post.title}
                      width={60}
                      height={60}
                      sizes="60px"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </div>
                  <span className="name-text">{post.title}</span>
                </div>
                <div className="name-indicator"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <style jsx>{`
          .webprofile-main-image img {
            max-width: 250px;
            max-height: 180px;
            object-fit: cover;
          }
          
          .webprofile-names-list {
            padding: 20px;
            background: #ffffff;
            border: 1px solid rgba(0, 0, 0, 0.1);
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            height: fit-content;
          }
          
          .names-list-title {
            color: #171717;
            font-size: 1.2rem;
            font-weight: 600;
            margin-bottom: 20px;
            text-align: center;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          
          .name-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 15px 20px;
            margin-bottom: 10px;
            background: #f8f8f8;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
            border: 2px solid rgba(0, 0, 0, 0.1);
            position: relative;
            overflow: hidden;
          }
          
          .name-content {
            display: flex;
            align-items: center;
            gap: 12px;
          }
          
          .name-image {
            width: 70px;
            height: 60px;
            border-radius: 6px;
            overflow: hidden;
            flex-shrink: 0;
          }
          
          .name-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 6px;
          }
          
          .name-item:hover {
            background: rgba(218, 0, 55, 0.1);
            transform: translateX(5px);
            border-color: rgba(218, 0, 55, 0.3);
          }
          
          .name-item.active {
            background: var(--gradient-primary);
            color: #ffffff;
            border-color: var(--primary-color);
            box-shadow: 0 4px 15px rgba(218, 0, 55, 0.3);
          }
          
          .name-item.active .name-text {
            color: #ffffff;
            font-weight: 600;
          }
          
          .name-text {
            color: #171717;
            font-size: 1rem;
            font-weight: 500;
            transition: all 0.3s ease;
          }
          
          .name-indicator {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: rgba(0, 0, 0, 0.2);
            transition: all 0.3s ease;
          }
          
          .name-item.active .name-indicator {
            background: #ffffff;
            transform: scale(1.2);
          }
          
          .name-item:hover .name-indicator {
            background: var(--primary-color);
            transform: scale(1.1);
          }
        `}</style>
    </div>
  );
};

export default WebProfiles;
