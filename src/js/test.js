import React from 'react';

class Elem extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			count: 1
		};

		this.increment = this.increment.bind(this);
		this.decrement = this.decrement.bind(this);
	}

	render() {
		return (
			<div>
				<span onClick={this.decrement}>-</span>
				<span>{this.state.count}</span>
				<span onClick={this.increment}>+</span>
			</div>
		);
	}

	increment(){
		this.setState((prev) => ({
			count: prev.count + 1
		}));
	}

	decrement(){
		this.setState((prev) => ({
			count: prev.count - 1
		}));
	}
}

export default Elem;