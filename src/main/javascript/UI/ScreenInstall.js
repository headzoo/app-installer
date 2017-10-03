import React from 'react';
import PropTypes from 'prop-types';
import Progress from 'deskpro-components/lib/Components/Progress'
import ProgressBar from 'deskpro-components/lib/Components/ProgressBar'

export class ScreenInstall extends React.Component
{
  static propTypes = {
    progress: PropTypes.number.isRequired
  };

  render() {
    return (
      <Progress size="large" type="primary" style={{ border: '1px solid #ccc' }}>
        <ProgressBar percent={this.props.progress}>{this.props.progress} %</ProgressBar>
      </Progress>
    );
  }
}