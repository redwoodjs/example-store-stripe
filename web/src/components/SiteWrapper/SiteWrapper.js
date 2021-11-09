const SiteWrapper = ({ children, className }) => (
  <div className={`site-wrapper ${className}`}>
    <div className="site-wrapper__content">{children}</div>
  </div>
)

export default SiteWrapper
