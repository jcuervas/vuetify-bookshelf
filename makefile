dev: ## Run dev docker compose
	docker-compose -f dev.yml up -d

stop: ## stop dev compose
	docker-compose -f dev.yml down

prod: ## Run production built container
	docker build -f Dockerfile -t rpg/bookshelf-app .
	docker run -it -p 80:80 --rm --name bookshelf-prod rpg/bookshelf-app

help:
	echo "Usage: make [options] [arguments]\n"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' Makefile | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
