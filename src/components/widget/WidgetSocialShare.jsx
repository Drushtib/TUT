import SocialLink from '../../data/social/SocialLink.json';


const WidgetSocialShare = () => {

  return (
    <div className="sidebar-social-share-widget m-b-xs-40" style={{ background: 'transparent' }}>
      <ul className="social-share-list-wrapper" style={{ background: 'transparent' }}>
        <li className="social-share-list text-center perfect-square">
          <a href={SocialLink.fb.url} className="list-inner bg-color-facebook" style={{ backgroundColor: '#1877F2' }}>
            <i className={SocialLink.fb.icon} style={{ color: '#ffffff', fontSize: '3.6rem' }} />
            <div className="counts">{SocialLink.fb.follower}</div>
            <div className="title">Fans</div>
          </a>
        </li>
        {/* End of .social-share-list */}
        <li className="social-share-list text-center perfect-square">
          <a href={SocialLink.twitter.url} className="list-inner bg-color-twitter" style={{ backgroundColor: '#000000' }}>
            <i className={SocialLink.twitter.icon} style={{ color: '#ffffff', fontSize: '3.6rem' }} />
            <div className="counts">{SocialLink.twitter.follower}</div>
            <div className="title">Followers</div>
           </a>
        </li>
        {/* End of .social-share-list */}
        <li className="social-share-list text-center perfect-square">
          <a href={SocialLink.yt.url} className="list-inner bg-color-youtube" style={{ backgroundColor: '#FF0000' }}>
            <i className={SocialLink.yt.icon} style={{ color: '#ffffff', fontSize: '3.6rem' }} />
            <div className="counts">{SocialLink.yt.follower}</div>
            <div className="title">Subscribers</div>
           </a>
        </li>
        {/* End of .social-share-list */}
        <li className="social-share-list text-center perfect-square">
          <a href={SocialLink.linked.url} className="list-inner bg-color-linkedin" style={{ backgroundColor: '#0077B5' }}>
            <i className={SocialLink.linked.icon} style={{ color: '#ffffff', fontSize: '3.6rem' }} />
            <div className="counts">{SocialLink.linked.follower}</div>
            <div className="title">Connections</div>
           </a>
        </li>
        {/* End of .social-share-list */}
        <li className="social-share-list text-center perfect-square">
          <a href={SocialLink.discord.url} className="list-inner bg-color-discord" style={{ backgroundColor: '#5865F2' }}>
            <i className={SocialLink.discord.icon} style={{ color: '#ffffff', fontSize: '3.6rem' }} />
            <div className="counts">{SocialLink.discord.follower}</div>
            <div className="title">Connections</div>
           </a>
        </li>
        {/* End of .social-share-list */}
        <li className="social-share-list text-center perfect-square">
          <a href={SocialLink.pinterest.url} className="list-inner bg-color-pinterest" style={{ backgroundColor: '#BD081C' }}>
            <i className={SocialLink.pinterest.icon} style={{ color: '#ffffff', fontSize: '3.6rem' }} />
            <div className="counts">{SocialLink.pinterest.follower}</div>
            <div className="title">Followers</div>
           </a>
        </li>
        {/* End of .social-share-list */}
        <li className="social-share-list text-center perfect-square">
          <a href={SocialLink.slack.url} className="list-inner bg-color-slack" style={{ backgroundColor: '#4A154B' }}>
            <i className={SocialLink.slack.icon} style={{ color: '#ffffff', fontSize: '3.6rem' }} />
            <div className="counts">{SocialLink.slack.follower}</div>
            <div className="title">Followers</div>
           </a>
        </li>
        {/* End of .social-share-list */}
        <li className="social-share-list text-center perfect-square">
          <a href={SocialLink.instagram.icon} className="list-inner bg-color-instagram" style={{ backgroundColor: '#E4405F' }}>
            <i className={SocialLink.instagram.icon} style={{ color: '#ffffff', fontSize: '3.6rem' }} />
            <div className="counts">{SocialLink.instagram.follower}</div>
            <div className="title">Followers</div>
           </a>
        </li>
        {/* End of .social-share-list */}
      </ul>
      {/* End of .social-share-list-wrapper */}
    </div>
  );
};

export default WidgetSocialShare;
