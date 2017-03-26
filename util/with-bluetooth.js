import {Component} from 'react';
import BTSerial from 'react-native-android-btserial';
import Promise from 'bluebird'

const withBluetooth = fn => (
  class extends Component {

	constructor(props) {
		super(props);
		this.state = {
      address: '',
      deviceName: '',
      isBTEnabled: false,
      messageCount: 0,
      message: '',
      ts: Date.now()
    }
    this.enableBT = this.enableBT.bind(this)
    this.listDevices = this.listDevices.bind(this)
    this.connect = this.connect.bind(this)
    this.countAvailableMessage = this.countAvailableMessage.bind(this)
    this.readMessageUTF8 = this.readMessageUTF8.bind(this)
    this.pState = this.pState.bind(this)
	}

	async componentDidMount() {
    const isBTEnabled = await this.enableBT()
    this.setState({isBTEnabled})
    const devices = await this.listDevices()
    const address = '98:D3:32:70:78:67'
    // const {address} = devices.filter((device) => device.address === '98:D3:32:70:78:67')[0]
    this.setState({address})
    const {status, name} = await this.connect(address)
    this.setState({deviceName: name})
    this.loop = setInterval(async () => {
      this.setState({ts: Date.now()})
      const messageCount = await this.countAvailableMessage()
      this.setState({messageCount})
      if (messageCount > 0) {
        const message = await this.readMessageUTF8()
        this.setState({message})
      }
    }, 1000)
	}

	componentWillUnmount() {
    clearInterval(this.loop)
	}

  pState (state) {
    return new Promise((resolve, reject) => {
      this.setState(state, (newState) => resolve(newState))
    })
  }

  enableBT () {
    return new Promise((resolve, reject) => {
      BTSerial.enableBT((err, enabled) => {
        if (err) return reject(err)
        return resolve(enabled)
			})
    })
  }

  listDevices () {
    return new Promise((resolve, reject) => {
      BTSerial.listDevices((err, devices) => {
        if (err) return reject(err)
        return resolve(JSON.parse(devices))
      })
    })
  }

  connect (address) {
    return new Promise((resolve, reject) => {
      BTSerial.connect(address, (err, status, name) => {
        if (err) return reject(err)
        return resolve({status, name})
      })
    })
  }

  countAvailableMessage() {
    return new Promise((resolve, reject) => {
      BTSerial.available((err, count) => {
        if (err) return reject(err)
        return resolve(count)
      })
    })
  }

  readMessageUTF8() {
    return new Promise((resolve, reject) => {
      BTSerial.read(null, (err, string) => {
        if (err) return reject(err)
        return resolve(string)
      })
    })
  }


	render() {
		return fn(this.state);
	}
  }
);

export default withBluetooth;
