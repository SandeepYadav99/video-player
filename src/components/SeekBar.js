import { Ionicons } from "@expo/vector-icons";
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
}) => (
  <View style={styles.seekSection}>
    <View style={styles.timeRow}>
      <View style={{ flexDirection: "row", width: "90%" }}>
        <Text style={styles.timeText}>
          {formatTime(isSeeking ? seekPosition : status.positionMillis || 0)} /{" "}
          {formatTime(status.durationMillis || 0)}
        </Text>
        <View style={styles.volumeSection}>
          <TouchableOpacity onPress={toggleVolumeSlider}>
            <Ionicons
              name={volume === 0 ? "volume-mute" : "volume-high"}
              size={22}
              color="#fff"
              style={{ marginLeft: 10 }}
            />
          </TouchableOpacity>
          {showVolumeSlider && (
            <Slider
              style={styles.volumeSlider}
              minimumValue={0}
              maximumValue={1}
              value={volume}
              onValueChange={onVolumeChange}
              minimumTrackTintColor="#1EB1FC"
              maximumTrackTintColor="#444"
              thumbTintColor="#1EB1FC"
            />
          )}
        </View>
      </View>
      <TouchableOpacity
        onPress={toggleFullScreen}
        style={styles.fullscreenButton}
      >
        <Ionicons
          name={isFullScreen ? "contract" : "expand"}
          size={22}
          color="#fff"
        />
      </TouchableOpacity>
    </View>
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
);

export default SeekBar;

const styles = StyleSheet.create({
  seekSection: {
    width: "100%",
    position: "absolute",
    bottom: 5,
  },
  slider: {
    width: "100%",
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
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    marginBottom: -6,
    paddingVertical: 8,
  },
  timeText: {
    color: "#fff",
    fontSize: 12,
    opacity: 0.8,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    padding: 4,
    borderRadius: 8,
  },
  fullscreenButton: {},
  volumeSlider: {
    width: 120,
  },
  volumeSection: {
    flexDirection: "row",
    alignItems: "center",
  },
});
