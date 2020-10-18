module.exports = {
  apps: [
    {
      name: 'Knot',
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start --port=6969',
      node_args: '--max_old_space_size=4096',
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
}
