import HeadMeta from "../components/elements/HeadMeta";
import FooterTwo from "../components/footer/FooterTwo";
import HeaderOne from "../components/header/HeaderOne";
import MasterTalks from "../components/post/MasterTalks";
import LogoSlider from "../components/post/LogoSlider";
import Magazines from "../components/post/Magazines";
import BusinessBulletin from "../components/post/BusinessBulletin";
import WebProfiles from "../components/post/WebProfiles";
import MarketNews from "../components/post/MarketNews";
import MagazineHero from "../components/hero/MagazineHero";
import IndustryBlogs from "../components/post/IndustryBlogs";
import IndustryPosts from "../components/post/IndustryPosts";
import CompactBlogs from "../components/post/CompactBlogs";
import CompactArticles from "../components/post/CompactArticles";
import OurPartners from "../components/post/OurPartners";
import CountingSection from "../components/common/CountingSection";
import ScrollToTop from "../components/common/ScrollToTop";
import AboutBanner from "../components/post/AboutBanner";
import { commonStyles } from "../lib/utils/theme";
import Link from 'next/link';

const Home = () => {

  console.log("Home component rendering");

  

  return (

    <div suppressHydrationWarning className="home-page-white" style={{ 

      background: '#f5f5f5', 

      color: '#171717',

      minHeight: '100vh'

    }}>

      <HeadMeta

        metaTitle="The Unicorn Times"

        metaDesc="Defining the future of global excellence"

      />

      <HeaderOne />

      

      {/* Hero Section - Full Width */}

      <div style={{ padding: '0 0 3rem', margin: '0', background: 'transparent' }}>

        <MagazineHero />

      </div>

      

      {/* Compact Blogs Section */}

      <CompactBlogs />

      {/* About Banner Section */}
      <AboutBanner />
      
      {/* Articles Section */}
      <CompactArticles />


      {/* Latest Digital Editions - Horizontal Carousel */}

      <div style={{ 

        background: '#f5f5f5', 

        padding: '4rem 0'

      }}>

        <Magazines />

      </div>

      

      {/* Our Partners Section */}

      {/* <OurPartners /> */}

      

      {/* Industry Blogs Section */}

      {/* <IndustryBlogs /> */}

      

      {/* Industry Posts Section */}
{/* 
      <IndustryPosts /> */}

      

      {/* Main Content Area - Two Column Layout */}

      <div style={{ 

        background: '#f5f5f5', 

        padding: '4rem 0 6rem 0'

      }}>

        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem' }}>

          <MarketNews />

        </div>

      </div>

      

      {/* Business Bulletin Section */}

      <div style={{ 

        background: '#f5f5f5', 

        padding: '4rem 0'

      }}>

        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem' }}>

          <BusinessBulletin />

        </div>

      </div>

      

      {/* Counting Section */}

      <CountingSection />

      

      {/* Web Profiles Section */}

     {/* <div style={{ 

        background: '#ffffff', 

        padding: '4rem 0'

      }}>

        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem' }}>

          <WebProfiles />

        </div>

      </div> */}

      

      {/* Master Talks Section */}

      <div style={{ 

        background: '#f5f5f5', 

        padding: '4rem 0',

        borderTop: 'none'

      }}>

        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem' }}>

          <MasterTalks />

        </div>

      </div>

      

      {/* Partner Brands */}

      {/* <div style={{ 

        background: '#ffffff', 

        padding: '4rem 0',

        borderTop: 'none'

      }}>

        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem' }}>

          <LogoSlider />

        </div>

      </div> */}

      

      <FooterTwo />

      <ScrollToTop />

    </div>

  );

};



export default Home;

