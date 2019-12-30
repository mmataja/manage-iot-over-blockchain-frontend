import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { Styles } from './styles';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    marginLeft: 240,
    alignItems: 'center',
  }, 
}));

const RegisterForm = () => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    deviceOwner: '',
    deviceName: '',
    deviceFirmware: '',
    url: '',
    publicKey: '',
  });

  const handleChange = input => e => {
    setFormData({...formData, [input]: e.target.value});
  }

  const submitRegister = async e => {
    e.preventDefault();

    const selectedWalletAddress = await window.web3.eth.getAccounts();
    const account = selectedWalletAddress[0];
    
    const deviceData = JSON.stringify({
      deviceOwner: formData.deviceOwner,
      deviceName: formData.deviceName,
      deviceFirmware: formData.deviceFirmware,
      account,
    });

    const signature = await window.web3.eth.accounts.sign(deviceData, account);

    await axios.post("http://localhost:8000/register", {
      account,
      signature, 
      url: formData.url,
      publicKey: formData.publicKey,
      deviceOwner: formData.deviceOwner,
      deviceName: formData.deviceName,
    }).then(response => console.log(response))
      .catch(error => console.log(error));
  }

  return (
    <Paper className={classes.paper}>
      <form onSubmit={submitRegister}>
        <TextField 
          id="name"
          label="Name"
          margin="normal"
          required={true}
          onChange={handleChange('deviceName')}
          value={formData.deviceName}
          style={Styles.textField}
        />
        <br/>
        <TextField 
          id="owner"
          label="Owner"
          margin="normal"
          onChange={handleChange('deviceOwner')}
          value={formData.deviceOwner}
          style={Styles.textField}
        />
        <br/>
        <TextField 
          id="firmware"
          label="Firmware Version"
          margin="normal"
          onChange={handleChange('deviceFirmware')}
          value={formData.deviceFirmware}
          style={Styles.textField}
        />
        <br/>
        <TextField 
          id="url"
          label="URL"
          margin="normal"
          onChange={handleChange('url')}
          value={formData.url}
          style={Styles.textField}
        />
        <br/>
        <TextField 
          id="public-key"
          label="Public Key"
          multiline
          rows="6"
          margin="normal"
          onChange={handleChange('publicKey')}
          value={formData.publicKey}
          style={Styles.textField}
          variant="outlined"
        />
        <br/>
        <Button
          variant="contained"
          type="submit" 
          size="medium"
          color="primary"
          style={Styles.textField}
        >
          Register Device
        </Button>
      </form>
    </Paper>
  ) 
}

export default RegisterForm;
