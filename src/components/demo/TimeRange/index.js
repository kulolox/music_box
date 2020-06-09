import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import moment from 'moment';

import cssStyles from './index.module.scss';

const semanticIdles = (arr, formatTime = true) => {
  if (!Array.isArray(arr)) {
    throw new Error('args is not a array');
  }
  if (arr.length === 0) return arr;
  // 去重，排序
  const arrCopy = [...new Set(arr)];
  arrCopy.sort((a, b) => a - b);

  const tempArr = [];
  const result = [];
  let i = 0;
  tempArr[i] = [arrCopy[0]];
  // 取出连续数
  arrCopy.reduce((prev, cur) => {
    if (cur - prev === 1) {
      tempArr[i].push(cur);
    } else {
      // eslint-disable-next-line no-plusplus
      tempArr[++i] = [cur];
    }
    return cur;
  });
  // 转换为时间范围
  for (let j = 0; j < tempArr.length; j += 1) {
    const temp = tempArr[j];
    result[j] = [
      formatTime
        ? moment(new Date(temp[0] * 30 * 60000))
            .utcOffset(0)
            .format('HH:mm')
        : temp[0]
    ];
    const last = temp.length - 1;
    result[j].push(
      formatTime
        ? moment(new Date((temp[last] + 1) * 30 * 60000))
            .utcOffset(0)
            .format('HH:mm')
        : temp[last] + 1
    );
  }
  return result;
};

@observer
class TimeRange extends React.Component {
  static propTypes = {
    value: PropTypes.arrayOf(['number']).isRequired,
    onChange: PropTypes.func.isRequired,
    range: PropTypes.arrayOf(['number']),
    startTime: PropTypes.number
  };

  static defaultProps = {
    range: [],
    startTime: 0
  };

  @observable status = {
    selected: [],
    isGather: false,
    isEnter: false
  };

  constructor(props) {
    super(props);
    this.status.selected = props.value;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.state.selected = this.props.value;
    }
  }

  select = i => {
    const { selected, isMoved } = this.status;
    if (isMoved) return;
    const index = selected.findIndex(t => t === 1);
    if (index < 0) {
      selected.push(i);
    } else {
      selected.splice(index, 1);
    }
    this.updateValue();
  };

  mouseDown = () => {
    this.status.isGather = true;
    this.status.isMoved = false;
  };

  mouseUP = () => {
    this.status.isGather = false;
  };

  mouseEnter = () => {
    this.status.isEnter = true;
  };

  mouseLeave = () => {
    this.status.isEnter = false;
    this.status.isGather = false;
  };

  mouseMove = t => {
    const { isEnter, isGather } = this.status;
    this.status.isMoved = true;
    // 鼠标进入dom， 并处于收集状态，收集数据
    if (isEnter && isGather) {
      this.addSelected(t);
    }
  };

  addSelected = i => {
    const { selected } = this.status;
    const index = selected.findIndex(t => t === i);
    if (index >= 0) return;
    selected.push(i);
    this.updateValue();
  };

  updateValue = () => {
    const { selected } = this.status;
    this.status.selected = selected.sort((a, b) => a - b);
    this.props.onChange(this.status.selected);
  };

  render() {
    const { range, startTime } = this.props;
    const { selected } = this.status;
    // 生成时间轴
    const Times = Array.from({ length: 24 }).map((_, i) => i);
    // 生成可操作小格
    const numbers = Array.from({ length: Times.length * 2 }).map((_, i) => i);
    return (
      <div
        className={cssStyles.container}
        onMouseLeave={this.mouseLeave}
        onMouseEnter={this.mouseEnter}
      >
        <section className={cssStyles.title}>
          {Times.map(t => (
            <div
              key={t}
              className={classNames({ [cssStyles.hidden]: t < startTime })}
            >
              <div className={cssStyles.label}>{t}</div>
            </div>
          ))}
        </section>
        <section className={cssStyles.box}>
          {numbers.map(t => (
            <button
              onMouseDown={() => this.mouseDown(t)}
              onMouseUp={this.mouseUP}
              onMouseMove={() => this.mouseMove(t)}
              onClick={() => this.select(t)}
              className={classNames(
                cssStyles.item,
                { [cssStyles.hidden]: t < startTime * 2 },
                { [cssStyles.select]: selected.includes(t) },
                { [cssStyles.limit]: range.length !== 0 && !range.includes(t) }
              )}
              disabled={range.length !== 0 && !range.includes(t)}
              key={t}
            />
          ))}
        </section>
        <section className={cssStyles.footer}>
          {semanticIdles(selected).map(t => (
            <span>{t.join(' ~ ')}</span>
          ))}
        </section>
      </div>
    );
  }
}

export default TimeRange;
