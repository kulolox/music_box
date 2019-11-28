import { observable, action, computed } from 'mobx';

class PlayerModel {
  @observable audioData = [];

  @observable player = null;

  @observable status = {
    index: 0, // 当前audio在data中的索引
    volume: 0.6, // 音量
    played: 0, // 播放进度
    loaded: 0, // 加载进度
    playedSeconds: 0, // 已播放秒数
    playing: false, // 播放状态
    url: '', // 当前播放url
    name: 'None', // 当前播放name
    logo: '', // 当前音乐logo
    loop: false, // 是否循环
    playbackRate: 1, // 播放速率
    duration: 0, // 音频总时长
    seeking: false // 触发进度条数据变化的flag
  };

  // 外部数据导入（data）
  @action applyData(data = []) {
    if (data.length) {
      this.audioData = data;
      // 先初始化本地数据
      this.setAudioData();
    }
  }

  // 当前audio对象
  getCurrentData = () => this.audioData[this.status.index] || {};

  // 获取player实例
  @action setPlayer(ref) {
    this.player = ref;
  }

  @action setStatus(obj) {
    this.status = {
      ...this.status,
      ...obj
    };
  }

  // 加载audio数据
  @action setAudioData() {
    this.setStatus({
      url: this.getCurrentData().url,
      name: this.getCurrentData().name,
      logo: this.getCurrentData().logo
    });
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

  // audio播放完毕
  @action onEnded() {
    // 单曲循环
    if (this.status.loop) {
      this.player.seekTo(0);
      this.play();
      return;
    }
    // 顺序播放
    if (this.hasNextAudio) {
      // 自动下一曲
      this.status.duration = 0;
      this.status.index += 1;
      this.play();
    } else {
      this.status.playing = false;
    }
  }

  // 播放
  @action play() {
    // 加载audio数据
    this.setAudioData();
    this.status.playing = true;
  }

  // 播放/暂停
  @action togglePlay() {
    if (this.hasAudioData) {
      this.status.playing = !this.status.playing;
    }
  }

  // 上一曲
  @action prevAudio() {
    if (this.hasPrevAudio) {
      this.status.duration = 0;
      this.status.index -= 1;
      this.play();
    }
  }

  // 下一曲
  @action nextAudio() {
    if (this.hasNextAudio) {
      this.status.duration = 0;
      this.status.index += 1;
      this.play();
    }
  }

  // 根据索引播放
  @action playByIndex(index) {
    if (this.status.index === index) {
      this.togglePlay();
    } else {
      this.status.duration = 0;
      this.status.index = index;
      this.play();
    }
  }

  // 进度条拖动状态
  @action seeking(seek) {
    this.status.seeking = seek;
  }

  // 是否单曲循环
  @action toggleLoop() {
    this.status.loop = !this.status.loop;
  }

  // 播放速率切换
  @action setPlaybackRate(playbackRate) {
    this.status.playbackRate = playbackRate;
  }

  @computed get hasPrevAudio() {
    return this.status.index !== 0;
  }

  @computed get hasNextAudio() {
    return this.status.index < this.audioData.length - 1;
  }

  @computed get hasAudioData() {
    return this.audioData.length > 0;
  }
}

export default PlayerModel;
