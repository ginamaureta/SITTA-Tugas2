var dataBahanAjar = {
      upbjjList: ["Jakarta", "Surabaya", "Makassar", "Padang", "Denpasar"],
      kategoriList: ["MK Wajib", "MK Pilihan", "Praktikum", "Problem-Based"],
      pengirimanList: [
        { kode: "REG", nama: "Reguler (3-5 hari)" },
        { kode: "EXP", nama: "Ekspres (1-2 hari)" }
      ],
      paket: [
        { kode: "PAKET-UT-001", nama: "PAKET IPS Dasar", isi: ["EKMA4116","EKMA4115"], harga: 120000 },
        { kode: "PAKET-UT-002", nama: "PAKET IPA Dasar", isi: ["BIOL4201","FISIP4001"], harga: 140000 },
        { kode: "PAKET-UT-003", nama: "PAKET Manajemen", isi: ["EKMA4116"], harga: 65000 },
        { kode: "PAKET-UT-004", nama: "PAKET Akuntansi", isi: ["EKMA4115"], harga: 60000 },
        { kode: "PAKET-UT-005", nama: "PAKET Praktikum Biologi", isi: ["BIOL4201"], harga: 80000 },
        { kode: "PAKET-UT-006", nama: "PAKET Sosial Dasar", isi: ["FISIP4001"], harga: 55000 }
      ],
      stok: [
        {
          kode: "EKMA4116",
          judul: "Pengantar Manajemen",
          kategori: "MK Wajib",
          upbjj: "Jakarta",
          lokasiRak: "R1-A3",
          harga: 65000,
          qty: 28,
          safety: 20,
          catatanHTML: "<em>Edisi 2024, cetak ulang</em>"
        },
        {
          kode: "EKMA4115",
          judul: "Pengantar Akuntansi",
          kategori: "MK Wajib",
          upbjj: "Jakarta",
          lokasiRak: "R1-A4",
          harga: 60000,
          qty: 7,
          safety: 15,
          catatanHTML: "<strong>Cover baru</strong>"
        },
        {
          kode: "BIOL4201",
          judul: "Biologi Umum (Praktikum)",
          kategori: "Praktikum",
          upbjj: "Surabaya",
          lokasiRak: "R3-B2",
          harga: 80000,
          qty: 12,
          safety: 10,
          catatanHTML: "Butuh <u>pendingin</u> untuk kit basah"
        },
        {
          kode: "FISIP4001",
          judul: "Dasar-Dasar Sosiologi",
          kategori: "MK Pilihan",
          upbjj: "Makassar",
          lokasiRak: "R2-C1",
          harga: 55000,
          qty: 2,
          safety: 8,
          catatanHTML: "Stok <i>menipis</i>, prioritaskan reorder"
        }
      ],
      // Simulasi status DO (opsional fitur Tracking DO)
      tracking: {
        "DO2025-0001": {
          nim: "123456789",
          nama: "Rina Wulandari",
          status: "Terkirim",
          ekspedisi: "JNE",
          tanggalKirim: "2025-08-25",
          paket: "PAKET-UT-001",
          total: 120000,
          perjalanan: [
            { waktu: "2025-08-25 10:12:20", keterangan: "Penerimaan di Loket: TANGSEL" },
            { waktu: "2025-08-25 14:07:56", keterangan: "Tiba di Hub: JAKSEL" },
            { waktu: "2025-08-26 08:44:01", keterangan: "Diteruskan ke Kantor Tujuan" },
            { waktu: "2025-08-27 09:30:00", keterangan: "Paket diterima oleh penerima" }
          ]
        },
        "DO2026-0001": {
          nim: "987654321",
          nama: "Andi Pratama",
          status: "Dalam Perjalanan",
          ekspedisi: "JNE",
          tanggalKirim: "2026-10-14",
          paket: "PAKET-UT-002",
          total: 140000,
          perjalanan: [
            { waktu: "2026-10-14 09:15:00", keterangan: "Delivery Order dibuat dan diproses" },
            { waktu: "2026-10-14 13:20:00", keterangan: "Paket diserahkan kepada ekspedisi" },
            { waktu: "2026-10-15 08:10:00", keterangan: "Paket sedang dalam perjalanan menuju alamat penerima" }
          ]
        }
      }
};
