module.exports = {
    apps: [
      {
        name: 'my-node-app',
        script: './routes.js', // 메인 앱 파일
        instances: 0, // CPU 코어 수에 따라 자동 설정
        autorestart: true,
        watch: false, // 프로덕션 환경에서는 false 권장
        max_memory_restart: '1G', // 메모리 사용 패턴에 따라 설정
        env: {
          NODE_ENV: 'development',
        },
        env_production: {
          NODE_ENV: 'production',
        },
      },
    ],
  };
  