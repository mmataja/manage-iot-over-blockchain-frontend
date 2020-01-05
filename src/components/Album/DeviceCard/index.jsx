import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Divider,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  cardHeading: {
    marginBottom: 0,
  },
}));

const DeviceCard = ({
  owner,
  name,
}) => {
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.cardMedia}
          image="https://source.unsplash.com/random"
          title="Image title"
        />
        <CardContent className={classes.cardContent}>
          <Grid container item alignItems="baseline" justify="space-between">
            <Typography gutterBottom variant="h6" className={classes.cardHeading}>
              Name
            </Typography>
            <Divider orientation="vertical" />
            <Typography  variant="overline">
              {name}
            </Typography>
          </Grid>
          <Divider />
          <Grid container item alignItems="baseline" justify="space-between">
            <Typography gutterBottom variant="h6" className={classes.cardHeading}>
              Owner
            </Typography>
            <Typography variant="overline">
              {owner}
            </Typography>
          </Grid>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary">
            Check
          </Button>
          <Button size="small" color="primary">
            Use
          </Button>
        </CardActions>
      </Card>
    </Grid>
  )
}

export default DeviceCard;
