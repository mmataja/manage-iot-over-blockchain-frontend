import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Container, CssBaseline, Grid, } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import DeviceCard from './DeviceCard';

const useStyles = makeStyles(theme => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  loadMoreBtn: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(5)
  }
}));

const Album = () => {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const [devices, setDevices] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/devices', {
      params: {
        page,
        limit: 6
    }})
      .then((response) => {
        if (devices === null) {
          return setDevices(response.data);
        }

        const allDevices = [...devices, ...response.data];

        setDevices(allDevices);
      })
      .catch((error) => {
        console.log(error)
      })
  }, [page])

  const handleLoadMore = (event) => {
    event.preventDefault();
    setPage(page+1);
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        <Container className={classes.cardGrid} maxWidth="lg">
          <Grid container spacing={4}>
            {devices !== null 
              ? devices.map(device => (
                <DeviceCard 
                  key={device.id}
                  owner={device.owner}
                  name={device.name}
                />
              ))
              : null
            }
          </Grid>
          <Grid container className={classes.loadMoreBtn}>
            <Button variant="contained" color="primary" onClick={handleLoadMore}>
              load more
            </Button>
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
}

export default Album;
