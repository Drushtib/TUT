import HeadMeta from "../../components/elements/HeadMeta";
import HeaderOne from "../../components/header/HeaderOne";
import FooterTwo from "../../components/footer/FooterTwo";
import ScrollToTop from "../../components/common/ScrollToTop";
import IndustryCategories from "../../components/post/IndustryCategories";

const IndustriesIndex = () => {
  return (
    <div style={{ background: "#000", color: "#fff", minHeight: "100vh" }}>
      <HeadMeta metaTitle="Industries" />
      <HeaderOne />
      <IndustryCategories />
      <FooterTwo />
      <ScrollToTop />
    </div>
  );
};

export default IndustriesIndex;
