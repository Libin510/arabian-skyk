import React from 'react'

function Footer() {
    return (
        <div>
            {/* Contact Section */}
            <section className="py-16 px-8 bg-gradient-to-b from-[#01016F] to-[#0202D5] text-white">
                <div className="max-w-6xl mx-auto ">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                        CONTACT US FOR A<br />
                        CONSULTATION
                    </h2>
                    <p className="text-lg mb-8 text-blue-100">
                        Ready To Move Your Business Forward? Contact Us Today To Discuss Your Logistics Needs.
                    </p>
                    <button className="bg-white text-blue-700 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors inline-flex items-center">
                        Get In Touch
                        <span className="ml-2 bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                            →
                        </span>
                    </button>
                </div>
            </section>

            {/* Footer Section */}
            <footer className="bg-white py-12 px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                        {/* Left Side - Company Info */}
                        <div className="lg:col-span-4">
                            {/* Logo */}
                            <div className="flex items-center mb-8">
                                <div className=" text-white p-3 rounded-lg mr-4">
                                    <img
                                        src="./arabianskylogo.png"
                                        className="h-[57px] w-[210px]"
                                        alt=""
                                    />
                                </div>

                            </div>

                            {/* Social Media Icons - Top Right */}
                            <div className="flex justify-end space-x-6 mb-8 lg:absolute lg:top-4 lg:right-8">
                                <div className="flex items-center space-x-2">
                                    <div className="w-4 h-4 bg-gray-400 rounded-sm"></div>
                                    <span className="text-sm text-gray-600 font-medium">INSTAGRAM</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="w-4 h-4 bg-gray-400 rounded-sm"></div>
                                    <span className="text-sm text-gray-600 font-medium">LINKEDIN</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="w-4 h-4 bg-gray-400 rounded-sm"></div>
                                    <span className="text-sm text-gray-600 font-medium">FACEBOOK</span>
                                </div>
                            </div>

                            {/* Contact Information */}
                            <div className="space-y-6 text-sm">
                                <div>
                                    <p className="font-bold text-gray-800 mb-1">Mail</p>
                                    <p className="text-gray-600">arabianskytr@gmail.com</p>
                                </div>
                                <div>
                                    <p className="font-bold text-gray-800 mb-1">Phone</p>
                                    <p className="text-gray-600">+971 50 538 4463</p>
                                </div>
                                <div>
                                    <p className="font-bold text-gray-800 mb-1">Address</p>
                                    <p className="text-gray-600 leading-relaxed">
                                        Lorem Ipsum Dolor Sit<br />
                                        Amet Consectetur<br />
                                        Adipiscing Elit, Sed Do<br />
                                        Eiusmod Tempor Incididunt<br />
                                        Nunc Praesent Posuere
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Navigation */}
                        <div className="lg:col-span-8">
                            <div className="grid grid-cols-5 gap-8 mb-12">
                                <div className="text-center">
                                    <h4 className="font-bold text-gray-800 text-sm">Home</h4>
                                </div>
                                <div className="text-center">
                                    <h4 className="font-bold text-gray-800 text-sm">About Us</h4>
                                </div>
                                <div className="text-center">
                                    <h4 className="font-bold text-gray-800 text-sm">Services</h4>
                                </div>
                                <div className="text-center">
                                    <h4 className="font-bold text-gray-800 text-sm">Careers</h4>
                                </div>
                                <div className="text-center">
                                    <h4 className="font-bold text-gray-800 text-sm">Contact Us</h4>
                                </div>
                            </div>

                            {/* Newsletter Section */}
                            <div className="mb-8 mt-48">
                                <h3 className="text-xl font-bold text-gray-800 mb-4">
                                    Subscribe Our Newsletter
                                </h3>
                                <div className="relative max-w-md">
                                    <input
                                        type="email"
                                        placeholder="Enter Your Email"
                                        className="flex-1 w-full px-4 py-3 border border-gray-300 rounded-md text-sm pr-32"
                                    />
                                    <button
                                        className="absolute top-1/2 right-2 -translate-y-1/2 bg-[#01016F] text-white px-6 py-2 rounded-md text-sm font-semibold"
                                        style={{ height: '80%' }}
                                    >
                                        Get Started
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Section */}

                    <div className='mt-8'>
                        <h1 className="w-full text-center text-3xl lg:text-5xl font-bold text-[#1E1E1E] tracking-wider mb-4 lg:mb-0">
                            ARABIANSKYTRANSPORT
                        </h1>
                    </div>
                    <div className="border-t border-black pt-8 mt-8">
                        <div className="flex justify-between items-center text-xs text-gray-600  ">
                            <p>© COPYRIGHT 2024 - ARABIAN SKY TRANSPORT</p>
                            <p className="mt-0">TERMS AND CONDITIONS</p>
                        </div>

                    </div>
                </div>
            </footer>

        </div >
    )
}

export default Footer