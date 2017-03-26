import {Component} from 'react';
import db from './db';

const withAccidents = fn => (
  class extends Component {

	constructor(props) {
		super(props);
		this.state = {accidents: [], isLoadingAccidents: true};
		this.onUpdateAccidents = this.onUpdateAccidents.bind(this);
	}

	async componentDidMount() {
		db.ref('accidents').on('value', this.onUpdateAccidents);
	}

	componentWillUnmount() {
		db.ref('accidents').off('value', this.onUpdateAccidents);
	}

	onUpdateAccidents(accidents) {
		const accidentsVal = accidents.val();
		console.log(accidentsVal);
		const listOfAccidents = Object.keys(accidentsVal).map(key => accidentsVal[key]).sort((a, b) => b.created_at - a.created_at);
		this.setState({accidents: listOfAccidents, isLoadingAccidents: false});
	}

	render() {
		return fn(this.state);
	}
  }
);

export default withAccidents;
