const paymentForm = document.getElementById("paymentForm");
const cardholderName = document.getElementById("cardholderName");
const cardNumber = document.getElementById("cardNumber");
const expiryDate = document.getElementById("expiryDate");
const cvv = document.getElementById("cvv");
const promoCode = document.getElementById("promoCode");
const agreeTerms = document.getElementById("agreeTerms");

function formatCardNumber(value) {
  return value
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(.{4})/g, "$1 ")
    .trim();
}

function formatExpiryDate(value) {
  const cleaned = value.replace(/\D/g, "").slice(0, 4);
  if (cleaned.length <= 2) {
    return cleaned;
  }
  return cleaned.slice(0, 2) + "/" + cleaned.slice(2);
}

function formatCVV(value) {
  return value.replace(/\D/g, "").slice(0, 3);
}

function formatCardholderName(value) {
  return value
    .replace(/[^a-zA-Z\s]/g, "")
    .replace(/\s{2,}/g, " ")
    .slice(0, 30);
}

function formatPromoCode(value) {
  return value
    .replace(/[^a-zA-Z0-9]/g, "")
    .toUpperCase()
    .slice(0, 12);
}

if (cardholderName) {
  cardholderName.addEventListener("input", function (event) {
    event.target.value = formatCardholderName(event.target.value);
  });
}

if (cardNumber) {
  cardNumber.addEventListener("input", function (event) {
    event.target.value = formatCardNumber(event.target.value);
  });
}

if (expiryDate) {
  expiryDate.addEventListener("input", function (event) {
    event.target.value = formatExpiryDate(event.target.value);
  });
}

if (cvv) {
  cvv.addEventListener("input", function (event) {
    event.target.value = formatCVV(event.target.value);
  });
}

if (promoCode) {
  promoCode.addEventListener("input", function (event) {
    event.target.value = formatPromoCode(event.target.value);
  });
}

if (paymentForm) {
  paymentForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const nameValue = cardholderName.value.trim();
    const cardValue = cardNumber.value.trim();
    const expiryValue = expiryDate.value.trim();
    const cvvValue = cvv.value.trim();

    if (!nameValue || !cardValue || !expiryValue || !cvvValue) {
      alert("Please fill in all required payment fields.");
      return;
    }

    if (cardValue.replace(/\s/g, "").length !== 16) {
      alert("Card number must be 16 digits.");
      return;
    }

    if (expiryValue.length !== 5 || !expiryValue.includes("/")) {
      alert("Expiry date must be in MM/YY format.");
      return;
    }

    if (cvvValue.length !== 3) {
      alert("CVV must be 3 digits.");
      return;
    }

    if (!agreeTerms.checked) {
      alert("Please agree to the terms and conditions.");
      return;
    }

    document.body.innerHTML = `
      <div class="success-screen">
        <div class="success-circle">
          <div class="success-check">✓</div>
        </div>
        <h1>Payment Successful!</h1>
        <p class="success-text">You're now enrolled in Advanced React & TypeScript</p>
        <p class="redirect-text">Redirecting to dashboard...</p>
      </div>
    `;

    setTimeout(function () {
      window.location.href = "dashboard.html";
    }, 2000);
  });
}