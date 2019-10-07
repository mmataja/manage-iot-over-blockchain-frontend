import React, { Component } from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles'
import { Container, AppBar, Toolbar, TextField, Button } from '@material-ui/core';

const theme = createMuiTheme();

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

  submitRegister = () => {
    console.log("Registrirao si se");
  }

  render() {
    const { deviceOwner, deviceName, deviceFirmware, publicKey } = this.state;

    return (
      <ThemeProvider theme={theme}>
        <React.Fragment>
          <AppBar position="static">
            <Toolbar>
              Register IoT Device
            </Toolbar>
          </AppBar>
          <Container maxWidth="sm">
            <TextField 
              id="device-owner"
              label="Device Owner Name"
              margin="normal"
              required={true}
              onChange={this.handleChange('deviceOwner')}
            />
            <br/>
            <TextField 
              id="device-name"
              label="Device Name"
              margin="normal"
              onChange={this.handleChange('deviceName')}
            />
            <br/>
            <TextField 
              id="device-firmware"
              label="Device Firmware"
              margin="normal"
              onChange={this.handleChange('deviceFirmware')}
            />
            <br/>
            <TextField 
              id="public-key"
              label="Public Key"
              margin="normal"
              onChange={this.handleChange('publicKey')}
            />
            <br/>
            <Button
              variant="contained" 
              size="medium"
              color="primary"
              style={styles.button}
              onClick={this.submitRegister}
            >Register</Button>
          </Container>
        </React.Fragment>
      </ThemeProvider>
    )
  }
}

const styles = {
  button: {
    margin: 15
  }
}

export default RegisterForm; 