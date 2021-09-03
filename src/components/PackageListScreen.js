import React from 'react';
import calendar from '../images/calendar.png';
import flightPoint from '../images/point.png';
const PackageListScreen = ({ packagesList }) => {
  return (
    <>
      {packagesList.map((packages, index) => {
        return (
          <div className='card AllPackagesList ' key={index}>
            <div className='card-body d-flex'>
              <div
                className='img-card'
                style={{ backgroundImage: `url(${packages.thumbnail})` }}
              >
                {packages.discount !== null ? (
                  <h2>
                    <span>&#9733;</span> {packages.discount['title']}
                  </h2>
                ) : (
                  <h2 className='d-none'>No Discount</h2>
                )}
              </div>
              <div className='content-block'>
                <h2>{packages.title}</h2>
                <p className='card-text'>{packages.description}</p>
                <ul>
                  <li>
                    <span>
                      <img src={calendar} alt={packages.durationText} />
                    </span>
                    {packages.durationText}
                  </li>
                  <li>
                    <span>
                      <img src={flightPoint} alt={packages.durationText} />
                    </span>
                    {packages.loyaltyPointText}
                  </li>
                </ul>
              </div>
            </div>{' '}
            <div className='card-footer-bottom d-flex justify-content-between align-content-center'>
              <div className='card-footer-left'>
                <h6>Includes:</h6>
                <ul className='list-inline'>
                  {packages.amenities.map((singleAmenities, index) => {
                    return (
                      <li className='d-inline-block' key={index}>
                        <img
                          src={singleAmenities.icon}
                          alt={singleAmenities.title}
                          width='24'
                          height='19'
                        />
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className='card-footer-right text-end'>
                <h6>Start From</h6>
                <span>&#x9f3; {packages.startingPrice.toLocaleString()}</span>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default PackageListScreen;
