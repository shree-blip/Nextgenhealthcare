import bannerImg from '../../assets/nextgen-image/Blogbannerpageimg.png';

/**
 * BlogBanner — full-bleed hero banner that sits flush under the (sticky,
 * transparent-at-top) navbar. Centers the page title and lede over the
 * Blogbannerpageimg.png background.
 */

const BlogBanner = () => {
  return (
    <section
      aria-label="The NextGen Brief"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: 'clamp(360px, 46vw, 540px)',
        backgroundImage: `url(${bannerImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        isolation: 'isolate',
      }}
    >
      {/* Readability scrim so headline stays legible across image variants */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(10, 20, 38, 0.42) 0%, rgba(10, 20, 38, 0.28) 40%, rgba(10, 20, 38, 0.55) 100%)',
          zIndex: 0,
        }}
      />

      <div
        className="container-shell"
        style={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          padding: 'clamp(96px, 14vw, 160px) 0 clamp(56px, 8vw, 96px)',
          color: '#ffffff',
        }}
      >
        <span
          style={{
            display: 'inline-block',
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: 'rgba(255, 255, 255, 0.9)',
            marginBottom: 18,
            padding: '6px 14px',
            border: '1px solid rgba(255, 255, 255, 0.4)',
            borderRadius: 999,
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            background: 'rgba(255, 255, 255, 0.08)',
          }}
        >
          The NextGen Brief
        </span>
        <h1
          style={{
            margin: 0,
            fontSize: 'clamp(34px, 5.4vw, 60px)',
            lineHeight: 1.05,
            letterSpacing: '-0.025em',
            fontWeight: 800,
            color: '#ffffff',
            textShadow: '0 2px 18px rgba(0, 0, 0, 0.35)',
          }}
        >
          Healthcare marketing, decoded.
        </h1>
        <p
          style={{
            margin: '18px auto 0',
            fontSize: 'clamp(15px, 1.3vw, 18px)',
            lineHeight: 1.6,
            color: 'rgba(255, 255, 255, 0.92)',
            maxWidth: '58ch',
            textShadow: '0 1px 10px rgba(0, 0, 0, 0.35)',
          }}
        >
          Field-tested patient acquisition tactics, HIPAA updates, and clinic growth
          stories — published as our team learns what's working.
        </p>
      </div>
    </section>
  );
};

export default BlogBanner;
