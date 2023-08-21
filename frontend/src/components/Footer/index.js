import "./Footer.css";

function Footer() {
    return (
        <div className="footer">
            <span className="foot-s1">
                © 2023 ChairDevotee
                <span className="bullet">·</span>
                <a className="footer-link" href="https://www.github.com/igamus">Visit My Github</a>
                <span className="bullet">·</span>
                <a className="footer-link" href="https://www.linkedin.com/in/isaac-gamus/">Visit My LinkedIn</a>
            </span>
            <span className="foot-s2">
                <span className="foot-s2s1">
                    <i className="fa-solid fa-globe" style={{marginRight:"10px"}} />English (US)
                </span>
                <span className="foot-s2s2">$ USD</span>
                <span className="foot-s2s3">Support & Resources</span>
            </span>
        </div>
    );
};

export default Footer;
