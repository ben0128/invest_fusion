FROM oven/bun:1.1.28

WORKDIR /backend/price-distribution-service

# COPY package.json bun.lockb ./
# RUN bun install --frozen-lockfile || bun install

COPY . .

RUN bun run build

EXPOSE 3000

CMD ["bun", "run", "dev"]
