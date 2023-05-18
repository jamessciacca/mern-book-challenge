//importing the gql tag
import gql from 'graphql-tag';

//exporting the query to get the me query
export const GET_ME = gql`
    {
        me {
            _id
            username
            email
            bookCount
            savedBooks {
                bookId
                authors
                description
                title
                image
                link
            }
        }
    }
`;
