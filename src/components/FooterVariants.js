import React from 'react';
import Logo from './preComponent/Logo';

// Variant 1: Simple Footer with Social Icons
export function SimpleFooter() {
    const currentYear = new Date().getFullYear();
    
    const socialIcons = [
        { name: 'Facebook', icon: 'fa-brands fa-facebook', link: '#', color: 'hover:text-primary' },
        { name: 'Twitter', icon: 'fa-brands fa-twitter', link: '#', color: 'hover:text-blue-400' },
        { name: 'Instagram', icon: 'fa-brands fa-instagram', link: '#', color: 'hover:text-pink-500' },
        { name: 'LinkedIn', icon: 'fa-brands fa-linkedin', link: '#', color: 'hover:text-primary-hover' },
        { name: 'YouTube', icon: 'fa-brands fa-youtube', link: '#', color: 'hover:text-red-600' },
        { name: 'TikTok', icon: 'fa-brands fa-tiktok', link: '#', color: 'hover:text-black' }
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
                                <i className={`${social.icon} text-2xl text-gray-600 ${social.color} transition-all duration-300 group-hover:underline transform`}></i>
                            </a>
                        ))}
                    </div>
                </section>

                {/* Copyright Section */}
                <section className="footer flex justify-center bg-gray-100 py-4">
                    <p className="flex items-center gap-2 justify-center font-semibold text-xs md:text-md text-gray-500">
                        All Rights Reserved &nbsp; | <Logo textSize="sm" /> | &nbsp;© {currentYear}
                    </p>
                </section>
            </footer>
        </div>
    );
}

// Variant 2: Enhanced Footer with Multiple Sections
export function EnhancedFooter() {
    const currentYear = new Date().getFullYear();
    
    const socialIcons = [
        { name: 'Facebook', icon: 'fa-brands fa-facebook', link: '#', color: 'hover:text-primary' },
        { name: 'Twitter', icon: 'fa-brands fa-twitter', link: '#', color: 'hover:text-blue-400' },
        { name: 'Instagram', icon: 'fa-brands fa-instagram', link: '#', color: 'hover:text-pink-500' },
        { name: 'LinkedIn', icon: 'fa-brands fa-linkedin', link: '#', color: 'hover:text-primary-hover' },
        { name: 'YouTube', icon: 'fa-brands fa-youtube', link: '#', color: 'hover:text-red-600' },
        { name: 'TikTok', icon: 'fa-brands fa-tiktok', link: '#', color: 'hover:text-black' },
        { name: 'WhatsApp', icon: 'fa-brands fa-whatsapp', link: '#', color: 'hover:text-green-500' },
        { name: 'Telegram', icon: 'fa-brands fa-telegram', link: '#', color: 'hover:text-blue-500' }
    ];

    const quickLinks = [
        { name: 'Home', link: '/' },
        { name: 'Shop', link: '/shop' },
        { name: 'About', link: '/about' },
        { name: 'Contact', link: '/contact' }
    ];

    const supportLinks = [
        { name: 'Help Center', link: '/help' },
        { name: 'Shipping Info', link: '/shipping' },
        { name: 'Returns', link: '/returns' },
        { name: 'Size Guide', link: '/size-guide' }
    ];

    return (
        <div className='w-screen bg-gray-100'>
            <footer className="footer-area bg-gray-100 container mx-auto p-6">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8">
                    {/* Company Info */}
                    <div className="text-center md:text-left">
                        <div className="mb-4">
                            <Logo textSize="lg" />
                        </div>
                        <p className="text-gray-600 text-sm mb-4">
                            Your trusted partner for quality products and exceptional service.
                        </p>
                        <div className="flex justify-center md:justify-start gap-3">
                            {socialIcons.slice(0, 4).map((social, index) => (
                                <a
                                    key={index}
                                    href={social.link}
                                    className="social-icon-link group"
                                    aria-label={social.name}
                                >
                                    <i className={`${social.icon} text-xl text-gray-600 ${social.color} transition-all duration-300 group-hover:underline transform`}></i>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="text-center md:text-left">
                        <h4 className="font-semibold text-gray-800 mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            {quickLinks.map((link, index) => (
                                <li key={index}>
                                    <a href={link.link} className="text-gray-600 hover:text-gray-800 transition-colors duration-200 text-sm">
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div className="text-center md:text-left">
                        <h4 className="font-semibold text-gray-800 mb-4">Support</h4>
                        <ul className="space-y-2">
                            {supportLinks.map((link, index) => (
                                <li key={index}>
                                    <a href={link.link} className="text-gray-600 hover:text-gray-800 transition-colors duration-200 text-sm">
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Social Media Section */}
                <section className="social-section text-center py-6 border-t border-b border-gray-300">
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
                    <p className="flex items-center gap-2 justify-center font-semibold text-xs md:text-md text-gray-500">
                        All Rights Reserved &nbsp; | <Logo textSize="sm" /> | &nbsp;© {currentYear}
                    </p>
                </section>
            </footer>
        </div>
    );
}

// Variant 3: Minimal Footer
export function MinimalFooter() {
    const currentYear = new Date().getFullYear();
    
    const socialIcons = [
        { name: 'Facebook', icon: 'fa-brands fa-facebook', link: '#', color: 'hover:text-primary' },
        { name: 'Instagram', icon: 'fa-brands fa-instagram', link: '#', color: 'hover:text-pink-500' },
        { name: 'Twitter', icon: 'fa-brands fa-twitter', link: '#', color: 'hover:text-blue-400' }
    ];

    return (
        <div className='w-screen bg-gray-100'>
            <footer className="footer-area bg-gray-100 container mx-auto p-4">
                {/* Social Media Section */}
                <section className="social-section text-center py-4">
                    <h3 className="text-md font-semibold text-gray-700 mb-3">Follow Us</h3>
                    <div className="flex justify-center items-center gap-3">
                        {socialIcons.map((social, index) => (
                            <a
                                key={index}
                                href={social.link}
                                className="social-icon-link group"
                                aria-label={social.name}
                            >
                                <i className={`${social.icon} text-xl text-gray-600 ${social.color} transition-all duration-300 group-hover:scale-110 transform`}></i>
                            </a>
                        ))}
                    </div>
                </section>

                {/* Copyright Section */}
                <section className="footer flex justify-center bg-gray-100 py-2">
                    <p className="flex items-center gap-2 justify-center font-semibold text-xs text-gray-500">
                        All Rights Reserved &nbsp; | <Logo textSize="sm" /> | &nbsp;© {currentYear}
                    </p>
                </section>
            </footer>
        </div>
    );
}
