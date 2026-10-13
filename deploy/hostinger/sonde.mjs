// Sonde HTTP locale sans curl ni proxy : node sonde.mjs <port> <chemin>
import http from "node:http";
const [port, path] = process.argv.slice(2);
const req = http.get({ host: "127.0.0.1", port: Number(port), path, timeout: 15000, agent: false }, (res) => {
  const chunks = [];
  res.on("data", (c) => chunks.push(c));
  res.on("end", () => {
    const body = Buffer.concat(chunks).toString("utf8");
    const robots = (body.match(/<meta name="robots" content="([^"]*)"/) || [])[1] || "";
    console.log(JSON.stringify({ code: res.statusCode, type: res.headers["content-type"] || "", len: body.length, robots }));
    process.exit(0);
  });
});
req.on("timeout", () => { console.log(JSON.stringify({ code: 0, err: "délai dépassé" })); process.exit(0); });
req.on("error", (e) => { console.log(JSON.stringify({ code: 0, err: e.code || e.message })); process.exit(0); });
