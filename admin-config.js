// =========================================================
// ADMIN PANEL CONFIG — kemas kini di sini
// =========================================================
// NOTA: REPO INI PUBLIC + Push Protection diaktifkan.
// Anda TIDAK boleh simpan GitHub PAT di dalam fail repo
// (GitHub akan block push). Oleh itu TOKEN dibiarkan kosong
// dan dimasukkan SEKALI pada masa login panel, kemudian
// diingati dalam localStorage peranti anda.
// =========================================================

window.ADMIN_CONFIG = {
    // GitHub repo
    OWNER: 'cgtechvibe',
    REPO: 'famtree',
    BRANCH: 'main',

    // GitHub token — biarkan KOSONG. Masuk pada masa login.
    // Akan disimpan di localStorage selepas login pertama.
    TOKEN: '',

    // PIN untuk unlock panel (pilihan; boleh kosongkan untuk tanpa PIN)
    PIN: '0000',

    // Nama paparan dalam tajuk
    TITLE: 'Olla Apps Admin'
};