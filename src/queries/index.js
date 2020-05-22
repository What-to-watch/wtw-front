import gql from 'graphql-tag';

export const INIT_MOVIES_QUERY = gql`
    query Movies(
        $title: String
        $sortField: MovieSortField
        $sortOrder: MovieSortOrder
        $first: Int!
        ) {
        movies (first:$first, title:$title, sortField:$sortField, sortOrder:$sortOrder){
            totalCount,
            edges {
                node {
                    id,
                    title,
                    posterUrl,
                    genres {
                        name
                    }
                }
            }   
        }
    }
`