export const REQUEST_STATUS = {
  MENUNGGU_PERSETUJUAN: 'menunggu_persetujuan',
  MENUNGGU_BARANG: 'menunggu_barang',
  DIPAKAI: 'dipakai',
  DITOLAK: 'ditolak',
} as const

export type RequestStatus =
  typeof REQUEST_STATUS[keyof typeof REQUEST_STATUS]

export const REQUEST_STATUS_LABEL: Record<RequestStatus, string> = {
  menunggu_persetujuan: 'Menunggu Persetujuan',
  menunggu_barang: 'Menunggu Barang',
  dipakai: 'Dipakai',
  ditolak: 'Ditolak',
}

export const REQUEST_STATUS_CLASS: Record<RequestStatus, string> = {
  menunggu_persetujuan: 'status-gray',
  menunggu_barang: 'status-orange',
  dipakai: 'status-green',
  ditolak: 'status-red',
}
