import React from "react";
import ReactDOM from "react-dom";
import Results from "./Results";
import Details from "./Details";
import SearchParams from "./SearchParams";
import pf from "petfinder-client";
import { Provider } from "./SearchContext";
import { Router, Link } from "@reach/router";

const petfinder = pf({
	key: process.env.API_KEY,
	secret: process.env.API_SECRET
});

export default class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			location: "Chicago, IL",
			animal: "",
			breed: "",
			breeds: [],
			handleAnimalChange: this.handleAnimalChange.bind(this),
			handleBreedChange: this.handleBreedChange.bind(this),
			handleLocationChange: this.handleLocationChange.bind(this),
			getBreeds: this.getBreeds
		};
	}
	handleLocationChange(event) {
		this.setState({
			location: event.target.value
		});
	}

	handleAnimalChange(event) {
		this.setState(
			{
				animal: event.target.value,
				breed: ""
			},
			this.getBreeds
		);
	}

	handleBreedChange(event) {
		this.setState({
			breed: event.target.value
		});
	}

	getBreeds() {
		if (this.state.animal) {
			petfinder.breed.list({ animal: this.state.animal }).then(data => {
				if (
					data.petfinder &&
					data.petfinder.breeds &&
					Array.isArray(data.petfinder.breeds.breed)
				) {
					this.setState({
						breeds: data.petfinder.breeds.breed
					});
				} else {
					this.setState({
						breeds: []
					});
				}
			});
		} else {
			this.setState({
				breeds: []
			});
		}
	}

	render() {
		return (
			<div>
				<header>
					<Link to="/">Adopt Me!</Link>
					<Link to="/search-params">
						<span aria-label="search" role="img">
							🔎
						</span>
					</Link>
				</header>
				<Provider value={this.state}>
					<Router>
						<Results path="/" />
						<Details path="/details/:id" />
						<SearchParams path="/search-params" />
					</Router>
				</Provider>
			</div>
		);
	}
}
