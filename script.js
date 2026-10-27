// Set this to the inbox that should receive enquiries.
const FORM_EMAIL = "nishantdandwate000@gmail.com";
const pages = [
  ["index.html", "Home"],
  ["about.html", "About"],
  ["services.html", "Services"],
  ["gallery.html", "Gallery"],
  ["contact.html", "Contact"],
];
const here = location.pathname.split("/").pop() || "index.html";
const mark = '<img class="mark" src="images/logo.png" alt="">';
document.getElementById(
  "hdr"
).innerHTML = `<div class="wrap bar"><a class="logo" href="index.html">${mark}Rhythmicals Drum Circle</a><button class="menu" aria-label="Menu" onclick="document.getElementById('nav').classList.toggle('open')">Menu</button><nav id="nav">${pages
  .map(
    (p) => `<a href="${p[0]}"${p[0] === here ? ' class="on"' : ""}>${p[1]}</a>`
  )
  .join("")}</nav></div>`;
document.getElementById(
  "ftr"
).innerHTML = `<div class="wrap"><div><h4>Rhythmicals Drum Circle</h4><p>We bring the drums, you bring the energy.<br>Hosted by Nishant Dandawate (rhythmic_nish).</p></div><div><h4>Pages</h4>${pages
  .map((p) => `<a href="${p[0]}">${p[1]}</a>`)
  .join(
    ""
  )}</div><div><h4>Get in touch</h4><a href="tel:+910000000000">+91 77450 38820</a><a href="mailto:nishantdandwate000@gmail.com">nishantdandwate000@gmail.com</a><a href="https://instagram.com/rhythmic_nish">Instagram @rhythmic_nish</a></div><div class="copy">© 2026 Rhythmicals Drum Circle. All rights reserved.</div></div>`;
document.querySelectorAll(".photo img").forEach((i) => {
  const hide = () => (i.style.display = "none");
  i.addEventListener("error", hide);
  if (i.complete && !i.naturalWidth) hide();
});
const f = document.getElementById("enq");
if (f)
  f.addEventListener("submit", async (e) => {
    e.preventDefault();
    const st = document.getElementById("status"),
      b = f.querySelector("button");
    const say = (t, c) => {
      st.textContent = t;
      st.className = "status " + c;
    };
    const d = Object.fromEntries(new FormData(f));
    b.disabled = true;
    say("Sending…", "");
    try {
      const r = await fetch("https://formsubmit.co/ajax/" + FORM_EMAIL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: d.name,
          email: d.email,
          phone: d.phone,
          event_type: d.type,
          message: d.msg,
          _honey: d._honey,
          _subject: "New enquiry from " + d.name + " (Rhythmicals website)",
          _template: "table",
          _captcha: "false",
        }),
      });
      const j = await r.json();
      if (r.ok && String(j.success) === "true") {
        say("Thank you. We have your message and will reply soon.", "ok");
        f.reset();
      } else throw new Error(j.message || "failed");
    } catch (err) {
      say(
        "Sorry, that did not send. Please call or message us on WhatsApp instead.",
        "err"
      );
    }
    b.disabled = false;
  });
document.head.insertAdjacentHTML(
  "beforeend",
  '<link rel="icon" href="images/logo.png">'
);
