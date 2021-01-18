import React from 'react';
import Loadinggif from '../images/loading.gif';

export default function Loading() {
  return (
    <div className="loading">
      <img src={Loadinggif} alt="Loading" width="100px" />
    </div>
  )
}
