import { z } from "zod";

export const maintenanceSchema = z.object({
  equipment_name: z.string().min(2, { message: "Nama alat wajib diisi minimal 2 karakter." }),
  operator_name: z.string().min(2, { message: "Nama operator wajib diisi." }),
  bulan: z.string().min(2, { message: "Bulan wajib diisi (contoh: Oktober)." }),
  pengecekan: z.string().min(5, { message: "Deskripsi pengecekan terlalu singkat." }),
  sparepart_diganti: z.string().optional(),
  tanggal_rusak: z.date({ error: "Pilih tanggal kerusakan." }),
  tanggal_selesai: z.date().optional(),
  teknisi_pengerja: z.string().min(2, { message: "Nama teknisi wajib diisi." }),
  keterangan: z.string().optional(),
});

export type MaintenanceFormValues = z.infer<typeof maintenanceSchema>;