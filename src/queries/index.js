import gql from 'graphql-tag';

export const INIT_MOVIES_QUERY = gql`
    query Movies(
        $title: String
        $sortField: MovieSortField
        $sortOrder: MovieSortOrder
        $first: Int!
        $after: String
        $last: Int!
        $before: String
        $genres: [GenreInput]
        ) {
        movies (
            first:$first, after:$after, last: $last, before: $before , 
            title:$title, sortField:$sortField, sortOrder:$sortOrder,
            genres: $genres
        ){
            totalCount,
            edges {
                node {
                    id,
                    title,
                    posterUrl,
                    genres {
                        name
                    }
                },
                cursor
            }   
        }
    }
`

export const MOVIE_INFO = gql`
    query movie($id: int) {
        movie(id: $id) {
            id,
            title,
            genres{
                name
            },
            releaseDate,
            budget,
            posterUrl,
            averageRating {
                rating
            },
            yearlyAverageRating {
                date: year,
                rating
            },
        }
    }
`;

export const GENRE_LIST = gql`
    query genreList {
        genres {
            id,
            name
        }
    }
`