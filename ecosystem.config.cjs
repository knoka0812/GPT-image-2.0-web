module.exports = {
  apps: [
    {
      name: 'ai-image-app',
      script: 'server/index.js',
      cwd: '/opt/ai-image-app',
      env: {
        NODE_ENV: 'production',
        PORT: 3003
      }
    }
  ]
}
