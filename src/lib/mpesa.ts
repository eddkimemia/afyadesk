// Daraja STK Push helper — supports live via env or mock when not configured
// Env needed for live:
// MPESA_CONSUMER_KEY, MPESA_CONSUMER_SECRET, MPESA_PASSKEY, MPESA_SHORTCODE, MPESA_ENV=sandbox|production, MPESA_CALLBACK_URL (defaults to <APP_URL>/api/mpesa/callback)

const ENV = process.env.MPESA_ENV || "sandbox";
const BASE = ENV === "production" ? "https://api.safaricom.co.ke" : "https://sandbox.safaricom.co.ke";

function isLive() {
  return !!(process.env.MPESA_CONSUMER_KEY && process.env.MPESA_CONSUMER_SECRET && process.env.MPESA_PASSKEY && process.env.MPESA_SHORTCODE);
}

function formatPhone(phone: string): string {
  // Convert 07xx, 7xx, +2547xx to 2547xx
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("254")) return digits;
  if (digits.startsWith("0")) return "254" + digits.slice(1);
  if (digits.length === 9) return "254" + digits;
  return digits;
}

function getTimestamp(): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;
}

export async function getAccessToken(): Promise<string> {
  if (!isLive()) return "mock-token";
  const key = process.env.MPESA_CONSUMER_KEY!;
  const secret = process.env.MPESA_CONSUMER_SECRET!;
  const auth = Buffer.from(`${key}:${secret}`).toString("base64");
  const res = await fetch(`${BASE}/oauth/v1/generate?grant_type=client_credentials`, {
    headers: { Authorization: `Basic ${auth}` },
  });
  if (!res.ok) throw new Error(`Daraja auth failed ${res.status}`);
  const j = await res.json();
  return j.access_token;
}

export type StkResult = {
  mocked: boolean;
  MerchantRequestID: string;
  CheckoutRequestID: string;
  ResponseCode: string;
  ResponseDescription: string;
  CustomerMessage: string;
};

export async function stkPush(params: {
  phone: string;
  amount: number;
  accountReference: string; // e.g. AFYA-EMAIL
  transactionDesc: string;
  callbackUrl?: string;
}): Promise<StkResult> {
  const phone = formatPhone(params.phone);
  const amount = Math.round(params.amount);

  if (!isLive()) {
    // Mock — simulate synchronous success, callback will arrive via mock timeout below
    const mock: StkResult = {
      mocked: true,
      MerchantRequestID: `mock-merchant-${Date.now()}`,
      CheckoutRequestID: `ws_CO_${Date.now()}${Math.random().toString(36).slice(2, 8)}`,
      ResponseCode: "0",
      ResponseDescription: "Success. Request accepted for processing",
      CustomerMessage: "Success. Request accepted for processing. Enter PIN on phone.",
    };
    return mock;
  }

  const token = await getAccessToken();
  const shortcode = process.env.MPESA_SHORTCODE!;
  const passkey = process.env.MPESA_PASSKEY!;
  const timestamp = getTimestamp();
  const password = Buffer.from(`${shortcode}${passkey}${timestamp}`).toString("base64");
  const callbackUrl = params.callbackUrl || process.env.MPESA_CALLBACK_URL || `${process.env.NEXTAUTH_URL || "https://afyadesk.co.ke"}/api/mpesa/callback`;

  const body = {
    BusinessShortCode: shortcode,
    Password: password,
    Timestamp: timestamp,
    TransactionType: "CustomerPayBillOnline",
    Amount: amount,
    PartyA: phone,
    PartyB: shortcode,
    PhoneNumber: phone,
    CallBackURL: callbackUrl,
    AccountReference: params.accountReference.slice(0, 12),
    TransactionDesc: params.transactionDesc.slice(0, 20),
  };

  const res = await fetch(`${BASE}/mpesa/stkpush/v1/processrequest`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const j = await res.json();
  if (!res.ok || j.ResponseCode !== "0") {
    throw new Error(j.errorMessage || j.ResponseDescription || `STK push failed ${res.status}`);
  }
  return { mocked: false, ...j };
}

// For mock mode, caller can simulate callback after delay
export { isLive, formatPhone };
