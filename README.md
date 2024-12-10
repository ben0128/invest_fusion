# Invest Fusion

Invest Fusion 是一個使用現代技術堆棧構建的資產管理平台。該項目採用微服務架構，結合 AWS 和 Cloudflare 的優勢，提供高效能、安全且可擴展的投資組合管理解決方案。

## 技術棧

### 核心技術
- **前端**：Next.js, TailwindCSS
- **後端**：Bun, Elysia, gRPC, Kafka
- **數據庫**：MongoDB
- **API 管理**：tRPC, gRPC
- **部署**：Docker, Docker-compose
- **開發工具**：
  - 版本控制：Git
  - 編輯器：Cursor
  - 運行環境：Bun (TypeScript 編譯、執行、打包、依賴管理)

### 雲服務
- **AWS 服務**：
  - Cognito (身份認證與授權)
  - API Gateway (API 管理)
  - Kafka (數據流處理)
  - Lambda (數據處理與轉發)
  
- **Cloudflare 服務**：
  - Workers (API Gateway)
  - KV (快取)
  - R2 (檔案存儲)
  - Durable Objects (即時狀態管理)
  - Workers Queue (消息佇列)

## 系統架構

### 服務說明
- **認證服務**：
  - AWS Cognito 用戶認證服務：
    - 支持多種身份驗證方式
    - 整合第三方登入 (Google, Facebook, Apple)
    - JWT Token 管理與驗證
    - 用戶池管理
    - MFA 支持
  
- **數據處理服務**：
  - 價格獲取服務 (Price Fetch Service)：負責從各種來源獲取價格數據
  - 價格分發服務 (Price Distribution Service)：處理價格數據的分發
  - 價格數據採集 (AWS)
  - 數據清洗和轉換 (Lambda)
  - 即時數據分發 (Cloudflare)

- **存儲服務**：
  - 快取管理 (Cloudflare KV)
  - 檔案存儲 (Cloudflare R2)
  - 即時狀態 (Durable Objects)

- **即時通訊**：
  - WebSocket/SSE 支持
  - 全球分佈式部署
  - 低延遲數據推送

## 前提條件

- 安裝 Docker 和 Docker Compose
- 安裝 Bun
- AWS 帳號設置與配置：
  - Cognito 用戶池設置
  - API Gateway 配置
  - 其他 AWS 服務配置
- Cloudflare 帳號設置

## 運行項目

1. 克隆倉庫：
   ```bash
   git clone https://github.com/ben0128/invest-fusion.git
   cd invest-fusion
   ```

2. 環境設置：
   - 配置 AWS Cognito 憑證
   - 設置其他 AWS 服務憑證
   - 配置 Cloudflare 憑證
   - 配置環境變數

3. 安裝依賴：
   ```bash
   # 前端依賴
   cd frontend && bun install
   
   # 後端服務依賴
   cd backend/{service-name} && bun install
   ```

4. 啟動服務：
   ```bash
   make run
   ```

## 開發指南

- 本地開發時請確保已正確配置所有必要的環境變數
- 使用 `make` 命令進行服務管理
- 遵循項目的代碼規範和 Git 工作流程

## 授權

本項目採用 MIT 授權。詳情請參見 LICENSE 文件。

## 系統架構