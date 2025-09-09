import React from 'react'
import MapSection from './pageComponents/contactComponent/MapSection'
import ContactForm from './pageComponents/contactComponent/ContactForm'
// import NewsLetter from './pageComponents/homeCompnents/NewsLetter'


function Contact() {
  return (
    <div className='transition-all ease-linear duration-300'>
      <ContactForm />
      <MapSection />

      {/* <NewsLetter /> */}
    </div>
  )
}

export default Contact