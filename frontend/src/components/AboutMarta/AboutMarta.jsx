import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import GitHubIcon from '@material-ui/icons/GitHub';
import Particles from 'react-particles-js';
import { useStyles, particlesOptions } from './index';

const AboutMarta = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Particles className={classes.particles} params={particlesOptions} />
      <Grid container justify="center" alignItems="center" direction="row">
        <Paper
          style={{ width: 400, padding: 20, backgroundColor: 'transparent' }}>
          <Grid
            container
            direction="row"
            justify="center"
            spacing={5}
            alignItems="center">
            <Grid item>
              <Avatar
                alt="Marta"
                src="http://bit.ly/334tOSf"
                className={classes.large}
              />
            </Grid>
            <Grid item>
              <Grid
                container
                direction="column"
                alignItems="center"
                style={{ color: '#fff' }}>
                <Typography align="justify" gutterBottom variant="h4">
                  marta
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Smart Home
                </Typography>
                <Typography gutterBottom>intive</Typography>
              </Grid>
              <Grid container justify="center" style={{ padding: 5 }}>
                <a href="https://github.com/MartaJaszewska" target="_blank">
                  <GitHubIcon style={{ color: '#fff' }} fontSize="large" />
                </a>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </div>
  );
};

export default AboutMarta;
