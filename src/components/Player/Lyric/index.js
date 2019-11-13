import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import { autorun } from 'mobx';
import classNames from 'classnames';

import cssStyles from './Lyric.module.scss';
import ScrollBarContainer from '@src/components/ScrollBarContainer';
import { GlobalContext } from '@src/App';

const d3 = require('d3-ease');

const parseLyric = lyricStr => {
  if (!lyricStr) return [];
  // 用于匹配时间的正则表达式，匹配的结果类似<p>[xx:xx.xx]</p>
  const pattern = /\[(\d{2}):(\d{2}\.\d{1,3})\]/gi;
  const newLyricStr = lyricStr.replace(pattern, '__PLACE_HOLDER__');
  // 将文稿分隔成一行一行，存入数组
  const linesTmp = newLyricStr.split('__PLACE_HOLDER__');
  // 去掉空行
  const lines = linesTmp.filter(line => line.trim().length !== 0);
  // 返回数组 [时间]，对该数组做处理
  const times = lyricStr.match(pattern) || [];
  // 保存最终结果的数组
  const result = [];
  const timePattern = /(\d{2}):(\d{2}.\d{1,3})/;
  times.forEach((time, index) => {
    // 去掉时间里的中括号得到xx:xx.xx并用:分割得到[xx,xx.xx]的数组
    const t = timePattern.exec(time);
    result.push([parseInt(t[1], 10) * 60 + parseFloat(t[2]), lines[index]]); // 组合成 [时间,歌词]
  });
  // 加上下标 是为了取出时间 result[0][0]与result[1][0]做比较而不是result[0]与result[1]做比较
  result.sort((a, b) => a[0] - b[0]);
  return result;
};

const getTimeIndex = (time, range) => {
  const len = range.length;
  if (time <= range[0]) return 0;
  if (time >= range[len - 1]) return len - 1;
  let idx = 0;
  for (const t of range) {
    if (t > time) {
      idx = range.indexOf(t) - 1;
      break;
    }
  }
  return idx;
};

const scroll = (dom, distance) => {
  const duration = 800; // 动画持续时间(ms)
  let state = 0;
  let start = null;
  const { scrollTop } = dom;
  const maxScrollTop = distance - scrollTop;
  const work = timestamp => {
    if (!start) start = timestamp;
    state = timestamp - start;
    const t = state / duration;
    let progress = d3.easeCubicInOut(t);
    if (progress > 1) progress = 1;
    const newScrollTop = maxScrollTop * progress;
    dom.scrollTop = newScrollTop + scrollTop;
    if (progress < 1) {
      window.requestAnimationFrame(work);
    }
  };
  window.requestAnimationFrame(work);
};

const Lyric = observer(({ lyric }) => {
  const { playerModel } = React.useContext(GlobalContext);
  const [formatLyrics, setFormatLyrics] = useState(parseLyric(lyric));
  const [activeIndex, setActiveIndex] = useState(0);
  const baseLine = 200;
  let container = null;
  const getRef = ref => {
    container = ref;
  };
  const setActiveLine = playedSeconds => {
    if (!container) return;
    const activeDom = document.getElementsByClassName(cssStyles.active);
    const index = getTimeIndex(playedSeconds, formatLyrics.map(lyr => lyr[0]));
    setActiveIndex(index);
    if (activeDom.length <= 0) return;
    // 如果当前标亮的段落超过基准线，则滚动超过的部分
    if (activeDom[0].offsetTop > baseLine) {
      scroll(container, activeDom[0].offsetTop - baseLine);
    } else {
      scroll(container, 0);
    }
  };
  useEffect(() => {
    setFormatLyrics(parseLyric(lyric));
    setActiveIndex(0);
  }, [lyric]);
  useEffect(() => {
    autorun(() => {
      playerModel.status.playedSeconds;
      setTimeout(() => {
        setActiveLine(playerModel.status.playedSeconds);
      }, 0);
    });
  }, []);

  return (
    <ScrollBarContainer getRef={getRef}>
      {lyric ? (
        <div className={cssStyles.lyrContainer}>
          {formatLyrics.map((line, index) => (
            <div
              className={classNames(cssStyles.line, {
                [cssStyles.active]: activeIndex === index
              })}
              key={line[0]}
            >
              {line[1]}
            </div>
          ))}
        </div>
      ) : (
        <p className={cssStyles.lyricInfo}>暂无文稿...</p>
      )}
    </ScrollBarContainer>
  );
});

export default Lyric;
