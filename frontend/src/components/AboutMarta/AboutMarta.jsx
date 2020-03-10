import React from 'react';
import { Fade, Slide } from '@material-ui/core';
import { Grid, Paper, Avatar, Typography } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import Particles from 'react-particles-js';
import { useStyles, particlesOptions } from './index';

const AboutMarta = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Particles className={classes.particles} params={particlesOptions} />
      <Grid container justify="center" alignItems="center" direction="row">
        <Paper className={classes.paper}>
          <Grid
            container
            direction="row"
            justify="center"
            spacing={5}
            alignItems="center">
            <Grid item>
              <Fade in="true" timeout={4000}>
                <Avatar
                  alt="Marta"
                  src="http://bit.ly/334tOSf"
                  className={classes.large}
                />
              </Fade>
            </Grid>
            <Grid item>
              <Grid
                className={classes.color}
                container
                direction="column"
                alignItems="center">
                <Slide in="true" timeout={2000}>
                  <Typography
                    style={{ fontFamily: 'Poppins' }}
                    align="justify"
                    variant="h1">
                    marta
                  </Typography>
                </Slide>
                <Typography
                  style={{ fontFamily: 'Poppins' }}
                  variant="subtitle1"
                  gutterBottom>
                  Smart Home
                </Typography>
                <Typography style={{ fontFamily: 'Poppins' }} gutterBottom>
                  intive
                </Typography>
              </Grid>
              <Grid container justify="center" style={{ padding: 5 }}>
                <a
                  className={classes.color}
                  href="https://github.com/MartaJaszewska"
                  target="_blank">
                  <GitHubIcon fontSize="large" />
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
