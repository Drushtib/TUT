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
      <MagazineHero />
      <LogoSlider />
      <SliderOne />
      <Magazines />
      <WebProfiles />
      <MarketNews />
      <BusinessBulletin />
      <MasterTalks />
      <FooterTwo />
      <ScrollToTop />
    </div>
  );
};

export default Home;
