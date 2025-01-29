module.exports = {
    name: '__APP_NAME__',
    filename: 'remoteEntry.js',
       shared: {
      react: { singleton: true, requiredVersion: '^18.2.0' },
      'react-dom': { singleton: true, requiredVersion: '^18.2.0' }
    }
  };