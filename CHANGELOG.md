# Changelog

## [0.8.0](https://github.com/bihealth/reev-frontend-lib/compare/v0.7.1...v0.8.0) (2024-10-02)


### Features

* Add url for AutoACMG ([#252](https://github.com/bihealth/reev-frontend-lib/issues/252)) ([#253](https://github.com/bihealth/reev-frontend-lib/issues/253)) ([9a7538a](https://github.com/bihealth/reev-frontend-lib/commit/9a7538a20cc19594b8530b45eca5af0c24fd0c0a))
* display hemizgote counts for x chromosome ([#236](https://github.com/bihealth/reev-frontend-lib/issues/236)) ([#237](https://github.com/bihealth/reev-frontend-lib/issues/237)) ([d070c1d](https://github.com/bihealth/reev-frontend-lib/commit/d070c1df55d9dce33d7ae7608ddb96b0a871d5d2))
* enable ignore case parameter for querying omim by name ([#229](https://github.com/bihealth/reev-frontend-lib/issues/229)) ([736c8f9](https://github.com/bihealth/reev-frontend-lib/commit/736c8f9fab0a51a8e20340e12b556c298c5615bf))
* Increase height in BeaconNetwork card ([#240](https://github.com/bihealth/reev-frontend-lib/issues/240)) ([#241](https://github.com/bihealth/reev-frontend-lib/issues/241)) ([ca2bd83](https://github.com/bihealth/reev-frontend-lib/commit/ca2bd8373c728812c8a9f0f258b7650ffe4c2988))
* migrate from pinia stores to TanStack Query ([#247](https://github.com/bihealth/reev-frontend-lib/issues/247)) ([#251](https://github.com/bihealth/reev-frontend-lib/issues/251)) ([60bd628](https://github.com/bihealth/reev-frontend-lib/commit/60bd628c2186fa88a4bf2d59ee7c5fa37a07fa5c))


### Bug Fixes

* added tbody to table elements ([#254](https://github.com/bihealth/reev-frontend-lib/issues/254)) ([b190d20](https://github.com/bihealth/reev-frontend-lib/commit/b190d20026247c841857284045b27702c18700ac))
* linting ([#238](https://github.com/bihealth/reev-frontend-lib/issues/238)) ([3fe4d45](https://github.com/bihealth/reev-frontend-lib/commit/3fe4d4518b79ac4023d4e251b0a8b02a7167d7f5))
* most recent mehari rest service causes unknown fields error ([#249](https://github.com/bihealth/reev-frontend-lib/issues/249)) ([#250](https://github.com/bihealth/reev-frontend-lib/issues/250)) ([74df3b9](https://github.com/bihealth/reev-frontend-lib/commit/74df3b985bf02c997487a5f6484e0e31cfcf89ce))
* pubtator store loading with missing hgnc id ([#243](https://github.com/bihealth/reev-frontend-lib/issues/243)) ([#244](https://github.com/bihealth/reev-frontend-lib/issues/244)) ([ff0c661](https://github.com/bihealth/reev-frontend-lib/commit/ff0c66187f0becae41137c374d0b20ca44a98fdf))
* varfish lint error ([#242](https://github.com/bihealth/reev-frontend-lib/issues/242)) ([0c2770f](https://github.com/bihealth/reev-frontend-lib/commit/0c2770f63a3aae83bd862c9225dde2fc7a81a335))
* variant validator URL needs trailing slash "/" ([#226](https://github.com/bihealth/reev-frontend-lib/issues/226)) ([6475981](https://github.com/bihealth/reev-frontend-lib/commit/6475981dd6fbe95e74b5ccbb220b81572cef9a8c))
* variantvalidator query doesnt work ([#234](https://github.com/bihealth/reev-frontend-lib/issues/234)) ([#235](https://github.com/bihealth/reev-frontend-lib/issues/235)) ([9e27292](https://github.com/bihealth/reev-frontend-lib/commit/9e27292528433a11bfc0dd4653429bdddca28c6e))
* viguno hpo search response for not found ([#230](https://github.com/bihealth/reev-frontend-lib/issues/230)) ([2b47962](https://github.com/bihealth/reev-frontend-lib/commit/2b47962dc152d9d0b3121213cf2719d862bae3f0))

## [0.7.1](https://github.com/bihealth/reev-frontend-lib/compare/v0.7.0...v0.7.1) (2024-06-09)


### Continuous Integration

* disable building package release ([#211](https://github.com/bihealth/reev-frontend-lib/issues/211)) ([d0d4496](https://github.com/bihealth/reev-frontend-lib/commit/d0d44964bc23627c0a48276d861dc68463a7fa5a))

## [0.7.0](https://github.com/bihealth/reev-frontend-lib/compare/v0.6.1...v0.7.0) (2024-06-09)


### Features

* adding breakpoint SV type support to library ([#142](https://github.com/bihealth/reev-frontend-lib/issues/142)) ([eb519cc](https://github.com/bihealth/reev-frontend-lib/commit/eb519cc0c6101d433cbf5ca6597ed6d5659a9f80))
* Collapse Button for PubTator3 ([#585](https://github.com/bihealth/reev-frontend-lib/issues/585)) ([#173](https://github.com/bihealth/reev-frontend-lib/issues/173)) ([a67e225](https://github.com/bihealth/reev-frontend-lib/commit/a67e2253df0098112d15d9870fb9c56fa1934c1a))
* implement SV type INS on the library level ([#146](https://github.com/bihealth/reev-frontend-lib/issues/146)) ([5125223](https://github.com/bihealth/reev-frontend-lib/commit/5125223041b73ef6f5bd0ca9fbbc88a91ce963c2))
* make components more robust in case of store/api errors ([#160](https://github.com/bihealth/reev-frontend-lib/issues/160)) ([#161](https://github.com/bihealth/reev-frontend-lib/issues/161)) ([002a362](https://github.com/bihealth/reev-frontend-lib/commit/002a362541086ba5e2d0822d2135a2d8f40c843b))
* use api/mehari rather than api/dotty in store/geneInfo ([#120](https://github.com/bihealth/reev-frontend-lib/issues/120)) ([5f50789](https://github.com/bihealth/reev-frontend-lib/commit/5f507890054c042a0ee9468f5a7b662932b4d8c2))


### Bug Fixes

* adjust to annonars clinvar_public cardinality changes ([#209](https://github.com/bihealth/reev-frontend-lib/issues/209)) ([#210](https://github.com/bihealth/reev-frontend-lib/issues/210)) ([18df4a5](https://github.com/bihealth/reev-frontend-lib/commit/18df4a5e46037331cc6cd48f1cf3868bcf4f4da8))
* allow tuning of StrucvarGeneListCard ([#144](https://github.com/bihealth/reev-frontend-lib/issues/144)) ([bc98bdb](https://github.com/bihealth/reev-frontend-lib/commit/bc98bdb859f3fa2b27509479ce2674239270a87a))
* annonars call wrong for grch38 and chromosomes prefixed with chr… ([#185](https://github.com/bihealth/reev-frontend-lib/issues/185)) ([a323f5d](https://github.com/bihealth/reev-frontend-lib/commit/a323f5d4dcdf0d1e2fb76592a102b540a3596acf))
* annonarsClient.fetchClinvarStrucvars in case of no records ([#163](https://github.com/bihealth/reev-frontend-lib/issues/163)) ([4578e36](https://github.com/bihealth/reev-frontend-lib/commit/4578e362cd85939b1d6a424920d04bf01258510a))
* Associated Conditions Card correctly sorts diseases and panels ([#513](https://github.com/bihealth/reev-frontend-lib/issues/513)) ([#159](https://github.com/bihealth/reev-frontend-lib/issues/159)) ([f35c4cb](https://github.com/bihealth/reev-frontend-lib/commit/f35c4cbe2e6394d3c6c64f1baad5ef3de0da2992))
* Change hgvs.t and hgvs.p and fix pubator comments ([#176](https://github.com/bihealth/reev-frontend-lib/issues/176)) ([#177](https://github.com/bihealth/reev-frontend-lib/issues/177)) ([6ece409](https://github.com/bihealth/reev-frontend-lib/commit/6ece409ae6eb1bb314815577876d928f34760ff3))
* Consequences skeleton is now message ([#506](https://github.com/bihealth/reev-frontend-lib/issues/506)) ([#130](https://github.com/bihealth/reev-frontend-lib/issues/130)) ([e58e0f9](https://github.com/bihealth/reev-frontend-lib/commit/e58e0f900bab95fb4df907c8ed0d8c9b5864770b))
* do not prefix chromosomes with chr in igv link ([#189](https://github.com/bihealth/reev-frontend-lib/issues/189)) ([#190](https://github.com/bihealth/reev-frontend-lib/issues/190)) ([90b9218](https://github.com/bihealth/reev-frontend-lib/commit/90b9218f06635be81852935daabca4becd5aec42))
* do not show skeleton loader if clinvar info is missing ([#208](https://github.com/bihealth/reev-frontend-lib/issues/208)) ([8ad0981](https://github.com/bihealth/reev-frontend-lib/commit/8ad0981c38bb3baf8ca40cd81e9a3a0886bd078e))
* do not throw on missing gene ClinVar data ([#145](https://github.com/bihealth/reev-frontend-lib/issues/145)) ([6cbb057](https://github.com/bihealth/reev-frontend-lib/commit/6cbb057188836c929e4f4da0cd79272e3ba43baf))
* genome browser not jumping to locus with grch38 ([#202](https://github.com/bihealth/reev-frontend-lib/issues/202)) ([#203](https://github.com/bihealth/reev-frontend-lib/issues/203)) ([9eeff66](https://github.com/bihealth/reev-frontend-lib/commit/9eeff66e0d55bd60f85729c6465990970f5ddb63))
* GenomeBrowserCard with configuable nginx URL ([#147](https://github.com/bihealth/reev-frontend-lib/issues/147)) ([0d9c814](https://github.com/bihealth/reev-frontend-lib/commit/0d9c814f85313837c1a614027c3e525b72e2f949))
* import plotly landscape statically ([#140](https://github.com/bihealth/reev-frontend-lib/issues/140)) ([9612373](https://github.com/bihealth/reev-frontend-lib/commit/9612373ffc032644592869f36593750841dd243f))
* Make buttons in Seqvars Scores card smaller ([#520](https://github.com/bihealth/reev-frontend-lib/issues/520)) ([#137](https://github.com/bihealth/reev-frontend-lib/issues/137)) ([e5943bb](https://github.com/bihealth/reev-frontend-lib/commit/e5943bbcfa83f6820d321ebe208f44369b01acb6))
* Make collapse buttons smaller for Population frqs card ([#521](https://github.com/bihealth/reev-frontend-lib/issues/521)) ([#138](https://github.com/bihealth/reev-frontend-lib/issues/138)) ([49230a2](https://github.com/bihealth/reev-frontend-lib/commit/49230a2c7b061943fa6ad6ed2f184bb38a0e7e80))
* make rfl work with latest annonars clinvar changes ([#205](https://github.com/bihealth/reev-frontend-lib/issues/205)) ([#207](https://github.com/bihealth/reev-frontend-lib/issues/207)) ([6461700](https://github.com/bihealth/reev-frontend-lib/commit/646170098b187d04bd45caf77de3930c8dade0ed))
* make StrucvarGeneListCard work without gene-details route ([#143](https://github.com/bihealth/reev-frontend-lib/issues/143)) ([39de318](https://github.com/bihealth/reev-frontend-lib/commit/39de318367bfb241ef95c3feb813263ca999d9eb))
* Nginx response 500 fro tracks reqeusts ([#180](https://github.com/bihealth/reev-frontend-lib/issues/180)) ([8c5d219](https://github.com/bihealth/reev-frontend-lib/commit/8c5d219f0cefbc1a50745aa3b1741252c949bc16))
* Omit permanent circular ncbi ([#512](https://github.com/bihealth/reev-frontend-lib/issues/512)) ([#139](https://github.com/bihealth/reev-frontend-lib/issues/139)) ([3836272](https://github.com/bihealth/reev-frontend-lib/commit/38362725d9bcd29963db6e0b46c2586e87b6c4e5))
* proper conditions for VSkeletonLoader in GeneConditionsCard ([#164](https://github.com/bihealth/reev-frontend-lib/issues/164)) ([d18412c](https://github.com/bihealth/reev-frontend-lib/commit/d18412cf67cc2fa6969d89b2ca16a3d4c2816af3))
* Proper counting in variation landscape plot ([#495](https://github.com/bihealth/reev-frontend-lib/issues/495)) ([#128](https://github.com/bihealth/reev-frontend-lib/issues/128)) ([8f4a0a7](https://github.com/bihealth/reev-frontend-lib/commit/8f4a0a7b1923807e820e55a1e63f55e5f55155f8))
* Pubtator3 new API responses adaptation ([#643](https://github.com/bihealth/reev-frontend-lib/issues/643)) ([#188](https://github.com/bihealth/reev-frontend-lib/issues/188)) ([73436d9](https://github.com/bihealth/reev-frontend-lib/commit/73436d98d9cfea67d3f12ab97094fcbcadf8c336))
* stores/sevarInfo can limit csq to HGNC ID ([#154](https://github.com/bihealth/reev-frontend-lib/issues/154)) ([3d15507](https://github.com/bihealth/reev-frontend-lib/commit/3d15507b84c0503777536a293165415361f34b2f))
* Variation Landscape downsampling ([#462](https://github.com/bihealth/reev-frontend-lib/issues/462)) ([#122](https://github.com/bihealth/reev-frontend-lib/issues/122)) ([29e5a6d](https://github.com/bihealth/reev-frontend-lib/commit/29e5a6dbda42b85fe07cfe71222cb9bf3a1ccf8f))
* VariationLandscapePlotly with empty clinvar info ([#148](https://github.com/bihealth/reev-frontend-lib/issues/148)) ([4f349ce](https://github.com/bihealth/reev-frontend-lib/commit/4f349ce26eebc877fa875fb60bb17c07418aa59b))


### Miscellaneous Chores

* set next release to v0.6.2 ([0a98997](https://github.com/bihealth/reev-frontend-lib/commit/0a9899742e21cca45565107f3937593f34aaea92))

## [0.6.1](https://github.com/bihealth/reev-frontend-lib/compare/v0.6.0...v0.6.1) (2024-02-09)


### Features

* use transcript infos from mehari server ([#115](https://github.com/bihealth/reev-frontend-lib/issues/115)) ([#118](https://github.com/bihealth/reev-frontend-lib/issues/118)) ([94c5e2e](https://github.com/bihealth/reev-frontend-lib/commit/94c5e2e4b0a2e765eb939815e81bcac904b23c94))


### Bug Fixes

* proper display of SpliceAI scores ([#104](https://github.com/bihealth/reev-frontend-lib/issues/104)) ([#117](https://github.com/bihealth/reev-frontend-lib/issues/117)) ([1507600](https://github.com/bihealth/reev-frontend-lib/commit/150760091fa578fd061282daa2585c031f97e639))

## [0.6.0](https://github.com/bihealth/reev-frontend-lib/compare/v0.5.0...v0.6.0) (2024-02-08)


### Documentation

* adding Zenodo DOI badge ([#102](https://github.com/bihealth/reev-frontend-lib/issues/102)) ([6740705](https://github.com/bihealth/reev-frontend-lib/commit/67407054163f128969d2c0b4e1ca278918a4535f))

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
