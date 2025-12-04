import HeadMeta from "../components/elements/HeadMeta";
import FooterTwo from "../components/footer/FooterTwo";
import HeaderOne from "../components/header/HeaderOne";
import MasterTalks from "../components/post/MasterTalks";
import LogoSlider from "../components/post/LogoSlider";
import Magazines from "../components/post/Magazines";
import BusinessBulletin from "../components/post/BusinessBulletin";
import SliderOne from "../components/slider/SliderOne";
import WebProfiles from "../components/post/WebProfiles";
import MarketNews from "../components/post/MarketNews";
import MagazineHero from "../components/hero/MagazineHero";
import IndustryBlogs from "../components/post/IndustryBlogs";
import ScrollToTop from "../components/common/ScrollToTop";
import { commonStyles } from "../lib/utils/theme";

const Home = () => {
  console.log("Home component rendering");
  
  return (
    <div suppressHydrationWarning style={commonStyles.pageContainer}>
      <HeadMeta
        metaTitle="The Entrepreneurial Chronicles: A Business Magazine for Inspiring Entrepreneur Stories"
        metaDesc="The Entrepreneurial Chronicles is a business magazine that brings inspiring stories of entrepreneurs who have turned their dreams into reality."
      />
      <HeaderOne />
      
      {/* Hero Section - Full Width */}
      <div style={{ padding: '3rem 0', background: 'var(--background)' }}>
        <MagazineHero />
      </div>
      
      {/* Latest Digital Editions - Horizontal Carousel */}
      <div style={{ 
        background: 'var(--background)', 
        padding: '4rem 0',
        borderTop: '1px solid rgba(68, 68, 68, 0.3)',
        borderBottom: '1px solid rgba(68, 68, 68, 0.3)'
      }}>
        <Magazines />
      </div>
      
      {/* Industry Blogs Section */}
      <IndustryBlogs />
      
      {/* Featured Posts Section */}
      <div style={{ 
        background: 'var(--background)', 
        padding: '4rem 0',
        borderTop: '1px solid rgba(68, 68, 68, 0.3)'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem' }}>
          <SliderOne />
        </div>
      </div>
      
      {/* Main Content Area - Two Column Layout */}
      <div style={{ 
        background: 'var(--background)', 
        padding: '4rem 0',
        borderTop: '1px solid rgba(68, 68, 68, 0.3)'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem' }}>
          <MarketNews />
        </div>
      </div>
      
      {/* Business Bulletin Section */}
      <div style={{ 
        background: 'var(--background)', 
        padding: '4rem 0',
        borderTop: '1px solid rgba(68, 68, 68, 0.3)'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem' }}>
          <BusinessBulletin />
        </div>
      </div>
      
      {/* Web Profiles Section */}
      <div style={{ 
        background: 'var(--background)', 
        padding: '4rem 0',
        borderTop: '1px solid rgba(68, 68, 68, 0.3)'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem' }}>
          <WebProfiles />
        </div>
      </div>
      
      {/* Master Talks Section */}
      <div style={{ 
        background: 'var(--background)', 
        padding: '4rem 0',
        borderTop: '1px solid rgba(68, 68, 68, 0.3)'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem' }}>
          <MasterTalks />
        </div>
      </div>
      
      {/* Partner Brands */}
      <div style={{ 
        background: 'var(--background)', 
        padding: '3rem 0',
        borderTop: '1px solid rgba(68, 68, 68, 0.3)'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem' }}>
          <LogoSlider />
        </div>
      </div>
      
      <FooterTwo />
      <ScrollToTop />
    </div>
  );
};

export default Home;
