.PHONY: all build push pull-dependencies lint run

# 定義變數
DOCKER_USERNAME := benwang0128
BACKEND_SERVICES := price-feed-service user-auth-service
FRONTEND_SERVICE := frontend

ifeq ($(OS),Windows_NT)
    CURRENT_DIR := %CD%
    PATH_SEP := \
else
    CURRENT_DIR := $$(pwd)
    PATH_SEP := /
endif

# 主要目標：執行所有操作
all: build push pull-dependencies lint run

dev: build lint run

# 構建所有服務
build:
	@echo "開始構建所有服務..."
	@for service in $(BACKEND_SERVICES); do \
		echo "構建 $$service..."; \
		docker build -t $(DOCKER_USERNAME)/$$service:latest ./backend/$$service; \
	done
	@echo "構建 $(FRONTEND_SERVICE)..."; \
	docker build -t $(DOCKER_USERNAME)/$(FRONTEND_SERVICE):latest ./frontend;

# 推送所有服務到 Docker Hub
push:
	@echo "開始推送所有服務到 Docker Hub..."
	@for service in $(BACKEND_SERVICES); do \
		echo "推送 $$service..."; \
		docker push $(DOCKER_USERNAME)/$$service:latest; \
	done
	@echo "推送 $(FRONTEND_SERVICE)..."; \
	docker push $(DOCKER_USERNAME)/$(FRONTEND_SERVICE):latest;
	@echo "推送完成";

# 拉取依賴的鏡像（Redis 和 RabbitMQ）
pull-dependencies:
	@echo "拉取 Redis 鏡像..."
	docker pull redis:latest
	@echo "拉取 RabbitMQ 鏡像..."
	docker pull rabbitmq:3-management

lint:
	@echo "開始 lint 所有服務..."
	@for service in $(BACKEND_SERVICES); do \
		echo "lint $$service..."; \
		docker run --rm -v "$(CURRENT_DIR)$(PATH_SEP)backend$(PATH_SEP)$$service":/app -w /app $(DOCKER_USERNAME)/$$service:latest bun run lint; \
	done
	@echo "lint 前端服務..."; \
	docker run --rm -v "$(CURRENT_DIR)$(PATH_SEP)frontend":/app -w /app $(DOCKER_USERNAME)/$(FRONTEND_SERVICE):latest bun run lint; \
	@echo "lint 完成";

# 個別服務的構建目標
price-feed-service:
	docker build -t $(DOCKER_USERNAME)/price-feed-service:latest ./backend/price-feed-service

user-auth-service:
	docker build -t $(DOCKER_USERNAME)/user-auth-service:latest ./backend/user-auth-service

frontend:
	docker build -t $(DOCKER_USERNAME)/frontend:latest ./frontend

run:
	docker run -d -p 3100:3100 $(DOCKER_USERNAME)/price-feed-service:latest
	docker run -d -p 3200:3200 $(DOCKER_USERNAME)/user-auth-service:latest
	docker run -d -p 80:80 $(DOCKER_USERNAME)/frontend:latest