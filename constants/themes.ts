type ThemeType = {
  gradient: readonly [string, string, string]; // Explicitly typed as a tuple
  track: string;
  thumb: string;
  title: string;
  ruleNumberColor: string;
  buttonBg: string;
};

const themes: { [key: string]: ThemeType } = {
  crazy: {
    gradient: ["#FF6B8B", "#A65EEA", "#5E72EB"],
    track: "#A65EEA",
    thumb: "#5E72EB",
    title: "#7B1FA2",
    ruleNumberColor: "#6C3483",
    buttonBg: "rgba(156, 39, 176, 0.9)",
  },
  classic: {
    gradient: ["#4CAF50", "#2196F3", "#3F51B5"],
    track: "#2196F3",
    thumb: "#3F51B5",
    title: "#3F51B5",
    ruleNumberColor: "#2E7D32",
    buttonBg: "rgba(33, 150, 243, 0.9)",
  },
};

export default themes;
