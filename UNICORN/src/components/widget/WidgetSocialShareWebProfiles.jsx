import SocialLink from '../../data/social/SocialLink.json';


const WidgetSocialShareWebProfiles = () => {

  return (
    <div className="sidebar-social-share-widget m-b-xs-40">
      <ul className="social-share-list-wrapper">
        <li className="social-share-list text-center perfect-square">
          <a href={SocialLink.fb.url} className="list-inner bg-color-facebook">
            <i className={SocialLink.fb.icon} />
          </a>
        </li>
        {/* End of .social-share-list */}
        <li className="social-share-list text-center perfect-square">
          <a href={SocialLink.yt.url} className="list-inner bg-color-youtube">
            <i className={SocialLink.yt.icon} />
           </a>
        </li>
        {/* End of .social-share-list */}
        <li className="social-share-list text-center perfect-square">
          <a href={SocialLink.linked.url} className="list-inner bg-color-linkedin">
            <i className={SocialLink.linked.icon} />
           </a>
        </li>
        {/* End of .social-share-list */}
        <li className="social-share-list text-center perfect-square">
          <a href={SocialLink.discord.url} className="list-inner bg-color-vimeo">
            <i className={SocialLink.discord.icon} />
           </a>
        </li>
        {/* End of .social-share-list */}
        <li className="social-share-list text-center perfect-square">
          <a href={SocialLink.slack.url} className="list-inner bg-color-twitch">
            <i className={SocialLink.slack.icon} />
           </a>
        </li>
        {/* End of .social-share-list */}
        <li className="social-share-list text-center perfect-square">
          <a href={SocialLink.instagram.url} className="list-inner bg-color-instagram">
            <i className={SocialLink.instagram.icon} />
           </a>
        </li>
        {/* End of .social-share-list */}
      </ul>
      {/* End of .social-share-list-wrapper */}
    </div>
  );
};

export default WidgetSocialShareWebProfiles;

