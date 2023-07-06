import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { GET_PEOPLE } from './Data';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function TablePeople() {
  const [searchBirth, setSearchBirth] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [peoplePerPage] = useState(5);

  const { loading, error, data } = useQuery(GET_PEOPLE);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  

  const handleInput = (event) => {
    setSearchBirth(event.target.value);
  };

  const handleSearch = () => {
    console.log(searchBirth);
  };


  const filterPerson = data.people.filter((person) => {
    return person.dateOfBirth.includes(searchBirth);
  });

  const indexOfLastPerson = currentPage * peoplePerPage;
  const indexOfFirstPerson = indexOfLastPerson - peoplePerPage;
  const currentPeople = filterPerson.slice(indexOfFirstPerson, indexOfLastPerson);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
  <Container className='table'>
     <Row className="col-md-10 mt-5 mx-auto justify-content-md-center">
        <Col className = "mt-5" sm={10}>
        <div className="search-container"  align="start">
        <input
          type="text"
          placeholder="Search employee"
          value={searchBirth}
          onChange={handleInput}
         
        />
        <Button variant="outline-dark mx-2 mb-1" size="sm" onClick={handleSearch}>
          Search
        </Button>
      </div>
        <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Birth Of Date</th>
            <th>Experience</th>
            <th>Functions</th>
          </tr>
        </thead>
        <tbody>
          {currentPeople
            .sort((person1, person2) => person1.id - person2.id)
            .map((person, key) => {
              const { firstName, lastName, dateOfBirth, experience, id, functions } = person;
              return (
                <tr key={id}>
                  <td>{id}</td>
                  <td>{firstName}</td>
                  <td>{lastName}</td>
                  <td>{dateOfBirth}</td>
                  <td>{experience}</td>
                  <td>{functions}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <div className="pagination">
        {Array.from({ length: Math.ceil(filterPerson.length / peoplePerPage) }, (_, i) => (
          <Button key={i + 1} variant="outline-dark " onClick={() => paginate(i + 1)}>
            {i + 1}
          </Button>
        ))}
      </div>
        </Col>
      </Row>
  </Container>
  );
}

export default TablePeople;



