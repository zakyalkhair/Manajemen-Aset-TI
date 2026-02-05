<?php

namespace App\Enums;

enum RequestStatus: string
{
    case MENUNGGU_PERSETUJUAN = 'menunggu_persetujuan';
    case MENUNGGU_BARANG      = 'menunggu_barang';
    case DIPAKAI              = 'dipakai';
    case DITOLAK              = 'ditolak';

    public function label(): string
    {
        return match ($this) {
            self::MENUNGGU_PERSETUJUAN => 'Menunggu Persetujuan',
            self::MENUNGGU_BARANG      => 'Menunggu Barang',
            self::DIPAKAI              => 'Dipakai',
            self::DITOLAK              => 'Ditolak',
        };
    }
}
