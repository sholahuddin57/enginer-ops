"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function DashboardPage() {
    // 1. ambil data maintenance logs dari supabase menggunakan react-query
    const { data: maintenanceLogs, isLoading, error } = useQuery({
        queryKey: ["maintenanceLogs"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("equipment_maintenance_logs")
                .select("*")
                .order("created_at", { ascending: false }); // mengurutkan data berdasarkan tanggal terbaru
       
            if (error) {
                throw new Error(error.message);
            }

            return data;
        },
    });

    // tampilan saat loading data
    if (isLoading) {
        return (<div className="max-w-6xl mx-auto p-6 mt-10 text-center">
            <p className="text-gray-500 animate-pulse">Memuat Riwayat Maintenance</p>
            </div>
        );
    }

    // tampilan saat terjadi error
    if (error) {
        return (<div className="max-w-6xl mx-auto p-6 mt-10 text-center">
            <p className="text-red-500">Terjadi kesalahan saat memuat data: {(error as Error).message}</p>
            </div>
        );
    }

    // tampilan utama tabel maintenance logs
    return (
    
    <div className="max-w-6xl mx-auto p-6 mt-10">
        <nav className="bg-neutral-primary fixed w-full z-20 top-0 inset-s-0 border-b border-default">
          <div className="max-w-7xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a href="../" className="flex items-center space-x-3 rtl:space-x-reverse">
                <Image src="/images/taman-safari.webp" className="h-7" alt="TamanSafari Logo" width={100} height={200} />
                
            </a>
            <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-body rounded-base md:hidden hover:bg-neutral-secondary-soft hover:text-heading focus:outline-none focus:ring-2 focus:ring-neutral-tertiary" aria-controls="navbar-default" aria-expanded="false">
                
            </button>
          </div>
        </nav>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Enginer-Ops</h1>
          <p className="text-gray-500 text-sm">Riwayat pengecekan dan perbaikan alat</p>
        </div>
        {/* Nanti tombol Export Excel / CSV akan kita taruh di sini */}
      </div>

      <div className="border rounded-lg bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead>Tanggal Input</TableHead>
              <TableHead>Nama Alat</TableHead>
              <TableHead>Operator Pelapor</TableHead>
              <TableHead>Teknisi Pengerja</TableHead>
              <TableHead>Masalah / Pengecekan</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {maintenanceLogs?.map((log: any) => (
              <TableRow key={log.id}>
                {/* Konversi format tanggal agar enak dibaca */}
                <TableCell className="whitespace-nowrap">
                  {new Date(log.created_at).toLocaleDateString('id-ID', {
                    day: '2-digit', month: 'short', year: 'numeric'
                  })}
                </TableCell>
                <TableCell className="font-medium">{log.equipment_name}</TableCell>
                <TableCell>{log.operator_name}</TableCell>
                <TableCell>{log.teknisi_pengerja}</TableCell>
                <TableCell className="max-w-xs truncate" title={log.pengecekan}>
                  {log.pengecekan}
                </TableCell>
              </TableRow>
            ))}
            
            {/* Tampilan jika tabel masih kosong */}
            {maintenanceLogs?.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10 text-gray-500">
                  Belum ada data maintenance.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}