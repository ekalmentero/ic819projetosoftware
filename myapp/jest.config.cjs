// Sync object
/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
    verbose: true,
  };
  
  module.exports = config;
  
  // Or async function
  module.exports = async () => {
    return {
        verbose: true,
        transformIgnorePatterns: [
      "node_modules/(?!(jest-)?react-native|react-(native|universal|navigation)-(.*)|@react-native-community/(.*)|@react-navigation/(.*)|bs-platform|(@[a-zA-Z]+/)?(bs|reason|rescript)-(.*)+)"
    ]
    };
  };