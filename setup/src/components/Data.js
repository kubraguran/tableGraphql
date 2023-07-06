import React from 'react'
import { useQuery, gql } from '@apollo/client';


export const GET_PEOPLE= gql`
query people{
  people {
    firstName
    lastName
    dateOfBirth
    functions
    experience
    id
    
  }
  
}
`;