# SITTA — Tugas Praktik 2 Vue.js

## Cara menjalankan
### Opsi 1: Online (tanpa mengunduh)
1. Buka link demo aplikasi https://ginamaureta.github.io/SITTA_Praktik1_SourceCode/

### Opsi 2: Di komputer sendiri
1. Klik tombol hijau **Code**, lalu **Download ZIP**.
2. Ekstrak file ZIP.
3. Buka `index.html` dengan browser seperti Chrome atau Edge.

Aplikasi tidak membutuhkan database maupun backend. Untuk hasil paling konsisten, jalankan melalui server lokal, misalnya ekstensi Live Server pada VS Code.

### Struktur
- `index.html`: dashboard/navigasi.
- `stok.html`: inventaris bahan ajar.
- `tracking.html`: pembuatan dan tracking DO.
- `css/style.css`: gaya tampilan responsif.
- `js/dataBahanAjar.js`: dummy data awal dari lampiran tugas (dengan pilihan paket contoh tambahan).
- `js/stok-app.js`: logika halaman stok.
- `js/tracking-app.js`: logika halaman DO.

### Fitur
- Filter pencarian, UT-Daerah, kategori, status stok, dan sorting stok.
- Status stok dihitung dari qty dan safety stock.
- Tambah, edit, dan hapus data stok; data stok bawaan tidak dapat dihapus dan menampilkan alert; validasi kode duplikat dan nilai negatif.
- Harga ditampilkan dalam Rupiah.
- Data stok dan DO disimpan menggunakan `localStorage`, sehingga bertahan setelah refresh di browser/origin yang sama.
- Nomor DO otomatis, detail paket dan harga otomatis, pencarian/filter DO, perubahan status berurutan, riwayat status, serta hapus DO buatan sendiri. DO bawaan tidak dapat dihapus dan menampilkan alert. Data DO awal mencakup status Terkirim dan Dalam Perjalanan.
- Minimal dua watcher Vue pada setiap halaman.

### Batasan prototipe tanpa backend
- Data hanya tersimpan di browser/perangkat yang digunakan dan tidak tersinkronisasi antar pengguna.
- `dataBahanAjar.js` tetap merupakan sumber data awal; perubahan disimpan di `localStorage`.
- Tidak ada autentikasi, API ekspedisi, atau database terpusat.
- Data paket tambahan adalah data contoh untuk demonstrasi, bukan daftar paket resmi.
- Harga paket pada dummy data mengikuti nilai yang ditentukan di data; sesuaikan dengan kebijakan harga yang benar bila digunakan di luar simulasi.
