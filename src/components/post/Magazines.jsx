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
    <div style={{ background: '#ffffff' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem' }}>
        <h2 style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 800,
          color: '#171717',
          marginBottom: '3rem',
          textAlign: 'center',
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}>
          Latest Digital Editions
        </h2>
        <div className="grid-wrapper" style={{ marginTop: '2rem' }}>
        <Splide
          aria-label="Latest Magazines"
          options={{
            type: "loop",
            arrows: false,
            breakpoints: {
              2000: {
                perPage: 3,
              },
              1200: {
                perPage: 3,
              },
              900: {
                perPage: 2,
              },
              480: {
                perPage: 1,
              },
            },
            autoplay: true,
            interval: 3000,
          }}
        >
          {data.map((post, index) => (
            <SplideSlide key={index}>
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
