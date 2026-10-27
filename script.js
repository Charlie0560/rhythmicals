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
const ic = {
  wa: '<svg viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/><g transform="translate(6.6 6.4) scale(.45)" stroke-width="3.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></g></svg>',
  mail: '<svg viewBox="0 0 24 24"><path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/><path d="M22 6l-10 7L2 6"/></svg>',
  ig: '<svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><path d="M17.5 6.5h.01"/></svg>',
  phone: '<svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
};
 
document.querySelectorAll("[data-ic]").forEach((e) => (e.outerHTML = ic[e.dataset.ic]));
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
  )}</div><div><h4>Get in touch</h4><a class="ico" href="https://wa.me/917745038820" target="_blank" rel="noopener">${ic.wa}+91 77450 38820</a><a class="ico" href="mailto:nishantdandwate000@gmail.com">${ic.mail}nishantdandwate000@gmail.com</a><a class="ico" href="https://instagram.com/rhythmic_nish" target="_blank" rel="noopener">${ic.ig}@rhythmic_nish</a></div><div class="copy">© 2026 Rhythmicals Drum Circle. All rights reserved.</div></div>`;
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
