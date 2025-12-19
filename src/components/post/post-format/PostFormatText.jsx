import Image from "next/image";
// import WidgetAd from "../../widget/WidgetAd";
import WidgetInstagram from "../../widget/WidgetInstagram";
import WidgetNewsletter from "../../widget/WidgetNewsletter";
import WidgetPost from "../../widget/WidgetPost";
import WidgetSocialShare from "../../widget/WidgetSocialShare";
import { RichTextComponent } from "../RichTextComponent";
import PostComment from "./elements/PostComment";
import SocialShareBottom from "./elements/SocialShareBottom";
import SocialShareSide from "./elements/SocialShareSide";
import { PortableText } from "@portabletext/react";

const PostFormatText = ({ postData, allData }) => {
  return (
    <>
      <div className="post-single-wrapper p-t-xs-60">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <main className="site-main">
                <article className="post-details">
                  <div className="single-blog-wrapper">
                    <SocialShareSide />
                    <h2 className="axil-post-title hover-line">
                      {postData?.title}
                    </h2>
                  </div>

                  <img
                    className="mb-4 w-full h-auto object-cover"
                    src={postData?.featureImg || "/images/placeholder.png"}
                    alt={postData?.altText || postData?.title || "Post image"}
                    style={{
                      width: "100%",
                      height: "300px",
                      objectFit: "cover",
                      background: "#f2f2f2",
                      display: "block",
                    }}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/images/placeholder.png";
                    }}
                  />

                  <PortableText
                    value={postData?.body}
                    components={RichTextComponent}
                  />
                </article>
                <SocialShareBottom />
                <hr className="m-t-xs-50 m-b-xs-60" />

                <PostComment />
              </main>
            </div>
            <div className="col-lg-4">
              <div className="post-sidebar">
                <WidgetNewsletter />
                <WidgetSocialShare />
                <WidgetPost dataPost={allData} />
                {/* <WidgetInstagram /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostFormatText;
