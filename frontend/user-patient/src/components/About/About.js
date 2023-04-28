import './about.css'
import rupen from './images/rupen.jpg';
import parul from './images/parul.jpg';
import sakshi from './images/sakshi.jpg';
import aa from './images/aarani.jpg';
import yasha from './images/yasha.jpeg';

import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

import { Box, Link, Stack } from '@mui/material';
import Header from '../Bar/Header/Header';
import Footer from '../Bar/Footer';
// import { Stack } from 'react-bootstrap';

export default function About() {
  return (
    
    <div id='model3'>
        <Header></Header>
        <h1 className='model-title'>Team 8 Healthcare Application Development</h1>
        <div className="divider"></div>
        <div className="members">
          <div className="member">
            <img width={200} height={200} src={parul} alt="Parul Ghotikar"/>
            <div className="description">
                <h1>Parul Ghotikar</h1>
                <h2>Full Stack Developer</h2>
                <div className="social-media">
                    <Link href='https://www.linkedin.com/in/parul1210' color='inherit'>
                  <LinkedInIcon />
                  </Link>
                  <Link href='https://github.com/gaparul' color='inherit'>
                  <GitHubIcon />
                  </Link>
                </div>
            </div>
          </div>
          <div className="member">
            <img width={200} height={200} src={rupen} alt='Rupen Kumar Rakholiya'/>
            <div className="description">
                <h1>Rupen Rakholiya</h1>
                <h2>Full Stack Developer</h2>
                <div className="social-media">
                <Link href='https://www.linkedin.com/in/rupen-rakholiya-89a8a316a' color='inherit'>
                  <LinkedInIcon />
                  </Link>
                  <Link href='https://github.com/Rupen-project' color='inherit'>
                  <GitHubIcon />
                  </Link>
                </div>
            </div>
          </div>
          <div className="member">
            <img width={200} height={200} src={sakshi} alt="Sakshi Soni"/>
            <div className="description">
                <h1>Sakshi Soni</h1>
                <h2>Full Stack Developer</h2>
                <div className="social-media">
                <Link href='https://www.linkedin.com/' color='inherit'>
                  <LinkedInIcon />
                  </Link>
                  <Link href='https://github.com/sakshi-s0ni' color='inherit'>
                  <GitHubIcon />
                  </Link>
                </div>
            </div>
          </div>
        </div>
        <div className="members">
          <div className="member">
            <img width={200} height={200} src={aa} alt="Aakanksha Rani"/>
            <div className="description">
                <h1>Aakanksha Rani</h1>
                <h2>Full Stack Developer</h2>
                <div className="social-media">
                    <Link href='https://www.linkedin.com/in/aakanksha-rani-00772b15b' color='inherit'>
                  <LinkedInIcon />
                  </Link>
                  <Link href='https://github.com/Srivastava-Rani-Aakanksha' color='inherit'>
                  <GitHubIcon />
                  </Link>
                </div>
            </div>
          </div>
          <div className="member">
            <img width={200} height={200} src={yasha} alt='Rupen Kumar Rakholiya'/>
            <div className="description">
                <h1>Yasha Dayal</h1>
                <h2>Full Stack Developer</h2>
                <div className="social-media">
                <Link href='https://in.linkedin.com/in/yasha-dayal-274111135' color='inherit'>
                  <LinkedInIcon />
                  </Link>
                  <Link href='https://github.com/yashadayal' color='inherit'>
                  <GitHubIcon />
                  </Link>
                </div>
            </div>
          </div>
        </div>
        <Footer></Footer>
    </div>
  );
}