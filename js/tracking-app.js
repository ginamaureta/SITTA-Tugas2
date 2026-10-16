new Vue({
  el: '#trackingApp',
  data: {
    paket: dataBahanAjar.paket,
    stok: dataBahanAjar.stok,
    trackingAwal: dataBahanAjar.tracking,
    daftarDO: (() => {
      try {
        const saved = localStorage.getItem('sitta_tracking_v2');
        return saved ? JSON.parse(saved) : [];
      } catch (e) { return []; }
    })(), 
    searchDO: '',
    filterStatus: '',
    doTerpilih: null,
    notice: '',
    formError: '',
    tanggalHariIni: new Date().toLocaleDateString('en-CA'),
    form: { nim: '', nama: '', ekspedisi: '', kodePaket: '', tanggalKirim: new Date().toLocaleDateString('en-CA') }
  },
  computed: {
    paketTerpilih() { return this.paket.find(p => p.kode === this.form.kodePaket) || null; },
    nomorBerikutnya() {
      const tahun = new Date().getFullYear();
      const nomorTahunIni = this.daftarDO.map(d => d.nomor).filter(n => n.startsWith('DO' + tahun + '-')).map(n => parseInt(n.split('-')[1], 10) || 0);
      return 'DO' + tahun + '-' + String(Math.max(0, ...nomorTahunIni) + 1).padStart(3, '0');
    },
    filteredDO() {
      const q = this.searchDO.toLowerCase();
      return this.daftarDO.filter(d => (!q || [d.nomor, d.nim, d.nama].some(v => String(v).toLowerCase().includes(q))) && (!this.filterStatus || d.status === this.filterStatus));
    },
    jumlahPerjalanan() { return this.daftarDO.filter(d => d.status === 'Dalam Perjalanan').length; },
    totalNilai() { return this.daftarDO.reduce((sum, d) => sum + d.total, 0); }
  },
  watch: {
    daftarDO: { handler(newValue) {
      try { localStorage.setItem('sitta_tracking_v2', JSON.stringify(newValue)); }
      catch (e) { this.notice = 'Perubahan DO berlaku sementara; penyimpanan browser tidak tersedia.'; }
    }, deep: true },
    'form.kodePaket'(newValue) {
      this.formError = '';
      if (newValue) this.notice = 'Detail paket dan total harga diperbarui otomatis.';
    },
    filterStatus(newValue) {
      this.notice = newValue ? 'Menampilkan DO dengan status ' + newValue + '.' : '';
    }
  },
  created() {
    if (this.daftarDO.length === 0) {
      Object.keys(this.trackingAwal).forEach(nomor => {
        const d = this.trackingAwal[nomor];
        this.daftarDO.push({ nomor, nim: d.nim, nama: d.nama, status: d.status, ekspedisi: d.ekspedisi, tanggalKirim: d.tanggalKirim, paket: d.paket, total: d.total, perjalanan: d.perjalanan.slice(), dataAwal: true });
      });
    }
  },
  methods: {
    formatRupiah(nilai) { return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(nilai || 0); },
    judulBahan(kode) { const item = this.stok.find(s => s.kode === kode); return item ? item.judul : 'Nama bahan ajar tidak tersedia'; },
    namaPaket(kode) { const p = this.paket.find(x => x.kode === kode); return p ? p.nama : kode; },
    pilihDO(item) { this.doTerpilih = item; },
    hapusDO(item) {
      if (item.dataAwal) {
        alert('Delivery Order tidak dapat dihapus karena merupakan data awal/bawaan sistem SITTA. Fitur hapus hanya berlaku untuk DO yang dibuat sendiri.');
        return;
      }
      if (!confirm('Hapus Delivery Order ' + item.nomor + ' milik ' + item.nama + '?')) return;
      this.daftarDO = this.daftarDO.filter(d => d.nomor !== item.nomor);
      if (this.doTerpilih && this.doTerpilih.nomor === item.nomor) this.doTerpilih = null;
      this.notice = 'Delivery Order ' + item.nomor + ' berhasil dihapus.';
    },
    ubahStatus(item, statusBaru) {
      const urutan = ['Draf', 'Diproses', 'Siap Dikirim', 'Dalam Perjalanan', 'Terkirim'];
      if (item.status === 'Terkirim' || item.status === statusBaru) return;
      const indeksLama = urutan.indexOf(item.status);
      const indeksBaru = urutan.indexOf(statusBaru);
      if (indeksBaru < 0 || indeksBaru !== indeksLama + 1) {
        this.notice = 'Status harus diperbarui sesuai urutan proses pengiriman.';
        return;
      }
      item.status = statusBaru;
      item.perjalanan.push({
        waktu: new Date().toLocaleString('sv-SE'),
        keterangan: 'Status diperbarui menjadi: ' + statusBaru
      });
      this.notice = 'Status ' + item.nomor + ' berhasil diperbarui.';
    },
    buatDO() {
      this.formError = '';
      if (!this.paketTerpilih) { this.formError = 'Silakan pilih paket bahan ajar.'; return; }
      if (!/^[0-9]{8,15}$/.test(this.form.nim)) { this.formError = 'NIM harus terdiri dari 8–15 angka.'; return; }
      if (!this.form.nama.trim() || !this.form.ekspedisi || !this.form.tanggalKirim) { this.formError = 'Lengkapi semua kolom wajib.'; return; }
      const nomor = this.nomorBerikutnya;
      const paket = this.paketTerpilih;
      this.daftarDO.unshift({
        nomor, nim: this.form.nim, nama: this.form.nama.trim(), status: 'Diproses',
        ekspedisi: this.form.ekspedisi, tanggalKirim: this.form.tanggalKirim, paket: paket.kode, total: paket.harga,
        perjalanan: [{ waktu: new Date().toLocaleString('sv-SE'), keterangan: 'Delivery Order dibuat dan masuk tahap pemrosesan' }], dataAwal: false
      });
      this.doTerpilih = this.daftarDO[0];
      this.form = { nim: '', nama: '', ekspedisi: '', kodePaket: '', tanggalKirim: this.tanggalHariIni };
      this.notice = 'Delivery Order ' + nomor + ' berhasil dibuat.';
    }
  }
});
