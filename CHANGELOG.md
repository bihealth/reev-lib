# Changelog

## [0.5.0](https://github.com/bihealth/reev-frontend-lib/compare/v0.4.5...v0.5.0) (2024-02-06)


### Features

* adding store/cadaPrio ([#76](https://github.com/bihealth/reev-frontend-lib/issues/76)) ([4061290](https://github.com/bihealth/reev-frontend-lib/commit/40612907713becce6fdaa1305440bd89bbc1318c))
* adding store/geneInfo ([#72](https://github.com/bihealth/reev-frontend-lib/issues/72)) ([92450e3](https://github.com/bihealth/reev-frontend-lib/commit/92450e3b8fa0a300e170eb2de06516f749cf9a47))
* even more types for stores and apis ([#90](https://github.com/bihealth/reev-frontend-lib/issues/90)) ([94ecb9f](https://github.com/bihealth/reev-frontend-lib/commit/94ecb9febedf697b6966f8f717a1701669f3ec67))
* expose router in setupMountedComponents ([#75](https://github.com/bihealth/reev-frontend-lib/issues/75)) ([e62f009](https://github.com/bihealth/reev-frontend-lib/commit/e62f0092edc1009e2dcb90524e47c35b4be8344a))
* fix parsing of non-uppercase SvType (bihealth/reev[#434](https://github.com/bihealth/reev-frontend-lib/issues/434)) ([#95](https://github.com/bihealth/reev-frontend-lib/issues/95)) ([761d416](https://github.com/bihealth/reev-frontend-lib/commit/761d416e9180d35aeb5655ca257a6f2d562ff64a))
* further improvements to literature highlighting ([#93](https://github.com/bihealth/reev-frontend-lib/issues/93)) ([538bfc0](https://github.com/bihealth/reev-frontend-lib/commit/538bfc06154da6a0465d9091094ab0a36e7e29a8))
* integrate plotly-based clinvar landscape ([#94](https://github.com/bihealth/reev-frontend-lib/issues/94)) ([ec7641e](https://github.com/bihealth/reev-frontend-lib/commit/ec7641ed4579793721fb65401af2f5956d91866d))
* make API base urls configurable ([#66](https://github.com/bihealth/reev-frontend-lib/issues/66)) ([7bd9dfd](https://github.com/bihealth/reev-frontend-lib/commit/7bd9dfd6a8152fac06c3e6b3799b70f02fc4f5f7))
* more types in stores and slot in GenePathogenicityCard ([#89](https://github.com/bihealth/reev-frontend-lib/issues/89)) ([9be207e](https://github.com/bihealth/reev-frontend-lib/commit/9be207e77e4de33381d3e645d68ba3c0505262c5))


### Bug Fixes

* adjusting api/viguno to reality ([#70](https://github.com/bihealth/reev-frontend-lib/issues/70)) ([8aa9a87](https://github.com/bihealth/reev-frontend-lib/commit/8aa9a876e18f9650144c00ff37cf1ff7ce4606b0))
* Allow components to be used in exports ([#71](https://github.com/bihealth/reev-frontend-lib/issues/71)) ([6f57554](https://github.com/bihealth/reev-frontend-lib/commit/6f575542a7daaeee1458324681a1f1ccf30b0162))
* api/annonars type GeneInfoResult ([#68](https://github.com/bihealth/reev-frontend-lib/issues/68)) ([4476c13](https://github.com/bihealth/reev-frontend-lib/commit/4476c13a31229959909eac13b5225673c690f3ff))
* api/mehari SeqvarResultEntry parsing ([#69](https://github.com/bihealth/reev-frontend-lib/issues/69)) ([65b5d96](https://github.com/bihealth/reev-frontend-lib/commit/65b5d96ce269d6b5ae5a5e72ea503a6809854d87))
* cada-prio API result types ([#83](https://github.com/bihealth/reev-frontend-lib/issues/83)) ([18d85a2](https://github.com/bihealth/reev-frontend-lib/commit/18d85a243488bacd2afb81bbe00d844cbd254312))
* color coding of gene-clinvar plots (bihealth/reev[#445](https://github.com/bihealth/reev-frontend-lib/issues/445)) ([#97](https://github.com/bihealth/reev-frontend-lib/issues/97)) ([79658a3](https://github.com/bihealth/reev-frontend-lib/commit/79658a318a4cb5f812b801faf1410d56a91d9a23))
* display score with largest absolute value for MMSplice ([#444](https://github.com/bihealth/reev-frontend-lib/issues/444)) ([#100](https://github.com/bihealth/reev-frontend-lib/issues/100)) ([fd35564](https://github.com/bihealth/reev-frontend-lib/commit/fd35564263d7620381cc4339b4502aa73392d85e))
* display splicing scores even when non-coding (bihealth/reev[#446](https://github.com/bihealth/reev-frontend-lib/issues/446)) ([#99](https://github.com/bihealth/reev-frontend-lib/issues/99)) ([d30f492](https://github.com/bihealth/reev-frontend-lib/commit/d30f492e95a917ae60813991ea159484ea91a0e1))
* fixing rank display issues triggering bug (bihealth/reev[#433](https://github.com/bihealth/reev-frontend-lib/issues/433)) ([#96](https://github.com/bihealth/reev-frontend-lib/issues/96)) ([fcf376e](https://github.com/bihealth/reev-frontend-lib/commit/fcf376e4aba41fb531799b624f1516a079504e51))
* more adjustments and fixes ([#92](https://github.com/bihealth/reev-frontend-lib/issues/92)) ([1f2f8b2](https://github.com/bihealth/reev-frontend-lib/commit/1f2f8b29d2d6a9e7fe49b0dc99c3cd908b19227a))
* remove pinia export from stores ([#85](https://github.com/bihealth/reev-frontend-lib/issues/85)) ([78406e6](https://github.com/bihealth/reev-frontend-lib/commit/78406e612456070352e66983ea0ebdf0598ee91c))
* remove requirement of genes having HPO terms (bihealth/reev[#447](https://github.com/bihealth/reev-frontend-lib/issues/447)) ([#98](https://github.com/bihealth/reev-frontend-lib/issues/98)) ([d570f1c](https://github.com/bihealth/reev-frontend-lib/commit/d570f1c7d1818322cdd35f4169f4fe8c93cb7100))
* removing card component margins ([#74](https://github.com/bihealth/reev-frontend-lib/issues/74)) ([e62913b](https://github.com/bihealth/reev-frontend-lib/commit/e62913b471e33780e9dcb0b991ee78ada934c1c4))
* use genomeRelease in geneInfo store ([#73](https://github.com/bihealth/reev-frontend-lib/issues/73)) ([6a9672d](https://github.com/bihealth/reev-frontend-lib/commit/6a9672de6527ad52a0aa9ad0a4323998afb7dfb6))

## [0.4.5](https://github.com/bihealth/reev-frontend-lib/compare/v0.4.4...v0.4.5) (2024-01-31)


### ⚠ BREAKING CHANGES

* more comprehensive usage of types ([#65](https://github.com/bihealth/reev-frontend-lib/issues/65))

### Bug Fixes

* more comprehensive usage of types ([#64](https://github.com/bihealth/reev-frontend-lib/issues/64)) ([c1c2ff3](https://github.com/bihealth/reev-frontend-lib/commit/c1c2ff38b861f65d88e4af5766879309cba41407))
* more comprehensive usage of types ([#65](https://github.com/bihealth/reev-frontend-lib/issues/65)) ([74758a2](https://github.com/bihealth/reev-frontend-lib/commit/74758a25d546e235e41c647beb20d3d7979d5ad7))
* no more @/includes in case of using as linked src ([#62](https://github.com/bihealth/reev-frontend-lib/issues/62)) ([649b423](https://github.com/bihealth/reev-frontend-lib/commit/649b423847dd30c326237f9660115d9d7e38887d))

## [0.4.4](https://github.com/bihealth/reev-frontend-lib/compare/v0.4.3...v0.4.4) (2024-01-31)


### Bug Fixes

* npm package contents (was empty, fix in CI) ([#60](https://github.com/bihealth/reev-frontend-lib/issues/60)) ([c05525a](https://github.com/bihealth/reev-frontend-lib/commit/c05525ad06b8a5cbca269c644cdd59017430c015))

## [0.4.3](https://github.com/bihealth/reev-frontend-lib/compare/v0.4.2...v0.4.3) (2024-01-31)


### Features

* adding api/annonars ([#36](https://github.com/bihealth/reev-frontend-lib/issues/36)) ([7edc750](https://github.com/bihealth/reev-frontend-lib/commit/7edc7500976730e9b4cf7b0acc55a1eab4c66e37))
* adding api/cadaPrio ([#37](https://github.com/bihealth/reev-frontend-lib/issues/37)) ([3ad1082](https://github.com/bihealth/reev-frontend-lib/commit/3ad1082a05bc3dfcaff633b9b7a17aab116105f3))
* adding api/mehari ([#35](https://github.com/bihealth/reev-frontend-lib/issues/35)) ([6709873](https://github.com/bihealth/reev-frontend-lib/commit/67098736e4f308647f97fdd6c6424916c9be47e9))
* adding api/variantValidator ([#38](https://github.com/bihealth/reev-frontend-lib/issues/38)) ([d9bfe61](https://github.com/bihealth/reev-frontend-lib/commit/d9bfe61d5af28b8983bd8fc25b8ba712c184ac56))
* adding bucket file for components ([#56](https://github.com/bihealth/reev-frontend-lib/issues/56)) ([c08d7ea](https://github.com/bihealth/reev-frontend-lib/commit/c08d7eaaa4a27970f9f297f4dac624705d17a74c))
* adding GeneClinvarCard ([#29](https://github.com/bihealth/reev-frontend-lib/issues/29)) ([6df53a2](https://github.com/bihealth/reev-frontend-lib/commit/6df53a20ae53882e16a07ae47e3e1c68341588f1))
* adding GeneConditionsCard ([#27](https://github.com/bihealth/reev-frontend-lib/issues/27)) ([e8785d3](https://github.com/bihealth/reev-frontend-lib/commit/e8785d3d3fecdf7ee2c98774dd9bcc0a35c324b0))
* adding GeneConditionsCard ([#32](https://github.com/bihealth/reev-frontend-lib/issues/32)) ([25c3fe6](https://github.com/bihealth/reev-frontend-lib/commit/25c3fe67ead60e061a2fb03b28d8f96924d5c013))
* adding GeneExpressionCard component ([#26](https://github.com/bihealth/reev-frontend-lib/issues/26)) ([b491224](https://github.com/bihealth/reev-frontend-lib/commit/b491224794ce864652855133a915912d2d1c435a))
* adding GeneLiteratureCard ([#30](https://github.com/bihealth/reev-frontend-lib/issues/30)) ([ad041aa](https://github.com/bihealth/reev-frontend-lib/commit/ad041aa2bf7b67c80d2d476fd539a4b2ee6f40ee))
* adding GeneOverviewCard ([#31](https://github.com/bihealth/reev-frontend-lib/issues/31)) ([9007269](https://github.com/bihealth/reev-frontend-lib/commit/900726960404a782a2961fc3350f1e1fa8608bdd))
* adding GenePathogenicityCard with storybook and tests ([#25](https://github.com/bihealth/reev-frontend-lib/issues/25)) ([01b5040](https://github.com/bihealth/reev-frontend-lib/commit/01b5040b9019b066331540e39e39ba3f7feb1f0e))
* adding GenomeBrowserCard ([#45](https://github.com/bihealth/reev-frontend-lib/issues/45)) ([3ecd6a1](https://github.com/bihealth/reev-frontend-lib/commit/3ecd6a1da4eda2e86f6018da25d8d13dd83917d9))
* adding modules for genome builds and genomic variants ([#28](https://github.com/bihealth/reev-frontend-lib/issues/28)) ([971478b](https://github.com/bihealth/reev-frontend-lib/commit/971478b8816e496b7b54e38ed118d494e97775ea))
* adding more protobuf files and generated code ([#49](https://github.com/bihealth/reev-frontend-lib/issues/49)) ([9825a59](https://github.com/bihealth/reev-frontend-lib/commit/9825a592d84c62e2a4e3c620d16d28381fa62b6a))
* adding protobuf to typescript generation ([#21](https://github.com/bihealth/reev-frontend-lib/issues/21)) ([26aa8c5](https://github.com/bihealth/reev-frontend-lib/commit/26aa8c51be60cd9e3f1f3be0962546c4b5d7df9d))
* adding SeqvarBeaconNetworkCard ([#54](https://github.com/bihealth/reev-frontend-lib/issues/54)) ([c42bff1](https://github.com/bihealth/reev-frontend-lib/commit/c42bff1d7f1107967e6cfe7fee04cd6d87ffc5a8))
* adding SeqvarClinvarCard ([#48](https://github.com/bihealth/reev-frontend-lib/issues/48)) ([1cc2b6d](https://github.com/bihealth/reev-frontend-lib/commit/1cc2b6dede911cf56d939eba9b773b7f73a96b13))
* adding SeqvarConsequencesCard ([#47](https://github.com/bihealth/reev-frontend-lib/issues/47)) ([d5df980](https://github.com/bihealth/reev-frontend-lib/commit/d5df980e838dd8a6c173d1a46d4b2e67db5c1d21))
* adding SeqvarScoresCard ([#51](https://github.com/bihealth/reev-frontend-lib/issues/51)) ([931aeec](https://github.com/bihealth/reev-frontend-lib/commit/931aeec1c0c99a9a2518987255f8271a06dee504))
* adding SeqvarsFreqCard ([#52](https://github.com/bihealth/reev-frontend-lib/issues/52)) ([2426ad1](https://github.com/bihealth/reev-frontend-lib/commit/2426ad1bd98759762153ecc25ccc8ce4a017b850))
* adding SeqvarToolsCard ([#53](https://github.com/bihealth/reev-frontend-lib/issues/53)) ([742b84d](https://github.com/bihealth/reev-frontend-lib/commit/742b84d5672824ba587187f43db218987cf5ba0c))
* adding SeqvarVariantValidatorCard ([#55](https://github.com/bihealth/reev-frontend-lib/issues/55)) ([7d08b24](https://github.com/bihealth/reev-frontend-lib/commit/7d08b2485ed88cd6c237f2ed92043d828f72c99e))
* adding store/seqvarInfo, api/viguno, more api/annonars ([#50](https://github.com/bihealth/reev-frontend-lib/issues/50)) ([99ceaee](https://github.com/bihealth/reev-frontend-lib/commit/99ceaee8bef4b7010f33050ca4b420661c7f6935))
* adding store/strucvarInfo ([#41](https://github.com/bihealth/reev-frontend-lib/issues/41)) ([9c84f26](https://github.com/bihealth/reev-frontend-lib/commit/9c84f268f5bc520b7ce30cb0cf747d830e7988f5))
* adding StrucvarClinvarCard ([#46](https://github.com/bihealth/reev-frontend-lib/issues/46)) ([0578f02](https://github.com/bihealth/reev-frontend-lib/commit/0578f026eafeacac4505950dcc58cf22d3032ddf))
* adding StrucvarGeneListCard ([#44](https://github.com/bihealth/reev-frontend-lib/issues/44)) ([637db05](https://github.com/bihealth/reev-frontend-lib/commit/637db0518fd47eb7dbfbdef8ba473b9f181c90c4))
* adding StrucvarToolsCard ([#42](https://github.com/bihealth/reev-frontend-lib/issues/42)) ([ae5ae68](https://github.com/bihealth/reev-frontend-lib/commit/ae5ae68cd2ec4b5b66ae26e58de34b660151d1ca))
* completing api/dotty ([#39](https://github.com/bihealth/reev-frontend-lib/issues/39)) ([8e65aba](https://github.com/bihealth/reev-frontend-lib/commit/8e65aba15d4e14a5218eb6237bbdbc3a44cff367))
* DocsLink as first component in Storybook ([#22](https://github.com/bihealth/reev-frontend-lib/issues/22)) ([9e93ee1](https://github.com/bihealth/reev-frontend-lib/commit/9e93ee1aca165559e5a8573df08c69a27d824d05))
* enable publishing to central npm ([#58](https://github.com/bihealth/reev-frontend-lib/issues/58)) ([845cac5](https://github.com/bihealth/reev-frontend-lib/commit/845cac50cc3bb917ac5932c17e6ca19e6d91653c))
* initial storybook setup ([#19](https://github.com/bihealth/reev-frontend-lib/issues/19)) ([1104401](https://github.com/bihealth/reev-frontend-lib/commit/1104401889d2f1be2537b6e13ec6b352f8e2eb04))
* updates and story for StrucvarsToolCard ([#43](https://github.com/bihealth/reev-frontend-lib/issues/43)) ([8713020](https://github.com/bihealth/reev-frontend-lib/commit/871302050d92aa0c3413abf8c326a7a0cbfa371a))

## [0.4.2](https://github.com/bihealth/reev-frontend-lib/compare/v0.4.1...v0.4.2) (2024-01-25)


### Bug Fixes

* actually working library ([#17](https://github.com/bihealth/reev-frontend-lib/issues/17)) ([9009096](https://github.com/bihealth/reev-frontend-lib/commit/90090964491b6a273f9029725cca5c7e07b894e3))

## [0.4.1](https://github.com/bihealth/reev-frontend-lib/compare/v0.4.0...v0.4.1) (2024-01-25)


### Miscellaneous Chores

* release as v0.4.1 ([0a99631](https://github.com/bihealth/reev-frontend-lib/commit/0a996310b6a54c9f31eb5af8faf69722ed518132))

## Changelog
