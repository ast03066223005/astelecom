import React from 'react'
import Logo from './../components/Logo'
import { getSocialLinks } from '../config/footerConfig'

function Footer() {
    const currentYear = new Date().getFullYear();
    const socialLinks = getSocialLinks();
    
    const socialIcons = [
        { name: 'Facebook', icon: 'fa-brands fa-facebook', link: socialLinks.facebook, color: 'hover:text-blue-700' },
        { name: 'Twitter', icon: 'fa-brands fa-twitter', link: socialLinks.twitter, color: 'hover:text-blue-400' },
        { name: 'Instagram', icon: 'fa-brands fa-instagram', link: socialLinks.instagram, color: 'hover:text-pink-500' },
        { name: 'LinkedIn', icon: 'fa-brands fa-linkedin', link: socialLinks.linkedin, color: 'hover:text-sky-600' },
        { name: 'YouTube', icon: 'fa-brands fa-youtube', link: socialLinks.youtube, color: 'hover:text-red-600' },
        { name: 'TikTok', icon: 'fa-brands fa-tiktok', link: socialLinks.tiktok, color: 'hover:text-black' },
        { name: 'WhatsApp', icon: 'fa-brands fa-whatsapp', link: socialLinks.whatsapp, color: 'hover:text-green-500' },
        { name: 'Telegram', icon: 'fa-brands fa-telegram', link: socialLinks.telegram, color: 'hover:text-blue-500' }
    ];

    return (
        <div className='w-screen bg-gray-100'>
            <footer className="footer-area bg-gray-100 container mx-auto p-6">
                {/* Social Media Section */}
                <section className="social-section text-center py-6 border-b border-gray-300">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Follow Us</h3>
                    <div className="flex justify-center items-center gap-4 flex-wrap">
                        {socialIcons.map((social, index) => (
                            <a
                                key={index}
                                href={social.link}
                                className="social-icon-link group"
                                aria-label={social.name}
                            >
                                <i className={`${social.icon} text-2xl text-gray-600 ${social.color} transition-all duration-300 group-hover:scale-110 transform`}></i>
                            </a>
                        ))}
                    </div>
                </section>

                {/* Copyright Section */}
                <section className="footer flex justify-center bg-gray-100 py-4">
                    <p className="flex items-center gap-2 justify-center font-semibold text-xs md:text-lg text-gray-500">
                        All Rights Reserved &nbsp; | <Logo textSize="sm" /> | &nbsp;© {currentYear}
                    </p>
                </section>
            </footer>
        </div>
    )
}

export default Footer