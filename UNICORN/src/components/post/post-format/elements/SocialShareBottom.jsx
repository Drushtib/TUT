import { useEffect, useState } from "react";

const SocialShareBottom = () => {
  const [windowPath, setwindowPath] = useState(null);

  useEffect(() => {
    setwindowPath(window.location.href);
  }, []);

  return (
    <div className="post-shares m-t-xs-60">
      <div className="title">SHARE:</div>
      <ul className="social-share social-share__rectangular">
        <li>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${windowPath}`}
            className="btn bg-color-facebook"
          >
            <i className="fab fa-facebook-f" />
          </a>
        </li>
        <li>
          <a
            href={`https://www.linkedin.com/shareArticle?mini=true&url=${windowPath}`}
            className="btn bg-color-linkedin"
          >
            <i className="fab fa-linkedin-in" />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default SocialShareBottom;
