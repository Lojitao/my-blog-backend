# 使用 Node.js 基礎映像作為建構環境
FROM node:18 AS builder

# 設置工作目錄
WORKDIR /app

# 複製依賴文件並安裝
COPY package.json package-lock.json ./
RUN npm install

# 複製源碼並執行構建
COPY . .
RUN npm run build

# 最終階段只輸出構建結果
FROM alpine:latest
WORKDIR /output

# 從建構階段複製靜態文件
COPY --from=builder /app/dist .

# 沒有 CMD，因為 Nginx 在其他容器中運行