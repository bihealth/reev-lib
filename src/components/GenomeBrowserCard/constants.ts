import { urlConfig } from '../../lib/urlConfig'
import { Track } from './types'

/** Visiblity window to use */
const visibilityWindow = 10000000

const hescTadTrack = (apiBaseUrl: string): Track => ({
  name: 'hESC TADs',
  sourceType: 'annotation',
  format: 'bed',
  visibilityWindow,
  url: `${apiBaseUrl}/grch37/hesc.bed`,
  color: 'gray'
})

const curatedMmsTrack = (apiBaseUrl: string): Track => ({
  name: 'Curated MMS',
  sourceType: 'annotation',
  format: 'bed',
  visibilityWindow,
  url: `${apiBaseUrl}/grch37/patho-mms.bed`,
  color: 'red'
})

const duplicationTrack = (apiBaseUrl: string): Track => ({
  name: 'UCSC Segmental Duplications',
  sourceType: 'annotation',
  format: 'bed',
  visibilityWindow,
  url: `${apiBaseUrl}/grch37/genomicSuperDups.bed.gz`,
  indexURL: `${apiBaseUrl}/grch37/genomicSuperDups.bed.gz.tbi`,
  color: 'black'
})

const repeatsTrack = (apiBaseUrl: string): Track => ({
  name: 'UCSC Repeat Masker',
  sourceType: 'annotation',
  format: 'bed',
  visibilityWindow,
  url: `${apiBaseUrl}/grch37/rmsk.bed.gz`,
  indexURL: `${apiBaseUrl}/grch37/rmsk.bed.gz.tbi`,
  color: 'black'
})

const altTrack = (apiBaseUrl: string): Track => ({
  name: 'UCSC Alt Loci Track',
  sourceType: 'annotation',
  format: 'bed',
  visibilityWindow,
  url: `${apiBaseUrl}/grch37/altSeqLiftOverPsl.bed.gz`,
  indexURL: `${apiBaseUrl}/grch37/altSeqLiftOverPsl.bed.gz.tbi`,
  color: 'black'
})

const fixTrack = (apiBaseUrl: string): Track => ({
  name: 'UCSC Fix Track',
  sourceType: 'annotation',
  format: 'bed',
  visibilityWindow,
  url: `${apiBaseUrl}/grch37/fixSeqLiftOverPsl.bed.gz`,
  indexURL: `${apiBaseUrl}/grch37/fixSeqLiftOverPsl.bed.gz.tbi`,
  color: 'black'
})

const bgDbTracks = (apiBaseUrl: string): Track[] => {
  return [
    {
      title: 'gnomad-SV',
      token: 'gnomad'
    },
    {
      title: 'DGV SVs',
      token: 'dgv'
    },
    {
      title: 'DGV GS SVs',
      token: 'dgv-gs'
    },
    {
      title: 'ExAC CNVs',
      token: 'exac'
    }
  ].map(({ title, token }) => {
    return {
      name: title,
      sourceType: 'annotation',
      format: 'bed',
      visibilityWindow,
      displayMode: 'SQUISHED',
      url: `${apiBaseUrl}/grch37/${token}.bed.gz`,
      indexURL: `${apiBaseUrl}/grch37/${token}.bed.gz.tbi`,
      color: 'black'
    }
  })
}

export const publicTracks: () => Track[] = () => {
  return [
    duplicationTrack(urlConfig.baseUrlNginx!),
    repeatsTrack(urlConfig.baseUrlNginx!),
    altTrack(urlConfig.baseUrlNginx!),
    fixTrack(urlConfig.baseUrlNginx!),
    hescTadTrack(urlConfig.baseUrlNginx!),
    curatedMmsTrack(urlConfig.baseUrlNginx!)
  ].concat(bgDbTracks(urlConfig.baseUrlNginx!))
}
