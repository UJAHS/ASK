const bcrypt = require("bcrypt");

async function main() {
  const password = "Admin@123"; // Choose your password
  const hash = await bcrypt.hash(password, 10);
  console.log(hash);
}

main();