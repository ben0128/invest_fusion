.PHONY: build-and-push

build-and-push:
	docker build -t benwang0128/price-feed-service:latest ./backend/price-feed-service
	docker build -t benwang0128/user-auth-service:latest ./backend/user-auth-service
	docker build -t benwang0128/frontend:latest ./frontend
	docker push benwang0128/price-feed-service:latest
	docker push benwang0128/user-auth-service:latest
	docker push benwang0128/frontend:latest