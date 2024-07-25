import React from 'react'
import './Pagination.css'

export default function Paginations({count, pagination, handleDecrease, handleIncrease}) {
    
  return (
    <div className="pagination">
        {/* No 'previous' button at the beginning */}
        {pagination.offset === 0 ? 
        <></>
        :
        <button onClick={() => {handleDecrease(count)}}>&lt;</button>
        }
                
        <div>{pagination.offset + 1} - {pagination.offset + 9} / {pagination.total_count}</div>
                
        
        {/* No 'next' button at the end */}
        {pagination.offset > pagination.total_count - 9 ? 
        <></>
        :
        <button onClick={() => {handleIncrease(count)}}>&gt;</button>
        }
    </div>
  )
}
