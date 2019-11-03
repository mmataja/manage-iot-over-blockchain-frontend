import React, { Component } from 'react';
import axios from 'axios';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles'
import { Container, AppBar, Toolbar, TextField, Button } from '@material-ui/core';

import { Styles } from './styles';

const theme = createMuiTheme();

export class RegisterForm extends Component {
  state = {
    deviceOwner: '',
    deviceName: '',
    deviceFirmware: '',
    url: '',
    publicKey: '',
  };

  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  }

  submitRegister = async e => {
    e.preventDefault();

    const { deviceOwner, deviceName, deviceFirmware, publicKey, url } = this.state;

    const deviceData = JSON.stringify({
      deviceOwner,
      deviceName,
      deviceFirmware,
      publicKey
    });

    const selectedWalletAddress = await window.web3.eth.getAccounts();
    
    const signature = await window.web3.utils.sha3(deviceData);

    await axios.post("http://localhost:8000/register", {
      account: selectedWalletAddress[0],
      signature, 
      url,
      publicKey,
    }).then(response => console.log(response))
      .catch(error => console.log(error));

  }

  render() {
    const { deviceOwner, deviceName, deviceFirmware, url, publicKey } = this.state;

    return (
      <ThemeProvider theme={theme}>
        <React.Fragment>
          <AppBar position="static">
            <Toolbar>
              Register IoT Device
            </Toolbar>
          </AppBar>
          <Container maxWidth="sm">
            <form onSubmit={this.submitRegister}>
              <TextField 
                id="name"
                label="Name"
                margin="normal"
                required={true}
                onChange={this.handleChange('deviceOwner')}
                value={deviceOwner}
                style={Styles.textField}
              />
              <br/>
              <TextField 
                id="owner"
                label="Owner"
                margin="normal"
                onChange={this.handleChange('deviceName')}
                value={deviceName}
                style={Styles.textField}
              />
              <br/>
              <TextField 
                id="firmware"
                label="Firmware Version"
                margin="normal"
                onChange={this.handleChange('deviceFirmware')}
                value={deviceFirmware}
                style={Styles.textField}
              />
              <br/>
              <TextField 
                id="url"
                label="URL"
                margin="normal"
                onChange={this.handleChange('url')}
                value={url}
                style={Styles.textField}
              />
              <br/>
              <TextField 
                id="public-key"
                label="Public Key"
                multiline
                rows="6"
                margin="normal"
                onChange={this.handleChange('publicKey')}
                value={publicKey}
                style={Styles.textField}
                variant="outlined"
              />
              <br/>
              <Button
                variant="contained"
                type="submit" 
                size="medium"
                color="primary"
                style={styles.button, Styles.textField}
              >
                Register Device
              </Button>
            </form>

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