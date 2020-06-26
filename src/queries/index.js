export const INIT_MOVIES_QUERY = `
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

export const MOVIE_INFO = `
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

export const GENRE_LIST = `
    query genreList {
        genres {
            id,
            name
        }
    }
`

export const TOP_TEN = `
    query Topten($id: Long) {
        topListing (n: 10, genreId: $id ){
            id,
            title,
            posterUrl,
            genres {
                name
            }
        }   
    }
`

export const TOP_100 = `
    query Top100($n: Int) {
        topListing (n: $n){
            id,
            title,
            posterUrl,
            genres {
                name
            }
        }   
    }
`

export const LOGIN = `
    mutation attemptLogin {
        login {
            token
        }
    }
`

export const REGISTER = `
    mutation attemptRegister ($username: String, $email: String, $password: String) {
        register(
            username: $username, 
            email: $email, 
            password: $password
        ) {
            token
        }
    }
`

export const RECOMMENDED_MOVIES = `
    query Topten($id: Long) {
        topListing (n: 5, genreId: $id ){
            id,
            title,
            posterUrl,
            genres {
                name
            }
        }   
    }
`