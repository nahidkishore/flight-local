import React from 'react';

const Paginate = ({ postPerPage, totalPost, paginate, ActivePage }) => {
  const totalPageNumber = [];
  for (let i = 1; i <= Math.ceil(totalPost / postPerPage); i++) {
    totalPageNumber.push(i);
  }

  return (
    <nav aria-label='Page navigation example'>
      <ul className='pagination justify-content-center'>
        {totalPageNumber.map((pageNumber) => {
          return (
            <li
              onClick={() => paginate(pageNumber)}
              key={pageNumber}
              className='page-item'
            >
              <a className={`page-link ${ActivePage ? 'active' : ''}`} href='/'>
                {pageNumber}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Paginate;
