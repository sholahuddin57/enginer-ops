"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { maintenanceSchema, type MaintenanceFormValues } from "@/lib/validations/maintenance";
// sementara pake input biasa dulu, nanti diganti sama datepicker

export default function MaintenanceForm() {
    // 1. inisialisasi form dengan react-hook-form dan zod
    const form = useForm<MaintenanceFormValues>({
        resolver: zodResolver(maintenanceSchema),
        defaultValues: {
            equipment_name: "",
            operator_name: "",
            bulan: "",
            pengecekan: "",
            sparepart_diganti: "",
            teknisi_pengerja: "",
            keterangan: "",
        }
    });

    //2.  fungsi yang akan dijalankan saat form disubmit
    function onSubmit(data: MaintenanceFormValues) {
        //kita console log data yang dikirim dari form
        console.log("data siap dikirim ke supabase:", data);
        alert("Data berhasil dikirim ke supabase. Silakan cek console log untuk melihat data yang dikirim.");
    }

    //3. render UI form
    return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-sm border mt-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Form Maintenance Log</h1>
        <p className="text-gray-500">Catat detail kerusakan dan perbaikan alat (Enginer-Ops).</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Field: Nama Alat */}
          <FormField
            control={form.control}
            name="equipment_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Alat</FormLabel>
                <FormControl>
                  <Input placeholder="Contoh: AC Split Daikin..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Field: Nama Operator */}
          <FormField
            control={form.control}
            name="operator_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Operator</FormLabel>
                <FormControl>
                  <Input placeholder="Nama pelapor..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Field: Bulan */}
          <FormField
            control={form.control}
            name="bulan"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bulan Pengecekan</FormLabel>
                <FormControl>
                  <Input placeholder="Contoh: Oktober" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Field: Teknisi */}
          <FormField
            control={form.control}
            name="teknisi_pengerja"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Teknisi Pengerja</FormLabel>
                <FormControl>
                  <Input placeholder="Nama teknisi..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Field: Pengecekan / Masalah */}
        <FormField
          control={form.control}
          name="pengecekan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deskripsi Pengecekan / Masalah</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Jelaskan masalah yang terjadi pada alat..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Field: Sparepart */}
        <FormField
          control={form.control}
          name="sparepart_diganti"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sparepart Diganti (Opsional)</FormLabel>
              <FormControl>
                <Input placeholder="Contoh: Kapasitor 30uF..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full md:w-auto">
          Simpan Maintenance Log
        </Button>
        </form>
      </Form>
    </div>
  );
}