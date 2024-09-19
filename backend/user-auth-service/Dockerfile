FROM oven/bun:1.1.28

WORKDIR /backend/user-auth-service

COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

COPY . .

RUN bun run build

EXPOSE 3000

CMD ["bun", "run", "start"]