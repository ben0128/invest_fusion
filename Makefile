.PHONY: all build push pull-dependencies run

# 定義變數
DOCKER_USERNAME := benwang0128
DOCKER_REPO := invest-fusion
BACKEND_SERVICES := price-fetch-service price-distribution-service user-auth-service
FRONTEND_SERVICE := frontend

# 主要目標：執行所有操作
all: build push pull-dependencies run

dev: build run

# 構建所有服務
build:
	@echo "開始構建所有服務..."
	@for service in $(BACKEND_SERVICES); do \
		echo "構建 $$service..."; \
		docker build -t $(DOCKER_USERNAME)/$(DOCKER_REPO):$$service ./backend/$$service; \
	done
	@echo "構建 $(FRONTEND_SERVICE)..."; \
	docker build -t $(DOCKER_USERNAME)/$(DOCKER_REPO):$(FRONTEND_SERVICE) ./frontend;

# 推送所有服務到 Docker Hub
push:
	@echo "開始推送所有服務到 Docker Hub..."
	@for service in $(BACKEND_SERVICES); do \
		echo "推送 $$service..."; \
		docker push $(DOCKER_USERNAME)/$(DOCKER_REPO):$$service; \
	done
	@echo "推送 $(FRONTEND_SERVICE)..."; \
	docker push $(DOCKER_USERNAME)/$(DOCKER_REPO):$(FRONTEND_SERVICE);
	@echo "推送完成";

# 拉取依賴的鏡像（Redis 和 Kafka)
pull-dependencies:
	@echo "拉取 Redis 鏡像..."
	docker pull redis:latest
	@echo "拉取 Kafka 鏡像..."
	docker pull bitnami/kafka:latest

price-distribution-service:
	docker build -t $(DOCKER_USERNAME)/$(DOCKER_REPO):price-distribution-service ./backend/price-distribution-service

price-fetch-service:
	docker build -t $(DOCKER_USERNAME)/$(DOCKER_REPO):price-fetch-service ./backend/price-fetch-service

user-auth-service:
	docker build -t $(DOCKER_USERNAME)/$(DOCKER_REPO):user-auth-service ./backend/user-auth-service

frontend:
	docker build -t $(DOCKER_USERNAME)/$(DOCKER_REPO):frontend ./frontend

run:
	docker run -d -p 3100:3100 --name price-fetch-service --restart unless-stopped $(DOCKER_USERNAME)/$(DOCKER_REPO):price-fetch-service
	docker run -d -p 3200:3200 --name user-auth-service --restart unless-stopped $(DOCKER_USERNAME)/$(DOCKER_REPO):user-auth-service
	docker run -d -p 3300:3300 --name price-distribution-service --restart unless-stopped $(DOCKER_USERNAME)/$(DOCKER_REPO):price-distribution-service
	docker run -d -p 80:80 --name frontend --restart unless-stopped $(DOCKER_USERNAME)/$(DOCKER_REPO):frontend
	docker run -d -p 6379:6379 --name redis --restart unless-stopped redis:latest
	docker run -d --name kafka -p 9092:9092 \
		-e KAFKA_KRAFT_CLUSTER_ID=$(shell openssl rand -hex 16) \
		-e KAFKA_CFG_NODE_ID=1 \
		-e KAFKA_CFG_PROCESS_ROLES=broker,controller \
		-e KAFKA_CFG_CONTROLLER_QUORUM_VOTERS=1@kafka:9093 \
		-e KAFKA_CFG_LISTENERS=PLAINTEXT://:9092,CONTROLLER://:9093 \
		-e KAFKA_CFG_ADVERTISED_LISTENERS=PLAINTEXT://localhost:9092 \
		-e KAFKA_CFG_LISTENER_SECURITY_PROTOCOL_MAP=CONTROLLER:PLAINTEXT,PLAINTEXT:PLAINTEXT \
		-e KAFKA_CFG_CONTROLLER_LISTENER_NAMES=CONTROLLER \
		-e ALLOW_PLAINTEXT_LISTENER=yes \
		--restart unless-stopped \
		bitnami/kafka:latest

stop:
	@echo "關閉所有服務..."
	@for service in $(BACKEND_SERVICES) redis kafka; do \
		docker stop $$service; \
		docker rm $$service; \
	done
	@docker stop $(FRONTEND_SERVICE); \
	docker rm $(FRONTEND_SERVICE);
	@echo "所有服務已關閉並移除"
