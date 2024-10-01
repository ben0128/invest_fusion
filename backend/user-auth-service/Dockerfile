FROM oven/bun:1.1.28

WORKDIR /backend/user-auth-service

COPY package.json bun.lockb ./
# RUN bun install --frozen-lockfile || bun install

# 複製 prisma 的 schema 到容器中
COPY prisma/schema.prisma ./prisma/

# 生成 prisma client
RUN bunx prisma generate --no-engine

COPY . .

RUN bun run build

EXPOSE 3000

CMD ["bun", "run", "dev"]