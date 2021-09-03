import React, { useEffect, useState } from 'react';
import PackageListScreen from '../components/PackageListScreen';
import Paginate from '../components/Paginate';

const HomePage = () => {
  const [AllPackagesList, setAllPackageList] = useState([]);
  const [countPackages, setCountPackages] = useState();
  const [GetToken, setGetToken] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(4);
  const [ActivePage, setActivePage] = useState(false);

  useEffect(() => {
    const graphqlQuery = `
    {
      getPackages(
        pagination: {
          skip: 0
          limit: 10
        }
      )
      {
        statusCode
        message
        result {
          count
          packages {
            uid
            title
            startingPrice
            thumbnail
            amenities {
              title
              icon
            }
            discount {
              title
              amount
            }
            durationText
            loyaltyPointText
            description
          }
        }
      }
    }`;

    const tokenQuery = `
    mutation {
      loginClient (
        auth: {
          email: "devteam@saimonglobal.com"
          deviceUuid: "7026a238-d078-48b5-862b-c3c7d21d8712"
        }
        password: "12345678"
      )
      {
        message
        statusCode
        result {
          token
          refreshToken
          expiresAt
        }
      }
    }`;

    fetch(`https://b2c-api.flightlocal.com/graphql`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: tokenQuery }),
    })
      .then((res) => res.json())
      .then((data) => {
        setGetToken(data.data.loginClient.result.token);
      })
      .catch((err) => {
        console.log(err);
      });
    fetch(`https://b2c-api.flightlocal.com/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + GetToken,
      },
      body: JSON.stringify({ query: graphqlQuery }),
    })
      .then((res) => res.json())
      .then((data) => {
        setAllPackageList(data.data.getPackages.result.packages);
        setCountPackages(data.data.getPackages.result.count);
    // console.log(data.data)
     /* console.log(AllPackagesList) */
      })
      .catch((err) => {
        console.log(err);
      });
  }, [GetToken]);
  
  const indexOfLastPackage = currentPage * postPerPage;
  const indexOfFirstPackage = indexOfLastPackage - postPerPage;
  const currentPackage = AllPackagesList.slice(
    indexOfFirstPackage,
    indexOfLastPackage
  );

  const paginate = (pageNo) => {
    setCurrentPage(pageNo);
    ActivePage(true);
  };
  return (
    <div className='home'>
      <nav className='navbar navbar-expand-lg navbar-light'>
        <div className='container-fluid '>
          <p className='navbar-brand '>
            <span className='bold'>FLIGHT</span>LOCAL
          </p>
        </div>
      </nav>
      <main>
        <h1 className='totalPackage '>
          {countPackages}
          {countPackages >= 1 ? 'Available Holidays' : 'Available Holiday'}
        </h1>

        <PackageListScreen packagesList={currentPackage}></PackageListScreen>
        <Paginate
          postPerPage={postPerPage}
          totalPost={AllPackagesList.length}
          paginate={paginate}
          ActivePage={ActivePage}
        ></Paginate>
      </main>
    </div>
  );
};

export default HomePage;
