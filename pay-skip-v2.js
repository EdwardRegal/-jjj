export default async function (ctx) {
  let data;
  try { data = await ctx.response.json(); } catch (e) { return; }
  if (!data || !data.data) return;

  let origin = "http://43.226.128.167:7088";
  try { origin = new URL(ctx.request.url).origin; } catch (e) {}

  const qs = "?trade_status=TRADE_SUCCESS"
    + "&out_trade_no=" + encodeURIComponent(data.data.out_trade_no || "")
    + "&trade_no=" + encodeURIComponent(data.data.trade_no || "");
  const success = origin + "/pay/" + qs + "#/pay-result" + qs;

  data.data.url = success;
  data.data.payurl = success;
  data.data.qrcode = success;
  data.data.urlscheme = success;
  return { body: data };
}
