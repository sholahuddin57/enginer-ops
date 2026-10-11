"use client";

import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
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
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { maintenanceSchema, type MaintenanceFormValues } from "@/lib/validations/maintenance";
import { supabase } from "@/lib/supabase";
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

    //logika tanstack react query untuk insert data ke supabase
    const mutation = useMutation({
      mutationFn: async (formData: MaintenanceFormValues) => {
        //kita akan insert data ke supabase
        const { data: insertedData, error } = await supabase.from("equipment_maintenance_logs")
        .insert([
          {
            equipment_name: formData.equipment_name,
            operator_name: formData.operator_name,
            bulan: formData.bulan,
            pengecekan: formData.pengecekan,
            sparepart_diganti: formData.sparepart_diganti,
            tanggal_rusak: new Date().toISOString(), //gunakan tanggal sekarang sebagai tanggal rusak
            teknisi_pengerja: formData.teknisi_pengerja,
            keterangan: formData.keterangan,
          },
        ])
        .select();

        if (error) {
          throw new Error(error.message);
        }
        return insertedData;
      },
      onSuccess: () => {
        alert("Mantap! Data berhasil masuk ke database.");
        form.reset(); //reset form setelah berhasil submit
      },
      onError: (error: Error) => {
        alert(`Gagal mengirim data ke database: ${error.message}`);
      }
    });

    //2.  fungsi yang akan dijalankan saat form disubmit
    function onSubmit(data: MaintenanceFormValues) {
        //kita console log data yang dikirim dari form
        console.log("data siap dikirim ke supabase:", data);
        mutation.mutate(data);
    }

    //3. render UI form
    return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-sm border mt-20">
      
<nav className="bg-neutral-primary fixed w-full z-20 top-0 inset-s-0 border-b border-default">
  <div className="max-w-7xl flex flex-wrap items-center justify-between mx-auto p-4">
    <a href="../" className="flex items-center space-x-3 rtl:space-x-reverse">
        <Image src="/images/taman-safari.webp" className="h-7" alt="TamanSafari Logo" width={100} height={200} />
        
    </a>
    <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-body rounded-base md:hidden hover:bg-neutral-secondary-soft hover:text-heading focus:outline-none focus:ring-2 focus:ring-neutral-tertiary" aria-controls="navbar-default" aria-expanded="false">
        
    </button>
  </div>
</nav>

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