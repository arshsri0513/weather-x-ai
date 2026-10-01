const fs = require('fs');
const routes = ['anomaly-map', 'forecast', 'events', 'analytics', 'models', 'data-fusion', 'alerts', 'history', 'methodology'];

routes.forEach(r => {
  fs.mkdirSync(`src/app/${r}`, { recursive: true });
  const title = r.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const code = `export default function Page() {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-white">${title}</h2>
      <p className="text-slate-400 mt-2">This module is currently being wired up by the AI engineering team.</p>
    </div>
  );
}`;
  fs.writeFileSync(`src/app/${r}/page.tsx`, code);
});
