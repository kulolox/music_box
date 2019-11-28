import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import cssStyles from './index.module.scss';

// 根据播放进度，填充滑条
const setRangeStyle = (node, value) => {
  node.style.background = `linear-gradient(to right, orange, orange ${value *
    100}%, transparent ${value * 100}%)`;
};

@observer
class InputRange extends Component {
  static propTypes = {
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
    step: PropTypes.node,
    onChange: PropTypes.func.isRequired,
    onMouseDown: PropTypes.func,
    onMouseUp: PropTypes.func.isRequired
  };

  static defaultProps = {
    step: 'any',
    onMouseDown: () => {}
  };

  constructor() {
    super();
    this.range = React.createRef();
  }

  componentDidMount() {
    const { value } = this.props;
    setRangeStyle(this.range.current, value);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      setRangeStyle(this.range.current, nextProps.value);
    }
  }

  render() {
    return (
      <input
        ref={this.range}
        type="range"
        className={cssStyles.inputRanger}
        {...this.props}
      />
    );
  }
}

export default InputRange;
