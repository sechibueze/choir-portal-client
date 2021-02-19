import { gql } from '@apollo/client';

// Login mutation
export const LOGIN_USER_MUTATION = gql`
    mutation login(
        email: $email 
        password: $password
        ){
        token
    }
`;