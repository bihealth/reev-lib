SHELL := bash -euo pipefail

.PHONY: help
help:
	@echo "Usage: make <target>"
	@echo
	@echo "Targets:"
	@echo "  help        This help (default target)"
	@echo "  deps        Install all dependencies"
	@echo "  format      Format source code"
	@echo "  lint        Run lint checks"
	@echo "  test        Run tests (no watch)"
	@echo "  test-ci     Run tests (no watch) for CI (with coverage, single-threaded)"
	@echo "  test-nocov  Run tests (no watch) without coverage"
	@echo "  proto-fetch Fetch protobuf files"
	@echo "  proto-ts    Generate .ts from .proto files"
	@echo "  proto	     Fetch, generate, and format .ts from .proto files"
	@echo "  test-w      Run tests (watch)"
	@echo "  ci          Install dependencies, run lints and tests"
	@echo "  serve       Run the Storybook server"

.PHONY: deps
deps:
	npm install --include=dev

.PHONY: format
format:
	npm run format

.PHONY: lint
lint:
	npm run lint
	npm run type-check
	npm run format:check

.PHONY: test
test:
	npm run -- test:unit --run

# Tests in the CI are forced into a single thread as the worker only has
# two cores only and some tests run into timeouts otherwise.
.PHONY: test-ci
test-ci:
	npm run -- test:unit --run --poolOptions.threads.maxThreads=1 --poolOptions.threads.minThreads=1

.PHONY: test-nocov
test-nocov:
	npm run -- test:unit:nocov --run

.PHONY: test-w
test-w:
	npm run -- test:unit

.PHONY: ci
ci: \
	deps \
	lint \
	test

.PHONY: serve
serve:
	npm run storybook

.PHONY: serve-public
serve-public:
	npm run storybook -- --host=0.0.0.0

PROTO_BASE_ANNONARS := https://raw.githubusercontent.com/varfish-org/annonars/main
PROTO_BASE_MEHARI := https://raw.githubusercontent.com/varfish-org/mehari/main

.PHONY: proto-fetch
proto-fetch:
	rm -rf protos/annonars/{clinvar,clinvar_data,cons,dbsnp,functional,genes,gnomad,helixmtdb,regions}
	mkdir -p protos/annonars/{clinvar,clinvar_data,cons,dbsnp,functional,genes,gnomad,helixmtdb,regions}
	wget -O protos/annonars/clinvar/minimal.proto $(PROTO_BASE_ANNONARS)/protos/annonars/clinvar/minimal.proto
	wget -O protos/annonars/clinvar/per_gene.proto $(PROTO_BASE_ANNONARS)/protos/annonars/clinvar/per_gene.proto
	wget -O protos/annonars/clinvar/sv.proto $(PROTO_BASE_ANNONARS)/protos/annonars/clinvar/sv.proto
	wget -O protos/annonars/clinvar_data/class_by_freq.proto $(PROTO_BASE_ANNONARS)/protos/annonars/clinvar_data/class_by_freq.proto
	wget -O protos/annonars/clinvar_data/clinvar_public.proto $(PROTO_BASE_ANNONARS)/protos/annonars/clinvar_data/clinvar_public.proto
	wget -O protos/annonars/clinvar_data/extracted_vars.proto $(PROTO_BASE_ANNONARS)/protos/annonars/clinvar_data/extracted_vars.proto
	wget -O protos/annonars/clinvar_data/gene_impact.proto $(PROTO_BASE_ANNONARS)/protos/annonars/clinvar_data/gene_impact.proto
	wget -O protos/annonars/clinvar_data/phenotype_link.proto $(PROTO_BASE_ANNONARS)/protos/annonars/clinvar_data/phenotype_link.proto
	wget -O protos/annonars/cons/base.proto $(PROTO_BASE_ANNONARS)/protos/annonars/cons/base.proto
	wget -O protos/annonars/dbsnp/base.proto $(PROTO_BASE_ANNONARS)/protos/annonars/dbsnp/base.proto
	wget -O protos/annonars/functional/refseq.proto $(PROTO_BASE_ANNONARS)/protos/annonars/functional/refseq.proto
	wget -O protos/annonars/genes/base.proto $(PROTO_BASE_ANNONARS)/protos/annonars/genes/base.proto
	wget -O protos/annonars/gnomad/exac_cnv.proto $(PROTO_BASE_ANNONARS)/protos/annonars/gnomad/exac_cnv.proto
	wget -O protos/annonars/gnomad/gnomad2.proto $(PROTO_BASE_ANNONARS)/protos/annonars/gnomad/gnomad2.proto
	wget -O protos/annonars/gnomad/gnomad3.proto $(PROTO_BASE_ANNONARS)/protos/annonars/gnomad/gnomad3.proto
	wget -O protos/annonars/gnomad/gnomad4.proto $(PROTO_BASE_ANNONARS)/protos/annonars/gnomad/gnomad4.proto
	wget -O protos/annonars/gnomad/gnomad_cnv4.proto $(PROTO_BASE_ANNONARS)/protos/annonars/gnomad/gnomad_cnv4.proto
	wget -O protos/annonars/gnomad/gnomad_sv2.proto $(PROTO_BASE_ANNONARS)/protos/annonars/gnomad/gnomad_sv2.proto
	wget -O protos/annonars/gnomad/gnomad_sv4.proto $(PROTO_BASE_ANNONARS)/protos/annonars/gnomad/gnomad_sv4.proto
	wget -O protos/annonars/gnomad/mtdna.proto $(PROTO_BASE_ANNONARS)/protos/annonars/gnomad/mtdna.proto
	wget -O protos/annonars/gnomad/vep_common.proto $(PROTO_BASE_ANNONARS)/protos/annonars/gnomad/vep_common.proto
	wget -O protos/annonars/gnomad/vep_gnomad2.proto $(PROTO_BASE_ANNONARS)/protos/annonars/gnomad/vep_gnomad2.proto
	wget -O protos/annonars/gnomad/vep_gnomad3.proto $(PROTO_BASE_ANNONARS)/protos/annonars/gnomad/vep_gnomad3.proto
	wget -O protos/annonars/gnomad/vep_gnomad4.proto $(PROTO_BASE_ANNONARS)/protos/annonars/gnomad/vep_gnomad4.proto
	wget -O protos/annonars/helixmtdb/base.proto $(PROTO_BASE_ANNONARS)/protos/annonars/helixmtdb/base.proto
	wget -O protos/annonars/regions/clingen.proto $(PROTO_BASE_ANNONARS)/protos/annonars/regions/clingen.proto
	mkdir -p protos/mehari
	wget -O protos/mehari/server.proto $(PROTO_BASE_MEHARI)/protos/mehari/server.proto
	wget -O protos/mehari/txs.proto $(PROTO_BASE_MEHARI)/protos/mehari/txs.proto

.PHONY: proto-ts
proto-ts:
	mkdir -p src/pbs
	npx protoc --ts_opt keep_enum_prefix --ts_opt long_type_string --ts_out src/pbs --proto_path protos protos/annonars/*/*.proto
	npx protoc --ts_opt keep_enum_prefix --ts_opt long_type_string --ts_out src/pbs --proto_path protos protos/mehari/*.proto

.PHONY: proto
proto: proto-fetch proto-ts format lint

.PHONY: openapi
openapi: \
	openapi-annonars-ts \
	openapi-mehari-ts \
	openapi-cadaPrio-ts \
	openapi-dotty-ts \
	openapi-variantValidator-ts \
	openapi-viguno-ts \
	format \
	lint

.PHONY: openapi-annonars-fetch
openapi-annonars-fetch:
	mkdir -p ext/annonars-api

	rm -f ext/annonars-api/openapi.yaml
	docker pull ghcr.io/varfish-org/annonars:main
	docker run --rm -v $(PWD)/ext/annonars-api:/opt/annonars-api --entrypoint /usr/local/bin/annonars \
		ghcr.io/varfish-org/annonars:main \
			server schema --output-file /opt/annonars-api/openapi.yaml

.PHONY: openapi-annonars-ts
openapi-annonars-ts: openapi-annonars-fetch
	rm -rf ext/annonars-api/src/lib
	mkdir -p ext/annonars-api/src
	npx @hey-api/openapi-ts --file openapi-ts.config.annonars.ts

.PHONY: openapi-mehari-fetch
openapi-mehari-fetch:
	mkdir -p ext/mehari-api

	rm -f ext/mehari-api/openapi.yaml
	docker pull ghcr.io/varfish-org/mehari:main
	docker run --rm -v $(PWD)/ext/mehari-api:/opt/mehari-api --entrypoint /usr/local/bin/mehari \
		ghcr.io/varfish-org/mehari:main \
			server schema --output-file /opt/mehari-api/openapi.yaml

.PHONY: openapi-mehari-ts
openapi-mehari-ts: openapi-mehari-fetch
	rm -rf ext/mehari-api/src/lib
	mkdir -p ext/mehari-api/src
	npx @hey-api/openapi-ts --file openapi-ts.config.mehari.ts

.PHONY: openapi-cadaPrio-fetch
openapi-cadaPrio-fetch:
	mkdir -p ext/cadaPrio-api

	rm -f ext/cadaPrio-api/openapi.yaml
	docker pull ghcr.io/bihealth/cada-prio:main
	docker run ghcr.io/bihealth/cada-prio:main cada-prio utils dump-openapi-yaml /dev/stdout \
	| grep -v '^+' \
	> ext/cadaPrio-api/openapi.yaml

.PHONY: openapi-cadaPrio-ts
openapi-cadaPrio-ts: openapi-cadaPrio-fetch
	rm -rf ext/cadaPrio-api/src/lib
	mkdir -p ext/cadaPrio-api/src
	npx @hey-api/openapi-ts --file openapi-ts.config.cadaPrio.ts

.PHONY: openapi-dotty-fetch
openapi-dotty-fetch:
	mkdir -p ext/dotty-api

	rm -f ext/dotty-api/openapi.yaml
	docker pull ghcr.io/bihealth/dotty:main
	docker run ghcr.io/bihealth/dotty:main python -m dotty.main \
	| grep -v '^+' \
	> ext/dotty-api/openapi.yaml

.PHONY: openapi-dotty-ts
openapi-dotty-ts: openapi-dotty-fetch
	rm -rf ext/dotty-api/src/lib
	mkdir -p ext/dotty-api/src
	npx @hey-api/openapi-ts --file openapi-ts.config.dotty.ts

.PHONY: openapi-variantValidator-fetch
openapi-variantValidator-fetch:
	mkdir -p ext/variantValidator-api

	rm -f ext/variantValidator-api/openapi.yaml
	wget -O ext/variantValidator-api/openapi.yaml \
		https://rest.variantvalidator.org/swagger.json

.PHONY: openapi-variantValidator-ts
openapi-variantValidator-ts: openapi-variantValidator-fetch
	rm -rf ext/variantValidator-api/src/lib
	mkdir -p ext/variantValidator-api/src
	npx @hey-api/openapi-ts --file openapi-ts.config.variantValidator.ts

.PHONY: openapi-viguno-fetch
openapi-viguno-fetch:
	rm -rf ext/viguno-api/openapi.yaml
	mkdir -p ext/viguno-api

	docker pull ghcr.io/varfish-org/viguno:main
	docker run -t ghcr.io/varfish-org/viguno:main \
		exec viguno server schema --output-file /dev/stdout \
	| grep -v ' INFO' \
	| grep -v '^+' \
	> ext/viguno-api/openapi.yaml

.PHONY: openapi-viguno-ts
openapi-viguno-ts: openapi-viguno-fetch
	rm -rf ext/viguno-api/src/lib
	mkdir -p ext/viguno-api/src
	npx @hey-api/openapi-ts --file openapi-ts.config.viguno.ts
