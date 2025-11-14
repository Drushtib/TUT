import SectionTitle from "../elements/SectionTitle";
import { useMagazines } from "../../hooks/useMagazines";
import Loader from "../common/Loader";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css/core";
import "@splidejs/react-splide/css";
import "@splidejs/react-splide/css/skyblue";
import "@splidejs/react-splide/css/sea-green";
import PostLayoutformag_Home from "./layout/PostLayoutformag_Home";
import { QUERY_LIMITS } from "../../config/constants";
import { ROUTES } from "../../config/routes";
import ErrorFallback from "../common/ErrorFallback";

const Magazines = () => {
  const { data, isLoading, error } = useMagazines(QUERY_LIMITS.LATEST_MAGAZINES);

  if (isLoading) return <Loader />;
  if (error) return <ErrorFallback error={error} />;

  if (!data || data.length === 0) return null;

  return (
    <div className="related-post mt-4">
      <div className="container">
        <SectionTitle
          btnUrl={ROUTES.MAGAZINES}
          title={"Latest Magazines"}
          btnText="View All Magazines"
          pClass="mb-0"
        />
        <div className="grid-wrapper row">
          <Splide
            aria-label="My Favorite Images"
            options={{
              type: "loop",
              arrows: false,
              breakpoints: {
                2000: {
                  perPage: 3,
                },
                1200: {
                  perPage: 3, // 3 slides per page on screens up to 1200px wide
                },
                900: {
                  perPage: 2, // 2 slides per page on screens up to 768px wide
                },
                480: {
                  perPage: 1, // 1 slide per page on screens up to 480px wide
                },
              },
              autoplay: true,
              interval: 3000, // Interval in milliseconds
            }}
          >
            {data.map((post, index) => (
              <SplideSlide key={index}>
                {/* <PostLayoutformag data={post} /> */}
                <PostLayoutformag_Home data={post} />
              </SplideSlide>
            ))}
          </Splide>
        </div>
      </div>
    </div>
  );
};

export default Magazines;
