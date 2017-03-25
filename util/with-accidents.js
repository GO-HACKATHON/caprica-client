import {Component} from 'react';
import db from './db';

const withAccidents = fn => (
  class extends Component {
	static async getInitialProps() {
		const ref = db.ref('accidents');
		const accidents = await ref.once('value');
		const accidentsVal = accidents.val();
		const listOfAccidents = Object.keys(accidentsVal).map(key => accidentsVal[key]).sort((a, b) => b.created_at - a.created_at);
		return {
			accidents: listOfAccidents
		};
	}

	constructor(props) {
		super(props);
		this.state = Object.assign({}, props);
		this.onUpdateAccidents = this.onUpdateAccidents.bind(this);
	}

	componentDidMount() {
		db.ref('accidents').on('value', this.onUpdateAccidents);
	}

	componentWillUnmount() {
		db.ref('accidents').off('value', this.onUpdateAccidents);
	}

	onUpdateAccidents(accidents) {
		const accidentsVal = accidents.val();
		const listOfAccidents = Object.keys(accidentsVal).map(key => accidentsVal[key]).sort((a, b) => b.created_at - a.created_at);
		this.setState({accidents: listOfAccidents});
	}

	render() {
		return fn(this.state);
	}
  }
);

export default withAccidents;
