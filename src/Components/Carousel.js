import React from "react";

export default class Carousel extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			photos: [],
			active: 0
		};
		this.handleIndexClick = this.handleIndexClick.bind(this);
	}

	static getDerivedStateFromProps({ media }) {
		let photos = [];
		if (media && media.photos && media.photos.photo) {
			photos = media.photos.photo.filter(photo => photo["@size"] === "pn");
		}
		return { photos };
	}

	handleIndexClick(event) {
		this.setState({
			active: +event.target.dataset.index
		});
	}

	render() {
		const { photos, active } = this.state;
		const photo = photos
			? photos[active].value
			: "http://placecorgi.com/300/300";

		return (
			<div className="carousel">
				<img src={photo} alt="primary animal" />
				{photos.length > 1 ? (
					<div className="carousel-smaller">
						{photos.map((photo, index) => (
							<img
								onClick={this.handleIndexClick}
								key={photo.value}
								data-index={index}
								src={photo.value}
								className={index === active ? "active" : ""}
								alt="animal thumbnail"
							/>
						))}
					</div>
				) : null}
			</div>
		);
	}
}
