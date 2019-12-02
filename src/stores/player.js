import { observable, action, computed } from 'mobx';

class PlayerModel {
  /**
   * lists 数据列表
   * [{
   *    id, 歌曲id
   *    name, 歌名
   *    url, 歌曲链接
   *    time, 歌曲总时长
   *    logo, 歌曲logo
   *    singer, 歌手
   * }]
   *  */
  @observable lists = [];

  // 播放器实例
  @observable player = null;

  @observable index = 0;

  @observable status = {
    volume: 0.6, // 音量
    played: 0, // 播放进度
    loaded: 0, // 加载进度
    playedSeconds: 0, // 已播放秒数
    playing: false, // 播放状态
    loop: false, // 是否循环
    duration: 0, // 音频总时长
    seeking: false // 触发进度条数据变化的flag
  };

  // 获取player实例
  @action setPlayer(ref) {
    this.player = ref;
  }

  @action apply(data = []) {
    // 载入数据，初始化
    this.lists = data;
    this.index = 0;
    this.setStatus({
      playing: false,
      played: 0,
      playedSeconds: 0,
      loaded: 0
    });
  }

  @action setStatus(obj) {
    this.status = {
      ...this.status,
      ...obj
    };
  }

  // 总时长加载回调
  @action onDuration(duration) {
    this.status.duration = duration;
  }

  // 进度条变动回调（1s执行一次）
  @action onProgress(state) {
    if (!this.status.seeking) {
      this.setStatus({
        played: state.played,
        loaded: state.loaded,
        playedSeconds: state.playedSeconds
      });
    }
  }

  // 当前歌曲播放完毕
  @action onEnded() {
    // 单曲循环
    if (this.status.loop) {
      this.player.seekTo(0);
      this.play();
      return;
    }
    // 顺序播放
    if (this.hasNextSong) {
      // 自动下一曲
      this.status.duration = 0;
      this.index += 1;
      this.play();
    } else {
      this.status.playing = false;
    }
  }

  // 播放
  @action play() {
    this.status.playing = true;
  }

  // 播放/暂停
  @action togglePlay() {
    const { playing } = this.status;
    if (this.hasSong) {
      this.status.playing = !playing;
    }
  }

  // 上一曲
  @action prevSong() {
    if (this.hasPrevSong) {
      this.status.duration = 0;
      this.index -= 1;
      this.play();
    }
  }

  // 下一曲
  @action nextSong() {
    if (this.hasNextSong) {
      this.status.duration = 0;
      this.index += 1;
      this.play();
    }
  }

  // 根据索引播放
  @action playByIndex(i) {
    if (this.index === i) {
      this.togglePlay();
    } else {
      this.status.duration = 0;
      this.index = i;
      this.play();
    }
  }

  // 进度条拖动状态
  @action seeking(seek) {
    this.status.seeking = seek;
  }

  // 是否单曲循环
  @action toggleLoop() {
    const { loop } = this.status;
    this.status.loop = !loop;
  }

  @computed get hasPrevSong() {
    return this.index > 0;
  }

  @computed get hasNextSong() {
    return this.index < this.length - 1;
  }

  @computed get hasSong() {
    return this.length !== 0;
  }

  // 当前歌曲
  @computed get song() {
    if (!this.hasSong) return null;
    return this.lists[this.index];
  }

  @computed get length() {
    return this.lists.length;
  }
}

export default PlayerModel;
