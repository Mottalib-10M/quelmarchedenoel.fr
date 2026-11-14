#!/usr/bin/env bash
# Relecture planifiée (npm run update-data, .github/workflows/deploy.yml) : télécharge l'export quotidien DATAtourisme
# et les communes de geo.api.gouv.fr dans un dossier temporaire (jamais commités), puis relance l'import au jour de Paris.
set -euo pipefail
cd "$(dirname "$0")/.."
T="${RUNNER_TEMP:-$(mktemp -d)}/datatourisme"
mkdir -p "$T"
UA='quelmarchedenoel.fr data reader (+https://quelmarchedenoel.fr)'
curl -sfL -m 900 -A "$UA" -o "$T/evenements.json.gz" https://data.cquest.org/datatourisme/evenements.json.gz
curl -sfL -m 120 -A "$UA" -o "$T/communes.json" 'https://geo.api.gouv.fr/communes?fields=nom,code,centre,population,codeDepartement,codeRegion&format=json'
python3 scripts/import-datatourisme.py "$T/evenements.json.gz" "$T/communes.json" "$(TZ=Europe/Paris date +%F)"
rm -rf "$T"
