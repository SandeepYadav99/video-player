import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";

// Controls Component
const Controls = ({ status, handlePlayPause, playNext, playPrev }) => (
  <View style={styles.skipRow}>
    <TouchableOpacity onPress={playPrev}>
      <Ionicons name="play-skip-back-outline" size={36} color="#fff" />
    </TouchableOpacity>
    {/* <TouchableOpacity onPress={handlePlayPause}>
      <Ionicons
        name={status.isPlaying ? "pause-circle" : "play-circle"}
        size={60}
        color="#1EB1FC"
      />
    </TouchableOpacity> */}
    <TouchableOpacity onPress={playNext}>
      <Ionicons name="play-skip-forward-outline" size={36} color="#fff" />
    </TouchableOpacity>
  </View>
);

export default Controls;

const styles = StyleSheet.create({
    skipRow: {
    position: "absolute",
    top: "50%",
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    transform: [{ translateY: -30 }],
  }
})