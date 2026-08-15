// Simple Interest Calculator logic (talks to Python backend)
(() => {
  const $ = id => document.getElementById(id);

  const principal = $('principal');
  const pRange = $('pRange');
  const rate = $('rate');
  const rRange = $('rRange');
  const time = $('time');
  const tRange = $('tRange');
  const calculate = $('calculate');
  const reset = $('reset');
  const interestOut = $('interest');
  const totalOut = $('total');

  function fmt(v){
    try{
      return new Intl.NumberFormat(undefined,{style:'currency',currency:'USD',maximumFractionDigits:2}).format(v);
    }catch(e){
      return '$'+Number(v).toFixed(2);
    }
  }

  // sync sliders and inputs
  function sync(a, b){
    a.addEventListener('input', () => { b.value = a.value; });
    b.addEventListener('input', () => { a.value = b.value; });
  }

  sync(pRange, principal);
  sync(rRange, rate);
  sync(tRange, time);

  function buildBreakdown(P, R, T){
    const perYear = (P * R) / 100;
    const years = Math.floor(T);
    const remainder = T - years;
    const rows = [];
    for(let y=1;y<=years;y++){
      rows.push({ period: `Year ${y}`, interest: perYear, total: P + perYear * y });
    }
    if(remainder>0){
      const lastInterest = perYear * remainder;
      rows.push({ period: `${(T).toFixed(2)} years`, interest: lastInterest, total: P + perYear * years + lastInterest });
    }
    return rows;
  }

  async function computeServer(){
    const P = Number(principal.value) || 0;
    const R = Number(rate.value) || 0;
    const T = Number(time.value) || 0;
    const errEl = document.getElementById('err');
    errEl.style.display = 'none';
    if(P < 0 || R < 0 || T <= 0){
      errEl.textContent = 'Please enter positive values for principal, rate and time.';
      errEl.style.display = 'block';
      return;
    }
    try{
      const res = await fetch('/compute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ principal: P, rate: R, time: T })
      });
      if(!res.ok) throw new Error('server error');
      const j = await res.json();
      interestOut.textContent = j.interest_fmt || fmt(j.interest);
      totalOut.textContent = j.total_fmt || fmt(j.total);
      populateBreakdown(buildBreakdown(P,R,T));
    }catch(e){
      // fallback to client compute
      const interest = (P * R * T) / 100;
      const total = P + interest;
      interestOut.textContent = fmt(interest);
      totalOut.textContent = fmt(total);
      populateBreakdown(buildBreakdown(P,R,T));
    }
  }

  function populateBreakdown(rows){
    const ul = document.getElementById('breakdown');
    ul.innerHTML = '';
    rows.forEach(r => {
      const li = document.createElement('li');
      li.textContent = `${r.period}: Interest ${fmt(r.interest)} — Total ${fmt(r.total)}`;
      ul.appendChild(li);
    });
  }

  function csvFromRows(P,R,T){
    const rows = buildBreakdown(P,R,T);
    const header = ['Period','Interest','Total'];
    const lines = [header.join(',')];
    rows.forEach(r => lines.push([r.period, r.interest.toFixed(2), r.total.toFixed(2)].join(',')));
    return lines.join('\n');
  }

  calculate.addEventListener('click', (e) => { e.preventDefault(); computeServer(); });
  reset.addEventListener('click', () => {
    principal.value = 1000; pRange.value = 1000;
    rate.value = 5; rRange.value = 5;
    time.value = 1; tRange.value = 1;
    interestOut.textContent = '—';
    totalOut.textContent = '—';
    document.getElementById('breakdown').innerHTML = '';
  });

  // initial compute
  computeServer();

  // copy and export handlers
  const copyBtn = document.getElementById('copyBtn');
  const exportBtn = document.getElementById('exportBtn');
  copyBtn.addEventListener('click', async () => {
    const text = `Interest: ${interestOut.textContent}\nTotal: ${totalOut.textContent}`;
    try{ await navigator.clipboard.writeText(text); copyBtn.textContent = 'Copied!'; setTimeout(()=>copyBtn.textContent='Copy Result',1200);}catch(e){ alert('Copy not supported'); }
  });
  exportBtn.addEventListener('click', () => {
    const P = Number(principal.value) || 0;
    const R = Number(rate.value) || 0;
    const T = Number(time.value) || 0;
    const csv = csvFromRows(P,R,T);
    const blob = new Blob([csv],{type:'text/csv'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'simple-interest-breakdown.csv';
    document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
  });

  // ensure error element hidden on load
  const errEl = document.getElementById('err'); if(errEl) errEl.style.display='none';
})();
