import React, { Component } from 'react';

export class RegisterForm extends Component {
  state = {
    deviceOwner: '',
    deviceName: '',
    deviceFirmware: '',
    publicKey: '',
  };

  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  }

  render() {
    const { deviceOwner, deviceName, deviceFirmware, publicKey } = this.state;

    return (
      <div>
        ovo je nesto
      </div>
    )
  }
}