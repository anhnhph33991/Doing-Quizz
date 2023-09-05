import React from 'react'
import { NavDropdown } from 'react-bootstrap';

export const Language = () => {
    return (
        <>
            <NavDropdown title="Việt Nam" id='basic-nav-dropdown' className='languages'>
                <NavDropdown.Item>English</NavDropdown.Item>
                <NavDropdown.Item>Việt Nam</NavDropdown.Item>
            </NavDropdown>
        </>
    )
}
