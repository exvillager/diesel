.PHONY: build release

build:
	bun build.js

release:
ifndef TAG
	$(error TAG is required. Usage: make release TAG=v2.0.7)
endif
	git checkout main
	git pull origin main
	npm version $(TAG) --no-git-tag-version
	bun build.js
	git add package.json
	git commit -m "chore: bump version to $(TAG)"
	git tag $(TAG)
	git push origin main
	git push origin $(TAG)
	npm publish
