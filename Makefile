install: install-root install-frontend

install-root:
	npm ci

install-frontend:
	cd frontend && npm ci

build:
	cd frontend && npm run build

start:
	npx start-server -s ./frontend/dist
