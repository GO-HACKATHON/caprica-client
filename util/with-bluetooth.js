import {Component} from 'react';
import BTSerial from 'react-native-android-btserial';
import Promise from 'bluebird'
import api from '../util/api'
import {
	SPEED,
	POINT,
	RASH
} from '../util/test-constants';

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
      ts: Date.now(),
      userId: '',
      isHelmetOn: false,
      error: null,
      accident: false
    }
    this.enableBT = this.enableBT.bind(this)
    this.listDevices = this.listDevices.bind(this)
    this.connect = this.connect.bind(this)
    this.countAvailableMessage = this.countAvailableMessage.bind(this)
    this.readMessageUTF8 = this.readMessageUTF8.bind(this)
    this.processMessage = this.processMessage.bind(this)
    this.pState = this.pState.bind(this)
	}

	async componentDidMount() {
    const tryConnect = async (address) => {
      console.log('connecting')
      const {status, name} = await this.connect(address)
      console.log(status)
      if (status) {
        this.setState({deviceName: name})
        return ({status, name})
      }
      return tryConnect(address)
    }
    try {
      const user = await api.createUser({name: `Ahmad ${Date.now()}`})
      this.setState({userId: user.id})
      const isBTEnabled = await this.enableBT()
      this.setState({isBTEnabled})
      const devices = await this.listDevices()
      const address = '98:D3:32:70:78:67'
      // const {address} = devices.filter((device) => device.address === '98:D3:32:70:78:67')[0]
      this.setState({address})
      const connected = await tryConnect(address)
    } catch (e) {
      this.setState({error: e})
    }
      this.loop = setInterval(async () => {
        this.setState({ts: Date.now()})
        const messageCount = await this.countAvailableMessage()
        this.setState({messageCount})
        if (messageCount > 0) {
          const message = await this.readMessageUTF8()
          this.setState({message})
          await this.processMessage(message)
        }
      }, 5000)

	}

	componentWillUnmount() {
    clearInterval(this.loop)
	}

  processMessage (message) {
    const {userId} = this.state
    return new Promise(async (resolve, reject) => {
      const pairs = message.split('\n')
      let on = 0
      let off = 0
      let accident = false
      pairs.forEach(pair => {
        let response
        if (pair.includes('2,1')) {
          on++
        } else if (pair.includes('2,0')) {
          off++
        }
        if (pair.includes('3,')) {
          accident = true
        }
      })
      if (accident) {
        await api.reportAccident({id: userId, latitude: POINT.RANDOM, longitude: POINT.RANDOM, speed: SPEED.RANDOM})
      }
      this.setState({accident})
      if (on > off) {
        this.setState({isHelmetOn: true})
        return api.connectUser(userId)
      } else {
        this.setState({isHelmetOn: false})
        return api.disconnectUser(userId)
      }
    })
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
