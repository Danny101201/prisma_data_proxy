name=Danny
API_URL=prisma-data-proxy-rho.vercel.app
test:
	@echo $(name)
load-k6:
	k6 run -e API_URL=$(API_URL) loadtest.js