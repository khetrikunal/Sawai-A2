import { readFileSync, writeFileSync } from "node:fs";

const cssPath = "src/sawai.css";
const existing = readFileSync(cssPath, "utf8");

const appendix = `

/* ── PURCHASE FORM DIALOG ──────────────────────────────────────────────────── */
.purchase-dialog {
  position: fixed; inset: 0; width: 100%; height: 100dvh;
  max-width: none; max-height: none; border: 0; padding: 0; margin: 0;
  background: transparent; overflow: hidden;
  display: flex; align-items: center; justify-content: center; z-index: 90;
}
.purchase-dialog::backdrop { background: rgba(18,22,17,.78); backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px); }
.purchase-dialog[open] { display: flex; animation: pdFadeIn .2s ease; }
@keyframes pdFadeIn { from { opacity: 0; } to { opacity: 1; } }
.purchase-dialog__inner {
  position: relative; width: 100%; max-width: 580px; max-height: calc(100dvh - 32px); margin: 16px;
  background: var(--sawai-ivory); color: var(--sawai-brown); border-radius: 6px;
  display: flex; flex-direction: column; overflow: hidden;
  animation: pdSlideUp .28s cubic-bezier(.16,1,.3,1);
  box-shadow: 0 32px 80px -16px rgba(0,0,0,.55);
}
@keyframes pdSlideUp { from { opacity:0; transform: translateY(20px) scale(.98); } to { opacity:1; transform: translateY(0) scale(1); } }
.purchase-dialog__header { display:flex; align-items:flex-start; justify-content:space-between; gap:16px; padding:22px 24px 16px; background:var(--sawai-forest); color:var(--sawai-ivory); flex-shrink:0; }
.purchase-dialog__kicker { font-size:9px; letter-spacing:.18em; color:var(--sawai-gold); margin-bottom:6px; }
.purchase-dialog__title { font-family:var(--sawai-serif); font-size:clamp(18px,3vw,24px); font-weight:400; line-height:1.2; max-width:42ch; }
.purchase-dialog__close { background:rgba(244,239,229,.1); border:1px solid rgba(197,162,100,.3); border-radius:50%; color:var(--sawai-ivory); width:34px; height:34px; flex-shrink:0; display:flex; align-items:center; justify-content:center; transition:background .2s; padding:0; }
.purchase-dialog__close:hover { background:var(--sawai-gold); color:var(--sawai-brown); }
.purchase-dialog__price-bar { display:flex; justify-content:space-between; align-items:center; padding:12px 24px; background:var(--sawai-emerald); color:var(--sawai-ivory); font-size:13px; flex-shrink:0; }
.purchase-dialog__price-label { color:var(--sawai-cream); }
.purchase-dialog__price-total { font-family:var(--sawai-serif); font-size:22px; font-weight:500; color:var(--sawai-gold); }
.purchase-dialog__form { overflow-y:auto; padding:22px 24px 28px; display:flex; flex-direction:column; gap:20px; }
.purchase-form__section { display:flex; flex-direction:column; gap:12px; }
.purchase-form__section-label { font-size:9px; letter-spacing:.16em; color:var(--sawai-muted); border-bottom:1px solid var(--sawai-rule); padding-bottom:8px; }
.purchase-form__row { display:flex; gap:12px; }
.purchase-form__row--2 > *, .purchase-form__row--3 > * { flex:1 1 0; }
.purchase-form__field { display:flex; flex-direction:column; gap:5px; flex:1; }
.purchase-form__field label { font-size:11px; color:var(--sawai-muted); font-weight:600; letter-spacing:.02em; }
.purchase-form__field input, .purchase-form__field textarea { background:var(--sawai-ivory); border:1px solid var(--sawai-rule); padding:10px 12px; font-size:14px; color:var(--sawai-brown); border-radius:3px; transition:border-color .18s; width:100%; resize:none; }
.purchase-form__field input:focus, .purchase-form__field textarea:focus { outline:none; border-color:var(--sawai-emerald); box-shadow:0 0 0 2px rgba(22,74,55,.15); }
.purchase-form__field input[aria-invalid="true"], .purchase-form__field textarea[aria-invalid="true"] { border-color:#c0392b; }
.purchase-form__error { font-size:11px; color:#c0392b; line-height:1.3; }
.purchase-form__qty-row { display:flex; align-items:center; justify-content:space-between; font-size:12px; color:var(--sawai-muted); padding:0 2px; }
.purchase-form__qty-control { display:flex; align-items:center; border:1px solid var(--sawai-rule); }
.purchase-form__qty-control button { width:36px; height:36px; border:0; background:none; font-size:18px; display:flex; align-items:center; justify-content:center; color:var(--sawai-brown); }
.purchase-form__qty-control button:disabled { opacity:.35; cursor:default; }
.purchase-form__qty-control output { min-width:28px; text-align:center; font-size:15px; }
.purchase-dialog__pay-btn { display:flex; align-items:center; justify-content:space-between; background:var(--sawai-emerald); color:var(--sawai-ivory); border:0; padding:17px 24px; font-size:15px; font-weight:600; border-left:3px solid var(--sawai-gold); border-radius:3px; width:100%; cursor:pointer; transition:filter .2s,transform .15s; }
.purchase-dialog__pay-btn:hover { filter:brightness(1.1); }
.purchase-dialog__pay-btn:active { transform:scale(.985); }
.purchase-dialog__pay-btn:disabled { opacity:.6; cursor:not-allowed; }
.purchase-dialog__security-note { font-size:11px; color:var(--sawai-muted); text-align:center; line-height:1.4; }
.purchase-dialog__status { display:flex; flex-direction:column; align-items:center; text-align:center; padding:48px 32px 40px; gap:14px; }
.purchase-dialog__spinner { animation:spin 1s linear infinite; color:var(--sawai-emerald); }
@keyframes spin { to { transform:rotate(360deg); } }
.purchase-dialog__status-icon { width:62px; height:62px; border-radius:50%; background:var(--sawai-emerald); color:var(--sawai-ivory); display:flex; align-items:center; justify-content:center; font-size:26px; font-weight:700; }
.purchase-dialog__status-icon--failed { background:#c0392b; }
.purchase-dialog__status h3 { font-family:var(--sawai-serif); font-size:26px; font-weight:400; }
.purchase-dialog__status p { font-size:14px; color:var(--sawai-muted); max-width:34ch; }
.purchase-dialog__status p a { color:var(--sawai-emerald); text-decoration:underline; }
.purchase-dialog__status-actions { display:flex; gap:12px; margin-top:8px; }
.purchase-dialog__close-btn, .purchase-dialog__retry-btn { padding:12px 24px; font-size:13px; border-radius:3px; cursor:pointer; border:1px solid var(--sawai-rule); background:var(--sawai-ivory); color:var(--sawai-brown); transition:background .18s; }
.purchase-dialog__retry-btn { background:var(--sawai-emerald); color:var(--sawai-ivory); border-color:var(--sawai-emerald); }
.purchase-dialog__retry-btn:hover { filter:brightness(1.1); }
.purchase-dialog__close-btn:hover { background:var(--sawai-cream); }
@media (max-width:640px) {
  .purchase-dialog__inner { margin:0; max-height:100dvh; border-radius:0; }
  .purchase-form__row--2, .purchase-form__row--3 { flex-direction:column; }
  .purchase-dialog__header { padding:18px 18px 14px; }
  .purchase-dialog__form { padding:18px 18px 24px; }
}

/* ── ADMIN DASHBOARD ───────────────────────────────────────────────────────── */
.admin-page { min-height:100dvh; background:var(--sawai-ivory); color:var(--sawai-brown); font-family:var(--sawai-sans); }
.admin-login { min-height:100dvh; display:flex; align-items:center; justify-content:center; background:var(--sawai-forest); padding:24px; }
.admin-login__card { background:var(--sawai-ivory); width:100%; max-width:400px; padding:40px 36px; border-radius:6px; box-shadow:0 24px 60px rgba(0,0,0,.45); }
.admin-login__brand { text-align:center; margin-bottom:32px; }
.admin-login__brand h1 { font-family:var(--sawai-serif); font-size:28px; font-weight:400; color:var(--sawai-brown); margin-bottom:6px; }
.admin-login__brand p { font-size:11px; letter-spacing:.14em; color:var(--sawai-muted); }
.admin-login__form { display:flex; flex-direction:column; gap:16px; }
.admin-field { display:flex; flex-direction:column; gap:6px; }
.admin-field label { font-size:11px; color:var(--sawai-muted); font-weight:600; letter-spacing:.04em; }
.admin-field input { background:var(--sawai-ivory); border:1px solid var(--sawai-rule); padding:11px 14px; font-size:14px; color:var(--sawai-brown); border-radius:3px; transition:border-color .18s; }
.admin-field input:focus { outline:none; border-color:var(--sawai-emerald); box-shadow:0 0 0 2px rgba(22,74,55,.15); }
.admin-login__error { font-size:12px; color:#c0392b; text-align:center; padding:8px 12px; background:rgba(192,57,43,.08); border-radius:3px; }
.admin-login__btn { background:var(--sawai-emerald); color:var(--sawai-ivory); border:0; padding:14px; font-size:14px; font-weight:600; border-radius:3px; cursor:pointer; transition:filter .18s; display:flex; align-items:center; justify-content:center; gap:8px; }
.admin-login__btn:hover { filter:brightness(1.12); }
.admin-login__btn:disabled { opacity:.6; cursor:not-allowed; }
.admin-shell { display:grid; grid-template-columns:220px 1fr; min-height:100dvh; }
.admin-sidebar { background:var(--sawai-forest); color:var(--sawai-ivory); padding:28px 0; display:flex; flex-direction:column; }
.admin-sidebar__brand { padding:0 22px 28px; border-bottom:1px solid rgba(244,239,229,.12); margin-bottom:20px; }
.admin-sidebar__brand h2 { font-family:var(--sawai-serif); font-size:20px; font-weight:400; color:var(--sawai-ivory); }
.admin-sidebar__brand small { display:block; font-size:9px; letter-spacing:.14em; color:var(--sawai-gold); margin-top:3px; }
.admin-sidebar nav { display:flex; flex-direction:column; gap:4px; padding:0 12px; flex:1; }
.admin-sidebar nav button { display:flex; align-items:center; gap:10px; width:100%; padding:11px 12px; border:0; background:none; color:var(--sawai-cream); font-size:13px; text-align:left; border-radius:4px; cursor:pointer; transition:background .18s,color .18s; }
.admin-sidebar nav button:hover, .admin-sidebar nav button.active { background:rgba(197,162,100,.15); color:var(--sawai-ivory); }
.admin-sidebar__logout { margin:auto 12px 0; padding:10px 12px; border:1px solid rgba(197,162,100,.3); background:none; color:var(--sawai-cream); font-size:12px; border-radius:4px; cursor:pointer; transition:border-color .18s,color .18s; }
.admin-sidebar__logout:hover { border-color:var(--sawai-gold); color:var(--sawai-ivory); }
.admin-main { background:var(--sawai-ivory); overflow-y:auto; }
.admin-topbar { display:flex; align-items:center; justify-content:space-between; padding:20px 32px; border-bottom:1px solid var(--sawai-rule); background:var(--sawai-ivory); position:sticky; top:0; z-index:10; }
.admin-topbar h1 { font-size:20px; font-family:var(--sawai-serif); font-weight:400; }
.admin-refresh-btn { display:flex; align-items:center; gap:8px; padding:8px 16px; border:1px solid var(--sawai-rule); background:none; font-size:12px; border-radius:3px; cursor:pointer; color:var(--sawai-brown); transition:background .18s; }
.admin-refresh-btn:hover { background:var(--sawai-cream); }
.admin-content { padding:28px 32px; }
.admin-stats { display:grid; grid-template-columns:repeat(5,1fr); gap:16px; margin-bottom:32px; }
.admin-stat-card { background:var(--sawai-forest); color:var(--sawai-ivory); border-radius:6px; padding:20px 18px; border:1px solid rgba(197,162,100,.2); }
.admin-stat-card__label { font-size:10px; letter-spacing:.12em; color:var(--sawai-cream); margin-bottom:10px; }
.admin-stat-card__value { font-family:var(--sawai-serif); font-size:28px; font-weight:400; color:var(--sawai-gold); }
.admin-stat-card__sub { font-size:11px; color:var(--sawai-cream); margin-top:4px; opacity:.75; }
.admin-orders-header { display:flex; align-items:center; justify-content:space-between; gap:16px; margin-bottom:16px; flex-wrap:wrap; }
.admin-orders-header h2 { font-size:16px; font-family:var(--sawai-serif); font-weight:500; }
.admin-search { display:flex; align-items:center; border:1px solid var(--sawai-rule); border-radius:3px; overflow:hidden; }
.admin-search input { border:0; padding:9px 14px; font-size:13px; width:240px; background:var(--sawai-ivory); color:var(--sawai-brown); }
.admin-search input:focus { outline:none; }
.admin-filters { display:flex; gap:10px; }
.admin-filters select { padding:8px 12px; border:1px solid var(--sawai-rule); border-radius:3px; font-size:12px; background:var(--sawai-ivory); color:var(--sawai-brown); }
.admin-table-wrap { overflow-x:auto; border:1px solid var(--sawai-rule); border-radius:6px; }
.admin-table { width:100%; border-collapse:collapse; font-size:13px; min-width:900px; }
.admin-table th { text-align:left; padding:12px 14px; font-size:10px; letter-spacing:.1em; color:var(--sawai-muted); border-bottom:1px solid var(--sawai-rule); background:var(--sawai-cream); font-weight:600; }
.admin-table td { padding:13px 14px; border-bottom:1px solid var(--sawai-rule); vertical-align:middle; }
.admin-table tr:last-child td { border-bottom:0; }
.admin-table tr:hover td { background:rgba(197,162,100,.06); }
.admin-badge { display:inline-flex; align-items:center; padding:3px 9px; border-radius:20px; font-size:10px; font-weight:600; letter-spacing:.06em; text-transform:uppercase; }
.admin-badge--paid { background:rgba(22,74,55,.12); color:var(--sawai-emerald); }
.admin-badge--pending { background:rgba(197,162,100,.15); color:#8a6d1e; }
.admin-badge--failed { background:rgba(192,57,43,.1); color:#c0392b; }
.admin-badge--confirmed { background:rgba(22,74,55,.1); color:var(--sawai-emerald); }
.admin-badge--shipped { background:rgba(41,128,185,.1); color:#2980b9; }
.admin-badge--delivered { background:rgba(22,74,55,.2); color:var(--sawai-emerald); }
.admin-badge--cancelled { background:rgba(192,57,43,.1); color:#c0392b; }
.admin-view-btn { padding:6px 12px; border:1px solid var(--sawai-rule); background:none; border-radius:3px; font-size:11px; cursor:pointer; color:var(--sawai-brown); transition:background .15s; }
.admin-view-btn:hover { background:var(--sawai-cream); }
.admin-order-modal { position:fixed; inset:0; z-index:80; display:flex; align-items:center; justify-content:center; padding:24px; background:rgba(18,22,17,.65); backdrop-filter:blur(4px); }
.admin-order-modal__card { background:var(--sawai-ivory); width:100%; max-width:640px; max-height:90dvh; overflow-y:auto; border-radius:6px; box-shadow:0 24px 60px rgba(0,0,0,.4); }
.admin-order-modal__header { display:flex; align-items:center; justify-content:space-between; padding:20px 24px; background:var(--sawai-forest); color:var(--sawai-ivory); position:sticky; top:0; }
.admin-order-modal__header h3 { font-family:var(--sawai-serif); font-size:20px; font-weight:400; }
.admin-order-modal__body { padding:24px; }
.admin-order-modal dl { display:grid; grid-template-columns:130px 1fr; gap:10px 16px; }
.admin-order-modal dt { font-size:11px; color:var(--sawai-muted); font-weight:600; padding-top:2px; }
.admin-order-modal dd { font-size:13px; margin:0; }
.admin-order-modal__section-title { font-size:10px; letter-spacing:.13em; color:var(--sawai-muted); margin:20px 0 10px; padding-bottom:8px; border-bottom:1px solid var(--sawai-rule); }
.admin-status-select { padding:7px 10px; border:1px solid var(--sawai-rule); border-radius:3px; font-size:12px; background:var(--sawai-ivory); color:var(--sawai-brown); }
.admin-update-btn { padding:8px 16px; background:var(--sawai-emerald); color:var(--sawai-ivory); border:0; border-radius:3px; font-size:12px; cursor:pointer; transition:filter .18s; }
.admin-update-btn:hover { filter:brightness(1.1); }
.admin-export-btn { padding:8px 14px; border:1px solid var(--sawai-rule); background:none; border-radius:3px; font-size:12px; cursor:pointer; color:var(--sawai-brown); display:flex; align-items:center; gap:6px; transition:background .18s; }
.admin-export-btn:hover { background:var(--sawai-cream); }
.admin-pagination { display:flex; align-items:center; justify-content:space-between; margin-top:20px; font-size:12px; color:var(--sawai-muted); }
.admin-pagination__btns { display:flex; gap:8px; }
.admin-pagination__btns button { padding:6px 14px; border:1px solid var(--sawai-rule); background:none; border-radius:3px; font-size:12px; cursor:pointer; transition:background .15s; }
.admin-pagination__btns button:disabled { opacity:.4; cursor:default; }
.admin-pagination__btns button:hover:not(:disabled) { background:var(--sawai-cream); }
.admin-empty { text-align:center; padding:60px 24px; color:var(--sawai-muted); font-size:14px; }
@media (max-width:1100px) { .admin-stats { grid-template-columns:repeat(3,1fr); } }
@media (max-width:860px) {
  .admin-shell { grid-template-columns:1fr; }
  .admin-sidebar { display:none; }
  .admin-stats { grid-template-columns:repeat(2,1fr); }
  .admin-content { padding:20px 16px; }
  .admin-topbar { padding:16px; }
  .admin-orders-header { flex-direction:column; align-items:flex-start; }
}
`;

writeFileSync(cssPath, existing.trimEnd() + appendix + "\n");
console.log("CSS appended successfully.");
