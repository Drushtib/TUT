import HeadMeta from "../../components/elements/HeadMeta";
import HeaderOne from "../../components/header/HeaderOne";
import FooterTwo from "../../components/footer/FooterTwo";
import ScrollToTop from "../../components/common/ScrollToTop";
import IndustryCategories from "../../components/post/IndustryCategories";

const IndustriesIndex = () => {
  return (
    <>
      <style jsx global>{`
        body {
          background-color: #ffffff !important;
        }
        html {
          background-color: #ffffff !important;
        }
        #__next {
          background-color: #ffffff !important;
        }
      `}</style>
      
      <div style={{ background: "#ffffff", color: "#171717", minHeight: "100vh" }}>
        <HeadMeta metaTitle="Industries" />
        <HeaderOne />
        <IndustryCategories />
        <FooterTwo />
        <ScrollToTop />
      </div>
    </>
  );
};

export default IndustriesIndex;
