import { Link } from 'react-router-dom';
import { FaEnvelope, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';

function Footer(props) {
    return(
    <div className="footer" >
        <div className="container">
            <div className="row justify-content-center">             
                <div className="col-12 offset-0 col-md-2 col-lg-3">
                    <h5>Links</h5>
                    <ul className="list-unstyled">
                        <li><Link to='/' className='icon-white'>Home</Link></li>
                    </ul>
                </div>
                <div className="col-12 col-md-3 col-lg-3">
                    <h5>Our Address</h5>
                    <address>
		              111, Sommerset Road<br />
		              Triple One Tower<br />
		              Singapore 111333<br />
		              <FaEnvelope /> <a href="mailto:cs@dailygrocery.com" className='white'>
                      cso@products.com</a>
                    </address>
                </div>

                <div className="col-12 col-md-12 col-lg-3">
                    <div className="text-center icon-white'">
                        <h5>Follow Us</h5>
                        <a className="btn" href="http://www.facebook.com/profile.php?id="><FaFacebook className='icon-white'/></a>
                        <a className="btn" href="http://www.linkedin.com/"><FaLinkedin className='icon-white'/></a>
                        <a className="btn" href="http://twitter.com/"><FaTwitter className='icon-white'/></a>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center">             
                <div className="col-auto">
                    <p>© Copyright 2023</p>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Footer;