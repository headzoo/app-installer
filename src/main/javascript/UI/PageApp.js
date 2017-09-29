import React from 'react';
import PropTypes from 'prop-types';

export class PageApp extends React.Component
{
  static propTypes = {
    icon: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    version: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div>
        <div className={"appHeader"}>
            <img className={"icon"} src={this.props.icon} />
            <h1>{this.props.title}</h1>
            <p>{this.props.description}</p>
        </div>
        <hr />
        <div className="appMain">
          {this.props.children}
        </div>
      </div>
    );
  }
}