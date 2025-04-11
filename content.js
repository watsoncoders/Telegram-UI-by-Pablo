function collectTelegramData() {
  const members = [];
  const nodes = document.querySelectorAll('[class*="ChatMember"]');
  nodes.forEach(node => {
    const fullName = node.querySelector('[class*="user-title"]')?.innerText || '';
    const username = node.querySelector('[class*="user-username"]')?.innerText.replace('@','') || '';
    const phoneMatch = node.innerText.match(/\+\d{7,15}/);
    const phone = phoneMatch ? phoneMatch[0] : '';
    const bio = node.querySelector('[class*="bio"]')?.innerText || '';
    const image = node.querySelector('img')?.src || '';
    members.push({ fullName, username, phone, bio, image });
  });

  console.log("🧾 משתמשים שנאספו:", members);

  // שלח ל־API
  fetch('https://yourdomain.com/api/save_user.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(members)
  })
  .then(res => res.text())
  .then(msg => alert("✅ מידע נשלח: " + msg))
  .catch(err => console.error('שגיאה בשליחה:', err));
}

collectTelegramData();
