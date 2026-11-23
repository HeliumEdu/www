.PHONY: all install build run-devserver preview build-og-image

SHELL := /usr/bin/env bash

all: build

node_modules: package-lock.json
	npm ci
	touch node_modules

install: node_modules

build: install
	npm run build

run-devserver: install
	npm run dev

preview: build
	npm run preview

build-og-image:
	npm run build-og-image
