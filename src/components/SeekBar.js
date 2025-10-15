import { Ionicons, AntDesign } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

// SeekBar Component
const SeekBar = ({
  isSeeking,
  seekPosition,
  status,
  volume,
  showVolumeSlider,
  toggleVolumeSlider,
  onSeekSliderValueChange,
  onSeekSliderSlidingComplete,
  onVolumeChange,
  toggleFullScreen,
  isFullScreen,
  formatTime,
  handlePlayPause,
}) => (
  <View style={styles.seekSection}>
    <View style={styles.timeRow}>
      <View style={styles.volumeSection}>
        <TouchableOpacity onPress={toggleVolumeSlider}>
          <Ionicons
            name={volume === 0 ? "volume-mute" : "volume-high"}
            size={22}
            color="#1EB1FC"
            style={{ marginLeft: 10 }}
          />
        </TouchableOpacity>

        {showVolumeSlider && (
          <View style={styles.volumeSliderContainer}>
            <Slider
              style={styles.volumeSlider}
              minimumValue={0}
              maximumValue={1}
              value={volume}
              onValueChange={onVolumeChange}
              minimumTrackTintColor="#1EB1FC"
              maximumTrackTintColor="#444"
              thumbTintColor="#1EB1FC"
              orientation="vertical" // For vertical slider
            />
          </View>
        )}
      </View>

      <TouchableOpacity
        onPress={toggleFullScreen}
        style={styles.fullscreenButton}
      >
        <AntDesign
          name={isFullScreen ? "import" : "export"}
          size={22}
          color="#1EB1FC"
        />
      </TouchableOpacity>
    </View>

    <View style={styles.sliderContainer}>
      <TouchableOpacity onPress={handlePlayPause}>
        <Ionicons
          name={status.isPlaying ? "pause-outline" : "play-outline"}
          size={35}
          color="#1EB1FC"
        />
      </TouchableOpacity>
      <Slider
        style={styles.slider}
        value={
          isSeeking
            ? seekPosition / status.durationMillis
            : status.positionMillis / status.durationMillis || 0
        }
        minimumValue={0}
        maximumValue={1}
        onValueChange={onSeekSliderValueChange}
        onSlidingComplete={onSeekSliderSlidingComplete}
        minimumTrackTintColor="#1EB1FC"
        maximumTrackTintColor="#444"
        thumbTintColor="#1EB1FC"
      />
    </View>
    <Text style={styles.timeText}>
      {formatTime(isSeeking ? seekPosition : status.positionMillis || 0)} /{" "}
      {formatTime(status.durationMillis || 0)}
    </Text>
  </View>
);

export default SeekBar;

const styles = StyleSheet.create({
  seekSection: {
    width: "100%",
    position: "absolute",
    bottom: 5,
  },
  slider: {
    width: "90%",
    height: 35,
  },
  title: {
    color: "#000",
    fontSize: 18,
    fontWeight: "600",
    marginTop: 20,
  },
  timeRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 10,
    gap: 16,
  },
  timeText: {
    color: "#fff",
    fontSize: 12,
    opacity: 0.8,
    borderRadius: 8,
    textAlign: "right",
    marginRight: 8,
    fontWeight: "700",
  },
  fullscreenButton: {
    transform: [{ rotate: "-90deg" }],
  },
  volumeSlider: {
    width: 120,
  },
  volumeSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  sliderContainer: { flexDirection: "row", alignItems: "center" },
});
