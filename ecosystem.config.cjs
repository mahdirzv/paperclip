module.exports = {
  apps: [
    {
      name: "paperclip",
      cwd: "/Users/mahdi/paperclip",
      script: "/Users/mahdi/.nvm/versions/node/v22.21.1/bin/pnpm",
      args: "dev:once",
      watch: false,
      autorestart: true,
      max_restarts: 10,
      restart_delay: 5000,
      env: {
        NODE_ENV: "development",
        PATH: process.env.PATH,
      },
    },
  ],
};
