import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { View, TouchableWithoutFeedback, StyleSheet } from "react-native";
import { Video } from "expo-av";
import { videos } from "../data/videos";
import Controls from "../components/Controls";
import SeekBar from "../components/SeekBar";
import VideoTitle from "../components/VideoTitle";

export default function VideoPlayers() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [status, setStatus] = useState({});
  const [volume, setVolume] = useState(1.0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [seekPosition, setSeekPosition] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  const videoRef = useRef(null);
  const hideTimer = useRef(null);

  // Memoized current video
  const currentVideo = useMemo(() => videos[currentIndex], [currentIndex]);

  // Auto-hide timer
  const resetHideTimer = useCallback(() => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setShowControls(false), 2500);
  }, []);

  // Handlers
  const handleVideoPress = useCallback(() => {
    setShowControls((prev) => {
      if (!prev) resetHideTimer();
      return !prev;
    });
    setShowVolumeSlider(false);
  }, [resetHideTimer]);

  const toggleFullScreen = useCallback(
    () => setIsFullScreen((prev) => !prev),
    []
  );
  const toggleVolumeSlider = useCallback(
    () => setShowVolumeSlider((prev) => !prev),
    []
  );

  const handlePlayPause = useCallback(async () => {
    if (!videoRef.current) return;
    if (status.isPlaying) {
      await videoRef.current.pauseAsync();
    } else {
      await videoRef.current.playAsync();
    }
    resetHideTimer();
  }, [status.isPlaying, resetHideTimer]);

  // Next Video Play
  const playNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < videos.length - 1 ? prev + 1 : prev));
  }, []);

  // Prev Video Play
  const playPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  const onSeekSliderValueChange = useCallback(
    (value) => {
      setIsSeeking(true);
      setSeekPosition(value * (status.durationMillis || 0));
    },
    [status.durationMillis]
  );

  const onSeekSliderSlidingComplete = useCallback(
    async (value) => {
      const seekMillis = value * (status.durationMillis || 0);
      await videoRef.current?.setPositionAsync(seekMillis);
      setIsSeeking(false);
    },
    [status.durationMillis]
  );

  const onVolumeChange = useCallback(async (value) => {
    setVolume(value);
    await videoRef.current?.setVolumeAsync(value);
  }, []);

  // Duration Timing
  const formatTime = useCallback(
    (millis) => {
      const totalSeconds = Math.floor(millis / 1000);
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    },
    [isSeeking]
  );

  // Load new video on index change

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.stopAsync();
      videoRef.current.loadAsync(
        { uri: currentVideo.uri },
        { shouldPlay: true, volume }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentVideo]);

  // Update volume without reloading video
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.setVolumeAsync(volume);
    }
  }, [volume]);

  return (
    <View style={styles.container}>
      <View style={styles.videoWrapper}>
        <TouchableWithoutFeedback onPress={handleVideoPress}>
          <Video
            ref={videoRef}
            source={{ uri: currentVideo.uri }}
            style={styles.video}
            resizeMode="contain"
            shouldPlay
            onPlaybackStatusUpdate={setStatus}
            volume={volume}
            useNativeControls={false}
          />
        </TouchableWithoutFeedback>

        {/* Controls Play pause next Prev */}
        {showControls && (
          <Controls
            status={status}
            handlePlayPause={handlePlayPause}
            playNext={playNext}
            playPrev={playPrev}
          />
        )}
        {/* Seek Valume and Duraton of video */}
        {showControls && (
          <SeekBar
            isSeeking={isSeeking}
            seekPosition={seekPosition}
            status={status}
            volume={volume}
            showVolumeSlider={showVolumeSlider}
            toggleVolumeSlider={toggleVolumeSlider}
            onSeekSliderValueChange={onSeekSliderValueChange}
            onSeekSliderSlidingComplete={onSeekSliderSlidingComplete}
            onVolumeChange={onVolumeChange}
            toggleFullScreen={toggleFullScreen}
            isFullScreen={isFullScreen}
            formatTime={formatTime}
          />
        )}
      </View>

      <VideoTitle title={currentVideo.title} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingTop: 40,
  },
  videoWrapper: { width: "100%", alignItems: "center", position: "relative" },
  video: {
    width: "100%",
    height: 240,
    backgroundColor: "#000",
    borderRadius: 10,
  },
});
