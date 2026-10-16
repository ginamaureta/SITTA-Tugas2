# SITTA — Tugas Praktik 2 Vue.js

## Menjalankan aplikasi
1. Ekstrak folder proyek.
2. Pastikan komputer terhubung ke internet untuk memuat Vue.js 2 dari CDN.
3. Buka `index.html` melalui browser.
4. Navigasikan ke halaman Stok Bahan Ajar atau Tracking Delivery Order.

## Struktur
- `index.html`: dashboard/navigasi.
- `stok.html`: inventaris bahan ajar.
- `tracking.html`: pembuatan dan tracking DO.
- `css/style.css`: gaya tampilan responsif.
- `js/dataBahanAjar.js`: dummy data awal dari lampiran tugas (dengan pilihan paket contoh tambahan).
- `js/stok-app.js`: logika halaman stok.
- `js/tracking-app.js`: logika halaman DO.

## Fitur
- Filter pencarian, UT-Daerah, kategori, status stok, dan sorting stok.
- Status stok dihitung dari qty dan safety stock.
- Tambah, edit, dan hapus data stok; data stok bawaan tidak dapat dihapus dan menampilkan alert; validasi kode duplikat dan nilai negatif.
- Harga ditampilkan dalam Rupiah.
- Data stok dan DO disimpan menggunakan `localStorage`, sehingga bertahan setelah refresh di browser/origin yang sama.
- Nomor DO otomatis, detail paket dan harga otomatis, pencarian/filter DO, perubahan status berurutan, riwayat status, serta hapus DO buatan sendiri. DO bawaan tidak dapat dihapus dan menampilkan alert. Data DO awal mencakup status Terkirim dan Dalam Perjalanan.
- Minimal dua watcher Vue pada setiap halaman.

## Batasan prototipe tanpa backend
- Data hanya tersimpan di browser/perangkat yang digunakan dan tidak tersinkronisasi antar pengguna.
- `dataBahanAjar.js` tetap merupakan sumber data awal; perubahan disimpan di `localStorage`.
- Tidak ada autentikasi, API ekspedisi, atau database terpusat.
- Data paket tambahan adalah data contoh untuk demonstrasi, bukan daftar paket resmi.
- Harga paket pada dummy data mengikuti nilai yang ditentukan di data; sesuaikan dengan kebijakan harga yang benar bila digunakan di luar simulasi.

## Mengatur ulang data demo
Untuk menghapus perubahan lokal dan memuat ulang data awal, buka Developer Tools browser → Console, lalu jalankan:
```js
localStorage.removeItem('sitta_stok_v2');
localStorage.removeItem('sitta_tracking_v2');
location.reload();
```
Tindakan ini menghapus perubahan lokal pada browser tersebut.
