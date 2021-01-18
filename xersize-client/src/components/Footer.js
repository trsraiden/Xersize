import React from 'react'

export default function Footer() {
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()

    return (
        <div className='footer robotoSection'>
            <hr></hr>
            <span>© Raiden Skala {currentYear}</span>
        </div>
    )
}