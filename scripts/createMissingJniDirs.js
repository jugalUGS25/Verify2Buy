const fs = require('fs');
const path = require('path');

const dirs = [
  '@react-native-async-storage/async-storage',
  'react-native-gesture-handler',
  'react-native-reanimated',
  'react-native-vector-icons',
  'react-native-view-shot',
  'react-native-worklets'
];

dirs.forEach(pkg => {
  const jniPath = path.join(__dirname, '..', 'node_modules', pkg, 'android', 'build', 'generated', 'source', 'codegen', 'jni');
  if (!fs.existsSync(jniPath)) {
    fs.mkdirSync(jniPath, { recursive: true });
    console.log(`Created: ${jniPath}`);
  }
});
