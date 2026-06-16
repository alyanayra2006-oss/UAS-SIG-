const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// ─── POLYGON KOORDINAT NYATA KECAMATAN BANDAR LAMPUNG ─────────────────────────
// Format: [lng, lat] sesuai GeoJSON standard (WGS84)
const kecamatanPolygons = {

  // ── ZONA PESISIR SELATAN (sangat_tinggi) ──────────────────────────────────

  1: { // Telukbetung Selatan
    name: "Telukbetung Selatan",
    coords: [
      [105.2610, -5.4490], [105.2720, -5.4440], [105.2830, -5.4480],
      [105.2890, -5.4560], [105.2870, -5.4640], [105.2760, -5.4700],
      [105.2620, -5.4720], [105.2510, -5.4660], [105.2480, -5.4560],
      [105.2530, -5.4500]
    ]
  },

  2: { // Telukbetung Barat
    name: "Telukbetung Barat",
    coords: [
      [105.2180, -5.4280], [105.2330, -5.4220], [105.2490, -5.4260],
      [105.2590, -5.4360], [105.2570, -5.4480], [105.2430, -5.4530],
      [105.2270, -5.4490], [105.2140, -5.4400]
    ]
  },

  3: { // Bumi Waras
    name: "Bumi Waras",
    coords: [
      [105.2720, -5.4440], [105.2860, -5.4400], [105.2980, -5.4430],
      [105.3060, -5.4510], [105.3030, -5.4620], [105.2890, -5.4680],
      [105.2740, -5.4670], [105.2630, -5.4590], [105.2610, -5.4490]
    ]
  },

  4: { // Panjang
    name: "Panjang",
    coords: [
      [105.3030, -5.4620], [105.3190, -5.4540], [105.3340, -5.4540],
      [105.3440, -5.4590], [105.3480, -5.4700], [105.3440, -5.4810],
      [105.3290, -5.4870], [105.3110, -5.4850], [105.2970, -5.4770],
      [105.2890, -5.4680]
    ]
  },

  20: { // Telukbetung Timur
    name: "Telukbetung Timur",
    coords: [
      [105.2890, -5.4560], [105.3030, -5.4490], [105.3170, -5.4510],
      [105.3250, -5.4590], [105.3190, -5.4700], [105.3030, -5.4770],
      [105.2890, -5.4770], [105.2760, -5.4700], [105.2870, -5.4640]
    ]
  },

  // ── ZONA PUSAT KOTA (tinggi) ──────────────────────────────────────────────

  5: { // Tanjung Karang Timur
    name: "Tanjung Karang Timur",
    coords: [
      [105.2680, -5.4020], [105.2840, -5.3960], [105.2980, -5.3990],
      [105.3060, -5.4080], [105.3030, -5.4200], [105.2880, -5.4260],
      [105.2710, -5.4220], [105.2610, -5.4130]
    ]
  },

  6: { // Tanjung Karang Barat
    name: "Tanjung Karang Barat",
    coords: [
      [105.2210, -5.3900], [105.2380, -5.3840], [105.2550, -5.3870],
      [105.2640, -5.3960], [105.2620, -5.4090], [105.2470, -5.4150],
      [105.2300, -5.4110], [105.2160, -5.4020]
    ]
  },

  7: { // Tanjung Karang Pusat
    name: "Tanjung Karang Pusat",
    coords: [
      [105.2470, -5.3940], [105.2620, -5.3880], [105.2730, -5.3920],
      [105.2780, -5.4020], [105.2730, -5.4120], [105.2590, -5.4180],
      [105.2430, -5.4140], [105.2370, -5.4040]
    ]
  },

  8: { // Telukbetung Utara
    name: "Telukbetung Utara",
    coords: [
      [105.2400, -5.4200], [105.2570, -5.4150], [105.2700, -5.4200],
      [105.2770, -5.4310], [105.2730, -5.4430], [105.2580, -5.4490],
      [105.2390, -5.4460], [105.2270, -5.4370], [105.2270, -5.4270]
    ]
  },

  18: { // Enggal
    name: "Enggal",
    coords: [
      [105.2530, -5.4070], [105.2680, -5.4020], [105.2780, -5.4060],
      [105.2810, -5.4160], [105.2760, -5.4250], [105.2620, -5.4300],
      [105.2460, -5.4250], [105.2420, -5.4160]
    ]
  },

  // ── ZONA TENGAH (sedang) ──────────────────────────────────────────────────

  9: { // Kedaton
    name: "Kedaton",
    coords: [
      [105.2490, -5.3760], [105.2650, -5.3700], [105.2800, -5.3740],
      [105.2880, -5.3850], [105.2840, -5.3960], [105.2680, -5.4020],
      [105.2510, -5.3980], [105.2400, -5.3880]
    ]
  },

  10: { // Rajabasa
    name: "Rajabasa",
    coords: [
      [105.1930, -5.3590], [105.2140, -5.3510], [105.2310, -5.3530],
      [105.2430, -5.3630], [105.2410, -5.3770], [105.2250, -5.3840],
      [105.2060, -5.3820], [105.1900, -5.3720]
    ]
  },

  11: { // Langkapura
    name: "Langkapura",
    coords: [
      [105.2110, -5.3720], [105.2290, -5.3660], [105.2450, -5.3700],
      [105.2530, -5.3800], [105.2490, -5.3920], [105.2320, -5.3970],
      [105.2140, -5.3930], [105.2030, -5.3820]
    ]
  },

  12: { // Kemiling
    name: "Kemiling",
    coords: [
      [105.1600, -5.3420], [105.1920, -5.3320], [105.2150, -5.3360],
      [105.2290, -5.3460], [105.2230, -5.3620], [105.2030, -5.3700],
      [105.1770, -5.3700], [105.1580, -5.3590]
    ]
  },

  13: { // Way Halim
    name: "Way Halim",
    coords: [
      [105.2730, -5.3660], [105.2940, -5.3590], [105.3090, -5.3620],
      [105.3160, -5.3730], [105.3100, -5.3870], [105.2910, -5.3940],
      [105.2720, -5.3900], [105.2610, -5.3790]
    ]
  },

  // ── ZONA PINGGIRAN UTARA-TIMUR (rendah) ───────────────────────────────────

  14: { // Langkapura Baru (Labuhan Ratu Raya)
    name: "Langkapura Baru",
    coords: [
      [105.2140, -5.3510], [105.2350, -5.3420], [105.2530, -5.3450],
      [105.2640, -5.3560], [105.2600, -5.3710], [105.2410, -5.3770],
      [105.2220, -5.3740], [105.2080, -5.3640]
    ]
  },

  15: { // Sukarame
    name: "Sukarame",
    coords: [
      [105.2820, -5.3430], [105.3090, -5.3360], [105.3260, -5.3390],
      [105.3360, -5.3500], [105.3310, -5.3670], [105.3090, -5.3740],
      [105.2870, -5.3710], [105.2720, -5.3590]
    ]
  },

  16: { // Sukabumi
    name: "Sukabumi",
    coords: [
      [105.2610, -5.3550], [105.2790, -5.3480], [105.2970, -5.3520],
      [105.3060, -5.3630], [105.3000, -5.3790], [105.2790, -5.3850],
      [105.2580, -5.3800], [105.2460, -5.3690]
    ]
  },

  17: { // Labuhan Ratu
    name: "Labuhan Ratu",
    coords: [
      [105.2530, -5.3640], [105.2720, -5.3560], [105.2900, -5.3590],
      [105.2990, -5.3690], [105.2930, -5.3840], [105.2720, -5.3900],
      [105.2510, -5.3850], [105.2380, -5.3750]
    ]
  },

  19: { // Kedamaian
    name: "Kedamaian",
    coords: [
      [105.3060, -5.3500], [105.3300, -5.3420], [105.3490, -5.3460],
      [105.3590, -5.3580], [105.3540, -5.3740], [105.3300, -5.3810],
      [105.3070, -5.3770], [105.2920, -5.3650]
    ]
  }
};

// ─── DATA KECAMATAN ──────────────────────────────────────────────────────────
const kecamatanData = [
  { id:1,  name:"Telukbetung Selatan", risk:"sangat_tinggi", color:"#DC2626", lat:-5.464, lng:105.260, mag:5.8, depth:12, last:"2024-03-15", population:"68.420", casualty_risk:"Tinggi",       damage:"Berat",        tsunami:true,  description:"Kecamatan pesisir pantai dengan kepadatan tinggi, dekat zona subduksi Selat Sunda." },
  { id:2,  name:"Telukbetung Barat",   risk:"sangat_tinggi", color:"#DC2626", lat:-5.451, lng:105.242, mag:5.6, depth:15, last:"2024-02-20", population:"52.310", casualty_risk:"Tinggi",       damage:"Berat",        tsunami:true,  description:"Wilayah barat kota, terletak di sepanjang sesar aktif Semangko." },
  { id:3,  name:"Bumi Waras",          risk:"sangat_tinggi", color:"#DC2626", lat:-5.466, lng:105.275, mag:5.5, depth:18, last:"2024-01-10", population:"71.200", casualty_risk:"Tinggi",       damage:"Sedang-Berat", tsunami:true,  description:"Kawasan permukiman padat di tepi Teluk Lampung, rentan tsunami." },
  { id:4,  name:"Panjang",             risk:"sangat_tinggi", color:"#DC2626", lat:-5.471, lng:105.303, mag:5.4, depth:20, last:"2023-12-05", population:"82.100", casualty_risk:"Tinggi",       damage:"Sedang-Berat", tsunami:true,  description:"Kawasan industri dan pelabuhan, sangat rentan terhadap gempa dan tsunami." },
  { id:20, name:"Telukbetung Timur",   risk:"sangat_tinggi", color:"#DC2626", lat:-5.465, lng:105.292, mag:5.7, depth:14, last:"2024-03-20", population:"61.800", casualty_risk:"Tinggi",       damage:"Berat",        tsunami:true,  description:"Wilayah pesisir timur Teluk Lampung, sangat rawan gempa dan tsunami." },
  { id:5,  name:"Tanjung Karang Timur",risk:"tinggi",        color:"#EA580C", lat:-5.426, lng:105.280, mag:5.1, depth:25, last:"2024-03-01", population:"93.500", casualty_risk:"Sedang-Tinggi",damage:"Sedang",       tsunami:false, description:"Pusat kota bagian timur, kepadatan bangunan tinggi." },
  { id:6,  name:"Tanjung Karang Barat",risk:"tinggi",        color:"#EA580C", lat:-5.416, lng:105.249, mag:5.0, depth:28, last:"2023-11-20", population:"74.300", casualty_risk:"Sedang-Tinggi",damage:"Sedang",       tsunami:false, description:"Kawasan perumahan dan komersial, banyak bangunan tua." },
  { id:7,  name:"Tanjung Karang Pusat",risk:"tinggi",        color:"#EA580C", lat:-5.423, lng:105.260, mag:4.9, depth:30, last:"2023-10-15", population:"68.900", casualty_risk:"Sedang",       damage:"Sedang",       tsunami:false, description:"Pusat perdagangan kota, gedung-gedung tinggi berpotensi rawan." },
  { id:8,  name:"Telukbetung Utara",   risk:"tinggi",        color:"#EA580C", lat:-5.440, lng:105.257, mag:5.2, depth:22, last:"2024-02-10", population:"55.600", casualty_risk:"Sedang-Tinggi",damage:"Sedang",       tsunami:false, description:"Wilayah transisi antara zona tinggi dan sangat tinggi." },
  { id:18, name:"Enggal",              risk:"tinggi",        color:"#EA580C", lat:-5.431, lng:105.255, mag:5.1, depth:26, last:"2024-01-25", population:"42.500", casualty_risk:"Sedang-Tinggi",damage:"Sedang",       tsunami:false, description:"Pusat administrasi kota, bangunan pemerintahan padat." },
  { id:9,  name:"Kedaton",             risk:"sedang",        color:"#CA8A04", lat:-5.403, lng:105.260, mag:4.6, depth:35, last:"2023-09-20", population:"89.200", casualty_risk:"Sedang",       damage:"Ringan-Sedang",tsunami:false, description:"Kawasan perumahan dan pendidikan, kerawanan sedang." },
  { id:10, name:"Rajabasa",            risk:"sedang",        color:"#CA8A04", lat:-5.386, lng:105.232, mag:4.5, depth:38, last:"2023-08-12", population:"62.400", casualty_risk:"Rendah-Sedang",damage:"Ringan-Sedang",tsunami:false, description:"Area perbukitan barat, relatif lebih aman dari tsunami." },
  { id:11, name:"Langkapura",          risk:"sedang",        color:"#CA8A04", lat:-5.399, lng:105.237, mag:4.4, depth:40, last:"2023-07-05", population:"47.800", casualty_risk:"Rendah-Sedang",damage:"Ringan",       tsunami:false, description:"Kawasan semi-perkotaan di barat, risiko sedang." },
  { id:12, name:"Kemiling",            risk:"sedang",        color:"#CA8A04", lat:-5.380, lng:105.215, mag:4.3, depth:42, last:"2023-06-18", population:"85.300", casualty_risk:"Rendah-Sedang",damage:"Ringan",       tsunami:false, description:"Kecamatan terluas kota, dataran bergelombang." },
  { id:13, name:"Way Halim",           risk:"sedang",        color:"#CA8A04", lat:-5.393, lng:105.285, mag:4.5, depth:36, last:"2023-09-01", population:"92.100", casualty_risk:"Sedang",       damage:"Ringan-Sedang",tsunami:false, description:"Kawasan padat penduduk, perkembangan pesat." },
  { id:14, name:"Langkapura Baru",     risk:"rendah",        color:"#16A34A", lat:-5.378, lng:105.235, mag:4.0, depth:50, last:"2023-04-10", population:"41.200", casualty_risk:"Rendah",       damage:"Minimal",      tsunami:false, description:"Kecamatan baru, infrastruktur modern, kerawanan rendah." },
  { id:15, name:"Sukarame",            risk:"rendah",        color:"#16A34A", lat:-5.375, lng:105.297, mag:3.9, depth:52, last:"2023-03-22", population:"96.400", casualty_risk:"Rendah",       damage:"Minimal",      tsunami:false, description:"Kawasan perumahan modern, jauh dari sumber gempa utama." },
  { id:16, name:"Sukabumi",            risk:"rendah",        color:"#16A34A", lat:-5.383, lng:105.275, mag:3.8, depth:55, last:"2023-02-14", population:"78.300", casualty_risk:"Rendah",       damage:"Minimal",      tsunami:false, description:"Area perumahan dengan risiko rendah, kontur tanah stabil." },
  { id:17, name:"Labuhan Ratu",        risk:"rendah",        color:"#16A34A", lat:-5.388, lng:105.270, mag:3.7, depth:58, last:"2023-01-08", population:"69.100", casualty_risk:"Rendah",       damage:"Minimal",      tsunami:false, description:"Kawasan pinggiran utara, tanah keras, risiko terkecil." },
  { id:19, name:"Kedamaian",           risk:"rendah",        color:"#16A34A", lat:-5.386, lng:105.312, mag:3.8, depth:56, last:"2023-01-15", population:"54.300", casualty_risk:"Rendah",       damage:"Minimal",      tsunami:false, description:"Kawasan pinggiran timur, perkembangan baru, risiko rendah." }
];

// ─── DATA RIWAYAT ─────────────────────────────────────────────────────────────
const riwayatGempa = [
  { id:1,  date:"2024-03-20", time:"14:32", mag:5.7, depth:14, lat:-5.465, lng:105.292, location:"Telukbetung Timur",   felt:"Kuat",         mmi:"VI",  casualties:0, damage_level:"Ringan" },
  { id:2,  date:"2024-03-15", time:"09:15", mag:5.8, depth:12, lat:-5.464, lng:105.260, location:"Telukbetung Selatan", felt:"Kuat",         mmi:"VII", casualties:2, damage_level:"Sedang" },
  { id:3,  date:"2024-03-01", time:"22:48", mag:5.1, depth:25, lat:-5.426, lng:105.280, location:"T.K. Timur",          felt:"Sedang",       mmi:"V",   casualties:0, damage_level:"Ringan" },
  { id:4,  date:"2024-02-20", time:"07:22", mag:5.6, depth:15, lat:-5.451, lng:105.242, location:"Telukbetung Barat",   felt:"Kuat",         mmi:"VI",  casualties:0, damage_level:"Ringan" },
  { id:5,  date:"2024-02-10", time:"16:05", mag:5.2, depth:22, lat:-5.440, lng:105.257, location:"Telukbetung Utara",   felt:"Sedang",       mmi:"V",   casualties:0, damage_level:"Minimal" },
  { id:6,  date:"2024-01-25", time:"11:30", mag:5.1, depth:26, lat:-5.431, lng:105.255, location:"Enggal",              felt:"Sedang",       mmi:"V",   casualties:0, damage_level:"Minimal" },
  { id:7,  date:"2024-01-10", time:"03:18", mag:5.5, depth:18, lat:-5.466, lng:105.275, location:"Bumi Waras",          felt:"Kuat",         mmi:"VI",  casualties:1, damage_level:"Ringan" },
  { id:8,  date:"2023-12-05", time:"19:44", mag:5.4, depth:20, lat:-5.471, lng:105.303, location:"Panjang",             felt:"Kuat",         mmi:"VI",  casualties:0, damage_level:"Ringan" },
  { id:9,  date:"2023-11-20", time:"08:10", mag:5.0, depth:28, lat:-5.416, lng:105.249, location:"T.K. Barat",          felt:"Sedang",       mmi:"V",   casualties:0, damage_level:"Minimal" },
  { id:10, date:"2023-10-15", time:"13:55", mag:4.9, depth:30, lat:-5.423, lng:105.260, location:"T.K. Pusat",          felt:"Ringan-Sedang",mmi:"IV",  casualties:0, damage_level:"Minimal" }
];

// ─── DATA SESAR ───────────────────────────────────────────────────────────────
const sesarData = [
  { id:1, name:"Sesar Semangko (Sumatera)", type:"Transform", color:"#DC2626", risk:"Sangat Tinggi", length_km:1900,
    description:"Sesar terpanjang di Sumatera, bergerak mendatar 11-23 mm/tahun. Melewati sisi barat Kota Bandar Lampung.",
    coordinates:[[-5.30,105.18],[-5.40,105.22],[-5.50,105.24],[-5.60,105.26]] },
  { id:2, name:"Sesar Lampung", type:"Normal", color:"#EA580C", risk:"Tinggi", length_km:120,
    description:"Sesar lokal aktif di wilayah Lampung, segmen melewati area tengah kota.",
    coordinates:[[-5.32,105.25],[-5.42,105.27],[-5.52,105.30]] },
  { id:3, name:"Zona Subduksi Selat Sunda", type:"Subduksi", color:"#7C3AED", risk:"Megathrust", length_km:300,
    description:"Zona subduksi lempeng Indo-Australia menunjam ke bawah lempeng Eurasia. Potensi gempa M>8.5 dan tsunami.",
    coordinates:[[-5.55,104.90],[-5.65,105.10],[-5.75,105.30],[-5.80,105.50]] }
];

// ─── STATISTIK ────────────────────────────────────────────────────────────────
const statistik = {
  total_gempa_2024:47, mag_tertinggi:5.8, mag_rata2:4.9, kedalaman_rata2:28,
  zona_paling_aktif:"Telukbetung", potensi_tsunami:5, status:"WASPADA",
  last_updated:"2024-03-20T14:32:00Z",
  summary:{ sangat_tinggi:5, tinggi:5, sedang:5, rendah:5 }
};

// ─── ROUTES ───────────────────────────────────────────────────────────────────
app.get('/api/kecamatan', (req,res) => {
  let data = kecamatanData;
  if (req.query.risk && req.query.risk !== 'semua') data = data.filter(k => k.risk === req.query.risk);
  res.json({ success:true, count:data.length, data });
});
app.get('/api/kecamatan/:id', (req,res) => {
  const kec = kecamatanData.find(k => k.id === parseInt(req.params.id));
  if (!kec) return res.status(404).json({ success:false, message:'Tidak ditemukan' });
  res.json({ success:true, data:kec });
});
app.get('/api/riwayat', (req,res) => {
  const data = riwayatGempa.slice(0, parseInt(req.query.limit||10));
  res.json({ success:true, count:data.length, data });
});
app.get('/api/sesar', (req,res) => res.json({ success:true, data:sesarData }));
app.get('/api/statistik', (req,res) => res.json({ success:true, data:statistik }));

// GeoJSON POLYGON per kecamatan
app.get('/api/geojson/kecamatan', (req,res) => {
  const features = kecamatanData.map(k => {
    const poly = kecamatanPolygons[k.id];
    const coords = poly ? [...poly.coords, poly.coords[0]] : [];
    return {
      type:"Feature",
      properties:{ ...k },
      geometry:{ type:"Polygon", coordinates:[coords] }
    };
  });
  res.json({ type:"FeatureCollection", features });
});

// GeoJSON titik gempa
app.get('/api/geojson/gempa', (req,res) => {
  const features = riwayatGempa.map(g => ({
    type:"Feature",
    properties:{ ...g },
    geometry:{ type:"Point", coordinates:[g.lng, g.lat] }
  }));
  res.json({ type:"FeatureCollection", features });
});

app.get('/api/health', (req,res) => res.json({ status:'OK', timestamp:new Date().toISOString(), version:'2.0.0' }));

app.listen(PORT, () => {
  console.log(`✅ SIG Gempa API v2 berjalan di http://localhost:${PORT}`);
});