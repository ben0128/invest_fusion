.PHONY: all build push pull-dependencies run

# 定義變數
DOCKER_USERNAME := benwang0128
DOCKER_REPO := invest-fusion
BACKEND_SERVICES := price-fetch-service price-distribution-service user-auth-service
FRONTEND_SERVICE := frontend

# 主要目標：執行所有操作
all: build push run db

dev: build run

# 構建所有服務
build:
	@echo "開始構建所有服務..."
	docker compose build

# 推送所有服務到 Docker Hub
push:
	@echo "開始推送所有服務到 Docker Hub..."
	@for service in $(SERVICES); do \
		if [ "$$service" != "redis" ] && [ "$$service" != "kafka" ]; then \
			echo "推送 $$service..."; \
			docker push $(DOCKER_USERNAME)/$(DOCKER_REPO):$$service; \
		fi \
	done
	@echo "推送完成";

# 拉取依賴的鏡像（Redis 和 Kafka)
pull-dependencies:
	@echo "拉取 Redis 鏡像..."
	docker pull redis:latest
	@echo "拉取 Kafka 鏡像..."
	docker pull bitnami/kafka:latest

run:
	docker compose up -d

# 執行 Prisma 資料庫推送
db:
	@echo "執行 Prisma 資料庫推送..."
	cd backend/user-auth-service/prisma && bunx prisma db push
	@echo "Prisma 資料庫推送完成"


# 停止並移除所有服務
stop:
	@echo "關閉所有服務..."
	docker compose down -v
	@echo "所有服務已關閉並移除"

# 單獨構建服務的目標
frontend:
	docker compose build frontend

price-fetch-service:
	docker compose build price-fetch-service

price-distribution-service:
	docker compose build price-distribution-service

user-auth-service:
	docker compose build user-auth-service