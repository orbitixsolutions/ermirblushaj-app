import { create } from 'zustand'

type ImgFileType = File | null

interface LoadImage {
  imagePlayer: {
    imgFile: ImgFileType
    imgPreview: string
  }
  imageTeam: {
    imgFile: ImgFileType
    imgPreview: string
  }
}

interface LoadActions {
  updatedImagePlayer: ({
    imgFile,
    imgPreview
  }: {
    imgFile: ImgFileType
    imgPreview: string
  }) => void
  updatedImageTeam: ({
    imgFile,
    imgPreview
  }: {
    imgFile: ImgFileType
    imgPreview: string
  }) => void
}

export const useLoadImageStore = create<LoadImage & LoadActions>((set) => ({
  imageTeam: {
    imgFile: null,
    imgPreview: ''
  },
  imagePlayer: {
    imgFile: null,
    imgPreview: ''
  },
  updatedImageTeam: ({ imgFile, imgPreview }) =>
    set(() => ({ imageTeam: { imgFile: imgFile, imgPreview: imgPreview } })),
  updatedImagePlayer: ({ imgFile, imgPreview }) =>
    set(() => ({ imagePlayer: { imgFile: imgFile, imgPreview: imgPreview } }))
}))