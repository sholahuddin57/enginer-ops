-- 1. Membuat Tabel untuk Quarterly Checks
CREATE TABLE equipment_quarterly_checks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    equipment_name TEXT NOT NULL, -- Diubah jadi inputan dinamis karena barangnya banyak
    operator_name TEXT NOT NULL,
    bulan TEXT NOT NULL,
    tahun INTEGER NOT NULL,
    quarter TEXT NOT NULL CHECK (quarter IN ('I', 'II', 'III', 'IV')),
    
    -- Status Pengecekan (TRUE = Standar, FALSE = Tidak Standar, NULL = Belum dicek)
    kompresor_status BOOLEAN,
    evaporator_status BOOLEAN,
    pipa_status BOOLEAN,
    suhu_status BOOLEAN,
    fan_blower_status BOOLEAN,
    freon_status BOOLEAN,
    listrik_status BOOLEAN,
    
    keterangan TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Membuat Tabel untuk Maintenance Logs
CREATE TABLE equipment_maintenance_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    equipment_name TEXT NOT NULL, -- Diubah jadi inputan dinamis
    operator_name TEXT NOT NULL,
    bulan TEXT NOT NULL,
    pengecekan TEXT NOT NULL,
    sparepart_diganti TEXT,
    tanggal_rusak DATE NOT NULL,
    tanggal_selesai DATE,
    teknisi_pengerja TEXT NOT NULL,
    keterangan TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);