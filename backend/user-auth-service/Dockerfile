FROM oven/bun:1.1.28

WORKDIR /backend/user-auth-service

# COPY package.json bun.lockb ./
# RUN bun install --frozen-lockfile || bun install

RUN bunx prisma generate

COPY . .

RUN bun run build

EXPOSE 3000

CMD ["bun", "run", "dev"]