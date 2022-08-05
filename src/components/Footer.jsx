import React from 'react';

const Footer = () => {
    return (
        <div>
            <footer className='d-flex flex-column'>
                <h2>&copy; Academlo 2022</h2>
                <div className='d-flex flex-row justify-content-center mb-2'>
                    <div className='d-flex align-items-center p-2 b-soft mx-2'>
                        <a className='' href='https://www.instagram.com/academlohq/' target='blank'>
                            <i className="fa-brands fa-instagram"></i>
                        </a>
                    </div>
                    <div className='d-flex align-items-center p-2 b-soft mx-2'>
                        <a className='' href='https://www.linkedin.com/school/academlo/' target='blank'>
                            <i className="fa-brands fa-linkedin"></i>
                        </a>
                    </div>
                    <div className='d-flex align-items-center p-2 b-soft mx-2'>
                        <a className='' href='https://www.youtube.com/c/academlo' target='blank'>
                            <i className="fa-brands fa-youtube"></i>
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;

