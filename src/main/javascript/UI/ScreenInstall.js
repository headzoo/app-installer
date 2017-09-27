import React from 'react';
import PropTypes from 'prop-types';

export class ScreenInstall extends React.Component
{
  static propTypes = {
    progress: PropTypes.number.isRequired
  };

  render() {
    return <p>Installing {this.props.progress} %</p>
  }
}