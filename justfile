deploy:
  docker --context=hetzner compose -f docker-compose.production.yml up -d --build
