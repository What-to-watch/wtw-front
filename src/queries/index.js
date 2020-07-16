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
            myRating
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
    query recommended {
        topRecommendedListing (n: 5) {
            id,
            title,
            posterUrl,
            myRating,
            expectedRating,
            genres {
                name
            }
        }   
    }
`

export const RATE_MOVIE = `
    mutation rate($id: Int, $stars: Float) {
        rate(movieId: $id, rating: $stars) {
            movieId,
            rating,
            timestamp,
        }
    }
`

export const WATCH_LIST = `
    query watchlist($id: Int) {
        watchlist(id: $id) {
            id,
            name,
            icon,
            isPublic,
            movies {
                id,
                title,
                posterUrl,
                genres {
                    name
                }
            }
        }   
    }
`

export const PUBLIC_WATCH_LISTS = `
    query publicWatchlists {
        publicWatchlists {
            id,
            name,
            icon,
            isPublic,
        }   
    }
`

export const MY_WATCH_LISTS = `
    query myWatchlists {
        myWatchlists {
            id,
            name,
            icon,
            isPublic,
        }   
    }
`

export const CREATE_WATCH_LIST = `
    mutation createWatchlist($name: String, $icon: String, $isPublic: Boolean) {
        createWatchlist(name: $name, icon: $icon, isPublic: $isPublic) {
            id,
            name,
            icon,
        }
    }
`