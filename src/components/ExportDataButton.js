import React from 'react'

const ExportDataButton = ( {exportData} ) => {
  return (
    <div className='mt2'>
      <button
        className='white b pv2 ph3 bg-gray hover-bg-mid-gray bn br-pill'
        type="button"
        onClick={exportData}
      >Export Data</button>
    </div>
  );
}

export default ExportDataButton;