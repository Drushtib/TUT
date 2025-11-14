import { useRouter } from "next/router";
import { client } from "../../client";
import Loader from "../../components/common/Loader";
import ErrorFallback from "../../components/common/ErrorFallback";
import VideoDetailLayout from "../../components/post/post-format/VideoDetailLayout";
import HeadMetaDynamic from "../../components/elements/HeadMetaDynamic";
import HeaderOne from "../../components/header/HeaderOne";
import FooterTwo from "../../components/footer/FooterTwo";
import { useVideoBySlug, useAllVideos } from "../../hooks/useVideos";
import { getVideoBySlugQuery, getAllVideosQuery, getAllVideoSlugsQuery } from "../../lib/sanity/queries/videos";

const VideoDetail = ({ initialVideo, initialAllVideos }) => {
  const router = useRouter();
  const { slug } = router.query;

  const {
    data: video,
    isLoading: videoLoading,
    error: videoError,
  } = useVideoBySlug(slug, {
    initialData: initialVideo,
  });

  const {
    data: allVideos,
    isLoading: allVideosLoading,
    error: allVideosError,
  } = useAllVideos({
    initialData: initialAllVideos,
  });

  if (videoLoading || allVideosLoading) return <Loader />;
  if (videoError || allVideosError) return <ErrorFallback error={videoError || allVideosError} />;

  if (!video) return <div>Video not found</div>;

  return (
    <>
      <HeadMetaDynamic metaData={allVideos} />
      <HeaderOne />
      <VideoDetailLayout videoData={video} allVideos={allVideos} />
      <FooterTwo />
    </>
  );
};

export async function getStaticPaths() {
  const query = getAllVideoSlugsQuery();
  const slugs = await client.fetch(query);

  return {
    paths: slugs
      .map((video) => video?.slug)
      .filter(Boolean)
      .map((slug) => ({ params: { slug } })),
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const videoQuery = getVideoBySlugQuery();
  const allVideosQuery = getAllVideosQuery();

  const [video, allVideos] = await Promise.all([
    client.fetch(videoQuery, { slug: params.slug }),
    client.fetch(allVideosQuery),
  ]);

  return {
    props: {
      initialVideo: video,
      initialAllVideos: allVideos,
    },
    revalidate: 60,
  };
}

export default VideoDetail;
