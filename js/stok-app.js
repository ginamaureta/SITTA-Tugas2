new Vue({
  el: '#app',
  data: {
    stok: (() => {
      try {
        const saved = localStorage.getItem('sitta_stok_v2');
        return saved ? JSON.parse(saved) : JSON.parse(JSON.stringify(dataBahanAjar.stok));
      } catch (e) {
        return JSON.parse(JSON.stringify(dataBahanAjar.stok));
      }
    })(),
    upbjjList: dataBahanAjar.upbjjList,
    kategoriList: dataBahanAjar.kategoriList,
    searchText: '',
    filterUpbjj: '',
    filterKategori: '',
    filterStatus: '',
    sortBy: 'judul',
    showAddForm: false,
    formError: '',
    notice: '',
    editKode: null,
    editForm: { qty: 0, safety: 0, harga: 0 },
    form: { kode: '', judul: '', kategori: '', upbjj: '', lokasiRak: '', harga: 0, qty: 0, safety: 0, catatanHTML: '' }
  },
  computed: {
    kategoriTersedia() {
      if (!this.filterUpbjj) return this.kategoriList;
      return [...new Set(this.stok.filter(x => x.upbjj === this.filterUpbjj).map(x => x.kategori))];
    },
    filteredStok() {
      let hasil = this.stok.filter(item => {
        const q = this.searchText.toLowerCase();
        const cocokCari = !q || item.kode.toLowerCase().includes(q) || item.judul.toLowerCase().includes(q);
        const cocokUpbjj = !this.filterUpbjj || item.upbjj === this.filterUpbjj;
        const cocokKategori = !this.filterKategori || item.kategori === this.filterKategori;
        const status = this.statusStok(item).key;
        const cocokStatus = !this.filterStatus || (this.filterStatus === 'reorder' ? item.qty < item.safety : status === this.filterStatus);
        return cocokCari && cocokUpbjj && cocokKategori && cocokStatus;
      });
      return hasil.sort((a,b) => {
        if (this.sortBy === 'qty-asc') return a.qty - b.qty;
        if (this.sortBy === 'qty-desc') return b.qty - a.qty;
        if (this.sortBy === 'harga-asc') return a.harga - b.harga;
        if (this.sortBy === 'harga-desc') return b.harga - a.harga;
        return a.judul.localeCompare(b.judul, 'id');
      });
    },
    jumlahAman() { return this.stok.filter(x => Number(x.qty) > 0 && Number(x.qty) >= Number(x.safety)).length; },
    jumlahMenipis() { return this.stok.filter(x => Number(x.qty) > 0 && Number(x.qty) < Number(x.safety)).length; },
    jumlahKosong() { return this.stok.filter(x => Number(x.qty) === 0).length; }
  },
  watch: {
    stok: { handler(newValue) {
      try { localStorage.setItem('sitta_stok_v2', JSON.stringify(newValue)); }
      catch (e) { this.notice = 'Perubahan berlaku sementara; penyimpanan browser tidak tersedia.'; }
    }, deep: true },
    filterUpbjj() {
      if (this.filterKategori && !this.kategoriTersedia.includes(this.filterKategori)) this.filterKategori = '';
    },
    filterStatus(newValue) {
      if (newValue === 'kosong') this.notice = 'Filter aktif: bahan ajar dengan stok kosong.';
      else if (newValue === 'reorder' || newValue === 'menipis') this.notice = 'Filter aktif: bahan ajar yang perlu diperhatikan untuk reorder.';
      else this.notice = '';
    }
  },
  methods: {
    formatRupiah(nilai) { return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(nilai || 0); },
    isStokAwal(item) {
      return dataBahanAjar.stok.some(x => x.kode === item.kode);
    },
    hapusStok(item) {
      if (this.isStokAwal(item)) {
        alert('Data tidak dapat dihapus karena merupakan data awal/bawaan sistem SITTA. Fitur hapus hanya berlaku untuk data bahan ajar yang ditambahkan sendiri.');
        return;
      }
      if (!confirm('Hapus bahan ajar ' + item.kode + ' — ' + item.judul + '?')) return;
      this.stok = this.stok.filter(x => x.kode !== item.kode);
      this.notice = 'Bahan ajar ' + item.kode + ' berhasil dihapus.';
    },
    statusStok(item) {
      if (Number(item.qty) === 0) return { key: 'kosong', label: 'Kosong', simbol: '●', kelas: 'status-empty' };
      if (Number(item.qty) < Number(item.safety)) return { key: 'menipis', label: 'Menipis', simbol: '▲', kelas: 'status-low' };
      return { key: 'aman', label: 'Aman', simbol: '✓', kelas: 'status-safe' };
    },
    resetFilter() {
      this.searchText = ''; this.filterUpbjj = ''; this.filterKategori = ''; this.filterStatus = ''; this.sortBy = 'judul'; this.notice = 'Filter berhasil direset.';
    },
    mulaiEdit(item) { this.editKode = item.kode; this.editForm = { qty: item.qty, safety: item.safety, harga: item.harga }; this.formError = ''; },
    batalEdit() { this.editKode = null; this.editForm = { qty: 0, safety: 0, harga: 0 }; },
    simpanEdit(item) {
      if (!Number.isInteger(Number(this.editForm.qty)) || Number(this.editForm.qty) < 0 || !Number.isInteger(Number(this.editForm.safety)) || Number(this.editForm.safety) < 0 || !Number.isFinite(Number(this.editForm.harga)) || Number(this.editForm.harga) < 0) {
        this.formError = 'Stok dan safety stock harus berupa bilangan bulat nol atau lebih.'; return;
      }
      item.qty = Number(this.editForm.qty); item.safety = Number(this.editForm.safety); item.harga = Number(this.editForm.harga);
      this.batalEdit(); this.notice = 'Perubahan stok ' + item.kode + ' berhasil diterapkan.';
    },
    tambahStok() {
      this.formError = '';
      if (this.stok.some(x => x.kode.toLowerCase() === this.form.kode.toLowerCase())) { this.formError = 'Kode mata kuliah sudah terdaftar.'; return; }
      if (this.form.harga < 0 || this.form.qty < 0 || this.form.safety < 0) { this.formError = 'Harga, stok, dan safety stock tidak boleh negatif.'; return; }
      this.stok.push({ ...this.form, kode: this.form.kode.toUpperCase(), catatanHTML: this.form.catatanHTML || '—' });
      this.form = { kode: '', judul: '', kategori: '', upbjj: '', lokasiRak: '', harga: 0, qty: 0, safety: 0, catatanHTML: '' };
      this.showAddForm = false; this.notice = 'Bahan ajar baru berhasil ditambahkan.';
    }
  }
});
