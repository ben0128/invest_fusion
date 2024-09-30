# Invest Fusion

Invest Fusion 是一個使用現代技術堆棧構建的投資平台。該項目採用微服務架構，包含前端和多個後端服務。

## 技術棧

- **前端**：Next.js, React, TailwindCSS
- **後端**：Bun, Elysia, gRPC, Kafka, Redis
- **數據庫**：MongoDB
- **API 管理**：trpc, grpc
- **部署**：docker, docker-compose
- **版本控制**：git
- **編輯器**：cursor
- **bun**：前後端typescript編譯器, 執行環境, 打包工具, 依賴管理工具

## 服務說明

- **前端服務**：使用 React 和 Next.js 構建的用戶界面。
- **價格獲取服務（Price Fetch Service）**：負責從各種來源獲取價格數據。
- **價格分發服務（Price Distribution Service）**：處理價格數據的分發。
- **用戶認證服務（User Auth Service）**：管理用戶認證和授權和獲取客戶資訊。

## 前提條件

- 安裝 Docker 和 Docker Compose
- 安裝 Bun

## 運行項目

1. 克隆倉庫：
   ```
   git clone https://github.com/ben0128/invest-fusion.git
   cd invest-fusion
   ```

2. 為了加快build速度, 請先進到個別服務的資料夾底下先跑一次bun install(docker 在掛載檔案時會從本地端拉node_modules, 所以需要先跑一次bun install)

3. 後端服務開發
   對於每個後端服務（price-fetch-service、price-distribution-service、user-auth-service），執行：
   ```
   cd backend/{service-name}
   bun install
   ```

4. 前端開發
   ```
   cd frontend
   bun install
   ```

5. 啟動服務(zsh)：
   ```
   make run
   ```

## 授權

本項目採用 MIT 授權。詳情請參見 LICENSE 文件。