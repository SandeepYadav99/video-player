import { StyleSheet, Text } from "react-native";

// VideoTitle Component
const VideoTitle = ({ title }) => <Text style={styles.title}>{title}</Text>;

export default VideoTitle;

const styles = StyleSheet.create({
  title: {
    color: "#000",
    fontSize: 18,
    fontWeight: "600",
    marginTop: 20,
  },
});
