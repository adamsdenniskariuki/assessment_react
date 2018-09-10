import React, { Component } from 'react';

import { getMovies } from './requests';

export class Search extends Component{

    constructor(props) {
        super(props);

        this.state = {
            results: [],
        }

        this.search = this.search.bind(this);
    }

    search = async (event) => {
        const input = document.getElementById("search").value;
        if (input.trim() !== ""){
            const url = `https://api.themoviedb.org/3/search/movie?api_key=f250169057aeeda23f31aace8ef2d93e&language=en-US&query=${input}&page=1&include_adult=false`;

            const movies = await Promise.all([getMovies(url)]);

            if (movies === null) {
                alert("An error occurred with the request");
            } else {
                this.setState({ results: movies[0].results });
            }

        } else {
            alert("search field is required.")
        }
    }

    render() {
        const imageUrl = "https://image.tmdb.org/t/p/w92/";
        const movieList = this.state.results.map((movie) => {
            return (<tr key={movie.id}>
                        <td>
                            <img src={imageUrl + movie.poster_path} alt="" />
                        </td>
                        <td>
                            <h4>{movie.title} ({movie.release_date})</h4>
                            <p>IMDB Rating: {movie.popularity}</p>
                            <p>{movie.overview}</p>
                        </td>
                    </tr>);
        });
        return (
            <div>
                <input type = "text" name = "search" id = "search" />
                <button name = "search" id = "search" onClick={this.search}>Search</button>
                <br />
                <table>
                    <tbody>
                        {movieList}
                    </tbody>
                </table>
            </div>
        );
    }
}