import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png'
import { FaFacebook, FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <div className="bg-secondary ">
         <div className="w-11/12 border-b mx-auto py-16 md:gap-6 grid md:grid-cols-2 lg:grid-cols-3">
            <div>
                <img className='w-16' src={logo} alt="" />
                <h1 className='text-2xl font-bold'>Petopia</h1>
                <p className='text-xs pt-2 md:text-sm'>Welcome to Petopia, your trusted companion in finding forever homes for lovable pets. Explore a world of furry friends across diverse categories and take the first step toward adoption. Join us in supporting meaningful causes through our donation campaigns, making a difference in the lives of animals in need. Together, let’s create a brighter future for every pet. ❤️</p>
            </div>
            <div className='flex flex-col justify-center items-start md:items-center w-full'>
                <div>
                <h2 className='font-semibold  pt-5'>Useful Links</h2>
                 <div className='flex flex-col space-y-1 pt-1'>
                 <Link to='/' className='hover:text-primary duration-200 text-xs md:text-sm'>Home</Link>
                <Link to='/pet-listing' className='hover:text-primary duration-200 text-xs md:text-sm'>Pet Listing</Link>
                <Link to='/donation-campaigns' className='hover:text-primary duration-200 text-xs md:text-sm'>Donation Campaigns</Link>
                 </div>
                </div>
            </div>
            <div className='flex flex-col  items-start lg:items-end justify-center w-full'> 
                <div>
                <h2 className='font-semibold pt-5'>Social</h2>
                 <div className='flex flex-col space-y-1 pt-1'>
                  <a target='_blank' href="https://www.linkedin.com/in/md-imran-sorker21/" className='text-sm md:text-base flex items-center gap-1 hover:text-primary duration-200'><FaLinkedin/> Linkedin</a>
                  <a target='_blank' href="https://github.com/imran21-dev" className='text-sm md:text-base flex items-center gap-1 hover:text-primary duration-200'><FaGithub/> GitHub</a>
                  <a target='_blank' href="https://www.facebook.com/mdimran.parves.9" className='text-sm md:text-base flex items-center gap-1 hover:text-primary duration-200'><FaFacebook/> Facebook</a>
                 </div>
                </div>
            </div>
         </div>
         <h2 className='text-center text-xs md:text-sm pt-5 pb-10'>Copyright © {new Date().getFullYear()} - All right reserved by Petopia</h2>
        </div>
    );
};

export default Footer;