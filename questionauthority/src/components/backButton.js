import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

export default function BackButton(props) {
    return <Link to={props.pathBack} className='btn back-btn primary-btn-color'>
            <img className='page-btn-img' alt='Back' title='Back' src={require('../img/back.svg')} />
            </Link>;
}