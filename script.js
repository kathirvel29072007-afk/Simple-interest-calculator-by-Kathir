const form = document.getElementById('interest-form');
const resetBtn = document.getElementById('reset-btn');

const principalInput = document.getElementById('principal');
const rateInput = document.getElementById('rate');
const timeInput = document.getElementById('time');
const inflationInput = document.getElementById('inflation');
const planInput = document.getElementById('plan');

const wealthScoreEl = document.getElementById('wealth-score');
const planTagEl = document.getElementById('plan-tag');
const interestEarnedEl = document.getElementById('interest-earned');
const finalAmountEl = document.getElementById('final-amount');
const monthlyGainEl = document.getElementById('monthly-gain');
const realValueEl = document.getElementById('real-value');
const insightTextEl = document.getElementById('insight-text');

const year1El = document.getElementById('year-1');
const year3El = document.getElementById('year-3');
const year5El = document.getElementById('year-5');

const currencyFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 2,
});

function formatMoney(value) {
  return currencyFormatter.format(value || 0);
}

function getGrowthModeLabel(mode) {
  const labels = {
    steady: 'Steady Builder',
    aggressive: 'Growth Booster',
    balanced: 'Balanced Path',
  };

  return labels[mode] || 'Steady Builder';
}

function getPlanHint(score) {
  if (score >= 80) return 'High momentum portfolio';
  if (score >= 60) return 'Healthy and steady growth';
  if (score >= 35) return 'Solid foundation with room to grow';
  return 'Start small and build discipline';
}

function calculateMilestones(principal, rate, years) {
  return {
    one: principal * (1 + (rate / 100) * 1),
    three: principal * (1 + (rate / 100) * 3),
    five: principal * (1 + (rate / 100) * 5),
  };
}

function calculateSimpleInterest(principal, rate, time, inflation = 0) {
  const interest = (principal * rate * time) / 100;
  const finalAmount = principal + interest;
  const monthlyGain = time > 0 ? interest / (time * 12) : 0;
  const realValue = finalAmount / (1 + (inflation * time) / 100);

  return { interest, finalAmount, monthlyGain, realValue };
}

function updateDashboard() {
  const principal = Number(principalInput.value) || 0;
  const rate = Number(rateInput.value) || 0;
  const time = Number(timeInput.value) || 0;
  const inflation = Number(inflationInput.value) || 0;
  const plan = planInput.value;

  const result = calculateSimpleInterest(principal, rate, time, inflation);
  const milestoneValues = calculateMilestones(principal, rate, time);

  const growthScore = Math.min(
    100,
    Math.round((principal / 500000) * 35 + (rate / 15) * 35 + (time / 10) * 30)
  );

  wealthScoreEl.textContent = `Wealth Score: ${growthScore}`;
  planTagEl.textContent = getGrowthModeLabel(plan);
  planTagEl.style.borderColor =
    plan === 'aggressive'
      ? 'rgba(255, 213, 128, 0.6)'
      : plan === 'balanced'
        ? 'rgba(153, 240, 216, 0.6)'
        : 'rgba(124, 155, 255, 0.6)';

  interestEarnedEl.textContent = formatMoney(result.interest);
  finalAmountEl.textContent = formatMoney(result.finalAmount);
  monthlyGainEl.textContent = formatMoney(result.monthlyGain);
  realValueEl.textContent = formatMoney(result.realValue);

  year1El.textContent = formatMoney(milestoneValues.one);
  year3El.textContent = formatMoney(milestoneValues.three);
  year5El.textContent = formatMoney(milestoneValues.five);

  insightTextEl.textContent = `${getPlanHint(growthScore)}. With a ${rate}% return over ${time} years, your investment grows by ${formatMoney(result.interest)} before inflation adjustment.`;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  updateDashboard();
});

resetBtn.addEventListener('click', () => {
  form.reset();
  principalInput.value = '250000';
  rateInput.value = '8.5';
  timeInput.value = '5';
  inflationInput.value = '4.2';
  planInput.value = 'steady';
  updateDashboard();
});

updateDashboard();
