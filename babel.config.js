// module.exports = {
//   presets: ['module:@react-native/babel-preset'],
// };
// babel.config.js
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    "nativewind/babel",
    "react-native-reanimated/plugin",
  ],
};