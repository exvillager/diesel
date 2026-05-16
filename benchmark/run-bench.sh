#!/usr/bin/env bash

DIESEL="http://localhost:3000/user/123/post/456"
HONO="http://localhost:3001/user/123/post/456"

BOLD='\033[1m'
CYAN='\033[0;36m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RESET='\033[0m'

sep() {
  echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"
}

# ── wrk ─────────────────────────────────────────────
sep
echo -e "${BOLD}${YELLOW}[wrk]  4 threads · 500 connections · 15s${RESET}"
sep

echo -e "${GREEN}→ Diesel ($DIESEL)${RESET}"
wrk -t4 -c500 -d15s "$DIESEL"
echo ""

echo -e "${GREEN}→ Hono   ($HONO)${RESET}"
wrk -t4 -c500 -d15s "$HONO"
echo ""

# ── autocannon ──────────────────────────────────────
sep
echo -e "${BOLD}${YELLOW}[autocannon]  100 connections · 2 pipelining · 5s${RESET}"
sep

echo -e "${GREEN}→ Diesel ($DIESEL)${RESET}"
autocannon -c 100 -d 5 -p 2 "$DIESEL"
echo ""

echo -e "${GREEN}→ Hono   ($HONO)${RESET}"
autocannon -c 100 -d 5 -p 2 "$HONO"
echo ""

# ── oha ─────────────────────────────────────────────
sep
echo -e "${BOLD}${YELLOW}[oha]  100 connections · 1,000,000 requests${RESET}"
sep

echo -e "${GREEN}→ Diesel ($DIESEL)${RESET}"
oha -c 100 -n 1000000 "$DIESEL"
echo ""

echo -e "${GREEN}→ Hono   ($HONO)${RESET}"
oha -c 100 -n 1000000 "$HONO"
echo ""

sep
echo -e "${BOLD}  All benchmarks done.${RESET}"
sep
